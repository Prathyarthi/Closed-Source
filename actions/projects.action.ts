'use server';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchProjects() {
  const projects = await prisma.projectGroup.findMany({
    include: {
      maintainer: true,
    },
  });

  revalidatePath('/dashboard/projects');
  return projects;
}

export async function createProject(
  name: string,
  description: string,
  maintainerId: number,
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error('Unauthenticated');
  }

  const project = await prisma.projectGroup.create({
    data: {
      name,
      description,
      maintainerId: session.user.id,
    },
  });

  revalidatePath('/dashboard/projects');
  return project;
}

export async function getProjectById(projectId: string) {
  const project = await prisma.projectGroup.findUnique({
    where: {
      id: projectId,
    },
  });

  revalidatePath('/dashboard/projects');
  return project;
}

export async function deleteProject(projectId: string) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error('Unauthenticated');
  }

  const project = await prisma.projectGroup.findUnique({
    where: {
      id: projectId,
    },
  });

  if (project?.maintainerId !== session.user.id) {
    throw new Error('Permission denied');
  }

  const deleteProject = await prisma.projectGroup.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath('/dashboard/projects');
  return deleteProject;
}
