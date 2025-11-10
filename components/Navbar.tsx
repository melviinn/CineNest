import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
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

  return (
    <header className="flex w-full items-center justify-between px-8 py-4">
      <h1 className="text-2xl font-bold">CineNest</h1>
      <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel className="text-muted-foreground flex flex-col text-xs">
              <span>Name</span>
              <span>@username</span>
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
            <DropdownMenuItem variant="destructive">
              <LogOut color="#e7000b" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
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
                  <span>Name</span>
                  <span>@username</span>
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
                  <Settings className="mr-2 inline" size={22} color="#464646" />
                  Settings
                </Link>
                <div className="hover:bg-destructive/10 flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors">
                  <LogOut className="mr-2 inline" color="#e7000b" size={22} />
                  <button className="text-destructive text-sm transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
