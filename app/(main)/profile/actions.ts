"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { z } from "zod";

const updateNameFieldsSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
});

export type UpdateNameFieldsData = z.infer<typeof updateNameFieldsSchema>;

export async function updateUserNameFields(data: UpdateNameFieldsData) {
  
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Not authenticated");

  const parsed = updateNameFieldsSchema.parse(data);

  const { name, firstName, lastName } = parsed;

  if (name) {
    const existingUser = await prisma.user.findUnique({
      where: { name: name },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      throw new Error("Username already taken");
    }
  }

  console.log("Updating user:", { name, firstName, lastName });

  return prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName: firstName,
      lastName: lastName,
      updatedAt: new Date(),
    },
  });
}
