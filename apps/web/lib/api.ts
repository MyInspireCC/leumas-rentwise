const API_BASE = "/api";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  return res.json() as Promise<ApiResponse<T>>;
}

export async function getListings() {
  const res = await fetch(`${API_BASE}/listings`, { cache: "no-store" });
  const json = await parseResponse<unknown[]>(res);

  if (!json.success || !json.data) {
    throw new Error(json.error ?? "Failed to load listings");
  }

  return json.data;
}

export async function getListing(id: string) {
  const res = await fetch(`${API_BASE}/listings/${id}`);
  const json = await parseResponse<unknown>(res);

  if (!json.success || !json.data) {
    throw new Error(json.error ?? "Failed to load listing");
  }

  return json.data;
}

export async function createListing(data: {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size?: number;
  description?: string;
  amenities?: string[];
  serviceCharge?: number;
  agencyFee?: number;
  image: string;
  agentId: string;
}) {
  const res = await fetch(`${API_BASE}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse<{ id: string }>(res);
}

export async function createInspection(data: {
  listingId: string;
  userId: string;
  date: string;
  timeSlot: string;
  addOn: boolean;
}) {
  const res = await fetch(`${API_BASE}/inspections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse<{ id: string }>(res);
}

export async function createPayment(data: {
  inspectionId: string;
  addOn: boolean;
}) {
  const res = await fetch(`${API_BASE}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse<{ payment: unknown; total: number }>(res);
}

export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return parseResponse<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>(res);
}
