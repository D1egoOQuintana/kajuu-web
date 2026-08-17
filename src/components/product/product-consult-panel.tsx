"use client";

import Link from "next/link";
import { useState } from "react";

import { WhatsAppCTA } from "./whatsapp-cta";

type ColorOption = {
  name: string;
  swatchClass: string;
};

type ProductConsultPanelProps = {
  productName: string;
  productUrl: string;
  priceLabel: string;
  sizes: readonly string[];
  colors: readonly ColorOption[];
};

export function ProductConsultPanel({
  productName,
  productUrl,
  priceLabel,
  sizes,
  colors,
}: ProductConsultPanelProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {colors.length > 0 ? (
        <section aria-labelledby="product-colors">
          <h2 className="label-caps mb-3 text-[#1a1c1b]" id="product-colors">
            Color{selectedColor ? `: ${selectedColor}` : ""}
          </h2>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = selectedColor === color.name;
              return (
                <button
                  aria-pressed={active}
                  className={[
                    "inline-flex items-center gap-2 border px-3 py-2 text-xs transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]",
                    active
                      ? "border-[#2f140d] bg-[#f4f3f1] text-[#2f140d]"
                      : "border-[#e7d8cc] bg-[#faf9f7] text-[#5f5048] hover:border-[#8a5a3c]",
                  ].join(" ")}
                  key={color.name}
                  onClick={() =>
                    setSelectedColor(active ? null : color.name)
                  }
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "h-4 w-4 rounded-full border border-[#2f140d]/20",
                      color.swatchClass,
                    ].join(" ")}
                  />
                  {color.name}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {sizes.length > 0 ? (
        <section aria-labelledby="product-sizes">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="label-caps text-[#1a1c1b]" id="product-sizes">
              Talla{selectedSize ? `: ${selectedSize}` : ""}
            </h2>
            <Link
              className="label-caps text-[#5f5048] underline decoration-[#c98b7a] transition-colors hover:text-[#7a2e2e]"
              href="/guia-talles"
            >
              Guía de tallas
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  aria-pressed={active}
                  className={[
                    "label-caps inline-flex min-h-11 min-w-11 items-center justify-center border px-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]",
                    active
                      ? "border-[#2f140d] bg-[#2f140d] text-[#faf9f7]"
                      : "border-[#d8c6b8] bg-[#faf9f7] text-[#2f140d] hover:border-[#8a5a3c]",
                  ].join(" ")}
                  key={size}
                  onClick={() => setSelectedSize(active ? null : size)}
                  type="button"
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <div>
        <WhatsAppCTA
          className="w-full justify-center !min-h-14 !text-[0.78rem]"
          label="Consultar por WhatsApp"
          priceLabel={priceLabel}
          productColor={selectedColor ?? undefined}
          productName={productName}
          productSize={selectedSize ?? undefined}
          productUrl={productUrl}
          size="lg"
        />
        <p className="mt-4 text-center text-sm text-[#6d5c4e]">
          Te respondemos en el día. Elige talla y color para agilizar la
          consulta (opcional).
        </p>
      </div>
    </div>
  );
}
