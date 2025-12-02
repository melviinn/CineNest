"use client";

import { createNewNest } from "@/app/data/nests/create-nest";
import { Button } from "@/components/ui/button";
import { createNestNameSchema, CreateNestNameType } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { memo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import NestCard from "./NestCard";

// -------------------
// Composant principal
// -------------------
export default function NestsView({
  initialNests,
  sharedNests,
  user,
}: {
  initialNests: any[];
  sharedNests: any[];
  user: any;
}) {
  const [nests, setNests] = useState(initialNests);
  const [shared] = useState(sharedNests);

  const handleNestCreated = (newNest: any) => {
    setNests((prev) => [...prev, newNest]);
  };

  return (
    <div className="flex flex-col items-start space-y-8">
      {/* Mes Nests */}
      <div className="flex w-full flex-col items-start space-y-4">
        <div className="flex w-full items-center justify-end">
          <CreateNestDialog
            user={user}
            shared={shared}
            onNestCreated={handleNestCreated}
          />
        </div>
        <h1 className="w-full text-2xl font-semibold tracking-tight">
          My Nests
        </h1>
        <Separator />
        <NestList nests={nests} user={user} />
      </div>

      {/* Shared Nests */}
      <div className="flex w-full flex-col items-start space-y-4">
        <h1 className="w-full text-2xl font-semibold tracking-tight">
          Shared Nests
        </h1>
        <Separator />
        <NestList nests={shared} user={user} shared />
      </div>
    </div>
  );
}

// ----------------------------
// Composant pour créer un Nest
// ----------------------------
function CreateNestDialog({
  user,
  shared,
  onNestCreated,
}: {
  user: any;
  shared: any[];
  onNestCreated: (newNest: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateNestNameType>({
    resolver: zodResolver(createNestNameSchema),
    defaultValues: { title: "" },
  });

  const handleCreate = (value: CreateNestNameType) => {
    if (!value.title.trim()) return;

    startTransition(async () => {
      try {
        const newNest = await createNewNest(value.title, user.id);

        onNestCreated({
          nestId: newNest.id,
          title: newNest.name,
          owner: user.name,
          moviesCount: 0,
          membersCount: 1,
          imageUrl: newNest.imageUrl || undefined,
          shared,
        });

        form.reset();
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4" /> Create a new Nest
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Nest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a name for your Nest"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create Nest"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ------------------------------------------
// Composant pour afficher une liste de Nests
// ------------------------------------------
const NestList = memo(
  ({ nests, user, shared }: { nests: any[]; user: any; shared?: boolean }) => {
    if (nests.length === 0) {
      return (
        <p>{shared ? "No shared nests yet." : "You have no nests yet."}</p>
      );
    }

    return (
      <Card className="mt-4 flex w-full flex-row flex-wrap gap-4 p-4">
        {nests.map((nest) => (
          <NestCard key={nest.nestId} nest={nest} user={user} shared={shared} />
        ))}
      </Card>
    );
  }
);
