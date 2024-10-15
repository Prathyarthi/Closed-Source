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
        maintainerId,
      },
    });

    if (!projects) {
      throw new Error('Projects not found');
    }

    console.log(projects);

    return projects;
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
// export const assignProjectToGroup = async (
//   groupId: string,
//   projectId: string,
// ) => {
//   try {
//     // const project = await prisma.project.findUnique({
//     //   where: {
//     //     id: projectId,
//     //   },
//     // });

//     // if (!project) {
//     //   throw new Error(`Project with ID ${projectId} not found.`);
//     // }

//     // const updatedProject = await prisma.project.update({
//     //   where: {
//     //     id: projectId,
//     //   },
//     //   data: {
//     //     groupId: groupId,
//     //   },
//     // });

//     // revalidatePath('/groups');
//     // return updatedProject;
//     const group = await prisma.group.findUnique({
//       where: {
//         id: groupId,
//       },
//     });

//     if (!group) {
//       throw new Error(`Group with ID ${groupId} not found.`);
//     }

//     const updatedGroup = await prisma.group.update({
//       where: {
//         id: groupId,
//       },
//       data: {
//         assignedProjectId: projectId,
//         projects: {
//           connect: {
//             id: projectId,
//           },
//         },
//       },
//     });

//     revalidatePath('/groups');
//     return updatedGroup;
//   } catch (error) {
//     console.error('Error assigning group to project:', error);
//   }
// };

export const assignProjectToGroup = async (
  groupId: string,
  projectId: string,
) => {
  console.log(groupId);
  console.log(projectId);

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error(`Group with ID ${groupId} not found.`);
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found.`);
    }

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        project: {
          connect: { id: projectId },
        },
      },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: {
        // group: {
        //   connect: { id: groupId },
        // },
        groupId: groupId,
      },
    });

    revalidatePath('/groups');
    return updatedGroup;
  } catch (error) {
    console.error('Error assigning project to group:', error);
    throw new Error('Failed to assign project to group');
  }
};

// export const assignProjectToGroup = async (
//   groupId: string,
//   projectId: string,
// ) => {
//   console.log(groupId);
//   console.log(projectId);

//   try {
//     const group = await prisma.group.findUnique({
//       where: { id: groupId },
//     });

//     if (!group) {
//       throw new Error(`Group with ID ${groupId} not found.`);
//     }

//     // Update the group to associate it with the project
//     const updatedGroup = await prisma.group.update({
//       where: { id: groupId },
//       data: {
//         // Remove assignedProjectId if it's not part of your schema
//         projects: {
//           connect: { id: projectId }, // Connect the project to the group
//         },
//       },
//     });

//     // Revalidate path if necessary (assuming you are using ISR or caching)
//     revalidatePath('/groups');

//     return updatedGroup;
//   } catch (error) {
//     console.error('Error assigning project to group:', error);
//     throw new Error('Failed to assign project to group');
//   }
// };

export const removeProjectFromGroup = async (
  groupId: string,
  projectId: string,
) => {
  console.log(groupId);
  console.log(projectId);

  try {
    // Find the group by its ID
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    // If the group is not found, throw an error
    if (!group) {
      throw new Error(`Group with ID ${groupId} not found.`);
    }

    // Update the group to disconnect the project from it
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        project: {
          disconnect: { id: projectId }, // Disconnect the project from the group
        },
      },
    });

    // Update the project to remove the group
    await prisma.project.update({
      where: { id: projectId },
      data: {
        groupId: null,
      },
    });

    // Revalidate the path if you're using ISR or caching
    revalidatePath('/groups');

    return updatedGroup;
  } catch (error) {
    console.error('Error removing project from group:', error);
    throw new Error('Failed to remove project from group');
  }
};

export const fetchassignedProjects = async (groupId: string) => {
  try {
    const project = await prisma.group.findUnique({
      where: { id: groupId },
      select: {
        project: true,
      },
    });

    if (!project) {
      throw new Error(`Group with ID ${groupId} not found.`);
    }

    return project;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
};
