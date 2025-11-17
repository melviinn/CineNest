import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (user) {
    if (!user.username) {
      redirect("/complete-profile");
    }
  }

  return <>{children}</>;
}
