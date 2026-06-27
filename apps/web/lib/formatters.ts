export function formatPrice(amount: number, period = "yr"): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted =
      millions % 1 === 0
        ? millions.toFixed(0)
        : millions.toFixed(1).replace(/\.0$/, "");

    return `₦${formatted}M/${period}`;
  }

  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    const formatted =
      thousands % 1 === 0
        ? thousands.toFixed(0)
        : thousands.toFixed(1).replace(/\.0$/, "");

    return `₦${formatted}K/${period}`;
  }

  return `₦${amount.toLocaleString("en-NG")}/${period}`;
}

export function formatPriceFull(amount: number, period?: string): string {
  const formatted = `₦${amount.toLocaleString("en-NG")}`;
  return period ? `${formatted} /${period}` : formatted;
}
