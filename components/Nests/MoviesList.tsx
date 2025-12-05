"use client";

import {
  changeMovieStatusAction,
  ChangeMovieStatusParams,
} from "@/app/data/nests/movies/change-movie-status";
import {
  Film,
  TicketCheck,
  TicketMinus,
  TicketSlash,
  TicketX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
  user: any;
};

export function MoviesList({ movies, nestId, user }: MoviesListProps) {
  const [moviesData, setMoviesData] = useState(movies);

  const getToastMessage = (status: string, title: string) => {
    switch (status) {
      case "WATCHED":
        return `You watched ${title}`;
      case "WATCHING":
        return `You are watching ${title}`;
      case "ABANDONED":
        return `You abandoned ${title}`;
      case "UNWATCHED":
        return `You marked ${title} as unwatched`;
      default:
        return `Status updated for ${title}`;
    }
  };

  const changeStatus = async (movie: any, newStatus: string) => {
    try {
      const data = await changeMovieStatusAction({
        nestId,
        nestMovieId: movie.nestMovieId,
        userId: user.id,
        newStatus: newStatus as ChangeMovieStatusParams["newStatus"],
      });
    } catch (error) {
      toast.error("Error changing movie status", { position: "top-center" });
    } finally {
      const currentStatus = movie.status?.status || "UNWATCHED";

      // Si le status est identique, ne rien faire
      if (currentStatus === newStatus) return;

      setMoviesData((prevMovies) =>
        prevMovies.map((m) =>
          m.id === movie.id
            ? {
                ...m,
                status: { ...m.status, status: newStatus },
              }
            : m
        )
      );
      toast.info(getToastMessage(newStatus, movie.title), {
        position: "top-center",
      });
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
        return <TicketCheck />;
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

  const getStatus = (movie: any) => {
    console.log("User status in MoviesList:", movie.userStatus?.status);
    return movie.status?.status || "UNWATCHED";
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {moviesData
        .sort((a, b) => a.id - b.id)
        .map((movie: any) => {
          const status = getStatus(movie);
          return (
            <div
              key={movie.id}
              className="bg-card border-border hover:border-primary/30 hover:shadow-primary/5 flex w-full items-center justify-between gap-3 rounded-lg p-3 transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-muted group-hover:bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
                <Film className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
              </div>

              <p className="text-card-foreground flex-1 truncate font-medium">
                {movie.title}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Badge className={statusButtonClass(status)}>
                    {getStatusBadgeIcon(status)}
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </Badge>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {["WATCHED", "WATCHING", "ABANDONED", "UNWATCHED"].map(
                    (s) => (
                      <DropdownMenuItem
                        key={s}
                        className="text-muted-foreground w-full cursor-pointer"
                        onClick={() => changeStatus(movie, s)}
                      >
                        {getStatusBadgeIcon(s)}
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
    </div>
  );
}
