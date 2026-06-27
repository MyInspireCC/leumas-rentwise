"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getStoredUser, type AuthUser } from "@/hooks/use-auth-user";

type AgentDashboardLayoutProps = {
  children: React.ReactNode;
};

export function AgentDashboardLayout({ children }: AgentDashboardLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(storedUser);
  }, [router]);

  if (!user) {
    return (
      <p className="px-4 py-16 text-center text-sm text-muted-foreground">
        Loading dashboard...
      </p>
    );
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
