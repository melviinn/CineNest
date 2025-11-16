"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  LogIn,
  LogOut,
  Menu,
  Rows2,
  Settings,
  UserRound,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
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

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { signOut } from "@/lib/auth-client";

export default function Navbar() {
  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="mr-2 inline" size={20} color="#464646" />,
    },
    {
      label: "Nests",
      href: "/nests",
      icon: <Rows2 className="mr-2 inline" size={20} color="#464646" />,
    },
    {
      label: "Friends",
      href: "/friends",
      icon: <UsersRound className="mr-2 inline" size={20} color="#464646" />,
    },
  ];

  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  const user = session?.user;

  return (
    <header className="flex w-full items-center justify-between px-8 py-4">
      <h1 className="text-2xl font-bold md:text-3xl">CineNest</h1>
      {user ? (
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel className="text-muted-foreground flex flex-col text-xs">
                <span>{user.name}</span>
                <span>@{user.username}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="text-muted-foreground w-full cursor-pointer"
              >
                <Link href="/profile">
                  <UserRound color="#464646" className="h-10 w-10" />
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
              <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
                <LogOut color="#e7000b" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      ) : (
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                asChild
                className="text-muted-foreground w-full cursor-pointer"
              >
                <Link href="/sign-in">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="text-muted-foreground w-full cursor-pointer"
              >
                <Link href="/sign-up">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      )}
      {/* </nav> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label="Menu"
            className="cursor-pointer md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="text-muted-foreground w-64"
          title="mobile-navbar-menu"
          aria-describedby="mobile navbar menu"
        >
          <SheetTitle className="hidden">Mobile Menu</SheetTitle>

          {user ? (
            <div className="flex flex-col gap-4 px-2 pt-10">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-border border-t pt-4">
                <div className="mb-4 ml-2 flex w-full items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@user"
                    />
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
                    <UserRound
                      className="mr-2 inline"
                      size={22}
                      color="#464646"
                    />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <Settings
                      className="mr-2 inline"
                      size={22}
                      color="#464646"
                    />
                    Settings
                  </Link>
                  <div className="hover:bg-destructive/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors">
                    <LogOut className="mr-2 inline" color="#e7000b" size={22} />
                    <button
                      className="text-destructive text-sm transition-colors"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-border border-t pt-4">
              <div className="mb-4 ml-2 flex w-full items-center gap-3">
                <span>Guest</span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/sign-in"
                  className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <LogIn className="mr-2 inline" size={22} color="#464646" />
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="hover:bg-primary/10 flex items-center rounded-lg px-3 py-2 text-sm transition-colors"
                >
                  <LogIn className="mr-2 inline" size={22} color="#464646" />
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </header>
  );
}
