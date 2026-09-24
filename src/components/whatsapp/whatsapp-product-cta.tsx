"use client";

import { useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

import { LazyWhatsAppMascot } from "./lazy-whatsapp-mascot";
import styles from "./whatsapp-system.module.css";

type WhatsAppProductCTAProps = {
  color?: string;
  priceLabel: string;
  productName: string;
  productUrl: string;
};

export function WhatsAppProductCTA({
  color,
  priceLabel,
  productName,
  productUrl,
}: WhatsAppProductCTAProps) {
  const [reactionSignal, setReactionSignal] = useState(0);
  const hasSelection = Boolean(color);

  return (
    <section aria-label="Consulta del producto" className={styles.productCta}>
      <div className={styles.productMascot}>
        <LazyWhatsAppMascot
          compact
          reactionSignal={reactionSignal}
        />
      </div>
      <div className={styles.productCopy}>
        <p className={styles.eyebrow}>Asistencia KAJÚ</p>
        <p className={styles.productPrompt}>
          {hasSelection
            ? "Ya tenemos los datos para consultar."
            : "¿Consultamos la disponibilidad?"}
        </p>
        <p className={styles.productNote}>
          {color
            ? `El mensaje incluirá la prenda y el color ${color}.`
            : "El mensaje incluirá la prenda."}
        </p>
      </div>
      <div
        className={styles.productAction}
        onPointerDown={() => setReactionSignal((current) => current + 1)}
      >
        <WhatsAppCTA
          className="w-full"
          label="Preguntar por esta prenda"
          priceLabel={priceLabel}
          productColor={color}
          productName={productName}
          productUrl={productUrl}
          size="lg"
        />
      </div>
    </section>
  );
}
