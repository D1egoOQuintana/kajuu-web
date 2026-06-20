import type { Metadata } from "next";
import Link from "next/link";

import { InfoCard } from "@/components/content/info-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Cómo comprar | Kajuu Indumentaria",
  description:
    "Conocé cómo comprar en Kajuu: elegí una prenda, consultá stock y coordiná entrega por WhatsApp.",
};

const steps = [
  {
    eyebrow: "Paso 01",
    title: "Elegí una prenda",
    body: "Recorré el catálogo, últimos ingresos o lookbook. Cada producto muestra talle, color, precio y disponibilidad orientativa.",
  },
  {
    eyebrow: "Paso 02",
    title: "Consultá stock y talle",
    body: "Escribinos por WhatsApp desde la ficha del producto para confirmar medidas, color y disponibilidad real.",
  },
  {
    eyebrow: "Paso 03",
    title: "Coordiná entrega o retiro",
    body: "Acordamos entrega en CABA o punto de encuentro en Floresta según el día, horario y prenda disponible.",
  },
  {
    eyebrow: "Paso 04",
    title: "Confirmá tu pedido",
    body: "Una vez definido el producto, coordinamos los detalles finales de forma simple y personalizada.",
  },
] as const;

export default function HowToBuyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="comprar."
          description="Kajuu no funciona como ecommerce tradicional. La compra se coordina de manera personalizada por WhatsApp o Instagram, para confirmar stock, talle y entrega antes de cerrar el pedido."
          eyebrow="Guía simple"
          title="Cómo"
        >
          <WhatsAppCTA label="Consultar por WhatsApp" variant="primary" />
        </PageHero>

        <Container>
          <section className="grid gap-5 py-10 md:grid-cols-2 lg:py-14">
            {steps.map((step) => (
              <InfoCard eyebrow={step.eyebrow} key={step.title} title={step.title}>
                <p>{step.body}</p>
              </InfoCard>
            ))}
          </section>

          <section className="grid gap-8 border-y border-[#e7d8cc] py-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <p className="label-caps mb-3 text-[#8a5a3c]">Entregas</p>
              <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-5xl">
                CABA / Floresta, coordinado con calma.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm leading-7 text-[#5f5048] md:text-base md:leading-8">
                Antes de confirmar, revisamos disponibilidad y forma de entrega.
                Así evitamos pasos fríos, formularios innecesarios y dudas de
                último momento.
              </p>
            </div>
          </section>

          <section className="flex flex-col items-start justify-between gap-5 pt-10 md:flex-row md:items-center">
            <div>
              <p className="label-caps mb-2 text-[#8a5a3c]">Primer paso</p>
              <p className="max-w-xl text-sm leading-7 text-[#5f5048]">
                Podés empezar por el catálogo completo o escribirnos si querés
                una recomendación.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center border border-[#e7d8cc] bg-[#faf9f7] px-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#2f140d] transition-colors duration-300 hover:border-[#8a5a3c] hover:bg-[#f4f3f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                href="/catalogo"
              >
                Ver catálogo
              </Link>
              <WhatsAppCTA label="Escribir a Kajuu" variant="primary" />
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
