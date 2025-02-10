"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "@/components/progress-indicator";
import CompanyForm from "@/components/company-form";
import CampaignForm from "@/components/campaign-form";
import InfluencerForm from "@/components/influencer-form";
import {
  Building,
  Megaphone,
  Users,
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";
import { formSchema, type FormData } from "@/types";

// Define each step along with the fields that belong to that step.
const steps = [
  {
    title: "Company",
    component: CompanyForm,
    icon: Building,
    description: "Tell us about your awesome company 😊",
    fields: ["companyName", "category", "companyDescription"],
  },
  {
    title: "Campaign",
    component: CampaignForm,
    icon: Megaphone,
    description: "Tell us about the campaign you're planning 🤔",
    fields: ["campaignDescription", "budget", "attachments"],
  },
  {
    title: "Influencer",
    component: InfluencerForm,
    icon: Users,
    description:
      "Tell us about the type of influencer you'd like to work with 🤝",
    fields: ["followerRange", "platform", "idealInfluencer"],
  },
];

type MultiStepFormProps = {
  onSubmit: (formData: FormData) => void;
};

export default function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [touchedFields, setTouchedFields] = useState<Set<keyof FormData>>(
    new Set(),
  );

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      companyName: "",
      category: undefined,
      companyDescription: "",
      campaignDescription: "",
      budget: 500,
      followerRange: [50000, 200000],
      platform: "Instagram",
      idealInfluencer: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  async function nextStep() {
    const currentFields = steps[currentStep].fields as (keyof FormData)[];
    const isStepValid = await trigger(currentFields);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      const invalidFields = currentFields.filter((field) => errors[field]);
      setTouchedFields(new Set([...touchedFields, ...invalidFields]));
    }
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        <ProgressIndicator steps={steps} currentStep={currentStep} />
        <div className="space-y-8">
          <p className="-mb-2 mt-10 text-center text-muted-foreground">
            {steps[currentStep].description}
          </p>
          <CurrentStepComponent
            touchedFields={touchedFields}
            setTouchedFields={setTouchedFields}
          />
        </div>
        <div className="flex justify-between">
          {currentStep > 0 && (
            <Button type="button" onClick={prevStep} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Submit
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
