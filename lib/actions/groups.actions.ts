'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchGroups() {
  try {
    const groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        maintainer: true,
        project: true,
        projectId: true,
        members: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    console.log(groups);

    return groups;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw new Error('Failed to fetch groups');
  }
}

export async function createGroup(name: string, description: string) {
  console.log(name, description);

  try {
    // Need to pass authOptions while accessing a getServerSession refered : "https://next-auth.js.org/configuration/nextjs#getserversession"
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const group = await prisma.group.create({
      data: {
        name,
        description,
        maintainerId: session.user.id, // Use the session user ID
      },
    });

    revalidatePath('/groups');
    return group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw new Error('Failed to create group');
  }
}

export async function getGroupById(groupId: string) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        id: true,
        name: true,
        maintainer: true,
        members: true,
        project: true,
      },
    });

    if (!group) {
      throw new Error('Group not found');
    }

    return group;
  } catch (error) {
    console.error('Error fetching group:', error);
    throw new Error('Failed to fetch group');
  }
}

export async function deleteGroup(groupId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new Error('Group not found');
    }

    if (group.maintainerId !== session.user.id) {
      throw new Error('Permission denied');
    }

    const deletedGroup = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    revalidatePath('/groups');
    return deletedGroup;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw new Error('Failed to delete group');
  }
}

export const addMembersToGroup = async (groupId: string, userId: string) => {
  try {
    console.log(userId);
    console.log(groupId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const members = await prisma?.groupMember.create({
      data: {
        groupId: groupId,
        userId: userId,
        role: 'MEMBER',
      },
    });
    console.log(members);

    revalidatePath('/groups');
    return members;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserInGroup = async (groupId: string) => {
  const users = prisma.user.findMany({});
  revalidatePath('/groups');
  return users;
};
