import { prisma } from "@/lib/prisma";

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      nests: true,
      sharedNests: {
        include: { nest: true },
      },
    },
  });
};
