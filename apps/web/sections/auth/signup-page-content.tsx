"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notifyAuthChange } from "@/hooks/use-auth-user";
import { cn } from "@/lib/utils";

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5+ years",
] as const;

const STEP_LABELS = ["Account", "Agent Details", "Verification", "Success"] as const;

function FileUploadField({
  id,
  label,
  optional,
  file,
  onChange,
}: {
  id: string;
  label: string;
  optional?: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*,.pdf"
        required={!optional}
        onChange={(event) => {
          onChange(event.target.files?.[0] ?? null);
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        )}
      />
      {file && (
        <p className="text-xs text-success">✔ Document uploaded</p>
      )}
    </div>
  );
}

export function SignupPageContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [optionalDoc, setOptionalDoc] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAccountContinue = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStep(2);
  };

  const handleProfileContinue = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setStep(3);
  };

  const handleVerificationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!governmentId || !selfie) {
      setError("Please upload your government ID and a clear photo of yourself");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          company: company || undefined,
          experience,
          location: officeLocation,
          isVerified: false,
        }),
      });
      const json = await res.json();

      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.data));
        notifyAuthChange();
        setStep(4);
        return;
      }

      setError(json.error ?? "Signup failed");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted py-12 lg:py-16">
      <Container className="max-w-md">
        <div className="rounded-lg border border-border bg-background p-6 shadow-[var(--shadow-card)] sm:p-8">
          {step < 4 && (
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>
                  Step {step} of 3
                </span>
                <span>{STEP_LABELS[step - 1]}</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={cn(
                      "h-1 flex-1 rounded-full",
                      stepNumber <= step ? "bg-primary" : "bg-border",
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <div className="mb-6 space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
                <p className="text-sm text-muted-foreground">
                  Set up your RentWise agent account to start listing properties.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleAccountContinue}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <Button type="submit" variant="primary" className="h-11 w-full">
                  Continue →
                </Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6 space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Agent profile</h1>
                <p className="text-sm text-muted-foreground">
                  Tell us a bit about your real estate experience.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleProfileContinue}>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground">
                    Company Name{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="text-sm font-medium text-foreground">
                    Years of Experience
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(event) => setExperience(event.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
                  >
                    <option value="" disabled>
                      Select experience
                    </option>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="officeLocation" className="text-sm font-medium text-foreground">
                    Office Location (city)
                  </label>
                  <Input
                    id="officeLocation"
                    type="text"
                    value={officeLocation}
                    onChange={(event) => setOfficeLocation(event.target.value)}
                    required
                    className="h-10"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="primary" className="h-11 flex-1">
                    Continue →
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-6 space-y-2">
                <h1 className="text-2xl font-bold text-foreground">Verify Your Account</h1>
                <p className="text-sm text-muted-foreground">
                  We verify all agents before their listings go live to ensure trust and safety on
                  RentWise.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleVerificationSubmit}>
                <FileUploadField
                  id="governmentId"
                  label="Upload Government ID"
                  file={governmentId}
                  onChange={setGovernmentId}
                />

                <FileUploadField
                  id="selfie"
                  label="Upload a clear photo of yourself"
                  file={selfie}
                  onChange={setSelfie}
                />

                <FileUploadField
                  id="optionalDoc"
                  label="Proof of Business or Address"
                  optional
                  file={optionalDoc}
                  onChange={setOptionalDoc}
                />

                {error && <p className="text-sm text-destructive">{error}</p>}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1"
                    onClick={() => setStep(2)}
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="h-11 flex-1"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit for Verification"}
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-3xl" aria-hidden>
                  🎉
                </p>
                <h1 className="text-2xl font-bold text-foreground">Verification Submitted</h1>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your account has been created and submitted for verification.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  You can start listing properties, but listings will be marked as &quot;Pending
                  Review&quot; until approved.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                className="h-11 w-full"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard →
              </Button>
            </div>
          )}

          {step < 4 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                Login
              </Link>
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
