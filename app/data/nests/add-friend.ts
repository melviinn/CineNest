"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addFriendToNestAction(nestId: number, username: string) {
  if (!username || !nestId) throw new Error("Missing fields");

  // Vérifie que l'utilisateur existe
  const user = await prisma.user.findUnique({ where: { name: username } });
  if (!user) throw new Error("User not found");

  // Vérifie si l'utilisateur est déjà dans le nest
  const existingShare = await prisma.nestShare.findFirst({
    where: { nestId, userId: user.id },
  });
  if (existingShare) throw new Error("This user already has access to the nest");

  // Ajoute l'utilisateur au nest
  const nestShare = await prisma.nestShare.create({
    data: {
      nestId,
      userId: user.id,
      canEdit: false,
    },
  });

  // Revalide la page pour Next.js
  revalidatePath(`/nests/${nestId}`);

  // Récupère le nest à jour pour retourner les données à l'UI
  const nest = await prisma.nest.findUnique({
    where: { id: nestId },
    include: {
      owner: true,
      movies: { include: { movie: true } },
      sharedWith: { include: { user: true } },
    },
  });
  if (!nest) throw new Error("Nest not found");

  const movies = nest.movies.map((nm) => nm.movie);
  const friends = nest.sharedWith.map((nf) => nf.user);

  return { nest, movies, friends, addedFriend: user };
}
