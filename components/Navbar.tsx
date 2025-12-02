import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, Menu, Rows2, UsersRound } from "lucide-react";
import { UserDropdown, UserDropdownSheetMobile } from "./UserDropdown";
import { Button } from "./ui/button";

import CineNestLogo from "@/public/cinenest-logo.svg";

type NavbarProps = { user: any };

const Navbar = ({ user }: NavbarProps) => {
  const navLinks = [
    {
      label: "Home",
      href: "/home",
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
    <header className="flex w-full items-center justify-between px-8 py-4 shadow-sm">
      <div className="pointer-events-none flex items-center space-x-1">
        <Image
          src={CineNestLogo}
          alt="CineNest logo"
          width={32}
          height={32}
        ></Image>
        <h1 className="text-2xl font-bold md:text-3xl">CineNest</h1>
      </div>
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
        <UserDropdown user={user} />
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
          <SheetTitle className="hidden">Mobile Menu</SheetTitle>
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
            <UserDropdownSheetMobile user={user} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
