import { getNestDetails } from "@/app/data/nests/get-nests";
import { requireUser } from "@/lib/session";
import NestPageInfos from "./NestPage";

export default async function NestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;

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
