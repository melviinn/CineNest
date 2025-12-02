import NestsViewWrapper from "@/components/Nests/NestsViewWrapper";
import { requireUser } from "@/lib/session";
import { getUserById } from "@/lib/user/user";
import { redirect } from "next/navigation";

export async function HomePage() {
  const user = await requireUser();

  if (user) {
    if (!user.name || user.name.trim() === "") {
      redirect("/complete-profile");
    }
  }

  const dbUser = await getUserById(user.id);

  return (
    <main className="flex w-full flex-col items-center p-12 px-2 md:p-20">
      <div className="font-manrope w-full text-sm lg:flex lg:flex-col">
        <NestsViewWrapper user={dbUser} />
      </div>
    </main>
  );
}
