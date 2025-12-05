"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addMovieToNestAction(nestId: number, title: string) {
  if (!title || !nestId) throw new Error("Missing fields");

  // Create Movie
  const movie = await prisma.movie.create({
    data: { title },
  });

  if (!movie) throw new Error("Failed to create movie");

  // Link movie to nest
  const nestMovie = await prisma.nestMovie.create({
    data: {
      nestId,
      movieId: movie.id,
    },
  });

  if (!nestMovie) throw new Error("Failed to link movie to nest");

  // // Fetch updated nest details
  // const nest = await prisma.nest.findUnique({
  //   where: { id: nestId },
  //   include: {
  // 	owner: true,
  // 	movies: {
  // 	  include: { movie: true },
  // 	  orderBy: { addedAt: "asc" },
  // 	},
  // 	sharedWith: { include: { user: true } },
  //   },
  // });

  // if (!nest) throw new Error("Nest not found");

  // const movies = nest.movies.map((nm) => nm.movie);

  // if (!movies) throw new Error("Failed to fetch movies");

  // const friends = nest.sharedWith.map((nf) => nf.user);

  // if (!friends) throw new Error("Failed to fetch friends");

  // Revalidate page
  revalidatePath(`/nests/${nestId}`);

  return {
    movie: {
      ...movie,
      nestMovieId: nestMovie.id,
      status: "PENDING",
      addedAt: nestMovie.addedAt,
    },
  };
}
