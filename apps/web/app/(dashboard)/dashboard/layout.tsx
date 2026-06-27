import { AgentDashboardLayout } from "@/components/dashboard/agent-dashboard-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AgentDashboardLayout>{children}</AgentDashboardLayout>;
}
