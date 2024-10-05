import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchGroups() {
  const groups = await prisma.group.findMany({
    include: {
      maintainer: true,
    },
  });

  revalidatePath('/dashboard/groups');
  return groups;
}

export async function createGroup(name: string, description: string) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error('Unauthenticated');
  }

  const group = await prisma.group.create({
    data: {
      name,
      description,
      maintainerId: session.user.id,
    },
  });

  revalidatePath('/dashboard/groups');
  return group;
}

export async function getGroupById(groupId: string) {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  revalidatePath('/dashboard/groups');
  return group;
}

export async function deleteGroup(groupId: string) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error('Unauthenticated');
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (group?.maintainerId !== session.user.id) {
    throw new Error('Permission denied');
  }

  const deleteGroup = await prisma.group.delete({
    where: {
      id: groupId,
    },
  });

  revalidatePath('/dashboard/groups');
  return deleteGroup;
}
