import { Shield } from "lucide-react";

import { Icon } from "@/components/shared/icon";

const PROMISE_ITEMS = [
  {
    title: "Physical Inspection",
    description:
      "Every listing is physically inspected by our team before going live.",
  },
  {
    title: "Ownership Check",
    description:
      "We verify property ownership documents to protect tenants from fraud.",
  },
  {
    title: "Secure Escrow",
    description:
      "Payments are held securely until inspection is confirmed and approved.",
  },
] as const;

export function VerificationPromiseBanner() {
  return (
    <section className="rounded-lg bg-primary p-6 text-primary-foreground sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent">
          <Icon icon={Shield} size="md" className="text-accent-foreground" />
        </span>
        <h2 className="text-lg font-bold sm:text-xl">RentWise Verification Promise</h2>
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROMISE_ITEMS.map((item) => (
          <li key={item.title} className="space-y-2">
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-primary-foreground/80">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
