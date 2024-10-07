'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchGroups() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        maintainer: true,
      },
    });
    // console.log(groups);
    revalidatePath('/groups');
    return groups;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw new Error('Failed to fetch groups');
  }
}

export async function createGroup(name: string, description: string) {
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
    });

    if (!group) {
      throw new Error('Group not found');
    }

    revalidatePath('/groups');
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
