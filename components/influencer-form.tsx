import { useState } from "react";
import {
  useFormContext,
  Controller,
  type ControllerRenderProps,
} from "react-hook-form";
import type { FormData } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Users, Hash, FileText, Instagram, Youtube } from "lucide-react";
import { FaTiktok as TikTok } from "react-icons/fa";

const platforms = [
  { name: "Instagram", icon: Instagram, disabled: false },
  { name: "TikTok", icon: TikTok, disabled: true },
  { name: "YouTube", icon: Youtube, disabled: true },
];

type InfluencerFormProps = {
  touchedFields: Set<keyof FormData>;
  setTouchedFields: React.Dispatch<React.SetStateAction<Set<keyof FormData>>>;
};

export default function InfluencerForm({
  touchedFields,
  setTouchedFields,
}: InfluencerFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();
  const [followerRange, setFollowerRange] = useState([50000, 200000]);

  function handleFieldTouch(fieldName: keyof FormData) {
    setTouchedFields(function (prev) {
      return new Set(prev).add(fieldName);
    });
  }

  function renderError(fieldName: keyof FormData) {
    const error = errors[fieldName];
    if (touchedFields.has(fieldName) && error) {
      return <p className="mt-1 text-sm text-destructive">{error.message}</p>;
    }
    return null;
  }

  function renderFollowerRangeSlider({
    field,
  }: {
    field: ControllerRenderProps<FormData, "followerRange">;
  }) {
    return (
      <Slider
        min={5000}
        max={1000000}
        step={1000}
        value={followerRange}
        onValueChange={function (value) {
          setFollowerRange(value as [number, number]);
          field.onChange(value);
          handleFieldTouch("followerRange");
        }}
        aria-label="Follower range"
      />
    );
  }

  function renderPlatformSelect({
    field,
  }: {
    field: ControllerRenderProps<FormData, "platform">;
  }) {
    return (
      <Select
        onValueChange={function (value) {
          field.onChange(value);
          handleFieldTouch("platform");
        }}
        defaultValue={field.value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a platform" />
        </SelectTrigger>
        <SelectContent>
          {platforms.map(function ({ name, icon: Icon, disabled }) {
            return (
              <SelectItem key={name} value={name} disabled={disabled}>
                <div className="flex items-center">
                  <Icon className="mr-2 h-4 w-4" />
                  {name}
                  {disabled && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      (Coming soon!)
                    </span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  function renderInfluencerDescription({
    field,
  }: {
    field: ControllerRenderProps<FormData, "idealInfluencer">;
  }) {
    return (
      <Textarea
        id="idealInfluencer"
        placeholder="Describe the type of influencers you're looking for..."
        className="resize-none"
        {...field}
        onBlur={function () {
          field.onBlur();
          handleFieldTouch("idealInfluencer");
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Follower Range Field */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Label className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            Follower Range
          </Label>
          <output className="text-sm font-medium tabular-nums">
            {followerRange[0].toLocaleString()} -{" "}
            {followerRange[1].toLocaleString()}
          </output>
        </div>
        <Controller
          name="followerRange"
          control={control}
          render={renderFollowerRangeSlider}
        />
        {renderError("followerRange")}
      </div>

      {/* Platform Field */}
      <div>
        <Label htmlFor="platform" className="mb-2 flex items-center">
          <Hash className="mr-1 h-4 w-4" />
          Platform
        </Label>
        <Controller
          name="platform"
          control={control}
          defaultValue="Instagram"
          render={renderPlatformSelect}
        />
        {renderError("platform")}
      </div>

      {/* Ideal Influencer Field */}
      <div>
        <Label htmlFor="idealInfluencer" className="mb-2 flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          Describe your ideal influencer
        </Label>
        <Controller
          name="idealInfluencer"
          control={control}
          render={renderInfluencerDescription}
        />
        {renderError("idealInfluencer")}
      </div>
    </div>
  );
}
