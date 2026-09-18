import type { Metadata } from "next";
import Link from "next/link";

import { EditorialImageCard } from "@/components/content/editorial-image-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Inspiración de outfits KAJÚ con denim, básicos, abrigos y sastrería urbana.",
  alternates: { canonical: "/lookbook" },
};

const looks = [
  {
    href: "/catalogo?categoria=jeans",
    imageSrc: "/products/zara3.webp",
    imageAlt: "Inspiración editorial KAJÚ para denim diario",
    eyebrow: "Denim diario",
    title: "Siluetas relajadas",
    description:
      "Jeans y cargos para armar looks urbanos con movimiento, textura y base neutra.",
  },
  {
    href: "/catalogo?categoria=tops",
    imageSrc: "/products/450e.avif",
    imageAlt: "Inspiración KAJÚ para básicos con textura",
    eyebrow: "Básicos",
    title: "Capas que combinan",
    description:
      "Tops, remeras y poleras que sostienen el look sin sentirse demasiado formales.",
  },
  {
    href: "/catalogo?categoria=camperas",
    imageSrc: "/products/images.jpg",
    imageAlt: "Inspiración KAJÚ para abrigos urbanos",
    eyebrow: "Abrigos",
    title: "Urbano pulido",
    description:
      "Prendas exteriores con presencia, pensadas para resolver día, noche y transición.",
  },
  {
    href: "/catalogo?categoria=pantalones",
    imageSrc: "/products/images (1).jpg",
    imageAlt: "Inspiración KAJÚ para sastrería urbana",
    eyebrow: "Sastrería urbana",
    title: "Líneas limpias",
    description:
      "Pantalones y conjuntos para un estilo cómodo, femenino y más elevado.",
  },
] as const;

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="KAJÚ."
          description="Un recorrido visual para imaginar combinaciones reales: prendas de todos los días con una lectura más editorial, cálida y boutique."
          eyebrow="Inspiración de outfits"
          title="Lookbook"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="button button--primary"
              href="/catalogo"
            >
              Ver catálogo
            </Link>
            <WhatsAppCTA label="Pedir asesoramiento" variant="secondary" />
          </div>
        </PageHero>

        <Container>
          <section className="grid gap-10 py-10 md:grid-cols-2 md:gap-12 lg:py-14">
            {looks.map((look, index) => (
              <div
                className={index % 2 === 1 ? "md:pt-16" : undefined}
                key={look.title}
              >
                <EditorialImageCard {...look} />
              </div>
            ))}
          </section>

          <section className="border-t border-[var(--border)] pt-10">
            <div className="grid gap-6 bg-[var(--background-secondary)] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <p className="label-caps mb-3 text-[var(--brand)]">
                  Armar un look
                </p>
                <h2 className="editorial-heading text-3xl text-[var(--text-primary)] md:text-4xl">
                  Elige una base y lo resolvemos juntas.
                </h2>
              </div>
              <WhatsAppCTA label="Consultar combinación" variant="primary" />
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
