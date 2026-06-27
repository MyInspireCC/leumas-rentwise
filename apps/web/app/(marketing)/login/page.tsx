import { Suspense } from "react";

import { LoginPageContent } from "@/sections/auth/login-page-content";

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="px-4 py-16 text-center text-sm text-muted-foreground">Loading...</p>}>
      <LoginPageContent />
    </Suspense>
  );
}
