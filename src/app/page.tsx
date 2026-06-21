import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  InstagramCardStackCarousel,
  type InstagramCardStackItem,
} from "@/components/home/instagram-card-stack-carousel";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { getNewArrivalProducts } from "@/features/catalog/catalog.service";

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

const instagramCards: InstagramCardStackItem[] = [
  {
    href: "/catalogo/jean-wide-leg-celeste",
    imageSrc: "/products/zara3.webp",
    imageAlt: "Look editorial Kajuu con sastrería negra",
    eyebrow: "New mood",
    title: "Siluetas urbanas",
  },
  {
    href: "/catalogo/top-morley-bordo",
    imageSrc: "/products/450e.avif",
    imageAlt: "Retrato editorial Kajuu con textura negra",
    eyebrow: "Texturas",
    title: "Básicos con carácter",
  },
  {
    href: "/catalogo/campera-negra-urbana",
    imageSrc: "/products/images.jpg",
    imageAlt: "Look editorial Kajuu en blazer negro",
    eyebrow: "Abrigos",
    title: "Capas para la ciudad",
  },
  {
    href: "/catalogo/pantalon-sastrero-negro",
    imageSrc: "/products/images (1).jpg",
    imageAlt: "Editorial Kajuu de sastrería frente al mar",
    eyebrow: "Sastrería",
    title: "Negro esencial",
  },
  {
    href: "/catalogo/sweater-tejido-chocolate",
    imageSrc: "/products/zara3.webp",
    imageAlt: "Inspiración editorial Kajuu para prendas tejidas",
    eyebrow: "Knit",
    title: "Calidez pulida",
  },
  {
    href: "/catalogo/remera-vintage",
    imageSrc: "/products/450e.avif",
    imageAlt: "Inspiración Kajuu para básicos vintage",
    eyebrow: "Daily",
    title: "Look de todos los días",
  },
  {
    href: "/catalogo/cargo-denim",
    imageSrc: "/products/images.jpg",
    imageAlt: "Inspiración Kajuu de denim urbano",
    eyebrow: "Denim",
    title: "Actitud relajada",
  },
  {
    href: "/catalogo/conjunto-gris-y-negro",
    imageSrc: "/products/images (1).jpg",
    imageAlt: "Inspiración Kajuu para conjunto gris y negro",
    eyebrow: "Set",
    title: "Conjunto resuelto",
  },
];

export default function Home() {
  const newArrivals = getNewArrivalProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="relative z-0 overflow-x-clip">
        <section className="relative isolate overflow-hidden bg-[#faf9f7] px-5 pb-12 pt-24 sm:pt-28 md:px-10 md:pt-32 lg:px-16 lg:pb-16 lg:pt-36">
          <div className="pointer-events-none absolute inset-y-8 right-0 hidden w-[42%] bg-[#f4f3f1] xl:block" />
          <div className="pointer-events-none absolute left-0 top-16 hidden h-px w-[18vw] bg-[#e7d8cc] xl:block" />

          <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(24rem,1.12fr)] xl:gap-12 2xl:gap-16">
            <div className="z-10 mx-auto flex w-full max-w-[38rem] flex-col justify-center xl:mx-0 xl:max-w-[36rem] 2xl:max-w-[41rem]">
              <div className="mb-5 flex items-center gap-3 xl:ml-1">
                <p className="label-caps text-[#7a2e2e]">Nueva selección</p>
                <span className="h-px w-12 bg-[#c98b7a]/70" />
              </div>

              <h1 className="editorial-title mb-5 text-[clamp(2.85rem,9vw,4.15rem)] leading-[1.03] text-[#2f140d] xl:text-[clamp(4.2rem,5.15vw,5.7rem)]">
                <span className="block">Kajuu:</span>
                <span className="block italic text-[#8a5a3c] opacity-95 xl:ml-10 2xl:ml-12">
                  Elevá tu estilo diario
                </span>
              </h1>
              <p className="mb-7 max-w-[34rem] text-base leading-[1.65] text-[#5f5048] sm:text-lg xl:ml-10 xl:max-w-[30rem] 2xl:ml-12">
                Indumentaria femenina urbana, cómoda y con actitud. Descubrí
                últimos ingresos y consultá stock por WhatsApp.
              </p>
              <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap xl:ml-10 2xl:ml-12">
                <Link
                  className="inline-flex min-h-12 w-full min-w-[10.5rem] items-center justify-center whitespace-nowrap border border-[#2f140d] bg-[#e8d6c0] px-7 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2f140d] shadow-[0_10px_24px_-12px_rgba(47,20,13,0.28)] transition-all duration-300 hover:bg-[#d4bf9f] hover:shadow-[0_14px_28px_-12px_rgba(47,20,13,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] sm:w-auto"
                  href="/catalogo"
                >
                  Ver catálogo
                </Link>
                <WhatsAppCTA
                  className="!min-h-[3.5rem] w-full whitespace-nowrap border-[#2f140d]/35 bg-[#faf9f7]/90 text-[#2f140d] hover:!border-[#7a2e2e] hover:!bg-[#f4f3f1] sm:w-auto sm:min-w-[15rem]"
                  label="Consultar por WhatsApp"
                  variant="secondary"
                />
              </div>

              <div className="mt-8 hidden items-center gap-4 xl:ml-10 xl:flex 2xl:ml-12">
                <span className="h-px w-16 bg-[#8c7a6b]/60" />
                <p className="label-caps text-[#8c7a6b]">Kajuu Indumentaria</p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[34rem] xl:mx-0 xl:max-w-[36rem] xl:justify-self-end 2xl:max-w-[39rem]">
              <div className="absolute -left-4 top-8 hidden h-[78%] w-[44%] bg-[#e8d6c0]/55 sm:block xl:-left-6" />
              <div className="absolute -right-3 -top-3 h-28 w-24 border border-[#c98b7a]/45 xl:-right-5 xl:h-36 xl:w-32" />
              <div className="pointer-events-none absolute -bottom-5 left-8 hidden h-px w-28 bg-[#8c7a6b]/50 xl:block" />

              <figure className="relative z-10 border border-[#e7d8cc] bg-[#faf9f7] p-2 shadow-[0_18px_50px_rgba(47,20,13,0.10)] sm:p-3">
                <div className="image-container relative overflow-hidden bg-[#e8d6c0]">
                  <div className="pointer-events-none absolute inset-0 z-10 bg-[#8a5a3c]/10 mix-blend-multiply" />
                  <Image
                    alt="Fotografía editorial de moda Kajuu en blanco y negro"
                    className="h-[min(56vh,380px)] w-full object-cover object-[50%_center] sepia-[0.08] sm:h-[450px] lg:h-[480px] xl:h-[min(70vh,640px)] xl:min-h-[540px]"
                    height={1500}
                    priority
                    src="/products/zara3.webp"
                    width={1200}
                  />
                </div>

                <figcaption className="absolute bottom-5 left-5 z-20 border border-[#faf9f7]/45 bg-[#2f140d]/78 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#faf9f7] backdrop-blur-sm">
                  Floresta / CABA
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#f4f3f1] py-12 md:py-14 lg:py-16">
          <Container>
            <div className="mb-8 text-center md:mb-10">
              <h2 className="editorial-heading text-[32px] italic text-[#1a1c1b] md:text-[48px]">
                Descubrí tu estilo
              </h2>
              <div className="mx-auto mt-5 h-px w-12 bg-[#8c7a6b]" />
            </div>

            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-10">
              {categoryHighlights.map((category, index) => (
                <Link
                  className={[
                    "group block text-center",
                    index === 1 ? "md:translate-y-8" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href={category.href}
                  key={category.href}
                >
                  <div className="image-container mx-auto mb-5 aspect-[4/5] w-full max-w-[360px] bg-[#efeeec]">
                    <Image
                      alt={category.alt}
                      className="h-full w-full object-cover sepia-[0.08]"
                      height={900}
                      src={category.image}
                      width={720}
                    />
                  </div>
                  <h3 className="editorial-heading mx-auto max-w-[360px] text-[26px] text-[#1a1c1b] transition-colors group-hover:text-[#8c7a6b] md:text-[30px]">
                    {category.label}
                  </h3>
                  <span aria-hidden="true" className="mx-auto mt-3 block h-px w-10 bg-[#c98b7a]/60 transition-all duration-300 group-hover:w-16 group-hover:bg-[#8a5a3c]" />
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {newArrivals.length > 0 ? (
          <section
            aria-labelledby="ultimos-ingresos-heading"
            className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 pt-20 md:px-16 md:pb-24 md:pt-24"
          >
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#e7d8cc] pb-5 md:mb-14">
              <h2
                className="editorial-heading text-[32px] italic text-[#2f140d] md:text-[44px]"
                id="ultimos-ingresos-heading"
              >
                Últimos ingresos
              </h2>
              <Link
                aria-label="Ver todos los últimos ingresos"
                className="label-caps inline-flex shrink-0 items-center gap-2 border-b border-[#2f140d] pb-1 text-[#2f140d] transition-colors hover:border-[#7a2e2e] hover:text-[#7a2e2e]"
                href="/catalogo?filter=new"
              >
                Ver todos
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ProductGrid products={newArrivals} />
          </section>
        ) : null}

        <InstagramCardStackCarousel cards={instagramCards} />
      </main>
      <Footer />
    </div>
  );
}
