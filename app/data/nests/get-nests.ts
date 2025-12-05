"use server";

import { prisma } from "@/lib/prisma";
import SinisterImage from "@/public/sinister.jpg"; // temporary placeholder image

export const getNests = async ({ user }: any) => {
  const sharedNestsRaw = await prisma.nestShare.findMany({
    where: { userId: user.id },
    include: { nest: true },
  });

  if (!sharedNestsRaw) throw new Error("Failed to fetch shared nests");

  const sharedNests = await Promise.all(
    sharedNestsRaw.map(async (share: any) => {
      const nest = share.nest;

      const membersCount = await prisma.nestShare.count({
        where: { nestId: nest.id },
      });
      const moviesCount = await prisma.nestMovie.count({
        where: { nestId: nest.id },
      });
      const owner = await prisma.user.findUnique({
        where: { id: nest.ownerId },
        select: { name: true },
      });

      return {
        nestId: nest.id,
        title: nest.name,
        owner: owner?.name || "Unknown",
        moviesCount,
        membersCount: membersCount + 1,
        imageUrl: nest.image || SinisterImage,
      };
    })
  );

  if (!sharedNests) throw new Error("Failed to process shared nests");

  const initialNests = await Promise.all(
    user.nests.map(async (nest: any) => {
      const membersCount = await prisma.nestShare.count({
        where: { nestId: nest.id },
      });
      const moviesCount = await prisma.nestMovie.count({
        where: { nestId: nest.id },
      });
      const owner = await prisma.user.findUnique({
        where: { id: nest.ownerId },
        select: { name: true },
      });

      return {
        nestId: nest.id,
        title: nest.name,
        owner: owner?.name || "Unknown",
        moviesCount,
        membersCount: membersCount + 1,
        imageUrl: nest.image || SinisterImage,
      };
    })
  );

  if (!initialNests) throw new Error("Failed to process initial nests");

  return { initialNests, sharedNests };
};

export const getNestDetails = async (nestId: number, userId: string) => {
  const nest = await prisma.nest.findUnique({
    where: { id: nestId },
    include: {
      owner: true,
      movies: {
        include: {
          movie: true,
          status: {
            where: { userId },
          },
        },
      },
      sharedWith: {
        include: { user: true },
      },
    },
  });

  if (!nest) throw new Error("Nest not found");

  const nestMovies =
    nest.movies.map((nm) => ({
      ...nm.movie,
      nestMovieId: nm.id,
      addedAt: nm.addedAt,
      status: nm.status[0] || { status: "UNWATCHED" }, // <-- ALWAYS VALID
      watchedCount: nm.status.filter(s => s.status === "WATCHED").length, // nombre de collaborateurs qui ont vu ce film
    })) || [];

    const nestMovies2 = nest.movies.map((nm) => {
      const watchedCount = nm.status.filter(s => s.status === "WATCHED").length;

      return {
        ...nm.movie,
        nestMovieId: nm.id,
        addedAt: nm.addedAt,
        userStatus: nm.status.find(s => s.userId === userId) || { status: "UNWATCHED" },
        watchedCount,
      };
    });

  if (!nestMovies) throw new Error("Failed to fetch nest movies");

  const nestFriends = nest?.sharedWith?.map((nf) => nf.user) || [];

  if (!nestFriends) throw new Error("Failed to fetch nest friends");

  return { nest, nestMovies, nestFriends };
};
