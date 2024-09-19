import { NextResponse } from "next/server";
import prisma from '@/db/index';

export async function POST(req: Request, { params }: { params: { groupId: string } }) {
    try {
        const body = await req.json();
        const { userId, role } = body;

        const groupMember = await prisma.groupMember.create({
            data: {
                userId,
                groupId: params.groupId,
                role: role || 'MEMBER'
            }
        })

        return NextResponse.json({
            groupMember
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Unable to add member to group' }, { status: 500 });
    }
}