"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DashboardSectionHeader } from "@/components/dashboard/dashboard-section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUser } from "@/hooks/use-auth-user";
import { createListing } from "@/lib/api";
import { cn } from "@/lib/utils";

const AMENITIES = [
  "24/7 Power Supply",
  "Armed Security",
  "Gated Parking",
  "Fiber Internet",
] as const;

export function CreateListingPageContent() {
  const router = useRouter();
  const user = getStoredUser();
  const showReviewNotice = !user?.isVerified;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [serviceCharge, setServiceCharge] = useState("");
  const [agencyFee, setAgencyFee] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const toggleAmenity = (value: string) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getStoredUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (!file) {
      setError("Please select an image to upload");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadJson = await uploadRes.json();

      if (!uploadJson.success || !uploadJson.url) {
        throw new Error(uploadJson.error ?? "Failed to upload image");
      }

      const res = await createListing({
        title,
        location,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        size: size ? Number(size) : undefined,
        description: description || undefined,
        amenities,
        serviceCharge: serviceCharge ? Number(serviceCharge) : undefined,
        agencyFee: agencyFee ? Number(agencyFee) : undefined,
        image: uploadJson.url,
        agentId: user.id,
      });

      if (res.success) {
        router.push("/dashboard?created=1");
        return;
      }

      setError(res.error ?? "Failed to create listing");
    } catch {
      setError("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl animate-in fade-in duration-500">
      <DashboardSectionHeader title="Add New Listing" />

      {showReviewNotice && (
        <p className="mb-4 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
          Listings created will be reviewed before going live.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-6 rounded-lg border border-border bg-background p-6 shadow-[var(--shadow-card)]"
      >
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Property Basics</h3>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-foreground">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
              className="h-10"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-foreground">
                Price (₦)
              </label>
              <Input
                id="price"
                type="number"
                min={0}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bedrooms" className="text-sm font-medium text-foreground">
                Bedrooms
              </label>
              <Input
                id="bedrooms"
                type="number"
                min={0}
                value={bedrooms}
                onChange={(event) => setBedrooms(event.target.value)}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bathrooms" className="text-sm font-medium text-foreground">
                Bathrooms
              </label>
              <Input
                id="bathrooms"
                type="number"
                min={0}
                step={0.5}
                value={bathrooms}
                onChange={(event) => setBathrooms(event.target.value)}
                required
                className="h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="size" className="text-sm font-medium text-foreground">
              Square Footage
            </label>
            <Input
              id="size"
              type="number"
              min={0}
              value={size}
              onChange={(event) => setSize(event.target.value)}
              placeholder="e.g. 2000"
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-foreground">
            About this property
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the property, neighborhood, and highlights..."
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Amenities</h3>
          <div className="space-y-2">
            {AMENITIES.map((amenity) => (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-2 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="size-4 rounded border border-input accent-primary"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Costs</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="serviceCharge" className="text-sm font-medium text-foreground">
                Service Charge
              </label>
              <Input
                id="serviceCharge"
                type="number"
                min={0}
                value={serviceCharge}
                onChange={(event) => setServiceCharge(event.target.value)}
                placeholder="Optional"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="agencyFee" className="text-sm font-medium text-foreground">
                Agency &amp; Legal Fee
              </label>
              <Input
                id="agencyFee"
                type="number"
                min={0}
                value={agencyFee}
                onChange={(event) => setAgencyFee(event.target.value)}
                placeholder="Optional"
                className="h-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium text-foreground">
            Property Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            required
            onChange={(event) => {
              if (event.target.files?.[0]) {
                setFile(event.target.files[0]);
              }
            }}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
              "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
            )}
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Property preview"
              className="h-40 w-full rounded-md object-cover"
            />
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="submit"
            variant="primary"
            className="h-11 flex-1"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Listing"}
          </Button>
          <Button type="button" variant="outline" className="h-11" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
