import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;

  const nestId = Number(id);
  if (isNaN(nestId))
    return NextResponse.json({ error: "Invalid nest id" }, { status: 400 });

  const { title } = await req.json();
  if (!title)
    return NextResponse.json({ error: "Missing title" }, { status: 400 });

  // Crée le movie
  const movie = await prisma.movie.create({ data: { title } });

  // Relie le movie à la nest
  await prisma.nestMovie.create({ data: { nestId, movieId: movie.id } });

  // Récupère la nest complète avec movies et friends
  const nest = await prisma.nest.findUnique({
    where: { id: nestId },
    include: {
      owner: true,
      movies: { include: { movie: true } },
      sharedWith: { include: { user: true } },
    },
  });

  if (!nest)
    return NextResponse.json({ error: "Nest not found" }, { status: 404 });

  const movies = nest.movies.map((nm) => nm.movie);
  const friends = nest.sharedWith.map((nf) => nf.user);

  return NextResponse.json({ nest, movies, friends });
}
