import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { DiscoverStyle } from "@/components/home/discover-style";
import { InstagramCardStackCarousel } from "@/components/home/instagram-card-stack-carousel";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getNewArrivalProducts } from "@/features/catalog/catalog.service";

export const metadata: Metadata = {
  title: { absolute: "KAJÚ Indumentaria | Catálogo boutique femenino" },
  description:
    "KAJÚ es un catálogo boutique de indumentaria femenina urbana. Descubre últimos ingresos y consulta stock por WhatsApp.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const newArrivals = (await getNewArrivalProducts()).slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="relative z-0 overflow-x-clip">
        <section className="home-hero">
          <div aria-hidden="true" className="home-hero__wash" />

          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <h1 className="home-hero__title">
                Ropa urbana{" "}
                <span>para todos los días</span>
              </h1>
              <p className="home-hero__description">
                Prendas femeninas cómodas y actuales. Consulta talles, colores
                y stock por WhatsApp antes de coordinar tu entrega.
              </p>
              <div className="home-hero__actions">
                <Link
                  className="button button--primary w-full whitespace-nowrap sm:w-auto sm:min-w-[10.5rem]"
                  href="/catalogo"
                >
                  Ver catálogo
                </Link>
                <WhatsAppCTA
                  className="w-full whitespace-nowrap sm:w-auto sm:min-w-[15rem]"
                  label="Consultar por WhatsApp"
                  variant="secondary"
                />
              </div>
            </div>

            <figure className="home-hero__figure">
              <span aria-hidden="true" className="home-hero__plane" />
              <div className="home-hero__frame">
                <div className="home-hero__image">
                  <Image
                    alt="Modelo con un look negro urbano de KAJÚ"
                    className="object-cover object-center"
                    fill
                    priority
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 70vw, 44vw"
                    src="/products/zara3.webp"
                  />
                </div>
                <figcaption className="home-hero__caption">
                  Showroom en Floresta · Entregas en CABA
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        <DiscoverStyle />

        {newArrivals.length > 0 ? (
          <section
            aria-labelledby="ultimos-ingresos-heading"
            className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-8 md:py-24 lg:px-16 lg:py-28"
          >
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <h2
                  className="editorial-heading text-[32px] md:text-[44px]"
                  id="ultimos-ingresos-heading"
                >
                  Últimos ingresos
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-secondary)] md:text-base">
                  Prendas recién ingresadas al showroom, con stock actualizado.
                </p>
              </div>
              <Link
                aria-label="Ver todos los últimos ingresos"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-[var(--brand)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--brand-hover)]"
                href="/catalogo?filter=new"
              >
                Ver todos
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ProductGrid products={newArrivals} />
          </section>
        ) : null}

        <InstagramCardStackCarousel />
      </main>
      <Footer />
    </div>
  );
}
