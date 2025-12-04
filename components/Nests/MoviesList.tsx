"use client";

import {
  CheckCircleIcon,
  Film,
  TicketCheck,
  TicketMinus,
  TicketSlash,
  TicketX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type MoviesListProps = {
  movies: any[];
  nestId: number;
};

const BadgeSuccess = () => {
  return (
    <Badge
      variant="outline"
      className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [a&]:hover:bg-green-600/10 [a&]:hover:text-green-600/90 dark:[a&]:hover:bg-green-400/10 dark:[a&]:hover:text-green-400/90"
    >
      <CheckCircleIcon className="size-3" />
      Successful
    </Badge>
  );
};

export function MoviesList({ movies, nestId }: MoviesListProps) {
  const [moviesData, setMoviesData] = useState(movies);

  useEffect(() => {
    setMoviesData(movies);
  }, [movies]);

  const changeStatus = async (movie: any, newStatus: string) => {
    try {
      const res = await fetch(
        `/api/nests/${nestId}/movies/${movie.nestMovieId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newStatus }),
        }
      );

      const updatedMovie = await res.json();
      setMoviesData((prev) =>
        prev.map((m) =>
          m.nestMovieId === updatedMovie.id
            ? { ...m, status: updatedMovie.status }
            : m
        )
      );
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
    }
  };

  const statusButtonClass = (status: string) => {
    switch (status) {
      case "WATCHED":
        return "bg-green-700 transition-colors hover:bg-green-700/70 min-w-28 [&_svg]:size-4";
      case "ABANDONED":
        return "bg-red-700 transition-colors hover:bg-red-700/70 min-w-28 [&_svg]:size-4";
      case "WATCHING":
        return "bg-yellow-700 transition-colors hover:bg-yellow-700/70 min-w-28 [&_svg]:size-4";
      case "UNWATCHED":
        return "bg-gray-600/70 transition-colors hover:bg-gray-600/50 min-w-28 [&_svg]:size-4";
      default:
        return "bg-gray-600/70 transition-colors hover:bg-gray-600/50 min-w-28 [&_svg]:size-4";
    }
  };

  function getStatusBadgeIcon(status: string) {
    switch (status) {
      case "WATCHED":
        return <TicketCheck size={40} className="h-20 w-20" />;
      case "ABANDONED":
        return <TicketX />;
      case "WATCHING":
        return <TicketMinus />;
      case "UNWATCHED":
        return <TicketSlash />;
      default:
        return <TicketSlash />;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {moviesData
        .sort((a, b) => a.id - b.id)
        .map((movie: any) => (
          <div
            key={movie.id}
            className="bg-card border-border hover:border-primary/30 hover:shadow-primary/5 group relative flex items-center gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg"
          >
            <div className="bg-muted group-hover:bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
              <Film className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <p className="text-card-foreground font-medium">{movie.title}</p>
            <div className="absolute top-1/2 right-10 -translate-y-1/2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Badge className={statusButtonClass(movie.status)}>
                    {getStatusBadgeIcon(movie.status)}
                    {movie.status.toUpperCase().charAt(0) +
                      movie.status.slice(1).toLowerCase()}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {["WATCHED", "WATCHING", "ABANDONED", "UNWATCHED"].map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        className="text-muted-foreground w-full cursor-pointer"
                        onClick={() => changeStatus(movie, status)}
                      >
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
    </div>
  );
}
