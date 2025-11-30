"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NestsView = ({ user }: { user: any }) => {
  const [nests, setNests] = useState(user.nests || []);
  const [open, setOpen] = useState(false);
  const [nestName, setNestName] = useState("");

  const createNewNest = async () => {
    if (!nestName) return;

    const res = await fetch("api/nests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nestName, ownerId: user?.id }),
    });

    if (res.ok) {
      const newNest = await res.json();
      setNests([...nests, newNest]);
      setNestName("");
      setOpen(false);
    } else {
      console.error("Failed to create nest");
    }
  };

  return (
    <div className="container flex w-full flex-col space-y-8 px-6">
      <div className="font-manrope flex w-full text-sm lg:flex lg:flex-col">
        <h1 className="relative w-full text-2xl font-medium tracking-tight">
          My Nests{" "}
          <Separator className="absolute top-1/2 left-28 hidden w-full max-w-84 md:block md:max-w-344" />
        </h1>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex w-full justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Create New Nest
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new Nest</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Label className="text-sm" htmlFor="nest-name">
                  Nest name
                </Label>
                <Input
                  placeholder="My Favorite Movies..."
                  id="nest-name"
                  value={nestName}
                  onChange={(e) => setNestName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={createNewNest}
                  disabled={!nestName}
                >
                  Create Nest
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-6 flex w-full flex-wrap gap-4">
          {user?.nests?.length > 0 ? (
            user.nests.map((nest: any) => (
              <Card key={nest.id} className="w-full max-w-xs">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-medium">
                    {nest.name}
                  </CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    onClick={() => (window.location.href = `/nests/${nest.id}`)}
                    asChild
                  >
                    <Link href={`/nests/${nest.id}`}>View Nest</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">You have no nests yet.</p>
          )}
          {user?.sharedNests?.length > 0 ? (
            user.sharedNests.map((share: any) => (
              <Card
                key={share.nest.id}
                className="w-full max-w-xs border-blue-500"
              >
                <CardHeader>
                  <CardTitle className="text-center text-xl font-medium">
                    {share.nest.name}
                  </CardTitle>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter>
                  <Button variant="link" asChild>
                    <Link href={`/nests/${share.nest.id}`}>
                      View Shared Nest
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">You have no nests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NestsView;
