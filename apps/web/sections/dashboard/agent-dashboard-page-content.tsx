"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AgentTrustCard } from "@/components/dashboard/agent-trust-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-section-header";
import { EarningsSummaryCard } from "@/components/dashboard/earnings-summary-card";
import { InspectionRequestCard } from "@/components/dashboard/inspection-request-card";
import { ListingCard } from "@/components/listings/listing-card";
import { getStoredUser } from "@/hooks/use-auth-user";
import type { AgentInspection, AgentListing } from "@/lib/dashboard/agent-dashboard-data";
import {
  mapApiListingToCard,
  type ApiListing,
} from "@/lib/listings/map-api-listing";

export function AgentDashboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<AgentListing[]>([]);
  const [inspections, setInspections] = useState<AgentInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("created") === "1") {
      setShowCreatedMessage(true);
      router.replace("/dashboard");
    }
  }, [searchParams, router]);

  useEffect(() => {
    const user = getStoredUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserName(user.name);
    setIsVerified(user.isVerified ?? false);

    Promise.all([
      fetch(`/api/agent/listings?agentId=${user.id}`).then((res) => res.json()),
      fetch(`/api/agent/inspections?agentId=${user.id}`).then((res) => res.json()),
    ])
      .then(([listingsRes, inspectionsRes]) => {
        if (listingsRes.success) {
          setListings(listingsRes.data ?? []);
        }

        if (inspectionsRes.success) {
          setInspections(inspectionsRes.data ?? []);
        }
      })
      .catch(() => {
        setError("Failed to load dashboard data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const verifiedListingsCount = listings.filter((listing) => listing.isVerified).length;

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">Loading dashboard...</p>
    );
  }

  return (
    <>
      <DashboardHeader name={userName} />

      {!isVerified && (
        <p className="mb-6 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground">
          Your account is under review. Listings will go live once verified.
        </p>
      )}

      {showCreatedMessage && (
        <p className="mb-6 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          Listing created successfully
        </p>
      )}

      {error && <p className="mb-6 text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_320px] animate-in fade-in duration-500">
        <div className="min-w-0 space-y-8">
          <section id="inspections" className="animate-in fade-in duration-500">
            <DashboardSectionHeader
              title="Incoming Inspection Requests"
              actionLabel="View all"
              actionHref="#inspections"
            />

            {inspections.length === 0 ? (
              <p className="rounded-lg border border-border bg-background px-4 py-8 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
                No inspection requests yet
              </p>
            ) : (
              <div className="space-y-4">
                {inspections.map((inspection) => (
                  <InspectionRequestCard key={inspection.id} inspection={inspection} />
                ))}
              </div>
            )}
          </section>

          <section id="listings" className="animate-in fade-in duration-500">
            <DashboardSectionHeader
              title="My Active Listings"
              actionLabel="Manage list"
              actionHref="/listings"
            />

            {listings.length === 0 ? (
              <p className="rounded-lg border border-border bg-background px-4 py-8 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
                No listings found
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {listings.map((listing) => (
                  <li key={listing.id}>
                    <ListingCard
                      listing={mapApiListingToCard(listing as ApiListing)}
                      variant="browse"
                      showFavorite={false}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-6 animate-in fade-in duration-500">
          <EarningsSummaryCard inspections={inspections} />
          <AgentTrustCard verifiedListingsCount={verifiedListingsCount} />
          <section id="support" className="rounded-lg border border-border bg-background p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold text-foreground">Support</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Need help managing listings or inspections? Contact RentWise support.
            </p>
          </section>
        </aside>
      </div>
    </>
  );
}
