import { useFormContext, Controller } from "react-hook-form";
import type { FormData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  List,
  FileText,
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
} from "lucide-react";

const categories = [
  { value: "Beauty", icon: Palette },
  { value: "Fashion", icon: ShoppingBag },
  { value: "Travel", icon: Plane },
  { value: "Food & Drink", icon: UtensilsCrossed },
  { value: "Health & Fitness", icon: Dumbbell },
  { value: "Comedy & Entertainment", icon: Laugh },
  { value: "Animals & Pets", icon: PawPrint },
  { value: "Education", icon: GraduationCap },
  { value: "Entrepreneur & Business", icon: Briefcase },
  { value: "Technology", icon: Cpu },
];

export default function CompanyForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="companyName" className="mb-2 flex items-center">
          <Building className="mr-1 h-4 w-4" />
          Name
        </Label>
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <Input
              id="companyName"
              placeholder="Enter your company name"
              {...field}
            />
          )}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-destructive">
            {errors.companyName.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="category" className="mb-2 flex items-center">
          <List className="mr-1 h-4 w-4" />
          Category
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ value, icon: Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <Icon className="mr-2 h-4 w-4" />
                      {value}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-destructive">
            {errors.category.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="companyDescription" className="mb-2 flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          Description
        </Label>
        <Controller
          name="companyDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              id="companyDescription"
              placeholder="Describe what your company does..."
              className="resize-none"
              {...field}
            />
          )}
        />
        {errors.companyDescription && (
          <p className="mt-1 text-sm text-destructive">
            {errors.companyDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}
