'use server';

import prisma from '@/db';
import { revalidatePath } from 'next/cache';

export const fetchUsers = async () => {
  try {
    // TODO: Need to add condition to fetch users that shud exclude the maintainer
    const users = await prisma?.user.findMany();
    // console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

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

export const removeUserFromGroup = async (groupId: string, userId: string) => {
  try {
    const removedUser = await prisma.groupMember.deleteMany({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });
    revalidatePath('/groups');
    console.log(removedUser.count);

    return removedUser;
  } catch (error) {
    console.log(error);
  }
};
