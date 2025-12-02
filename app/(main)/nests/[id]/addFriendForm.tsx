"use client";

import { addFriendToNestAction } from "@/app/data/nests/add-friend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  addFriendToNestSchema,
  AddFriendToNestType,
} from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddFriendFormProps = {
  nestId: number;
  onFriendAdded: (friend: any) => void;
};

export default function AddFriendForm({
  nestId,
  onFriendAdded,
}: AddFriendFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<AddFriendToNestType>({
    resolver: zodResolver(addFriendToNestSchema),
    defaultValues: { username: "" },
  });

  const handleSubmitFriend = (value: AddFriendToNestType) => {
    if (!value.username) return;
    setLoading(true);

    startTransition(async () => {
      try {
        const result = await addFriendToNestAction(nestId, value.username);

        // On passe directement le dernier friend ajouté
        const newFriend = {
          ...result.addedFriend,
          name: result.addedFriend.name,
        };

        onFriendAdded(newFriend);

        toast.success("Friend added successfully to the Nest!");
        form.reset();
        setOpen(false);
        setLoading(false);
      } catch (err: any) {
        toast.error(err.message);
        setLoading(false);
      }
    });
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add a Friend"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new friend to your Nest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitFriend)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your friend username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={pending} variant="outline">
                {pending ? "Adding..." : "Add Friend"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
