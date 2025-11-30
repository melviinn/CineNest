import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/lib/session";
import { redirect } from "next/navigation";
import NestPageInfos from "./NestPage";

export default async function NestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await getServerAuth();
  const { id } = await params;

  if (!user) {
    redirect("/sign-in");
  }

  const nestId = Number(id);

  if (isNaN(nestId)) {
    throw new Error("Invalid nest id");
  }

  const { nest, nestMovies, nestFriends } = await getNestDetails(nestId);
  const isOwner = nest?.ownerId === user.id;

  return (
    <NestPageInfos
      nestId={nestId}
      initialNest={nest}
      initialMovies={nestMovies}
      initialFriends={nestFriends}
      isOwner={isOwner}
    />
  );
}

const getNestDetails = async (nestId: number) => {
  const nest = await prisma.nest.findUnique({
    where: { id: nestId },
    include: {
      owner: true,
      movies: {
        include: { movie: true },
      },
      sharedWith: {
        include: { user: true },
      },
    },
  });

  const nestMovies = nest?.movies?.map((nm) => nm.movie) || [];

  const nestFriends = nest?.sharedWith?.map((nf) => nf.user) || [];

  return { nest, nestMovies, nestFriends };
};
