// "use client";

// import { useSession } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function Home() {
  // const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/sign-in");
  //   }
  // }, [session, router]);

  // if (!session) {
  //   return null; // ou un loader
  // }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to CineNest
        </h1>
      </div>
    </main>
  );
}
