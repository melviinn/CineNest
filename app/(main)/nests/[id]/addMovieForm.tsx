"use client";

import { addMovieToNestAction } from "@/app/data/nests/movies/add-movie";
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
import { addNestMovieSchema, AddNestMovieType } from "@/lib/zod/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddMovieFormProps = {
  nestId: number;
  onMovieAdded: (movie: any) => void;
};

export default function AddMovieForm({
  nestId,
  onMovieAdded,
}: AddMovieFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<AddNestMovieType>({
    resolver: zodResolver(addNestMovieSchema),
    defaultValues: { title: "" },
  });

  const handleSubmitMovie = (value: AddNestMovieType) => {
    if (!value.title) return;
    setLoading(true);

    startTransition(async () => {
      try {
        const result = await addMovieToNestAction(nestId, value.title);

        // On passe directement le dernier film ajouté
        const newMovie = {
          ...result.movie,
          status: "PENDING",
        };

        onMovieAdded(newMovie);

        toast.success("Movie added successfully!", { position: "top-center" });
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
        disabled={loading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 gap-2 shadow-lg"
      >
        {loading ? "Adding..." : "Add a Movie"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new movie to your Nest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitMovie)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter movie title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={pending} variant="outline">
                {pending ? "Adding..." : "Add Movie"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
