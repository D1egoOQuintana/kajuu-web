import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
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
import type { Product, ProductCategory, ProductStockStatus } from "@/types/product";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryLabels: Record<ProductCategory, string> = {
  jeans: "Jeans",
  tops: "Tops",
  sweaters: "Sweaters",
  buzos: "Buzos",
  pantalones: "Pantalones",
  camperas: "Camperas",
  conjuntos: "Conjuntos",
  accesorios: "Accesorios",
  otros: "Otros",
};

const stockLabels: Record<ProductStockStatus, string> = {
  available: "Disponible",
  sold_out: "Agotado",
  ask_stock: "Consultar stock",
};

const stockBadgeVariant: Record<
  ProductStockStatus,
  "available" | "soldOut" | "askStock"
> = {
  available: "available",
  sold_out: "soldOut",
  ask_stock: "askStock",
};

function productsWithSafePlaceholders(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    images: [],
  }));
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

  const relatedProducts = productsWithSafePlaceholders(
    getProductsByCategory(product.category)
      .filter((relatedProduct) => relatedProduct.id !== product.id)
      .slice(0, 4),
  );

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#2E2A27]">
      <PublicHeader />
      <main>
        <Container className="py-8 sm:py-12 lg:py-16">
          <Link
            className="text-sm font-medium text-[#7A2E2E] hover:text-[#3A2418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
            href="/catalogo"
          >
            Volver al catálogo
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <section aria-label={`Galería de ${product.name}`}>
              <div className="aspect-[4/5] border border-[#E7D8CC] bg-[#E8D6C0]/45 p-4">
                <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,#FFF8F1_0%,#E8D6C0_58%,#C98B7A_100%)] p-6">
                  <Badge variant={stockBadgeVariant[product.stockStatus]} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A2E2E]">
                      Imagen de referencia pendiente
                    </p>
                    <p className="mt-3 max-w-md text-4xl font-semibold leading-tight text-[#3A2418]">
                      {product.name}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="product-title">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A5A3C]">
                {categoryLabels[product.category]}
              </p>
              <h1
                className="mt-3 text-4xl font-semibold leading-tight text-[#3A2418] sm:text-5xl"
                id="product-title"
              >
                {product.name}
              </h1>
              <p className="mt-4 text-2xl font-semibold text-[#2E2A27]">
                {formatPriceARS(product.price)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant={stockBadgeVariant[product.stockStatus]}>
                  {stockLabels[product.stockStatus]}
                </Badge>
                {product.isNewArrival && <Badge variant="new" />}
                {product.isFeatured && <Badge variant="featured" />}
              </div>

              <p className="mt-6 text-base leading-7 text-[#6B5A50]">
                {product.description}
              </p>

              <div className="mt-8 grid gap-5 border-y border-[#E7D8CC] py-6">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3A2418]">
                    Talles
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <li
                        className="border border-[#E7D8CC] bg-white px-3 py-2 text-sm text-[#3A2418]"
                        key={size}
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3A2418]">
                    Colores
                  </h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <li
                        className="border border-[#E7D8CC] bg-white px-3 py-2 text-sm text-[#3A2418]"
                        key={color}
                      >
                        {color}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <WhatsAppCTA
                  className="w-full sm:w-auto"
                  label="Consultar este producto por WhatsApp"
                  productName={product.name}
                  size="lg"
                />
              </div>
            </section>
          </div>
        </Container>

        <section className="border-t border-[#E7D8CC] bg-white py-12 sm:py-16">
          <Container>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A2E2E]">
                  También puede gustarte
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#3A2418]">
                  Productos relacionados
                </h2>
              </div>
              <Link
                className="text-sm font-medium text-[#7A2E2E] hover:text-[#3A2418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
                href="/catalogo"
              >
                Ver todo el catálogo
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
