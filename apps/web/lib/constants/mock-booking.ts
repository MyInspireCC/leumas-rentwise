export const MOCK_TIME_SLOTS = [
  { id: "10:00-11:30", label: "10:00 AM - 11:30 AM" },
  { id: "14:00-15:30", label: "02:00 PM - 03:30 PM" },
  { id: "16:30-18:00", label: "04:30 PM - 06:00 PM" },
] as const;

export const BOOKING_STEPS = [
  { id: 1, label: "Details" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Verified" },
] as const;

export const INSPECTION_FEE = 5_000;
export const ADD_ON_FEE = 5_000;
export const SERVICE_CHARGE = 0;

export const MOCK_BOOKING_ID = "RW-8829-2024";

export function getBookingTotal(addOn: boolean) {
  return INSPECTION_FEE + (addOn ? ADD_ON_FEE : 0) + SERVICE_CHARGE;
}

export type PaymentMethod = "card" | "bank" | "ussd";

export const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
}> = [
  { id: "card", label: "Card", description: "Pay with debit or credit card" },
  { id: "bank", label: "Bank Transfer", description: "Transfer from your bank account" },
  { id: "ussd", label: "USSD", description: "Pay using a USSD code on your phone" },
];

export function getTimeSlotLabel(timeSlotId: string) {
  return MOCK_TIME_SLOTS.find((slot) => slot.id === timeSlotId)?.label ?? timeSlotId;
}

export function formatBookingDate(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return dateKey;

  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
