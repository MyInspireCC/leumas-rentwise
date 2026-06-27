"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AuthUser } from "@/hooks/use-auth-user";
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation";
import { Icon } from "@/components/shared/icon";
import { Menu } from "lucide-react";

type MobileMenuProps = {
  user: AuthUser | null;
  onListProperty: () => void;
  onLogout: () => void;
};

export function MobileMenu({ user, onListProperty, onLogout }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Icon icon={Menu} size="md" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle className="normal-case tracking-normal">Menu</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
          {user ? (
            <>
              <Button variant="ghost" className="w-full justify-center" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-full justify-center" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" className="w-full justify-center" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <Button variant="primary" className="w-full justify-center" onClick={onListProperty}>
            List your property
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
