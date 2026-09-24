"use client";

import { useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import type { RiveAssetAudit } from "@/components/whatsapp/rive-config";
import { WhatsAppFeaturedCTA } from "@/components/whatsapp/whatsapp-featured-cta";
import { WhatsAppProductCTA } from "@/components/whatsapp/whatsapp-product-cta";

import styles from "./preview.module.css";

const exampleProductUrl = "http://localhost:3000/catalogo/cargo-denim";

export function PreviewShowcase() {
  const [assetAudit, setAssetAudit] = useState<RiveAssetAudit | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  return (
    <>
      <section aria-labelledby="home-preview" className={styles.section}>
        <div className={styles.sectionHeading}>
          <p>01 · Nivel destacado</p>
          <h2 id="home-preview">Inicio</h2>
          <span>Una sola aparición especial, vinculada al CTA principal.</span>
        </div>
        <WhatsAppFeaturedCTA context="home" onAssetAudit={setAssetAudit} />
      </section>

      <section aria-labelledby="product-preview" className={styles.section}>
        <div className={styles.sectionHeading}>
          <p>02 · Contexto de producto</p>
          <h2 id="product-preview">Detalle de prenda</h2>
          <span>Versión contenida que acompaña la consulta sin cubrir información.</span>
        </div>
        <div className={styles.productDemo}>
          <div className={styles.productDemoHeader}>
            <div>
              <p className={styles.miniLabel}>Jean cargo</p>
              <h3>Cargo Denim</h3>
            </div>
            <strong>$57.900</strong>
          </div>
          <fieldset className={styles.colorPicker}>
            <legend>Color para la demostración</legend>
            <button
              aria-pressed={selectedColor === "Azul denim"}
              onClick={() =>
                setSelectedColor((current) =>
                  current === "Azul denim" ? undefined : "Azul denim",
                )
              }
              type="button"
            >
              <span aria-hidden="true" /> Azul denim
            </button>
          </fieldset>
          <WhatsAppProductCTA
            color={selectedColor}
            priceLabel="$57.900"
            productName="Cargo Denim"
            productUrl={exampleProductUrl}
          />
        </div>
      </section>

      <section aria-labelledby="contact-preview" className={styles.section}>
        <div className={styles.sectionHeading}>
          <p>03 · Segunda aparición estratégica</p>
          <h2 id="contact-preview">Contacto</h2>
          <span>Composición editorial propia, sin repetir el layout del inicio.</span>
        </div>
        <WhatsAppFeaturedCTA context="contact" />
      </section>

      <section aria-labelledby="standard-preview" className={styles.section}>
        <div className={styles.sectionHeading}>
          <p>04 · Nivel estándar</p>
          <h2 id="standard-preview">Catálogo y tarjetas</h2>
          <span>CTA KAJÚ existente, sin mascota ni elementos decorativos repetidos.</span>
        </div>
        <div className={styles.standardDemo}>
          <div>
            <p className={styles.miniLabel}>Campera urbana</p>
            <h3>Consulta limpia y directa</h3>
          </div>
          <WhatsAppCTA
            label="Consultar por WhatsApp"
            productName="Campera urbana"
          />
        </div>
      </section>

      <section aria-labelledby="audit-preview" className={styles.auditSection}>
        <div className={styles.sectionHeading}>
          <p>Ficha técnica</p>
          <h2 id="audit-preview">Archivo Rive real</h2>
          <span>Datos leídos por el runtime oficial; no se inventaron nombres.</span>
        </div>
        <div className={styles.auditGrid}>
          <div className={styles.auditCard}>
            <span>Artboard</span>
            <strong>{assetAudit?.artboard ?? "Leyendo archivo…"}</strong>
          </div>
          <div className={styles.auditCard}>
            <span>Animaciones</span>
            <strong>
              {assetAudit?.animations.join(" · ") || "Leyendo archivo…"}
            </strong>
          </div>
          <div className={styles.auditCard}>
            <span>Máquinas de estado</span>
            <strong>
              {assetAudit?.stateMachines.map((machine) => machine.name).join(" · ") ||
                "Leyendo archivo…"}
            </strong>
          </div>
          <div className={styles.auditCard}>
            <span>Entradas</span>
            <ul>
              {assetAudit?.stateMachines.flatMap((machine) =>
                machine.inputs.map((input) => (
                  <li key={`${machine.name}-${input.name}`}>
                    <strong>{input.name}</strong> · {input.type}
                    {typeof input.initialValue !== "undefined"
                      ? ` · inicial: ${String(input.initialValue)}`
                      : ""}
                  </li>
                )),
              ) ?? <li>Leyendo archivo…</li>}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
