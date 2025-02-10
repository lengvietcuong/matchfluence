"use client";

import { useState, useEffect } from "react";
import type { FormData, Influencer } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Loader2, Check, User } from "lucide-react";
import { FormDataCard } from "@/components/form-data-card";
import { InfluencerCard } from "./influencer-card";
import {
  filterInfluencersSql,
  pickTopInfluencers,
  describeInfluencerFeed,
  getAvatar,
} from "@/app/actions";

type StatusRowProps = {
  done: boolean;
  pendingText: string;
  completeText: string;
};

function StatusRow(props: StatusRowProps) {
  const { done, pendingText, completeText } = props;

  return (
    <div className="ml-12 flex items-center justify-start space-x-2">
      {done ? (
        <Check className="h-4 w-4 text-emerald-500" />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      )}
      <p className="text-muted-foreground">
        {done ? completeText : pendingText}
      </p>
    </div>
  );
}

type ChatInterfaceProps = {
  formData: FormData;
};

export default function ChatInterface({ formData }: ChatInterfaceProps) {
  const [isSqlFilterDone, setIsSqlFilterDone] = useState(false);
  const [isDescFilterDone, setIsDecsFilterDone] = useState(false);
  const [isFeedAnalyzed, setIsFeedAnalyzed] = useState(false);
  const [isFeedFilterDone, setIsFeedFilterDone] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [finalInfluencers, setFinalInfluencers] = useState<Influencer[]>([]);

  useEffect(() => {
    async function runSearch() {
      // Step 1: Filter influencers based on category, follower count, and price.
      const filteredInfluencers = await filterInfluencersSql(formData);
      setIsSqlFilterDone(true);

      // Step 2: Select top 10 influencers based on descriptions and reviews.
      const top10Usernames = await pickTopInfluencers(
        formData,
        filteredInfluencers,
        10,
      );
      setIsDecsFilterDone(true);
      const top10Influencers = filteredInfluencers.filter((influencer) =>
        top10Usernames.includes(influencer.username),
      );

      // Step 3: Analyze posts concurrently for each influencer.
      const influencersWithPosts = await Promise.all(
        top10Influencers.map(async (influencer) => {
          const feed = await describeInfluencerFeed(influencer.username);
          return { ...influencer, feed };
        }),
      );
      setIsFeedAnalyzed(true);

      // Step 4: Final selection of top 3 influencers based on posts.
      const top3Usernames = await pickTopInfluencers(
        formData,
        // Remove the feed image
        influencersWithPosts.map(({ feed, ...influencer }) => {
          return { ...influencer, feedDescription: feed.description };
        }),
        3,
      );
      setIsFeedFilterDone(true);
      const finalists = influencersWithPosts.filter((influencer) =>
        top3Usernames.includes(influencer.username),
      );

      // Step 5: Attach avatar images to each finalist.
      const finalistsWithAvatars = await Promise.all(
        finalists.map(async (influencer) => {
          const avatarImage = await getAvatar(influencer.username);
          return { ...influencer, avatar: avatarImage };
        }),
      );
      setFinalInfluencers(finalistsWithAvatars);
      setIsProfileCreated(true);
    }

    runSearch();
  }, [formData]);

  // Scroll to the bottom of the page at each step completion
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [
    isSqlFilterDone,
    isDescFilterDone,
    isFeedAnalyzed,
    isFeedFilterDone,
    isProfileCreated,
  ]);

  return (
    <div className="mx-auto max-w-2xl space-y-4 pt-8">
      {/* Show the details submitted by the user */}
      <div className="flex items-start justify-end space-x-2">
        <FormDataCard formData={formData} />
        <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
          <User />
        </Avatar>
      </div>

      {/* Initial bot greeting */}
      <div className="flex items-start justify-start space-x-2">
        <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
          <Bot />
        </Avatar>
        <Card className="max-w-md border-0 bg-muted/50 shadow-none">
          <CardContent className="px-6 py-4">
            <p>
              Let me find you the perfect influencers based on the details you
              provided. Hang on tight!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Step status rows */}
      <StatusRow
        done={isSqlFilterDone}
        pendingText="Filtering influencers based on category, follower count, and price..."
        completeText="Filtered influencers based on category, follower count, and price."
      />

      {isSqlFilterDone && (
        <StatusRow
          done={isDescFilterDone}
          pendingText="Filtering based on description and reviews..."
          completeText="Filtered based on description and reviews."
        />
      )}

      {isDescFilterDone && (
        <StatusRow
          done={isFeedAnalyzed}
          pendingText="Analyzing posts (may take a bit longer)..."
          completeText="Analyzed posts."
        />
      )}

      {isFeedAnalyzed && (
        <StatusRow
          done={isFeedFilterDone}
          pendingText="Filtering based on posts..."
          completeText="Filtered based on posts."
        />
      )}

      {isFeedFilterDone && (
        <StatusRow
          done={isProfileCreated}
          pendingText="Creating profiles..."
          completeText="Created profiles."
        />
      )}

      {/* Bot message after profiles have been created */}
      {isProfileCreated && (
        <div className="flex items-start justify-start space-x-2">
          <Avatar className="flex h-10 w-10 items-center justify-center rounded-full border border-muted">
            <Bot />
          </Avatar>
          <Card className="max-w-md border-0 bg-muted/50 shadow-none">
            <CardContent className="px-6 py-4">
              <p>Here are the top 3 influencers for you:</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Final influencer cards */}
      {isProfileCreated && finalInfluencers.length > 0 && (
        <div className="mt-8 space-y-4">
          {finalInfluencers.map((influencer) => (
            <InfluencerCard key={influencer.username} influencer={influencer} />
          ))}
        </div>
      )}
    </div>
  );
}
