import type React from "react";
import { Check } from "lucide-react";

type Step = {
  title: string;
  icon: React.ElementType;
};

type ProgressIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

export default function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full md:h-10 md:w-10 ${
              index <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {index < currentStep ? (
              <Check className="h-3 w-3 md:h-6 md:w-6" />
            ) : (
              <step.icon className="h-3 w-3 md:h-6 md:w-6" />
            )}
          </div>
          <span className="ml-2 text-xs font-medium md:text-sm">
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`mx-1.5 h-1 w-4 rounded-lg md:w-8 ${index < currentStep ? "bg-primary" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
