import { BookInspectionPageContent } from "@/sections/booking/book-inspection-page-content";

export const dynamic = "force-dynamic";

type BookInspectionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BookInspectionPage({ params }: BookInspectionPageProps) {
  const { id } = await params;

  return <BookInspectionPageContent id={id} />;
}
