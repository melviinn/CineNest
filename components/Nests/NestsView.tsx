"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import NestCard from "./NestCard";

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
  const [shared, setShared] = useState(sharedNests);

  const createNewNest = async () => {
    const nestName = prompt("Enter a beautiful name for you Nest");
    if (!nestName) return;

    const res = await fetch("/api/nests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nestName, ownerId: user.id }),
    });
    if (!res.ok) return;

    const newNest = await res.json();
    setNests([
      ...nests,
      {
        nestId: newNest.id,
        title: newNest.name,
        owner: user.name,
        moviesCount: 0,
        membersCount: 1,
        imageUrl: newNest.image || undefined,
        shared,
      },
    ]);
  };

  return (
    <div className="flex flex-col items-start space-y-8">
      <div className="flex w-full flex-col items-start space-y-4">
        <div className="flex w-full items-center justify-end">
          <Button onClick={createNewNest}>
            <Plus className="h-4 w-4" />
            Create a new Nest
          </Button>
        </div>
        <h1 className="w-full text-2xl font-semibold tracking-tight">
          My Nests
        </h1>
        <Separator />
        <Card className="mt-4 flex w-full flex-row flex-wrap gap-4 p-4">
          {nests.length === 0 ? (
            <p>You have no nests yet. Create one to get started!</p>
          ) : (
            nests.map((nest) => (
              <NestCard key={nest.nestId} nest={nest} user={user} />
            ))
          )}
        </Card>
      </div>

      <div className="flex w-full flex-col items-start space-y-4">
        <h1 className="w-full text-2xl font-semibold tracking-tight">
          Shared Nests
        </h1>
        <Separator />

        <Card className="mt-4 flex w-full flex-wrap gap-4 p-4">
          {shared.length === 0 ? (
            <p>You don't have any shared Nests yet, try adding your friends</p>
          ) : (
            shared.map((nest) => (
              <NestCard key={nest.nestId} nest={nest} user={user} shared />
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
