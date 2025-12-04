"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  updateProfileFormSchema,
  UpdateProfileType,
} from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUserNameFields } from "./actions";

type User = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
};

const ProfileForm = ({ user }: User) => {
  const form = useForm({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      image: user.image || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UpdateProfileType) => {
    setLoading(true);

    // Username validation > check if username is already taken
    try {
      await updateUserNameFields({ name: data.name });
    } catch (err: any) {
      if (err.message === "Username already taken") {
        form.setError("name", { message: "This username is already taken" });
        toast.error("This username is already taken");
        setLoading(false);
        return;
      } else {
        toast.error("Failed to validate username");
        setLoading(false);
        return;
      }
    }

    // Username / image-avatar update in auth
    try {
      await authClient.updateUser({ name: data.name, image: data.image });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update your profile");
      setLoading(false);
      return;
    }

    // First name / last name update in database
    try {
      await updateUserNameFields({
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("Profile updated successfully", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update your profile", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardAction className="self-end">
              <LoadingButton
                loading={loading}
                type="submit"
                variant="outline"
                className="cursor-pointer"
              >
                Edit
                <PenLine />
              </LoadingButton>
            </CardAction>
          </CardHeader>
          <div className="-mt-2 px-6">
            <Separator />
          </div>
          <CardContent className="flex flex-col justify-around gap-6 md:flex-row">
            <div className="w-full max-w-2xl space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        className="placeholder:text-xs md:placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        className="placeholder:text-xs md:placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        className="placeholder:text-xs md:placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full max-w-2xl space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        className="placeholder:text-xs md:placeholder:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        id="avatar-image"
                        className="cursor-pointer placeholder:text-xs md:placeholder:text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

ProfileForm.displayName = "ProfileForm";
export default ProfileForm;
