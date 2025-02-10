"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Megaphone, Github } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <TooltipProvider delayDuration={0}>
      <header className="z-20 w-full py-4">
        <div className="container mx-auto flex max-w-screen-xl items-center justify-between px-4">
          <div className="flex items-center space-x-12">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-white"
                >
                  <Megaphone className="h-8 w-8" />
                  <span className="font-lobster text-2xl font-bold">
                    Matchfluence
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon!</p>
              </TooltipContent>
            </Tooltip>
            <nav className="hidden space-x-12 md:flex md:items-center">
              {["Enterprise", "Pricing", "Blog"].map((item) => (
                <Tooltip key={item}>
                  <TooltipTrigger asChild>
                    <Link
                      href="/"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming Soon!</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </div>
          <div className="hidden space-x-3 md:flex md:items-center">
            <Button variant="ghost" className="text-muted-foreground">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            {["Log In", "Sign Up"].map((item) => (
              <Tooltip key={item}>
                <TooltipTrigger asChild>
                  <Button variant={item === "Log In" ? "secondary" : "default"}>
                    {item}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon!</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
