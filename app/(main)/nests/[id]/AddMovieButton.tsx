"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function AddMovieButton({
  nestId,
  isOwner,
  onAdded, // callback après ajout
}: {
  nestId: number;
  isOwner: boolean;
  onAdded: (newData?: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleAddMovie = async () => {
    if (!isOwner) {
      toast.error("Only the owner can add movies.");
      return;
    }
    const title = prompt("Enter movie title");
    if (!title) return;

    setLoading(true);
    const res = await fetch(`/api/nests/${nestId}/add-movie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data?.error || "Failed to add movie");
      setLoading(false);
      return;
    }

    const newData = await res.json();

    toast.success(`Movie added!`);
    setLoading(false);
    onAdded(newData); // refetch les données pour actualiser la liste
  };

  return (
    <Button onClick={handleAddMovie} disabled={loading} variant="outline" >
      {loading ? "Adding..." : "Add a Movie"}
    </Button>
  );
}
