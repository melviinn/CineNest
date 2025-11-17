import { AccountsButton } from "@/components/AccountsButton";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export async function HomePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    redirect("/home");
  } else {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="font-manrope flex w-full max-w-5xl flex-col items-center justify-between space-y-4 text-sm">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to CineNest
        </h1>
        <p className="text-lg leading-8 text-gray-600">
          Your collaborative movies watchlist/boards with friends.
        </p>
        <AccountsButton />
      </div>
    </main>
  );
}
