"use client";

import { useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

import { LazyWhatsAppMascot } from "./lazy-whatsapp-mascot";
import type { RiveAssetAudit } from "./rive-config";
import styles from "./whatsapp-system.module.css";

type WhatsAppFeaturedCTAProps = {
  context: "home" | "contact";
  onAssetAudit?: (audit: RiveAssetAudit) => void;
};

const content = {
  home: {
    eyebrow: "Asesoría personalizada",
    title: "Elige con una mirada más cercana.",
    body: "Te ayudamos a confirmar el modelo, el color y la disponibilidad antes de decidir.",
    bubble: "¿Te ayudo a elegir?",
    cta: "¿Te ayudamos a elegir?",
    productName: "la colección de KAJÚ",
  },
  contact: {
    eyebrow: "Contacto directo",
    title: "Estamos del otro lado.",
    body: "Una conversación simple para resolver disponibilidad, entregas y detalles de la prenda.",
    bubble: "¿Tienes alguna duda?",
    cta: "Escríbenos por WhatsApp",
    productName: "una consulta para KAJÚ",
  },
} as const;

export function WhatsAppFeaturedCTA({
  context,
  onAssetAudit,
}: WhatsAppFeaturedCTAProps) {
  const [bubbleVisible, setBubbleVisible] = useState(context === "home");
  const [reactionSignal, setReactionSignal] = useState(0);
  const copy = content[context];

  const reactToCta = () => {
    setBubbleVisible(false);
    setReactionSignal((current) => current + 1);
  };

  return (
    <article
      className={[
        styles.featured,
        context === "contact" ? styles.featuredContact : styles.featuredHome,
      ].join(" ")}
    >
      <div className={styles.featuredCopy}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h2 className={styles.featuredTitle}>{copy.title}</h2>
        <p className={styles.featuredBody}>{copy.body}</p>
        <div className={styles.featuredAction} onPointerDown={reactToCta}>
          <WhatsAppCTA
            label={copy.cta}
            productName={copy.productName}
            size="lg"
            variant={context === "contact" ? "inverse" : "primary"}
          />
          <span className={styles.actionNote}>Respuesta personalizada · Sin compra automática</span>
        </div>
      </div>

      <div className={styles.featuredCharacter}>
        {bubbleVisible ? (
          <div className={styles.bubble}>
            <span>{copy.bubble}</span>
            <button
              aria-label="Ocultar mensaje"
              className={styles.bubbleDismiss}
              onClick={() => setBubbleVisible(false)}
              type="button"
            >
              ×
            </button>
          </div>
        ) : context === "contact" ? (
          <p className={styles.contactBubble}>{copy.bubble}</p>
        ) : null}
        <LazyWhatsAppMascot
          enableTracking={context === "home"}
          onAssetAudit={onAssetAudit}
          reactionSignal={reactionSignal}
        />
      </div>
    </article>
  );
}
