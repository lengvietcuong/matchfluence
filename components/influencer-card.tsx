/* eslint-disable */
"use client";

import type { Influencer } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InfluencerCardProps = {
  influencer: Influencer;
};

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Card
        key={influencer.username}
        className="max-w-screen-md border-none bg-muted/50"
      >
        <CardHeader>
          <div className="mb-2 flex space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`https://www.instagram.com/${influencer.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar className="relative h-10 w-10">
                    <img
                      // eslint-disable-next-line @next/next/no-img-element
                      src={`data:image/png;base64,${influencer.avatar}`}
                      alt={`${influencer.username} profile picture`}
                      className="aspect-square flex-shrink-0"
                    />
                  </Avatar>
                </a>
              </TooltipTrigger>
              <TooltipContent>Coming Soon!</TooltipContent>
            </Tooltip>
            <div className="flex-1">
              <div className="flex flex-col justify-between md:flex-row md:items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={`https://www.instagram.com/${influencer.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-foreground/90"
                    >
                      <CardTitle className="text-lg md:text-2xl">
                        @{influencer.username}
                      </CardTitle>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Coming Soon!</TooltipContent>
                </Tooltip>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    {influencer.follower_count.toLocaleString()} Followers
                  </span>
                </div>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {influencer.name} | {influencer.title}
              </p>
            </div>
          </div>
          {influencer.rating_count >= 1 && (
            <div className="mb-2 text-sm">
              <span className="text-yellow-500">
                {influencer.average_rating}★
              </span>{" "}
              ({influencer.rating_count} reviews)
            </div>
          )}
          <CardDescription>{influencer.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={`data:image/png;base64,${influencer.feed.image}`}
            alt="Feed screenshot"
            className="mb-4 w-full rounded"
          />
          <ul className="list-inside list-disc">
            {influencer.packages.map((pkg: any, idx: number) => (
              <li key={idx}>
                {pkg.title} (${pkg.price})
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Contact</Button>
            </TooltipTrigger>
            <TooltipContent>Coming Soon!</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Make Offer</Button>
            </TooltipTrigger>
            <TooltipContent>Coming Soon!</TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
