import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductConsultPanel } from "@/components/product/product-consult-panel";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import {
  getProductBySlug,
  getProductsByCategory,
  getVisibleProducts,
} from "@/features/catalog/catalog.service";
import { absoluteUrl, CATEGORY_LABELS, SITE_URL } from "@/lib/site";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { ProductImage, ProductStockStatus } from "@/types/product";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const fallbackImages: ProductImage[] = [
  {
    url: "/products/zara3.webp",
    alt: "Fotografía editorial principal de KAJÚ",
    position: 0,
  },
  {
    url: "/products/images.jpg",
    alt: "Fotografía editorial alternativa de KAJÚ",
    position: 1,
  },
  {
    url: "/products/images (1).jpg",
    alt: "Detalle editorial alternativo de KAJÚ",
    position: 2,
  },
];

const stockLabels: Record<ProductStockStatus, string> = {
  available: "En stock",
  sold_out: "Agotado",
  ask_stock: "Consultar stock",
};

const colorSwatches: Record<string, string> = {
  azul: "bg-[#7da3b8]",
  blanco: "bg-[#f7f1e8]",
  bordó: "bg-[var(--brand)]",
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
    body: "Prenda seleccionada para uso diario con ajuste cómodo, terminación prolija y estética urbana. Consúltanos por medidas puntuales antes de coordinar.",
  },
  {
    title: "Entregas",
    body: "Coordinamos entregas en CABA y punto de encuentro en Floresta. Los tiempos se confirman por WhatsApp según disponibilidad.",
  },
  {
    title: "Cambios y tallas",
    body: "Los cambios se revisan según estado de la prenda y disponibilidad de talla o color. Si tienes dudas, te ayudamos a elegir antes de reservar.",
  },
] as const;

function getColorSwatchClass(color: string): string {
  const normalizedColor = color.toLowerCase();
  const matchedColor = Object.keys(colorSwatches).find((knownColor) =>
    normalizedColor.includes(knownColor),
  );

  return matchedColor ? colorSwatches[matchedColor] : "bg-[var(--surface-emphasis)]";
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const primaryImage =
    [...product.images].sort((a, b) => a.position - b.position).at(0) ??
    fallbackImages[0];
  const path = `/catalogo/${product.slug}`;
  const description = `${product.description} Consulta disponibilidad por WhatsApp en KAJÚ Indumentaria.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${product.name} | KAJÚ Indumentaria`,
      description: product.description,
      url: path,
      type: "website",
      images: [{ url: primaryImage.url, alt: primaryImage.alt }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.images.length > 0
      ? [...product.images].sort((a, b) => a.position - b.position)
      : [fallbackImages[0]];
  const relatedProducts = (await getProductsByCategory(product.category))
    .filter((relatedProduct) => relatedProduct.id !== product.id)
    .slice(0, 3);
  const visibleRelatedProducts =
    relatedProducts.length > 0
      ? relatedProducts
      : (await getVisibleProducts())
          .filter((relatedProduct) => relatedProduct.id !== product.id)
          .slice(0, 3);

  const ldPrimaryImage =
    [...product.images].sort((a, b) => a.position - b.position).at(0) ??
    fallbackImages[0];
  const availability =
    product.stockStatus === "sold_out"
      ? "https://schema.org/OutOfStock"
      : product.stockStatus === "ask_stock"
        ? "https://schema.org/LimitedAvailability"
        : "https://schema.org/InStock";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(ldPrimaryImage.url),
    brand: { "@type": "Brand", name: "KAJÚ Indumentaria" },
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability,
      url: `${SITE_URL}/catalogo/${product.slug}`,
    },
  };
  const safeProductJsonLd = JSON.stringify(productJsonLd).replace(/</g, "\\u003c");
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background-primary)] text-[var(--text-primary)]">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeProductJsonLd }}
      />
      <PublicHeader />
      <main className="flex-grow">
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pt-28 pb-12 md:px-16 md:pt-36 md:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(22rem,5fr)] lg:gap-12 lg:pt-[136px] lg:pb-24">
          <ProductGallery images={galleryImages} productName={product.name} />

          <aside className="flex flex-col gap-7 lg:sticky lg:top-28 lg:h-fit lg:pt-4">
            <div>
              <Link
                className="label-caps mb-3 inline-flex min-h-11 items-center text-[var(--brand)] transition-colors hover:text-[var(--brand-hover)]"
                href="/catalogo"
              >
                Volver al catálogo
              </Link>
              <p className="label-caps mb-3 text-[var(--text-secondary)]">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="editorial-heading text-[clamp(2.45rem,9vw,3.65rem)] leading-[1.05] text-[var(--text-primary)]">
                {product.name}
              </h1>
              <p className="mt-4 text-xl text-[var(--text-primary)]">
                {formatPriceARS(product.price)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.stockStatus === "sold_out" ? (
                  <Badge variant="soldOut" />
                ) : product.stockStatus === "ask_stock" ? (
                  <Badge variant="askStock" />
                ) : null}
                {product.isNewArrival ? <Badge variant="new" /> : null}
              </div>
            </div>

            <div className="border-y border-[var(--border)] py-6">
              <p className="text-base leading-[1.75] text-[var(--text-secondary)]">
                {product.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {stockLabels[product.stockStatus]}. Entregas en CABA y punto
                Floresta a coordinar.
              </p>
            </div>

            <ProductConsultPanel
              colors={product.colors.map((color) => ({
                name: color,
                swatchClass: getColorSwatchClass(color),
              }))}
              priceLabel={formatPriceARS(product.price)}
              productName={product.name}
              productUrl={`${SITE_URL}/catalogo/${product.slug}`}
              sizes={product.sizes}
            />

            <div className="flex flex-col">
              {careBlocks.map((item) => (
                <details
                  className="group border-b border-[var(--border)] py-4"
                  key={item.title}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="label-caps text-[var(--text-primary)]">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-lg leading-none text-[var(--brand)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </details>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-t border-[var(--border)] bg-[var(--background-primary)]">
          <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-16 lg:py-24">
            <div className="mb-10 flex flex-col items-center text-center">
              <h2 className="editorial-heading text-[32px] text-[var(--text-primary)] md:text-[44px]">
                Completá el look
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
