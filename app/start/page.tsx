"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MultiStepForm from "@/components/multi-step-form";
import ChatInterface from "@/components/chat-interface";
import { ArrowLeft } from "lucide-react";
import { type FormData } from "@/types";

export default function StartPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  function handleFormSubmit(formData: FormData) {
    setFormData(formData);
    setIsSubmitted(true);
  }

  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <Link href="/" className="absolute left-4 top-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        {!isSubmitted ? (
          <div className="flex min-h-screen items-center justify-center">
            <MultiStepForm onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <ChatInterface formData={formData!} />
        )}
      </div>
    </main>
  );
}
