import NestsView from "@/components/Nests/NestsView";
import NestsViewServer from "@/components/Nests/NestsViewServer";
import { prisma } from "@/lib/prisma";
import { getServerAuth } from "@/lib/session";
import { redirect } from "next/navigation";

export async function HomePage() {
  const { user } = await getServerAuth();

  if (!user) {
    redirect("/sign-in");
  }

  if (user) {
    if (!user.name || user.name.trim() === "") {
      redirect("/complete-profile");
    }
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      nests: true,
      sharedNests: {
        include: { nest: true },
      },
    },
  });

  return (
    <main className="flex w-full flex-col items-center p-12 px-2 md:p-20">
      <div className="font-manrope w-full text-sm lg:flex lg:flex-col">
        <NestsViewServer user={dbUser} />
      </div>
    </main>
  );
}
