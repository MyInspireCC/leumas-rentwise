import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { FOOTER_LINKS } from "@/lib/constants/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm space-y-4">
            <Logo variant="dark" />
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Trust-first rental platform for safer apartment hunting across
              Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-sm text-primary-foreground/70 lg:text-right">
            Nigeria (NGN)
          </p>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} RentWise. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
