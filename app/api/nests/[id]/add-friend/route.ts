import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = context;
  const { id } = await params;

  const nestId = Number(id);
  if (isNaN(nestId)) {
    return NextResponse.json({ error: "Invalid nest id" }, { status: 400 });
  }

  const { friendName } = await req.json();
  if (!friendName) {
    return NextResponse.json(
      { error: "Missing friend's name" },
      { status: 400 }
    );
  }

  // Vérifie que l'utilisateur existe
  const friend = await prisma.user.findUnique({
    where: { name: friendName },
  });

  if (!friend) {
    return NextResponse.json(
      { error: "User not found with the specified username." },
      { status: 404 }
    );
  }

  // Vérifie si l'utilisateur est déjà dans le nest
  const existingShare = await prisma.nestShare.findFirst({
    where: { nestId, userId: friend.id },
  });

  if (existingShare) {
    return NextResponse.json(
      { error: "This user already has access to the nest." },
      { status: 400 }
    );
  }

  // Ajoute l'utilisateur au nest
  await prisma.nestShare.create({
    data: {
      nestId,
      userId: friend.id,
      canEdit: false,
    },
  });

  // Récupère la nest complète pour retourner la liste mise à jour
  const nest = await prisma.nest.findUnique({
    where: { id: nestId },
    include: {
      owner: true,
      movies: { include: { movie: true } },
      sharedWith: { include: { user: true } },
    },
  });

  if (!nest) {
    return NextResponse.json({ error: "Nest not found" }, { status: 404 });
  }

  const movies = nest.movies.map((nm) => nm.movie);
  const friends = nest.sharedWith.map((nf) => nf.user);

  return NextResponse.json({ nest, movies, friends });
}
