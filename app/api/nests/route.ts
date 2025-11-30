import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, ownerId } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const nest = await prisma.nest.create({
      data: {
        name,
        ownerId,
      },
    });

    return NextResponse.json(nest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
