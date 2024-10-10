'use server';

import { currentUser } from '@clerk/nextjs/server';
import { parseStringify } from '../utils';
import prisma from '@/db';
import { revalidatePath } from 'next/cache';

export async function getUser() {
  const user = await currentUser();
  return parseStringify(user);
}

export const fetchUsersOfParticularGroup = async (groupId: string) => {
  try {
    const users = await prisma?.user.findMany({
      where: {
        groups: {
          some: {
            groupId: groupId,
          },
        },
      },
    });
    // console.log('usersOfGroup', users);
    revalidatePath('/groups');
    return users;
  } catch (error) {
    console.log(error);
  }
};
