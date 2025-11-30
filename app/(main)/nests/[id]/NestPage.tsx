"use client";

import useSWR from "swr";

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
  const { data, error, mutate } = useSWR(`/api/nests/${nestId}`, fetcher, {
    fallbackData: {
      nest: initialNest,
      movies: initialMovies,
      friends: initialFriends,
    },
    revalidateOnFocus: false,
  });

  const { nest, movies, friends } = data;

  return (
    <div>
      <h1>{nest.name}</h1>
      {nest.owner && <p>Owner: {nest.owner.name}</p>}

      <p>Movies in this nest:</p>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>

      <p>Friends with access:</p>
      <ul>
        {friends.map((friend: any) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>

      {isOwner && (
        <div className="mt-4 flex space-x-4">
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
  );
}
