"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { BotanicalBloom } from "@/components/brand/botanical-bloom";

const jeanCuts = [
  {
    detail: "Tiro alto · pierna amplia",
    href: "/catalogo/jean-wide-leg-celeste",
    image: "/brand/campaign/kaju-jeans-hero-v2.webp",
    name: "Corte amplio",
    number: "01",
  },
  {
    detail: "Bolsillos · actitud urbana",
    href: "/catalogo/cargo-denim",
    image: "/brand/campaign/kaju-jeans-cargo.webp",
    name: "Jean cargo",
    number: "02",
  },
  {
    detail: "Pierna semi acampanada",
    href: "/catalogo?categoria=jeans",
    image: "/brand/campaign/kaju-jeans-oxford.webp",
    name: "Corte Oxford",
    number: "03",
  },
] as const;

export function DiscoverStyle() {
  const [activeCut, setActiveCut] = useState<string | null>(null);

  return (
    <section aria-labelledby="denim-focus-title" className="denim-focus">
      <div className="denim-focus__inner">
        <div
          className={[
            "denim-focus__visual",
            activeCut ? "has-preview" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="denim-focus__visual-header">
            <p className="denim-focus__edition">KAJÚ / EDICIÓN DE JEANS</p>
            <p aria-hidden="true" className="denim-focus__word">
              JEANS
            </p>
            <p className="denim-focus__visual-copy">
              Tres cortes urbanos para empezar a encontrar tu calce.
            </p>
          </div>
          <BotanicalBloom
            className="denim-focus__floral"
            motion="breathe"
            tone="dark"
            variant="cluster"
          />

          <div aria-hidden="true" className="denim-focus__previews">
            {jeanCuts.map((fit) => (
              <div
                className={[
                  "denim-focus__preview",
                  activeCut === fit.number ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={fit.number}
                style={{ position: "absolute" }}
              >
                <Image
                  alt=""
                  className="denim-focus__preview-image"
                  fill
                  sizes="(max-width: 767px) 100vw, 390px"
                  src={fit.image}
                />
                <div className="denim-focus__preview-copy">
                  <span>{fit.number} / 03 · Vista del corte</span>
                  <strong>{fit.name}</strong>
                  <small>{fit.detail}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="denim-focus__content">
          <p className="denim-focus__eyebrow">Nuestra especialidad</p>
          <h2 id="denim-focus-title">El jean que va contigo</h2>
          <p className="denim-focus__description">
            Encuentra jeans de corte amplio, cargo y Oxford. Explora cada corte,
            elige tu favorito y confirma la disponibilidad por WhatsApp.
          </p>

          <div
            className="denim-focus__fits"
            onMouseLeave={() => setActiveCut(null)}
          >
            {jeanCuts.map((fit) => (
              <Link
                className={[
                  "denim-focus__fit",
                  activeCut === fit.number ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                href={fit.href}
                key={fit.name}
                onBlur={() => setActiveCut(null)}
                onFocus={() => setActiveCut(fit.number)}
                onMouseEnter={() => setActiveCut(fit.number)}
              >
                <span className="denim-focus__fit-number">{fit.number}</span>
                <span>
                  <strong>{fit.name}</strong>
                  <small>{fit.detail}</small>
                </span>
                <span aria-hidden="true" className="denim-focus__fit-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="denim-focus__actions">
            <Link className="button button--primary" href="/catalogo?categoria=jeans">
              Ver todos los jeans
            </Link>
            <Link className="button button--secondary" href="/catalogo?filter=new">
              Ver últimos ingresos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
