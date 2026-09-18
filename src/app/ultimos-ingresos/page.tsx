import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getNewArrivalProducts } from "@/features/catalog/catalog.service";

export const metadata: Metadata = {
  title: "Últimos ingresos",
  description:
    "Descubre las prendas más recientes de KAJÚ y consulta disponibilidad por WhatsApp.",
  alternates: { canonical: "/ultimos-ingresos" },
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivalProducts();

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="pb-24">
        <Container className="grid gap-8 pb-12 pt-28 md:pb-16 md:pt-36 lg:grid-cols-12 lg:items-end lg:pt-[136px]">
          <div className="lg:col-span-8">
            <p className="label-caps mb-4 text-[var(--brand)]">Recién llegados</p>
            <h1 className="editorial-title text-[clamp(3rem,11vw,5rem)] leading-[1.04] text-[var(--text-primary)]">
              Últimos ingresos
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-[var(--text-secondary)] lg:col-span-4">
            Las prendas que se sumaron recientemente al showroom. El stock se
            confirma por WhatsApp antes de coordinar la compra.
          </p>
        </Container>

        <Container>
          <ProductGrid products={products} />
          <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-[var(--border)] pt-8 md:flex-row md:items-center">
            <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
              ¿Buscas una talla o un color específico? Te ayudamos a revisar
              disponibilidad en el showroom.
            </p>
            <WhatsAppCTA label="Consultar disponibilidad" variant="secondary" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
