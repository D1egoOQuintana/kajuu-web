import type { Metadata } from "next";
import Link from "next/link";

import { EditorialImageCard } from "@/components/content/editorial-image-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Lookbook | Kajuu Indumentaria",
  description:
    "Inspiración de outfits Kajuu con denim, básicos, abrigos y sastrería urbana.",
};

const looks = [
  {
    href: "/catalogo?categoria=jeans",
    imageSrc: "/products/zara3.webp",
    imageAlt: "Inspiración editorial Kajuu para denim diario",
    eyebrow: "Denim diario",
    title: "Siluetas relajadas",
    description:
      "Jeans y cargos para armar looks urbanos con movimiento, textura y base neutra.",
    tall: true,
  },
  {
    href: "/catalogo?categoria=tops",
    imageSrc: "/products/450e.avif",
    imageAlt: "Inspiración Kajuu para básicos con textura",
    eyebrow: "Básicos",
    title: "Capas que combinan",
    description:
      "Tops, remeras y poleras que sostienen el look sin sentirse demasiado formales.",
  },
  {
    href: "/catalogo?categoria=camperas",
    imageSrc: "/products/images.jpg",
    imageAlt: "Inspiración Kajuu para abrigos urbanos",
    eyebrow: "Abrigos",
    title: "Urbano pulido",
    description:
      "Prendas exteriores con presencia, pensadas para resolver día, noche y transición.",
    tall: true,
  },
  {
    href: "/catalogo?categoria=pantalones",
    imageSrc: "/products/images (1).jpg",
    imageAlt: "Inspiración Kajuu para sastrería urbana",
    eyebrow: "Sastrería urbana",
    title: "Líneas limpias",
    description:
      "Pantalones y conjuntos para un estilo cómodo, femenino y más elevado.",
  },
] as const;

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="Kajuu."
          description="Un recorrido visual para imaginar combinaciones reales: prendas de todos los días con una lectura más editorial, cálida y boutique."
          eyebrow="Inspiración de outfits"
          title="Lookbook"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center border border-[#2f140d] bg-[#2f140d] px-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#faf9f7] transition-colors duration-300 hover:border-[#7a2e2e] hover:bg-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
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

          <section className="border-t border-[#e7d8cc] pt-10">
            <div className="grid gap-6 bg-[#f4f3f1] p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div>
                <p className="label-caps mb-3 text-[#8a5a3c]">
                  Armar un look
                </p>
                <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-4xl">
                  Elegí una base y lo resolvemos juntas.
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
