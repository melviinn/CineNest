"use client";

// Necessary modules
import { authClient } from "@/lib/auth-client";
import { LogOut, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// UI components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

async function handleSignOut() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/sign-in");
      },
    },
  });
}

const UserDropdown = ({ user }: { user: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.image || "https://github.com/shadcn.png"}
            alt="@user"
          />
          <AvatarFallback>
            <UserRound size={17} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground flex flex-col text-xs">
          <span>{user.name}</span>
          <span className="">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="text-muted-foreground w-full cursor-pointer"
        >
          <Link href="/profile">
            <UserRound color="#464646" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-muted-foreground w-full cursor-pointer"
        >
          <Link href="/settings">
            <Settings color="#464646" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="dark:hover:bg-destructive/20 text-destructive dark:hover:text-destructive h-8 w-full cursor-pointer justify-start rounded-sm p-0 font-normal"
            >
              <LogOut />
              Log out
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to sign out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will sign you out of your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive/90 hover:bg-destructive/70 cursor-pointer"
                onClick={handleSignOut}
              >
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserDropdownSheetMobile = ({ user }: { user: any }) => {
  return (
    <div className="border-border border-t pt-4">
      <div className="mb-4 ml-2 flex w-full items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs">
          {<span>{user.name}</span>}
          <span>@{user.username}</span>
        </div>
      </div>
      <div className="space-y-2">
        <Link
          href="/profile"
          className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <UserRound className="mr-2 inline" size={22} color="#464646" />
          Profile
        </Link>
        <Link
          href="/settings"
          className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Settings className="mr-2 inline" size={22} color="#464646" />
          Settings
        </Link>
        <div className="hover:bg-destructive/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors">
          <LogOut className="mr-2 inline" color="#e7000b" size={22} />
          <button
            className="text-destructive text-sm transition-colors"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { UserDropdown, UserDropdownSheetMobile };
