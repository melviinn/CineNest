import { Separator } from "@/components/ui/separator";
import { getAuth, getServerAuth, requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import * as z from "zod";
import ProfileForm from "./profile-form";

const ProfilePage = async () => {
  const { user } = await getServerAuth();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col space-y-8 px-8 py-12">
      <div className="font-manrope flex w-full text-sm lg:flex lg:flex-col">
        <h1 className="relative text-xl font-medium tracking-tight">
          My Profile{" "}
          <Separator className="absolute top-1/2 left-28 max-w-400" />
        </h1>
      </div>
      <ProfileForm
        user={{
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
          firstName: user.firstName ?? null,
          lastName: user.lastName ?? null,
          image: user.image ?? null,
        }}
      />
    </main>
  );
};

export default ProfilePage;
