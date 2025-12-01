import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { movieId: string };
}

export async function PATCH(req: Request, { params }: Params) {
  const { newStatus } = await req.json();
  const { movieId } = await params;
  const nestMovieId = Number(movieId);

  if (!newStatus) {
    return NextResponse.json({ error: "Missing status" }, { status: 400 });
  }

  if (isNaN(nestMovieId)) {
    return NextResponse.json({ error: "Invalid movieId" }, { status: 400 });
  }

  const updated = await prisma.nestMovie.update({
    where: { id: nestMovieId },
    data: { status: newStatus },
  });

  return NextResponse.json(updated);
}
