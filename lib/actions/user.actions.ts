'use server';

import { currentUser } from '@clerk/nextjs/server';
import { parseStringify } from '../utils';
import prisma from '@/db';
import { revalidatePath } from 'next/cache';

export async function getUser() {
  const user = await currentUser();
  return parseStringify(user);
}

export const fetchUsers = async () => {
  try {
    const users = await prisma?.user.findMany();
    // console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};
