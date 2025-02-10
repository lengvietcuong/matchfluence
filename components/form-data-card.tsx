import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Palette,
  ShoppingBag,
  Plane,
  UtensilsCrossed,
  Dumbbell,
  Laugh,
  PawPrint,
  GraduationCap,
  Briefcase,
  Cpu,
  Wallet,
  Users,
  Hash,
  Instagram,
  Youtube,
} from "lucide-react";
import { Lobster } from "next/font/google";
import type { FormData } from "@/types";

const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lobster",
});

const categoryIcons: { [key: string]: React.ReactNode } = {
  Beauty: <Palette className="h-4 w-4" />,
  Fashion: <ShoppingBag className="h-4 w-4" />,
  Travel: <Plane className="h-4 w-4" />,
  "Food & Drink": <UtensilsCrossed className="h-4 w-4" />,
  "Health & Fitness": <Dumbbell className="h-4 w-4" />,
  "Comedy & Entertainment": <Laugh className="h-4 w-4" />,
  "Animals & Pets": <PawPrint className="h-4 w-4" />,
  Education: <GraduationCap className="h-4 w-4" />,
  "Entrepreneur & Business": <Briefcase className="h-4 w-4" />,
  Technology: <Cpu className="h-4 w-4" />,
};

type FormDataCardProps = {
  formData: FormData;
};

export function FormDataCard({ formData }: FormDataCardProps) {
  function formatNumber(num: number) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  }

  return (
    <Card className="max-w-md border-0 bg-muted/50 shadow-none">
      <CardContent className="space-y-4 px-6 py-4">
        {/* Company Section */}
        <div className="space-y-1.5">
          <h3 className={`text-xl font-bold ${lobster.className}`}>Company</h3>
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <p>{formData.companyName}</p>
          </div>
          <div className="flex items-center space-x-2">
            {categoryIcons[formData.category]}
            <span>{formData.category}</span>
          </div>
          <p className="mt-1 text-muted-foreground">
            {formData.companyDescription}
          </p>
        </div>
        <hr className="border-t border-muted" />
        {/* Campaign Section */}
        <div className="space-y-1.5">
          <h3 className={`text-xl font-bold ${lobster.className}`}>Campaign</h3>
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4" />
            <p>${formData.budget} Budget</p>
          </div>
          <p className="mt-1 text-muted-foreground">
            {formData.campaignDescription}
          </p>
        </div>
        <hr className="border-t border-muted" />
        {/* Influencer Section */}
        <div className="space-y-1.5">
          <h3 className={`text-xl font-bold ${lobster.className}`}>
            Influencer
          </h3>
          <div className="flex items-center space-x-2">
            {formData.platform === "Instagram" ? (
              <Instagram className="h-4 w-4" />
            ) : formData.platform === "YouTube" ? (
              <Youtube className="h-4 w-4" />
            ) : (
              <Hash className="h-4 w-4" />
            )}
            <p>{formData.platform}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <p>
              {formatNumber(formData.followerRange[0])} -{" "}
              {formatNumber(formData.followerRange[1])} Followers
            </p>
          </div>
          <p className="mt-1 text-muted-foreground">
            {formData.idealInfluencer}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
