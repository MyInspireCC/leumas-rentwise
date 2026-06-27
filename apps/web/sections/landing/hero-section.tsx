import Image from "next/image";

import { SearchBar } from "@/components/marketing/search-bar";
import { TrustBadgeRow } from "@/components/marketing/trust-badge";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <section className="relative min-h-[520px] lg:min-h-[640px]">
      <Image
        src="/images/hero/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div
        className="absolute inset-0 bg-primary/65"
        aria-hidden
      />

      <div className="relative flex min-h-[520px] items-center py-16 lg:min-h-[640px] lg:py-20">
        <Container>
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-6 text-center sm:gap-8">
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Find a Home You Can Trust
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Verified listings, secure payments, and reliable agents — all in
                one place.
              </p>
            </div>

            <SearchBar className="w-full" />

            <TrustBadgeRow />
          </div>
        </Container>
      </div>
    </section>
  );
}
