"use client";

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
  colors: readonly ColorOption[];
};

export function ProductConsultPanel({
  productName,
  productUrl,
  priceLabel,
  colors,
}: ProductConsultPanelProps) {
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

      <div>
        <WhatsAppCTA
          className="w-full justify-center !min-h-14 !text-[0.78rem]"
          label="Preguntar por esta prenda"
          priceLabel={priceLabel}
          productColor={selectedColor ?? undefined}
          productName={productName}
          productUrl={productUrl}
          size="lg"
        />
        <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
          {colors.length > 0
            ? "Selecciona un color para enviar una consulta más precisa (opcional)."
            : "Envía tu consulta para confirmar la disponibilidad del producto."}
        </p>
      </div>
    </div>
  );
}
