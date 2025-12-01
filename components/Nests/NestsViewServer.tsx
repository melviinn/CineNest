import NestsView from "./NestsView";
import { prisma } from "@/lib/prisma";
import SinisterImage from "@/public/sinister.jpg";


export default async function NestsViewServer({ user }: { user: any }) {
	const initialNests = await Promise.all(
		user.nests.map(async (nest: any) => {
		  const membersCount = await prisma.nestShare.count({ where: { nestId: nest.id } });
		  const moviesCount = await prisma.nestMovie.count({ where: { nestId: nest.id } });
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

  return <NestsView initialNests={initialNests} user={user} />;
}
