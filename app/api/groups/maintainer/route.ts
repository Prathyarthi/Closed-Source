import prisma from '@/db/index';

export async function POST(maintainerId: string) {
  const groups = await prisma.projectGroup.findMany({
    where: {
      maintainerId,
    },
  });

  return groups;
}
