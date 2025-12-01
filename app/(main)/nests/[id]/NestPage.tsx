"use client";

import useSWR from "swr";

import { MoviesList } from "@/components/Nests/MoviesList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import AddFriendButton from "./AddFriendButton";
import AddMovieButton from "./AddMovieButton";

type NestPageInfosProps = {
  nestId: number;
  initialNest: any;
  initialMovies: any[];
  initialFriends: any[];
  isOwner: boolean;
};

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function NestPageInfos({
  nestId,
  initialNest,
  initialMovies,
  initialFriends,
  isOwner,
}: NestPageInfosProps) {
  const { data, error, mutate } = useSWR(`/nests/${nestId}`, fetcher, {
    fallbackData: {
      nest: initialNest,
      movies: initialMovies,
      friends: initialFriends,
    },
    revalidateOnFocus: false,
  });

  const { nest, movies, friends } = data;

  return (
    <main className="container mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-muted-foreground hover:text-primary group mb-8 inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Nests
      </Link>

      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-semibold tracking-tight text-balance">
          {nest.title}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Owner:{" "}
          <span className="text-foreground font-medium">
            {isOwner ? "You" : nest.owner.name}
          </span>
        </p>
        {isOwner && (
          <div className="flex items-center gap-4">
            <AddMovieButton
              nestId={nestId}
              isOwner={isOwner}
              onAdded={(newData) => mutate(newData)}
            />
            <AddFriendButton
              nestId={nestId}
              isOwner={isOwner}
              onAdded={(newData) => mutate(newData)}
            />
          </div>
        )}
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Movies in this nest:
        </h2>
        <MoviesList
          movies={movies}
          nestId={nestId}
        />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Friends with access:
        </h2>
        <div className="flex flex-wrap gap-3">
          {friends.map((friend: any) => (
            <div
              key={friend.id}
              className="bg-card border-border text-card-foreground hover:border-primary/30 rounded-xl border px-4 py-2 text-sm font-medium transition-colors"
            >
              {friend.name}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
