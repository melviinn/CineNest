import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export async function HomePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    if (!user.username || user.username.trim() === "") {
      redirect("/complete-profile");
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex lg:flex-col">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to CineNest
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your collaborative movies watchlist/boards with friends.
        </p>
      </div>
    </main>
  );
}
