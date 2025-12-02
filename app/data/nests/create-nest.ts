"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNewNest(name: string, ownerId: string) {
  if (!name || !ownerId) {
    throw new Error("Missing fields");
  }

  const nest = await prisma.nest.create({
    data: {
      name,
      ownerId,
    },
  });

  if (!nest) {
    throw new Error("Failed to create nest");
  }

  revalidatePath("/home");

  return nest;
}
