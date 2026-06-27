import Image from "next/image";
import { LayoutGrid } from "lucide-react";

import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

type PropertyImageGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [mainImage, ...sideImages] = images;

  return (
    <div className="grid h-[280px] grid-cols-1 gap-2 overflow-hidden rounded-lg sm:h-[360px] md:grid-cols-3 md:h-[420px]">
      <div className="relative md:col-span-2">
        <Image
          src={mainImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="absolute right-3 bottom-3 bg-background/95 hover:bg-background"
        >
          <Icon icon={LayoutGrid} size="sm" />
          Show all photos
        </Button>
      </div>

      <div className="hidden grid-rows-2 gap-2 md:grid">
        {sideImages.slice(0, 2).map((image, index) => (
          <div key={`${image}-${index}`} className="relative min-h-0">
            <Image
              src={image}
              alt={`${title} view ${index + 2}`}
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
