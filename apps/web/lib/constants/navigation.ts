export type NavItem = {
  label: string;
  href: string;
};

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Rentals", href: "/listings" },
  { label: "Verification", href: "/verification" },
  { label: "Help", href: "/help" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];
