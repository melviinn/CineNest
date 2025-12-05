"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ChangeMovieStatusParams = {
  nestId: number;
  nestMovieId: number;
  userId: string;
  newStatus: "WATCHED" | "WATCHING" | "UNWATCHED" | "ABANDONED";
};

export async function changeMovieStatusAction({
  nestId,
  nestMovieId,
  userId,
  newStatus,
}: ChangeMovieStatusParams) {
  if (!nestId || !nestMovieId || !userId || !newStatus) {
    throw new Error("Missing fields");
  }

  const updated = await prisma.nestMovieStatus.upsert({
    where: {
      nestMovieId_userId: {
        nestMovieId,
        userId,
      },
    },
    update: {
      status: newStatus,
    },
    create: {
      nestMovieId,
      userId,
      status: newStatus,
    },
  });

  revalidatePath(`/nests/${nestId}`);

  return updated;
}
