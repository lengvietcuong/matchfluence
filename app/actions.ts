"use server";

import { createClient } from "@supabase/supabase-js";
import type { FormData, Influencer, InfluencerPackage } from "@/types";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
// Alternate between 2 Groq clients to avoid rate limits
const groq1 = createGroq({ apiKey: process.env.GROQ_API_KEY_1! });
const groq2 = createGroq({ apiKey: process.env.GROQ_API_KEY_2! });

/**
 * Download a file from Supabase storage and convert it to a Base64 string.
 */
async function fetchImageAsBase64(
  bucketName: string,
  fileName: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(fileName);

  if (error) {
    throw new Error(
      `Failed to download image ${fileName} from bucket ${bucketName}: ${error.message}`
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}

/**
 * Fetch packages for an influencer within the campaign budget.
 * Returns a formatted list of packages if they exist and meet the budget criteria,
 * or null if no valid packages are found.
 */
async function getInfluencerPackages(
  username: string,
  budget: number
): Promise<InfluencerPackage[] | null> {
  const { data: packages, error: packageError } = await supabase
    .from("packages")
    .select("package_title, package_price")
    .eq("username", username)
    .order("package_price", { ascending: true });

  if (packageError) {
    throw new Error(
      `Error fetching packages for influencer ${username}: ${packageError.message}`
    );
  }
  if (!packages || packages.length === 0) {
    return null;
  }
  const cheapestPackage = packages[0];
  if (cheapestPackage.package_price > budget) {
    return null;
  }

  const formattedPackages = packages.map((pkg) => ({
    title: pkg.package_title,
    price: pkg.package_price,
  }));
  return formattedPackages;
}

/**
 * Fetch and filter influencers based on the provided form data.
 * Only influencers with at least one valid package (meeting the budget criteria) are returned.
 */
export async function filterInfluencersSql(
  formData: FormData
): Promise<Omit<Influencer, "avatar">[]> {
  const { data: influencers, error } = await supabase
    .from("influencers")
    .select(
      "username, name, category, follower_count, title, description, rating_count, average_rating"
    )
    .eq("category", formData.category)
    .gte("follower_count", formData.followerRange[0])
    .lte("follower_count", formData.followerRange[1])
    .order("follower_count", { ascending: false });

  if (error) {
    throw new Error("Error fetching influencers: " + error.message);
  }

  const influencersWithPackages = await Promise.all(
    influencers.map(
      async (influencer: Omit<Influencer, "packages" | "feed" | "avatar">) => {
        const packages = await getInfluencerPackages(
          influencer.username,
          formData.budget
        );
        if (!packages) {
          return null;
        }
        return { ...influencer, packages };
      }
    )
  );
  // Remove influencers without valid packages
  return influencersWithPackages.filter(Boolean) as Influencer[];
}

/**
 * Use an AI model to pick the top influencer usernames from a candidate list.
 * Chooses between two models based on whether the requested count is even or odd.
 */
export async function pickTopInfluencers(
  formData: FormData,
  influencers: Omit<Influencer, "feed" | "avatar">[],
  count: number
): Promise<string[]> {
  const model =
    count % 2 === 0
      ? groq1("deepseek-r1-distill-llama-70b")
      : groq2("deepseek-r1-distill-llama-70b");

  const prompt = `Help me find suitable social media influencers for my company's marketing campaign. Here are the details:
- Company name: ${formData.companyName}
- Category: ${formData.category}
- Company description: ${formData.companyDescription}
- Campaign description: ${formData.campaignDescription}
- Ideal influencer description: ${formData.idealInfluencer}

Here is a list of potential candidates (assume adequate budget):
${JSON.stringify(influencers.slice(0, 30))}

Please respond with the usernames of the top ${count} influencers in an array format with no additional text.`;

  const { text } = await generateText({
    model,
    prompt,
  });
  const arrayStartIndex = text.indexOf("[");
  const arrayEndIndex = text.indexOf("]") + 1;
  const usernamesString = text.substring(arrayStartIndex, arrayEndIndex);

  return JSON.parse(usernamesString);
}

/**
 * Retrieve an influencer's feed image, generate a description via AI,
 * and return both the description and the Base64 image.
 */
export async function describeInfluencerFeed(
  username: string
): Promise<{ description: string; image: string }> {
  const base64Image = await fetchImageAsBase64(
    "influencers",
    `${username}.png`
  );

  const { text } = await generateText({
    model: groq1("llama-3.2-11b-vision-preview"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "The attached image is a screenshot of a social media influencer's feed. Describe the characteristics of their posts in one paragraph.",
          },
          { type: "image", image: base64Image },
        ],
      },
    ],
    maxTokens: 500,
  });

  return { description: text, image: base64Image };
}

/**
 * Fetch and return the Base64 string of an influencer's avatar.
 */
export async function getAvatar(username: string): Promise<string> {
  return await fetchImageAsBase64("influencers", `${username}_avatar.png`);
}
