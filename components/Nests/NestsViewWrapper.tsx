import { prisma } from "@/lib/prisma";
import SinisterImage from "@/public/sinister.jpg";
import NestsView from "./NestsView";

export default async function NestsViewWrapper({ user }: { user: any }) {
  const { initialNests, sharedNests } = await getNests({ user });

  return (
    <NestsView
      initialNests={initialNests}
      sharedNests={sharedNests}
      user={user}
    />
  );
}

const getNests = async ({ user }: any) => {
  const sharedNestsRaw = await prisma.nestShare.findMany({
    where: { userId: user.id },
    include: { nest: true },
  });

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

  return { initialNests, sharedNests };
};
