import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/lib/session";
import { redirect } from "next/navigation";
import * as z from "zod";
import ProfileForm from "./profile-form";

const updateProfileFormSchema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
};

const ProfilePage = async () => {
  const { user } = await getAuth();

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
