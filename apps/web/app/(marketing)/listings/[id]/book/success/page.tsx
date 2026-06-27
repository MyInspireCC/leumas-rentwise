import { InspectionSuccessPageContent } from "@/sections/booking/inspection-success-page-content";

export const dynamic = "force-dynamic";

type InspectionSuccessPageProps = {
  params: Promise<{ id: string }>;
};

export default async function InspectionSuccessPage({ params }: InspectionSuccessPageProps) {
  const { id } = await params;

  return <InspectionSuccessPageContent id={id} />;
}
