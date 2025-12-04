"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteNest = async (nestId: number) => {

  // No need to manually delete related records due to cascade delete on relations
  await prisma.nest.delete({
	where: { id: nestId },
  });

  revalidatePath("/home");
};
