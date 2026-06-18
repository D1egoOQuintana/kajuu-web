import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getProductBySlug,
  getProductsByCategory,
  getVisibleProducts,
} from "@/features/catalog/catalog.service";
import { formatPriceARS } from "@/lib/utils/format-price";
import type {
  ProductCategory,
  ProductImage,
  ProductStockStatus,
} from "@/types/product";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const fallbackImages: ProductImage[] = [
  {
    url: "/products/zara3.webp",
    alt: "Fotografía editorial principal de Kajuu",
    position: 0,
  },
  {
    url: "/products/images.jpg",
    alt: "Fotografía editorial alternativa de Kajuu",
    position: 1,
  },
  {
    url: "/products/images (1).jpg",
    alt: "Detalle editorial alternativo de Kajuu",
    position: 2,
  },
];

const categoryLabels: Record<ProductCategory, string> = {
  jeans: "Denim / Pantalones",
  tops: "Tops / Básicos",
  sweaters: "Knitwear / Abrigos",
  buzos: "Buzos / Urban",
  pantalones: "Sastrería / Pantalones",
  camperas: "Abrigos / Camperas",
  conjuntos: "Looks / Conjuntos",
  accesorios: "Accesorios",
  otros: "Colección",
};

const stockLabels: Record<ProductStockStatus, string> = {
  available: "En stock",
  sold_out: "Agotado",
  ask_stock: "Consultar stock",
};

export function generateStaticParams() {
  return getVisibleProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | Kajuu Indumentaria",
    };
  }

  return {
    title: `${product.name} | Kajuu Indumentaria`,
    description: `${product.description} Consultá disponibilidad por WhatsApp en Kajuu Indumentaria.`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.images.length > 0
      ? [...product.images, ...fallbackImages].slice(0, 3)
      : fallbackImages;
  const mainImage = galleryImages[0];
  const relatedProducts = getProductsByCategory(product.category)
    .filter((relatedProduct) => relatedProduct.id !== product.id)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="flex-grow">
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-[120px]">
          <div className="relative flex flex-col-reverse gap-4 lg:col-span-7 lg:flex-row lg:gap-8">
            <div className="no-scrollbar flex shrink-0 gap-4 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
              {galleryImages.map((image, index) => (
                <div
                  className={[
                    "relative h-24 w-20 shrink-0 bg-[#efeeec] lg:h-32 lg:w-full",
                    index === 0
                      ? "border border-[#000000]"
                      : "border border-transparent hover:border-[#c4c7c7]",
                  ].join(" ")}
                  key={`${image.url}-${index}`}
                >
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    height={160}
                    src={image.url}
                    width={120}
                  />
                  <span className="absolute inset-0 bg-[#faf9f7]/20 transition-colors hover:bg-transparent" />
                </div>
              ))}
            </div>

            <div className="image-container relative flex-grow bg-[#efeeec] lg:h-[819px]">
              <Image
                alt={mainImage.alt}
                className="h-full w-full object-cover object-center"
                height={1200}
                priority
                src={mainImage.url}
                width={900}
              />
            </div>
          </div>

          <aside className="flex flex-col gap-8 pt-8 lg:sticky lg:top-32 lg:col-span-5 lg:h-fit lg:pl-8 lg:pt-0">
            <div className="flex flex-col gap-2">
              <Link
                className="label-caps w-fit text-[#444748] transition-colors hover:text-[#000000]"
                href="/catalogo"
              >
                Catálogo
              </Link>
              <span className="label-caps text-[#444748]">
                {categoryLabels[product.category]}
              </span>
              <h1 className="editorial-heading text-[32px] text-[#1a1c1b] lg:text-[48px]">
                {product.name}
              </h1>
              <p className="mt-2 text-lg leading-[1.6] text-[#444748]">
                {formatPriceARS(product.price)}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                <p className="text-base font-medium text-[#000000]">
                  {stockLabels[product.stockStatus]}
                </p>
                <p className="text-base leading-[1.6] text-[#444748]">
                  Entregas en CABA y punto Floresta a coordinar.
                </p>
              </div>
            </div>

            <p className="text-base leading-[1.6] text-[#444748]">
              {product.description}
            </p>

            <div className="flex flex-col gap-3">
              <span className="label-caps text-[#1a1c1b]">
                Color: {product.colors[0]}
              </span>
              <div className="flex gap-4">
                {product.colors.map((color, index) => (
                  <span
                    aria-label={color}
                    className={[
                      "h-8 w-8 rounded-full border ring-2 ring-transparent ring-offset-2 ring-offset-[#faf9f7]",
                      index === 0
                        ? "border-[#000000] bg-[#a3c1d4]"
                        : "border-[#c4c7c7] bg-[#2f3130]",
                    ].join(" ")}
                    key={color}
                    role="img"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex w-full items-center justify-between">
                <span className="label-caps text-[#1a1c1b]">Talle</span>
                <Link
                  className="label-caps text-[#444748] underline decoration-[#c4c7c7] transition-colors hover:text-[#000000]"
                  href="/guia-talles"
                >
                  Guía de Talles
                </Link>
              </div>
              <div className="mt-2 flex flex-wrap gap-4">
                {product.sizes.map((size, index) => (
                  <span className="group relative pb-1" key={size}>
                    <span
                      className={[
                        "label-caps transition-colors",
                        index === 1 ? "text-[#000000]" : "text-[#444748]",
                      ].join(" ")}
                    >
                      {size}
                    </span>
                    <span
                      className={[
                        "absolute bottom-0 left-0 h-px w-full origin-left bg-[#000000] transition-transform",
                        index === 1 ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-[#c4c7c7]/30 pt-4">
              <WhatsAppCTA
                className="w-full justify-between px-6"
                label="Consultar por WhatsApp"
                productName={product.name}
                size="lg"
                variant="secondary"
              />
              <p className="label-caps mt-4 text-center text-[#444748]">
                Bespoke Assistance · Asesoramiento personalizado
              </p>
            </div>

            <div className="mt-4 flex flex-col">
              {[
                {
                  title: "Entregas y cambios",
                  body: "Coordinamos entregas en CABA y punto Floresta. Los cambios se revisan según disponibilidad de talle, color y estado de la prenda.",
                },
                {
                  title: "Cuidados de la prenda",
                  body: "Lavar con colores similares, secar a la sombra y evitar calor directo para preservar textura y color.",
                },
              ].map((item) => (
                <details
                  className="group border-b border-[#c4c7c7]/30 py-4"
                  key={item.title}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <span className="label-caps text-[#1a1c1b]">
                      {item.title}
                    </span>
                    <span className="text-[#444748] transition-transform group-open:rotate-180">
                      +
                    </span>
                  </summary>
                  <p className="pt-4 text-base leading-[1.6] text-[#444748]">
                    {item.body}
                  </p>
                </details>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-t border-[#c4c7c7]/20 bg-[#faf9f7]">
          <div className="mx-auto max-w-[1440px] px-5 py-[120px] lg:px-16">
            <div className="mb-8 flex flex-col items-center text-center">
              <span className="label-caps mb-2 text-[#444748]">Editorial</span>
              <h2 className="editorial-heading text-[32px] text-[#1a1c1b]">
                Completa el Look
              </h2>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
