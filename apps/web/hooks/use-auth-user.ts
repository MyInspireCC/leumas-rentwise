"use client";

import { useEffect, useState } from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  company?: string | null;
  experience?: string | null;
  location?: string | null;
  isVerified?: boolean;
  createdAt?: string;
};

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  return JSON.parse(localStorage.getItem("user") || "null") as AuthUser | null;
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event("auth-changed"));
}

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(getStoredUser());
    };

    syncUser();
    window.addEventListener("auth-changed", syncUser);

    return () => {
      window.removeEventListener("auth-changed", syncUser);
    };
  }, []);

  return user;
}
