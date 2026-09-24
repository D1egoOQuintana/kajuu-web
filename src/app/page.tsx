import type { Metadata } from "next";
import Link from "next/link";

import { DiscoverStyle } from "@/components/home/discover-style";
import {
  HomeHeroCarousel,
  type HomeHeroSlide,
} from "@/components/home/home-hero-carousel";
import { InstagramCardStackCarousel } from "@/components/home/instagram-card-stack-carousel";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getFeaturedProducts,
  getNewArrivalProducts,
} from "@/features/catalog/catalog.service";
import { getProductPresentation } from "@/lib/product-presentation";
import { WHATSAPP_PHONE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "KAJÚ Indumentaria | Jeans y moda urbana femenina" },
  description:
    "Jeans femeninos de corte amplio, jeans cargo y moda urbana KAJÚ. Consulta colores, precios y disponibilidad por WhatsApp.",
  alternates: { canonical: "/" },
};

const campaignSlides: HomeHeroSlide[] = [
  {
    id: "campaign-wide-leg",
    image: "/brand/campaign/kaju-jeans-hero-v2.webp",
    imageAlt: "Modelo con jean azul índigo de corte amplio de KAJÚ",
    name: "Jean de corte amplio",
    detail: "Corte amplio · Tiro alto · Índigo clásico",
    href: "/catalogo?categoria=jeans",
  },
  {
    id: "campaign-cargo",
    image: "/brand/campaign/kaju-jeans-cargo.webp",
    imageAlt: "Modelo con jean cargo azul índigo de KAJÚ",
    name: "Jean con bolsillos cargo",
    detail: "Bolsillos laterales · Calce relajado · Estilo urbano",
    href: "/catalogo?categoria=jeans",
  },
  {
    id: "campaign-oxford",
    image: "/brand/campaign/kaju-jeans-oxford.webp",
    imageAlt: "Modelo con jean Oxford azul índigo de KAJÚ",
    name: "Jean Oxford",
    detail: "Pierna semi acampanada · Tiro medio-alto · Índigo",
    href: "/catalogo?categoria=jeans",
  },
];

const availabilityLabels = {
  available: "Disponible",
  ask_stock: "Consultar disponibilidad",
  sold_out: "Agotado",
} as const;

export default async function Home() {
  const [newArrivalProducts, featuredProducts] = await Promise.all([
    getNewArrivalProducts(),
    getFeaturedProducts(),
  ]);
  const newArrivals = newArrivalProducts.slice(0, 4);
  const featuredJeans: HomeHeroSlide[] = featuredProducts
    .filter((product) => product.category === "jeans" && product.images.length > 0)
    .sort(
      (first, second) =>
        (first.featuredOrder ?? 0) - (second.featuredOrder ?? 0) ||
        second.createdAt.getTime() - first.createdAt.getTime(),
    )
    .slice(0, 5)
    .map((product) => {
      const presentation = getProductPresentation(product);
      const primaryImage = presentation.primaryImage;
      if (!primaryImage) return null;
      return {
        id: product.id,
        image: primaryImage.url,
        imageAlt: primaryImage.alt,
        name: presentation.name,
        detail: [presentation.colors[0], availabilityLabels[product.stockStatus]]
          .filter(Boolean)
          .join(" · "),
        href: `/catalogo/${product.slug}`,
      };
    })
    .filter((slide): slide is HomeHeroSlide => slide !== null);
  const heroSlides = featuredJeans.length >= 2 ? featuredJeans : campaignSlides;

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="relative z-0 overflow-x-clip">
        <section className="home-hero">
          <div aria-hidden="true" className="home-hero__wash" />
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <h1 className="home-hero__title">
                Tu próximo jean{" "}
                <span>empieza por el calce.</span>
              </h1>
              <p className="home-hero__description">
                <span className="home-hero__description-desktop">
                  Jeans y prendas urbanas diseñadas para realzar tu silueta todos
                  los días. Encuentra variedad de calces, tiros y lavados con
                  asesoramiento personalizado.
                </span>
                <span className="home-hero__description-mobile">
                  Tres calces urbanos. Desliza, elige tu favorito y consúltanos
                  por disponibilidad.
                </span>
              </p>
              <div className="home-hero__actions">
                <Link
                  className="button button--primary home-hero__cta-primary w-full whitespace-nowrap sm:w-auto sm:min-w-[12rem]"
                  href="/catalogo?categoria=jeans"
                >
                  <span>Explorar colección</span>
                  <span aria-hidden="true" className="home-hero__cta-arrow">
                    →
                  </span>
                </Link>
                <WhatsAppCTA
                  className="home-hero__cta-secondary w-full whitespace-nowrap sm:w-auto sm:min-w-[15rem]"
                  label="Preguntar por disponibilidad"
                  productName="un jean KAJÚ"
                  variant="secondary"
                />
              </div>

              <ul
                aria-label="Pilares y servicio de compra"
                className="home-hero__details"
              >
                <li className="home-hero__badge">
                  <span aria-hidden="true" className="home-hero__badge-index">
                    01
                  </span>
                  <div className="home-hero__badge-content">
                    <strong>Cortes & Calces</strong>
                    <span>Wide leg, cargo y más</span>
                  </div>
                </li>
                <li className="home-hero__badge">
                  <span aria-hidden="true" className="home-hero__badge-index">
                    02
                  </span>
                  <div className="home-hero__badge-content">
                    <strong>Atención 1 a 1</strong>
                    <span>Asesoría por WhatsApp</span>
                    <a
                      aria-label="Escríbenos por WhatsApp"
                      className="home-hero__badge-link"
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        "Hola KAJÚ, vengo de la web. Quiero hacer una consulta.",
                      )}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Hablemos</span>
                      <span
                        aria-hidden="true"
                        className="home-hero__badge-link-arrow"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </li>
                <li className="home-hero__badge">
                  <span aria-hidden="true" className="home-hero__badge-index">
                    03
                  </span>
                  <div className="home-hero__badge-content">
                    <strong>Envíos nacionales</strong>
                    <span>CABA y todo el país</span>
                  </div>
                </li>
              </ul>
            </div>

            <HomeHeroCarousel slides={heroSlides} />
          </div>
        </section>

        <DiscoverStyle />

        {newArrivals.length > 0 ? (
          <section
            aria-labelledby="ultimos-ingresos-heading"
            className="home-latest relative z-10 mx-auto w-full max-w-[1440px] overflow-hidden px-5 py-20 sm:px-8 md:py-24 lg:px-16 lg:py-28"
          >
            <div className="relative z-10 mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <h2
                  className="editorial-heading text-[32px] md:text-[44px]"
                  id="ultimos-ingresos-heading"
                >
                  Últimos ingresos
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-secondary)] md:text-base">
                  Prendas recién llegadas al local, con disponibilidad actualizada.
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

            <div className="relative z-10">
              <ProductGrid products={newArrivals} />
            </div>
          </section>
        ) : null}

        <InstagramCardStackCarousel />
      </main>
      <Footer />
    </div>
  );
}
