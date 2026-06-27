"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CompactSearchInput } from "@/components/marketing/compact-search-input";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { useListingsFiltersOptional } from "@/components/listings/listings-filter-provider";
import { getStoredUser, notifyAuthChange, useAuthUser } from "@/hooks/use-auth-user";
import { useScrolled } from "@/hooks/use-scrolled";
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  showSearch?: boolean;
  activeHref?: string;
};

export function SiteHeader({
  showSearch = false,
  activeHref,
}: SiteHeaderProps) {
  const router = useRouter();
  const scrolled = useScrolled(8);
  const listingsFilters = useListingsFiltersOptional();
  const user = useAuthUser();

  const handleLocationChange = (value: string) => {
    listingsFilters?.setFilters((current) => ({ ...current, location: value }));
  };

  const handleListProperty = () => {
    const storedUser = getStoredUser();

    if (storedUser) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    notifyAuthChange();
    router.push("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-background transition-shadow duration-200",
        scrolled && "border-border shadow-[var(--shadow-card)]",
      )}
    >
      <Container>
        <div className="flex h-16 items-center gap-6 lg:gap-8">
          <Logo variant="light" />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "border-b-2 border-primary pb-0.5 text-foreground"
                      : "text-foreground/80 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {showSearch && (
            <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">
              <CompactSearchInput
                className="max-w-md"
                value={listingsFilters?.filters.location ?? ""}
                onChange={handleLocationChange}
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={handleListProperty}
            >
              List your property
            </Button>
            <MobileMenu
              user={user}
              onListProperty={handleListProperty}
              onLogout={handleLogout}
            />
          </div>
        </div>

        {showSearch && (
          <div className="border-t border-border pb-3 lg:hidden">
            <CompactSearchInput
              className="max-w-none"
              value={listingsFilters?.filters.location ?? ""}
              onChange={handleLocationChange}
            />
          </div>
        )}
      </Container>
    </header>
  );
}
