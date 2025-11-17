import Navbar from "@/components/Navbar";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  

  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
