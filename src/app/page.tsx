import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getFeaturedProducts,
  getNewArrivalProducts,
} from "@/features/catalog/catalog.service";

export const metadata: Metadata = {
  title: "Kajuu Indumentaria | Catálogo boutique femenino",
  description:
    "Kajuu es un catálogo boutique de indumentaria femenina urbana. Descubrí últimos ingresos y consultá stock por WhatsApp.",
};

const imagePool = [
  "/products/zara3.webp",
  "/products/images.jpg",
  "/products/images (1).jpg",
  "/products/450e.avif",
] as const;

const categoryHighlights = [
  {
    href: "/catalogo?categoria=pantalones",
    label: "Sastrería Urbana",
    image: imagePool[2],
    alt: "Look editorial de sastrería urbana Kajuu",
  },
  {
    href: "/catalogo?categoria=tops",
    label: "Básicos Esenciales",
    image: imagePool[3],
    alt: "Look editorial de básicos esenciales Kajuu",
  },
  {
    href: "/catalogo?categoria=camperas",
    label: "Abrigos",
    image: imagePool[1],
    alt: "Look editorial de abrigos Kajuu",
  },
] as const;

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivalProducts().slice(0, 4);
  const instagramItems = [...newArrivals, ...featuredProducts].slice(0, 4);
  const marqueeItems = [...instagramItems, ...instagramItems];

  return (
    <div className="min-h-screen bg-[#fff8f1] text-[#2e2a27]">
      <PublicHeader />
      <main>
        <section className="mx-auto w-full max-w-[1440px] px-5 py-7 md:px-16 md:py-10 lg:py-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8">
            <div className="z-10 mb-6 flex flex-col justify-center md:col-span-6 md:col-start-1 md:mb-0">
              <h1 className="editorial-title mb-6 text-5xl text-[#2f140d] md:text-[70px] xl:text-[80px]">
                <span className="block">Kajuu:</span>
                <span className="block italic text-[#8a5a3c] opacity-95 md:ml-12">
                  Elevá tu estilo diario
                </span>
              </h1>
              <p className="mb-7 max-w-md text-base leading-[1.65] text-[#5f5048] sm:text-lg md:ml-12">
                Indumentaria femenina urbana, cómoda y con actitud. Descubrí
                últimos ingresos y consultá stock por WhatsApp.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row md:ml-12">
                <Link
                  className="inline-flex min-h-12 items-center justify-center border border-[#2f140d] bg-[#2f140d] px-8 py-4 text-center text-[14px] font-semibold uppercase tracking-[0.1em] text-[#ffffff] shadow-sm transition-colors duration-300 hover:border-[#7a2e2e] hover:bg-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                  href="/catalogo"
                >
                  Ver catálogo
                </Link>
                <WhatsAppCTA
                  className="bg-[#ffffff]"
                  label="Consultar por WhatsApp"
                  variant="secondary"
                />
              </div>
            </div>

            <div className="image-container relative md:col-span-6 md:col-start-7">
              <div className="pointer-events-none absolute inset-0 z-10 bg-[#8a5a3c]/10 mix-blend-multiply" />
              <Image
                alt="Fotografía editorial de moda Kajuu en blanco y negro"
                className="h-[400px] w-full object-cover object-center sepia-[0.08] md:h-[540px] lg:h-[600px]"
                height={1500}
                priority
                src="/products/zara3.webp"
                width={1200}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-5 md:px-16">
          <div className="rounded-t-[28px] bg-[#f4eee8] px-5 py-12 sm:px-8 md:px-12 md:py-14 lg:px-16">
            <div className="mb-8 text-center">
              <h2 className="editorial-heading text-[32px] italic text-[#2f140d] md:text-[48px]">
                Descubrí tu estilo
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-[#8a5a3c]" />
            </div>

            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
              {categoryHighlights.map((category, index) => (
                <Link
                  className={[
                    "group block",
                    index === 1 ? "md:translate-y-5" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={category.href}
                  key={category.href}
                >
                  <div className="image-container mb-4 aspect-[5/6] max-h-[420px] bg-[#e8d6c0]">
                    <Image
                      alt={category.alt}
                      className="h-full w-full object-cover sepia-[0.08]"
                      height={840}
                      src={category.image}
                      width={700}
                    />
                  </div>
                  <h3 className="editorial-heading text-center text-[29px] text-[#2f140d] transition-colors group-hover:text-[#8a5a3c] md:text-[32px]">
                    {category.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-5 py-20 md:px-16 md:py-24">
          <div className="mb-8 flex flex-col items-start justify-between border-b border-[#e7d8cc] pb-4 md:flex-row md:items-end">
            <div>
              <h2 className="editorial-heading text-[32px] italic text-[#2f140d] md:text-[48px]">
                Shop the Look
              </h2>
              <p className="mt-2 text-base leading-[1.6] text-[#5f5048]">
                Conjuntos estilizados para tu día a día.
              </p>
            </div>
            <Link
              className="label-caps mt-4 text-[#2f140d] transition-colors hover:text-[#8a5a3c] md:mt-0"
              href="/catalogo"
            >
              Ver Todos
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>

        <section className="w-full border-t border-[#e7d8cc] bg-[#fffdf9] py-8">
          <Container className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="editorial-heading text-[32px] text-[#2f140d]">
              Encontranos en Instagram
            </h2>
            <a
              className="text-[14px] font-medium uppercase tracking-[0.1em] text-[#8a5a3c] transition-colors hover:text-[#2f140d]"
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              @kajuu.indumentaria
            </a>
          </Container>

          <div className="instagram-marquee-frame h-44 w-full md:h-64">
            <div
              aria-label="Pasarela de imágenes de Instagram de Kajuu"
              className="instagram-marquee-track"
            >
              {marqueeItems.map((product, index) => {
                const isDuplicate = index >= instagramItems.length;

                return (
                  <Link
                    aria-hidden={isDuplicate}
                    className="instagram-marquee-item image-container bg-[#f4eee8]"
                    href={`/catalogo/${product.slug}`}
                    key={`${product.id}-${index}`}
                    tabIndex={isDuplicate ? -1 : undefined}
                  >
                    <Image
                      alt={isDuplicate ? "" : (product.images[0]?.alt ?? product.name)}
                      className="h-full w-full object-cover sepia-[0.08]"
                      height={640}
                      src={
                        product.images[0]?.url ??
                        imagePool[index % imagePool.length]
                      }
                      width={480}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
