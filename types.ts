import { z } from "zod";

export const formSchema = z.object({
  // Step 1: Company Details
  companyName: z.string().min(1, "Company name is required"),
  category: z.enum(
    [
      "Beauty",
      "Fashion",
      "Travel",
      "Food & Drink",
      "Health & Fitness",
      "Comedy & Entertainment",
      "Animals & Pets",
      "Education",
      "Entrepreneur & Business",
      "Technology",
    ],
    {
      required_error: "Please select a category",
    }
  ),
  companyDescription: z.string().min(1, "Company description is required"),

  // Step 2: Campaign Details
  campaignDescription: z.string().min(1, "Campaign description is required"),
  budget: z.number().min(50, "Budget must be at least $50"),
  attachments: z
    .union([z.instanceof(File), z.array(z.instanceof(File))])
    .optional()
    .refine(
      (files) => {
        // Allow undefined or an empty array.
        if (!files) return true;
        const fileArray = Array.isArray(files) ? files : [files];
        return fileArray.every(
          (file) => file && file.type.startsWith("image/")
        );
      },
      "Only images allowed"
    ),

  // Step 3: Influencer Details
  followerRange: z
    .tuple([
      z.number().min(5000).max(1000000),
      z.number().min(5000).max(1000000),
    ])
    .refine(([min, max]) => min <= max, {
      message:
        "Minimum followers must be less than or equal to maximum followers",
    }),
  platform: z.enum(["Instagram", "TikTok", "YouTube"], {
    required_error: "Please select a platform",
  }),
  idealInfluencer: z
    .string()
    .min(1, "Ideal influencer description is required"),
});

export type FormData = z.infer<typeof formSchema>;

export type InfluencerPackage = {
  title: string;
  price: number;
};

export type Influencer = {
  username: string;
  follower_count: number;
  name: string;
  title: string;
  rating_count: number;
  average_rating: number;
  description: string;
  packages: InfluencerPackage[];
  feed: {
    image: string;
    description: string;
  };
  avatar: string;
};
