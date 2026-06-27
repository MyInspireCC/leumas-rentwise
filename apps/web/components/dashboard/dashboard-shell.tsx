"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Headphones,
  Home,
  Menu,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/shared/logo";
import { Icon } from "@/components/shared/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AuthUser } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Profile", icon: User },
  { href: "/dashboard#inspections", label: "Inspection Requests", icon: Calendar },
  { href: "/dashboard#listings", label: "My Listings", icon: Home },
  { href: "/dashboard#earnings", label: "Earnings", icon: Wallet },
  { href: "/dashboard#support", label: "Support", icon: Headphones },
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type DashboardSidebarProps = {
  user: AuthUser;
  className?: string;
  onNavigate?: () => void;
};

export function DashboardSidebar({
  user,
  className,
  onNavigate,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-background p-5",
        className,
      )}
    >
      <Logo className="mb-8" />

      <div className="mb-8 flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {user.isVerified ? "Verified Agent" : "Pending Verification"}
          </p>
          <span
            className={cn(
              "mt-1 inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold",
              user.isVerified
                ? "bg-success/15 text-success"
                : "bg-accent/20 text-accent-foreground",
            )}
          >
            {user.isVerified ? "Agent Verified ✅" : "Verification Pending ⏳"}
          </span>
        </div>
      </div>

      <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/dashboard" && pathname === "/dashboard";

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-2 border-primary bg-primary/5 text-primary"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon icon={item.icon} size="sm" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Button variant="primary" className="mt-6 w-full" asChild onClick={onNavigate}>
        <Link href="/dashboard/create-listing">List Property</Link>
      </Button>
    </aside>
  );
}

type DashboardShellProps = {
  user: AuthUser;
  children: React.ReactNode;
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] lg:block">
        <DashboardSidebar user={user} />
      </aside>

      <div className="lg:pl-[240px]">
        <div className="border-b border-border bg-background px-4 py-3 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Icon icon={Menu} size="sm" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Dashboard menu</SheetTitle>
              </SheetHeader>
              <DashboardSidebar
                user={user}
                onNavigate={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
