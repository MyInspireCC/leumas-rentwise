import { PropertyDetailsPageContent } from "@/sections/listings/property-details-page-content";

export const dynamic = "force-dynamic";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;

  return <PropertyDetailsPageContent id={id} />;
}
