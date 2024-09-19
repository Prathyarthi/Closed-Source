import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, maintainerId } = body;

        const group = await prisma.
    } catch (error) {
        return NextResponse.json({ error: 'Unable to create group' }, { status: 500 });
    }
}