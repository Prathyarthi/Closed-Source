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
