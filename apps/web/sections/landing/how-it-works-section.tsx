import { Calendar, Search, Shield } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/marketing/section-header";
import { StepCard } from "@/components/marketing/step-card";

const STEPS = [
  {
    title: "1. Search",
    description:
      "Browse verified listings in your preferred location with transparent pricing.",
    icon: Search,
  },
  {
    title: "2. Book Inspection",
    description:
      "Schedule a convenient time to inspect the property with the agent.",
    icon: Calendar,
  },
  {
    title: "3. Secure Payment",
    description:
      "Pay securely for inspections and secure your rental without stress.",
    icon: Shield,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="bg-primary py-12 text-white lg:py-16">
      <Container>
        <div className="space-y-10 lg:space-y-12">
          <SectionHeader
            title="How RentWise Works"
            align="center"
            className="[&_h2]:text-white"
          />

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.title}>
                <StepCard
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
