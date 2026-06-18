import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getProductsByCategory,
  getVisibleProducts,
} from "@/features/catalog/catalog.service";
import type { ProductCategory } from "@/types/product";
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

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.categoria;
  const selectedCategory =
    typeof categoryParam === "string" && isProductCategory(categoryParam)
      ? categoryParam
      : undefined;
  const products = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : getVisibleProducts();

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="w-full pb-[120px]">
        <header className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-[120px] text-center md:px-16 md:text-left">
          <h1 className="editorial-title mb-4 text-5xl text-[#000000] md:text-[80px]">
            The Curated
            <br />
            <span className="text-[#747878]">Collection.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-[1.6] text-[#444748] md:mx-0">
            Una selección asimétrica de piezas esenciales. Paletas tonales,
            texturas urbanas y prendas pensadas para elevar el uso diario.
          </p>
        </header>

        <div className="sticky top-[72px] z-40 w-full border-y border-[#c4c7c7]/20 bg-[#faf9f7]/95 backdrop-blur">
          <Container className="flex flex-col items-center justify-between gap-2 py-2 md:flex-row">
            <nav aria-label="Filtrar por categoría" className="w-full md:w-auto">
              <ul className="no-scrollbar flex w-full gap-8 overflow-x-auto pb-2 md:w-auto md:pb-0">
                <li>
                  <Link
                    className={[
                      "label-caps pb-1 transition-colors",
                      selectedCategory
                        ? "text-[#444748] hover:text-[#a03d3f]"
                        : "border-b border-[#000000] text-[#000000]",
                    ].join(" ")}
                    href="/catalogo"
                  >
                    All
                  </Link>
                </li>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      className={[
                        "label-caps whitespace-nowrap pb-1 transition-colors",
                        selectedCategory === category
                          ? "border-b border-[#000000] text-[#000000]"
                          : "text-[#444748] hover:text-[#a03d3f]",
                      ].join(" ")}
                      href={`/catalogo?categoria=${category}`}
                    >
                      {categoryLabels[category]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <span className="label-caps text-[#747878]">Talles:</span>
              {["S", "M", "L"].map((size) => (
                <span
                  className="label-caps flex h-8 w-8 items-center justify-center rounded-full border border-[#c4c7c7] text-[#444748]"
                  key={size}
                >
                  {size}
                </span>
              ))}
            </div>
          </Container>
        </div>

        <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 py-8 md:grid-cols-12 md:px-16">
          <div className="md:col-span-12">
            <ProductGrid products={products} variant="editorial" />
          </div>
        </section>

        <Container>
          <div className="border-t border-[#e3e2e0] pt-8">
            <WhatsAppCTA label="Consulta personalizada por WhatsApp" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
