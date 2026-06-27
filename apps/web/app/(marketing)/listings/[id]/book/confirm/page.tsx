import { ConfirmPayPageContent } from "@/sections/booking/confirm-pay-page-content";

export const dynamic = "force-dynamic";

type ConfirmPayPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmPayPage({ params }: ConfirmPayPageProps) {
  const { id } = await params;

  return <ConfirmPayPageContent id={id} />;
}
