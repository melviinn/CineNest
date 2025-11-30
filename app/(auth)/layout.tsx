import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  // const session = await getServerSession();
  // const user = session?.user;

  if (user) {
    if (!user.name) {
      redirect("/complete-profile");
    }
  }

  return <>{children}</>;
}
