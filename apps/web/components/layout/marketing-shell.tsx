"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ListingsFilterProvider } from "@/components/listings/listings-filter-provider";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isListingsBrowsePage = pathname === "/listings";
  const isListingsSection =
    pathname === "/listings" || pathname.startsWith("/listings/");

  const content = (
    <>
      <SiteHeader
        showSearch={isListingsBrowsePage}
        activeHref={isListingsSection ? "/listings" : undefined}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );

  if (isListingsBrowsePage) {
    return <ListingsFilterProvider>{content}</ListingsFilterProvider>;
  }

  return content;
}
