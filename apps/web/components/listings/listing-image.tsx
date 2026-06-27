import Image from "next/image";

import {
  getListingImageSrc,
  isDataUrl,
} from "@/lib/listings/listing-image";
import { cn } from "@/lib/utils";

type ListingImageProps = {
  src?: string | null;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ListingImage({
  src,
  alt,
  fill = false,
  className,
  sizes,
  priority,
}: ListingImageProps) {
  const imageSrc = getListingImageSrc(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized={isDataUrl(imageSrc)}
      className={cn(className)}
    />
  );
}
