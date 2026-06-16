import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getProductsByCategory,
  getVisibleProducts,
} from "@/features/catalog/catalog.service";
import type { Product, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/types/product";

export const metadata: Metadata = {
  title: "Catálogo | Kajuu Indumentaria",
  description:
    "Explorá el catálogo visible de Kajuu Indumentaria por categoría y consultá stock por WhatsApp.",
};

type CatalogPageProps = {
  searchParams?: Promise<{
    categoria?: string | string[];
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

function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

function productsWithSafePlaceholders(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    images: [],
  }));
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.categoria;
  const selectedCategory =
    typeof categoryParam === "string" && isProductCategory(categoryParam)
      ? categoryParam
      : undefined;
  const products = productsWithSafePlaceholders(
    selectedCategory
      ? getProductsByCategory(selectedCategory)
      : getVisibleProducts(),
  );

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-[#2E2A27]">
      <PublicHeader />
      <main>
        <section className="border-b border-[#E7D8CC]">
          <Container className="py-12 sm:py-16">
            <Badge variant="neutral">Catálogo</Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#3A2418] sm:text-5xl">
              Prendas seleccionadas para consultar directo por WhatsApp.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B5A50]">
              Explorá productos visibles, filtrá por categoría y abrí la ficha
              para ver talles, colores y disponibilidad.
            </p>
            <div className="mt-6">
              <WhatsAppCTA label="Consulta general por WhatsApp" />
            </div>
          </Container>
        </section>

        <Container className="py-8 sm:py-10">
          <nav aria-label="Filtrar por categoría">
            <ul className="flex gap-2 overflow-x-auto pb-2">
              <li>
                <Link
                  className={[
                    "inline-flex min-h-10 items-center whitespace-nowrap border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]",
                    selectedCategory
                      ? "border-[#E7D8CC] bg-white text-[#3A2418] hover:bg-[#E8D6C0]/45"
                      : "border-[#3A2418] bg-[#3A2418] text-[#FFF8F1]",
                  ].join(" ")}
                  href="/catalogo"
                >
                  Todas
                </Link>
              </li>
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    className={[
                      "inline-flex min-h-10 items-center whitespace-nowrap border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]",
                      selectedCategory === category
                        ? "border-[#3A2418] bg-[#3A2418] text-[#FFF8F1]"
                        : "border-[#E7D8CC] bg-white text-[#3A2418] hover:bg-[#E8D6C0]/45",
                    ].join(" ")}
                    href={`/catalogo?categoria=${category}`}
                  >
                    {categoryLabels[category]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>

        <Container className="pb-14 sm:pb-20">
          <ProductGrid products={products} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
