import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DecorativeShape } from "@/components/decorative-shape";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#030303] pb-8">
      <Header />

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <DecorativeShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />
        <DecorativeShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />
        <DecorativeShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />
        <DecorativeShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />
        <DecorativeShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 flex flex-grow flex-col pt-8 md:justify-center md:pt-16">
        <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-4xl md:mb-8 md:text-6xl">
              <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
                Supercharge Your Business with the
              </span>
              <br />
              <span className="font-lobster bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-3xl text-transparent sm:text-5xl md:text-7xl">
                Perfect Influencers
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-xl px-4 text-base font-light leading-relaxed tracking-wide text-muted-foreground sm:text-lg md:mb-8 md:text-lg">
              <a
                href="https://thesocialshepherd.com/blog/influencer-marketing-statistics"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
                target="_blank"
              >
                Data
              </a>{" "}
              shows businesses make $6.50 for every $1 spent on influencer
              marketing. Let our AI handle the searching. You make the deals. No
              middleman, only secure smart contracts.
            </p>
            <Link href="/start">
              <Button>
                Try It
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-12 aspect-video max-w-5xl overflow-hidden rounded-xl shadow-lg md:mt-16">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KAS3P1GcjUY?si=ygp2oJECUn1j4inH"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
    </div>
  );
}
