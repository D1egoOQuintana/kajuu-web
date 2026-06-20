import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { Badge } from "@/components/ui/badge";
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

type StockBadgeVariant = "available" | "soldOut" | "askStock";

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

const stockBadgeVariants: Record<ProductStockStatus, StockBadgeVariant> = {
  available: "available",
  sold_out: "soldOut",
  ask_stock: "askStock",
};

const colorSwatches: Record<string, string> = {
  azul: "bg-[#7da3b8]",
  blanco: "bg-[#f7f1e8]",
  bordó: "bg-[#7a2e2e]",
  celeste: "bg-[#9ec5d8]",
  chocolate: "bg-[#5a3428]",
  grafito: "bg-[#4f5454]",
  gris: "bg-[#8f8d88]",
  marrón: "bg-[#8a5a3c]",
  negro: "bg-[#1a1c1b]",
  "off white": "bg-[#f5efe4]",
};

const careBlocks = [
  {
    title: "Detalles de la prenda",
    body: "Prenda seleccionada para uso diario con calce cómodo, terminación prolija y estética urbana. Consultanos por medidas puntuales antes de coordinar.",
  },
  {
    title: "Entregas",
    body: "Coordinamos entregas en CABA y punto de encuentro en Floresta. Los tiempos se confirman por WhatsApp según disponibilidad.",
  },
  {
    title: "Cambios y talles",
    body: "Los cambios se revisan según estado de la prenda y disponibilidad de talle o color. Si tenés dudas, te ayudamos a elegir antes de reservar.",
  },
] as const;

function getColorSwatchClass(color: string): string {
  const normalizedColor = color.toLowerCase();
  const matchedColor = Object.keys(colorSwatches).find((knownColor) =>
    normalizedColor.includes(knownColor),
  );

  return matchedColor ? colorSwatches[matchedColor] : "bg-[#e8d6c0]";
}

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
      ? [...product.images, ...fallbackImages].slice(0, 4)
      : fallbackImages;
  const mainImage = galleryImages[0];
  const relatedProducts = getProductsByCategory(product.category)
    .filter((relatedProduct) => relatedProduct.id !== product.id)
    .slice(0, 3);
  const visibleRelatedProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : getVisibleProducts()
          .filter((relatedProduct) => relatedProduct.id !== product.id)
          .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="flex-grow">
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-8 md:px-16 lg:grid-cols-[minmax(0,7fr)_minmax(22rem,5fr)] lg:gap-12 lg:py-24">
          <div className="relative flex flex-col-reverse gap-4 lg:flex-row lg:gap-8">
            <div className="no-scrollbar flex shrink-0 gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-visible">
              {galleryImages.map((image, index) => (
                <div
                  className={[
                    "relative h-24 w-20 shrink-0 border bg-[#efeeec] lg:h-32 lg:w-full",
                    index === 0
                      ? "border-[#2f140d]"
                      : "border-[#e7d8cc] opacity-85",
                  ].join(" ")}
                  key={`${image.url}-${index}`}
                >
                  <Image
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    height={180}
                    src={image.url}
                    width={140}
                  />
                  <span className="absolute inset-0 bg-[#faf9f7]/20 transition-colors hover:bg-transparent" />
                </div>
              ))}
            </div>

            <figure className="image-container relative min-h-[420px] flex-grow border border-[#e7d8cc]/70 bg-[#efeeec] md:min-h-[620px] lg:min-h-[760px]">
              <Image
                alt={mainImage.alt}
                className="h-full w-full object-cover object-center sepia-[0.08]"
                height={1300}
                priority
                src={mainImage.url}
                width={980}
              />
              <figcaption className="absolute bottom-4 left-4 border border-[#faf9f7]/60 bg-[#2f140d]/78 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#faf9f7] backdrop-blur-sm">
                Kajuu editorial
              </figcaption>
            </figure>
          </div>

          <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:h-fit lg:pt-4">
            <div>
              <Link
                className="label-caps mb-3 inline-flex text-[#8a5a3c] transition-colors hover:text-[#7a2e2e]"
                href="/catalogo"
              >
                Volver al catálogo
              </Link>
              <p className="label-caps mb-3 text-[#5f5048]">
                {categoryLabels[product.category]}
              </p>
              <h1 className="editorial-heading text-[clamp(2.45rem,9vw,3.65rem)] leading-[1.05] text-[#2f140d]">
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-[#2f140d]">
                {formatPriceARS(product.price)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant={stockBadgeVariants[product.stockStatus]} />
                {product.isNewArrival ? <Badge variant="new" /> : null}
                {product.isFeatured ? <Badge variant="featured" /> : null}
              </div>
            </div>

            <div className="border-y border-[#e7d8cc] py-6">
              <p className="text-base leading-[1.75] text-[#5f5048]">
                {product.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#5f5048]">
                {stockLabels[product.stockStatus]}. Entregas en CABA y punto
                Floresta a coordinar.
              </p>
            </div>

            <div className="space-y-6">
              <section aria-labelledby="product-colors">
                <h2 className="label-caps mb-3 text-[#1a1c1b]" id="product-colors">
                  Colores
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      className="inline-flex items-center gap-2 border border-[#e7d8cc] bg-[#faf9f7] px-3 py-2 text-xs text-[#5f5048]"
                      key={color}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "h-4 w-4 rounded-full border border-[#2f140d]/20",
                          getColorSwatchClass(color),
                        ].join(" ")}
                      />
                      {color}
                    </span>
                  ))}
                </div>
              </section>

              <section aria-labelledby="product-sizes">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 className="label-caps text-[#1a1c1b]" id="product-sizes">
                    Talles
                  </h2>
                  <Link
                    className="label-caps text-[#5f5048] underline decoration-[#c98b7a] transition-colors hover:text-[#7a2e2e]"
                    href="/guia-talles"
                  >
                    Guía de talles
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      className="label-caps inline-flex min-h-10 min-w-10 items-center justify-center border border-[#d8c6b8] bg-[#faf9f7] px-3 text-[#2f140d]"
                      key={size}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div>
              <WhatsAppCTA
                className="w-full justify-center !min-h-14 !text-[0.78rem]"
                label="Consultar por WhatsApp"
                productName={product.name}
                size="lg"
              />
              <p className="label-caps mt-4 text-center text-[#8c7a6b]">
                Asesoramiento personalizado
              </p>
            </div>

            <div className="flex flex-col">
              {careBlocks.map((item) => (
                <details
                  className="group border-b border-[#e7d8cc] py-4"
                  key={item.title}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="label-caps text-[#1a1c1b]">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none text-[#8a5a3c] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pt-4 text-sm leading-7 text-[#5f5048]">
                    {item.body}
                  </p>
                </details>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-t border-[#e7d8cc] bg-[#faf9f7]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-16 lg:py-24">
            <div className="mb-10 flex flex-col items-center text-center">
              <span className="label-caps mb-3 text-[#8a5a3c]">Editorial</span>
              <h2 className="editorial-heading text-[32px] text-[#2f140d] md:text-[44px]">
                Completa el look
              </h2>
            </div>
            <ProductGrid products={visibleRelatedProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
