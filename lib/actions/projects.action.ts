'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function fetchProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        maintainer: true,
      },
    });

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function fetchProjectsByMaintainerId(maintainerId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        maintainerId
      }
    })

    if (!projects) {
      throw new Error('Projects not found')
    }

    console.log(projects);
    
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch project');
  }
}
export async function createProject(name: string, description: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        maintainerId: session.user.id,
      },
    });

    revalidatePath('/projects');
    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

export async function getProjectById(projectId: string) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  } catch (error) {
    console.error('Error fetching group:', error);
    throw new Error('Failed to fetch group');
  }
}

export async function deleteProject(projectId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    if (project?.maintainerId !== session.user.id) {
      throw new Error('Permission denied');
    }

    const deleteProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath('/projects');
    return deleteProject;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw new Error('Failed to delete group');
  }
}

export async function addReviewer(projectId: string, userId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.maintainerId !== session.user.id) {
      throw new Error('Permission denied');
    }

    const addReviewer = await prisma.reviewer.create({
      data: {
        projectId,
        userId,
      },
    });

    revalidatePath('/projects');
    return addReviewer;
  } catch (error) {
    console.error('Error creating reviewer:', error);
    throw new Error('Failed to create reviewer');
  }
}

export async function removeReviewer(projectId: string, userId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Unauthenticated');
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    if (project.maintainerId !== session.user.id) {
      throw new Error('Permission denied');
    }

    const removeReviewer = await prisma.reviewer.deleteMany({
      where: {
        projectId,
        userId,
      },
    });

    revalidatePath('/projects');
    return removeReviewer;
  } catch (error) {
    console.error('Error deleting reviewer:', error);
    throw new Error('Failed to delete reviewer');
  }
}

export async function fetchReviewers(projectId: string) {
  try {
    const reviewers = await prisma.reviewer.findMany({
      where: {
        projectId,
      },
      include: {
        user: true,
      },
    });

    return reviewers;
  } catch (error) {
    console.error('Error fetching reviewers:', error);
    throw new Error('Failed to fetch reviewers');
  }
}
export const assignGroupToProject = async (
  groupId: string,
  projectId: string,
) => {
  // console.log(projectId);
  // console.log(groupId);

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found.`);
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        groupId: groupId,
      },
    });

    return updatedProject;
  } catch (error) {
    console.error('Error assigning group to project:', error);
    throw new Error('Failed to assign group to project');
  }
};

export const removeGroupFromProject = async (
  groupId: string,
  projectId: string,
) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        groupId: null,
      },
    });
    revalidatePath('/groups');
  } catch (error) {
    console.log(error);
  }
};
