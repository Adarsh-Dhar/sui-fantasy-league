"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Home, History, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Live Matches", href: "/matches", icon: Trophy },
    { name: "My Teams", href: "/teams", icon: User },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "History", href: "/history", icon: History },
  ];

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-background/60 border-b border-border/40">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-blue-600">
              <Trophy className="h-5 w-5 absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              SUI Fantasy League
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors flex items-center gap-1 hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background/95 backdrop-blur-sm border-b border-border/40 z-40">
          <nav className="container flex flex-col space-y-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm px-4 py-2 rounded-md",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;