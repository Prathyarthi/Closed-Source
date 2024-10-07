import { NextResponse } from 'next/server';
import prisma from '@/db/index';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, maintainerId } = body;

    const group = await prisma.group.create({
      data: {
        name,
        description,
        maintainer: maintainerId,
      },
    });

    return NextResponse.json(
      {
        group,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to create group' },
      { status: 500 },
    );
  }
}
