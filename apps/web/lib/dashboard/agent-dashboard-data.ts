export type AgentPayment = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export type AgentInspection = {
  id: string;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: string;
  listing: {
    id: string;
    title: string;
    location: string;
    image: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  payments?: AgentPayment[];
};

export type AgentListing = {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  isVerified: boolean;
  image: string;
};

export function getInspectionEarnings(inspection: AgentInspection) {
  return (
    inspection.payments?.reduce(
      (sum, payment) => (payment.status === "paid" ? sum + payment.amount : sum),
      0,
    ) ?? 0
  );
}

export function getTotalEarnings(inspections: AgentInspection[]) {
  return inspections.reduce((sum, inspection) => sum + getInspectionEarnings(inspection), 0);
}

export function getRecentEarnings(inspections: AgentInspection[]) {
  return inspections
    .flatMap((inspection) =>
      (inspection.payments ?? [])
        .filter((payment) => payment.status === "paid")
        .map((payment) => ({
          id: payment.id,
          amount: payment.amount,
          createdAt: payment.createdAt,
          title: inspection.listing.title,
        })),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);
}
