import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getNewArrivalProducts } from "@/features/catalog/catalog.service";

export const metadata: Metadata = {
  title: "Últimos ingresos | Kajuu Indumentaria",
  description:
    "Descubrí los últimos ingresos de Kajuu Indumentaria y consultá stock por WhatsApp.",
};

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivalProducts();

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="ingresos."
          description="Piezas nuevas para renovar el uso diario con textura, calce y actitud. Seleccionamos prendas que se sienten actuales sin perder calidez."
          eyebrow="Novedades Kajuu"
          title="Últimos"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#c98b7a]/70" />
            <p className="label-caps text-[#747878]">
              {newArrivals.length} prendas nuevas
            </p>
          </div>
        </PageHero>

        <section className="mx-auto w-full max-w-[1440px] px-5 py-10 md:px-16 md:py-14">
          <ProductGrid products={newArrivals} variant="editorial" />
        </section>

        <Container>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-[#e7d8cc] pt-8 md:flex-row md:items-center">
            <div>
              <p className="label-caps mb-2 text-[#8a5a3c]">
                ¿Buscás algo puntual?
              </p>
              <p className="max-w-xl text-sm leading-7 text-[#5f5048]">
                Te ayudamos a revisar talles, colores y prendas recién
                ingresadas antes de que se publiquen.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center border border-[#e7d8cc] bg-[#faf9f7] px-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#2f140d] transition-colors duration-300 hover:border-[#8a5a3c] hover:bg-[#f4f3f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                href="/catalogo"
              >
                Ver catálogo
              </Link>
              <WhatsAppCTA label="Consultar novedades" variant="primary" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
