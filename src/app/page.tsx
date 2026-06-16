import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { Section } from "@/components/layout/section";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getFeaturedProducts,
  getNewArrivalProducts,
} from "@/features/catalog/catalog.service";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Kajuu Indumentaria | Catálogo boutique femenino",
  description:
    "Descubrí prendas femeninas seleccionadas por Kajuu Indumentaria y consultá disponibilidad por WhatsApp.",
};

const categoryHighlights = [
  {
    href: "/catalogo?categoria=jeans",
    label: "Jeans",
    description: "Denim cómodo para looks urbanos de todos los días.",
  },
  {
    href: "/catalogo?categoria=tops",
    label: "Tops",
    description: "Texturas suaves, tonos cálidos y prendas fáciles de combinar.",
  },
  {
    href: "/catalogo?categoria=sweaters",
    label: "Sweaters",
    description: "Abrigo liviano con una mirada boutique y femenina.",
  },
] as const;

function productsWithSafePlaceholders(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    images: [],
  }));
}

export default function Home() {
  const newArrivals = productsWithSafePlaceholders(
    getNewArrivalProducts().slice(0, 4),
  );
  const featuredProducts = productsWithSafePlaceholders(
    getFeaturedProducts().slice(0, 4),
  );

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#2E2A27]">
      <PublicHeader />
      <main>
        <section className="border-b border-[#E7D8CC]">
          <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:py-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A2E2E]">
                Kajuu Indumentaria
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#3A2418] sm:text-5xl lg:text-6xl">
                Prendas elegidas con calidez para vestir tu día a día.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#6B5A50] sm:text-lg">
                Un catálogo boutique de moda femenina, pensado para descubrir
                nuevos ingresos, mirar detalles y consultar stock directo por
                WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex min-h-12 items-center justify-center border border-[#3A2418] bg-[#3A2418] px-5 text-base font-medium text-[#FFF8F1] transition-colors hover:bg-[#2E2A27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
                  href="/catalogo"
                >
                  Ver catálogo
                </Link>
                <WhatsAppCTA
                  className="min-h-12"
                  label="Consultar por WhatsApp"
                  variant="secondary"
                />
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#E7D8CC] bg-[#E8D6C0]/45 p-5">
              <div className="aspect-[4/5] border border-white/70 bg-[#FFF8F1] p-6">
                <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,#FFF8F1_0%,#E8D6C0_52%,#C98B7A_100%)] p-6">
                  <span className="w-fit bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A2E2E]">
                    Nuevo
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#3A2418]">
                      Selección cálida
                    </p>
                    <p className="mt-2 max-w-xs text-3xl font-semibold leading-tight text-[#3A2418]">
                      Denim, básicos y abrigos para combinar sin esfuerzo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section
          description="Atajos simples para explorar prendas por estilo, sin ruido ni experiencia de marketplace."
          eyebrow="Explorar"
          title="Categorías destacadas"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {categoryHighlights.map((category) => (
              <Link
                className="border border-[#E7D8CC] bg-white p-5 transition-colors hover:bg-[#E8D6C0]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A2E2E]"
                href={category.href}
                key={category.href}
              >
                <h3 className="text-xl font-semibold text-[#3A2418]">
                  {category.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6B5A50]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          className="bg-white"
          description="Prendas recientes para que el catálogo se sienta vivo y actualizado."
          eyebrow="Novedades"
          title="Últimos ingresos"
        >
          <ProductGrid products={newArrivals} />
        </Section>

        <Section
          description="Una selección corta de piezas que funcionan como base para armar looks cálidos y urbanos."
          eyebrow="Selección Kajuu"
          title="Productos destacados"
        >
          <ProductGrid products={featuredProducts} />
        </Section>

        <Section className="bg-[#E8D6C0]/35">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A2E2E]">
                Cómo comprar
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#3A2418]">
                Elegís una prenda, consultás stock y coordinamos por WhatsApp.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Elegí", "Consultá", "Coordiná"].map((step) => (
                <div className="border border-[#E7D8CC] bg-white p-4" key={step}>
                  <p className="text-sm font-semibold text-[#3A2418]">
                    {step}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6B5A50]">
                    Compra manual, simple y sin pasos innecesarios.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          description="Seguinos para ver combinaciones, ingresos y disponibilidad del día."
          eyebrow="Contacto"
          title="Instagram y WhatsApp"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppCTA label="Escribir por WhatsApp" />
            <a
              className="inline-flex min-h-11 items-center justify-center border border-[#8A5A3C] bg-[#FFF8F1] px-4 text-sm font-medium text-[#3A2418] transition-colors hover:bg-[#E8D6C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver Instagram
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
