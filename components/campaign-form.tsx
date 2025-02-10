import { useFormContext, Controller } from "react-hook-form";
import type { FormData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Wallet, Paperclip } from "lucide-react";

type CampaignFormProps = {
  touchedFields: Set<keyof FormData>;
  setTouchedFields: React.Dispatch<React.SetStateAction<Set<keyof FormData>>>;
};

export default function CampaignForm({
  touchedFields,
  setTouchedFields,
}: CampaignFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const handleFieldTouch = (fieldName: keyof FormData) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="campaignDescription" className="mb-2 flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          Description
        </Label>
        <Controller
          name="campaignDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              id="campaignDescription"
              placeholder="Describe the campaign you're planning..."
              className="resize-none"
              {...field}
              onBlur={() => {
                field.onBlur();
                handleFieldTouch("campaignDescription");
              }}
            />
          )}
        />
        {touchedFields.has("campaignDescription") &&
          errors.campaignDescription && (
            <p className="mt-1 text-sm text-destructive">
              {errors.campaignDescription.message}
            </p>
          )}
      </div>
      <div>
        <Label htmlFor="budget" className="mb-2 flex items-center">
          <Wallet className="mr-1 h-4 w-4" />
          Budget (USD)
        </Label>
        <Controller
          name="budget"
          control={control}
          defaultValue={500}
          render={({ field }) => (
            <Input
              id="budget"
              type="number"
              min={50}
              step={10}
              {...field}
              onChange={(e) => {
                field.onChange(Number(e.target.value));
                handleFieldTouch("budget");
              }}
            />
          )}
        />
        {touchedFields.has("budget") && errors.budget && (
          <p className="mt-1 text-sm text-destructive">
            {errors.budget.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="attachments" className="mb-2 flex items-center">
          <Paperclip className="mr-1 h-4 w-4" />
          Attachments (optional)
        </Label>
        <Controller
          name="attachments"
          control={control}
          defaultValue={[]} // Provide a default value so the field remains optional
          render={({ field }) => (
            <Input
              id="attachments"
              type="file"
              multiple
              ref={field.ref}
              name={field.name}
              onChange={(e) => {
                // Convert FileList to an array of File objects.
                const files = e.target.files ? Array.from(e.target.files) : [];
                field.onChange(files);
                handleFieldTouch("attachments");
              }}
            />
          )}
        />
        {touchedFields.has("attachments") && errors.attachments && (
          <p className="mt-1 text-sm text-destructive">
            {errors.attachments.message}
          </p>
        )}
      </div>
    </div>
  );
}