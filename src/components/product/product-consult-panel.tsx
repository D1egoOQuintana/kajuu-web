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
          <h2 className="mb-3 text-sm font-semibold text-[var(--text-primary)]" id="product-colors">
            Color{selectedColor ? `: ${selectedColor}` : ""}
          </h2>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = selectedColor === color.name;
              return (
                <button
                  aria-pressed={active}
                  className={[
                    "inline-flex min-h-11 items-center gap-2 border px-3 py-2 text-xs transition-colors duration-200",
                    active
                      ? "border-[var(--brand)] bg-[var(--background-secondary)] font-semibold text-[var(--brand)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]",
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
                      "h-4 w-4 rounded-full border border-[var(--text-muted)]",
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
            <h2 className="text-sm font-semibold text-[var(--text-primary)]" id="product-sizes">
              Talla{selectedSize ? `: ${selectedSize}` : ""}
            </h2>
            <Link
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--brand)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--brand-hover)]"
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
                    "inline-flex min-h-11 min-w-11 items-center justify-center border px-3 text-sm font-semibold transition-colors duration-200",
                    active
                      ? "border-[var(--brand)] bg-[var(--brand)] text-[var(--button-primary-text)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]",
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
        <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
          Te respondemos en el día. Elige talla y color para agilizar la
          consulta (opcional).
        </p>
      </div>
    </div>
  );
}
