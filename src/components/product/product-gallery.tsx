"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const showThumbnails = images.length > 1;

  return (
    <div className="relative flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
      {showThumbnails ? (
        <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
          {images.map((image, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Ver imagen ${index + 1} de ${productName}`}
              className={[
                "relative h-24 w-20 shrink-0 cursor-pointer border transition-colors duration-300 lg:h-32 lg:w-full",
                index === activeIndex
                  ? "border-[var(--brand)]"
                  : "border-[var(--border)] opacity-80 hover:border-[var(--border-strong)] hover:opacity-100",
              ].join(" ")}
              key={`${image.url}-${index}`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                height={180}
                src={image.url}
                width={140}
              />
            </button>
          ))}
        </div>
      ) : null}

      <figure className="image-container relative aspect-[4/5] w-full flex-grow border border-[var(--border)] bg-[var(--surface-emphasis)]">
        <Image
          alt={activeImage.alt}
          className="object-cover object-center"
          fill
          key={activeImage.url}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={activeImage.url}
        />
      </figure>
    </div>
  );
}
