import type { Metadata } from "next";
import Link from "next/link";

import { SortSelect, type SortOption } from "@/components/catalog/sort-select";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProductGrid } from "@/components/product/product-grid";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import {
  getNewArrivalProducts,
  getProductsByCategory,
  getVisibleProducts,
} from "@/features/catalog/catalog.service";
import type { Product, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/types/product";

const VALID_SORTS: ReadonlySet<SortOption> = new Set([
  "recent",
  "price-asc",
  "price-desc",
]);

function isSortOption(value: string): value is SortOption {
  return VALID_SORTS.has(value as SortOption);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  if (sort === "price-asc") {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
}

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora el catálogo visible de Kajuu Indumentaria por categoría y consulta stock por WhatsApp.",
};

type CatalogPageProps = {
  searchParams?: Promise<{
    categoria?: string | string[];
    filter?: string | string[];
    sort?: string | string[];
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

function readFirstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const filterParam = readFirstParam(resolvedSearchParams?.filter);
  const categoryParam = readFirstParam(resolvedSearchParams?.categoria);
  const sortParam = readFirstParam(resolvedSearchParams?.sort);

  const isNewFilter = filterParam === "new";
  const selectedCategory =
    !isNewFilter && categoryParam && isProductCategory(categoryParam)
      ? categoryParam
      : undefined;
  const selectedSort: SortOption =
    sortParam && isSortOption(sortParam) ? sortParam : "recent";

  const baseProducts = isNewFilter
    ? getNewArrivalProducts()
    : selectedCategory
      ? getProductsByCategory(selectedCategory)
      : getVisibleProducts();
  const products = sortProducts(baseProducts, selectedSort);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="w-full pb-24">
        <header className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36 lg:grid-cols-12 lg:items-end lg:pt-[136px]">
          <div className="lg:col-span-7">
            <h1 className="editorial-title text-[clamp(3rem,11vw,4.5rem)] leading-[1.05] text-[#2f140d] md:text-[68px]">
              {isNewFilter ? "Últimos ingresos" : "Nuestra colección"}
            </h1>
          </div>

          <div className="max-w-xl lg:col-span-5 lg:justify-self-end">
            <p className="text-base leading-[1.75] text-[#5f5048] md:text-lg">
              {isNewFilter
                ? "Las prendas que entraron esta semana al showroom. ¿Te gustó algo? Consúltanos el stock por WhatsApp."
                : "Todo lo que hay en el showroom, actualizado. ¿Te gustó algo? Consúltanos el stock por WhatsApp."}
            </p>
            <p className="mt-4 text-sm text-[#6d5c4e]">
              {products.length === 1
                ? "1 prenda"
                : `${products.length} prendas`}
            </p>
          </div>
        </header>

        <div className="kajuu-filter-bar sticky z-40 w-full border-b border-[#e7d8cc] bg-[#faf9f7] shadow-[0_6px_16px_-12px_rgba(47,20,13,0.25)]">
          <Container className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:py-5">
            <nav
              aria-label="Filtrar el catálogo"
              className="min-w-0 flex-1"
            >
              <ul className="no-scrollbar flex w-full items-center gap-6 overflow-x-auto pb-1 md:gap-7 md:pb-0">
                <li>
                  <Link
                    aria-current={
                      !isNewFilter && !selectedCategory ? "page" : undefined
                    }
                    className={[
                      "label-caps whitespace-nowrap border-b pb-1 transition-colors",
                      !isNewFilter && !selectedCategory
                        ? "border-[#2f140d] text-[#2f140d]"
                        : "border-transparent text-[#5f5048] hover:border-[#c98b7a] hover:text-[#7a2e2e]",
                    ].join(" ")}
                    href="/catalogo"
                  >
                    Todos
                  </Link>
                </li>
                <li>
                  <Link
                    aria-current={isNewFilter ? "page" : undefined}
                    className={[
                      "label-caps whitespace-nowrap border-b pb-1 transition-colors",
                      isNewFilter
                        ? "border-[#7a2e2e] text-[#7a2e2e]"
                        : "border-transparent text-[#5f5048] hover:border-[#c98b7a] hover:text-[#7a2e2e]",
                    ].join(" ")}
                    href="/catalogo?filter=new"
                  >
                    Últimos ingresos
                  </Link>
                </li>
                <li aria-hidden="true" className="shrink-0">
                  <span className="block h-4 w-px bg-[#e7d8cc]" />
                </li>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      aria-current={
                        selectedCategory === category ? "page" : undefined
                      }
                      className={[
                        "label-caps whitespace-nowrap border-b pb-1 transition-colors",
                        selectedCategory === category
                          ? "border-[#2f140d] text-[#2f140d]"
                          : "border-transparent text-[#5f5048] hover:border-[#c98b7a] hover:text-[#7a2e2e]",
                      ].join(" ")}
                      href={`/catalogo?categoria=${category}`}
                    >
                      {categoryLabels[category]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-5 md:gap-6">
              <span
                aria-hidden="true"
                className="hidden h-5 w-px bg-[#e7d8cc] md:block"
              />
              <SortSelect current={selectedSort} />
            </div>
          </Container>
        </div>

        {(isNewFilter || selectedCategory) && (
          <Container className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7d8cc]/60 py-4">
            <p className="label-caps text-[#6d5c4e]">
              Mostrando{" "}
              <span className="text-[#2f140d]">{products.length}</span>{" "}
              {products.length === 1 ? "prenda" : "prendas"}
              <span className="mx-2 text-[#c98b7a]">·</span>
              <span className="text-[#2f140d]">
                {isNewFilter ? "Últimos ingresos" : categoryLabels[selectedCategory!]}
              </span>
            </p>
            <Link
              className="label-caps inline-flex items-center gap-2 border-b border-[#7a2e2e]/40 pb-0.5 text-[#7a2e2e] transition-colors hover:border-[#7a2e2e] hover:text-[#5a1f1f]"
              href={selectedSort === "recent" ? "/catalogo" : `/catalogo?sort=${selectedSort}`}
            >
              Limpiar filtros
              <span aria-hidden="true">×</span>
            </Link>
          </Container>
        )}

        <section className="mx-auto w-full max-w-[1440px] px-5 py-10 md:px-16 md:py-14">
          <ProductGrid products={products} />
        </section>

        <Container>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-[#e7d8cc] pt-8 md:flex-row md:items-center">
            <div>
              <h2 className="editorial-heading mb-2 text-2xl text-[#2f140d]">
                ¿No sabes qué talla elegir?
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[#5f5048]">
                Escríbenos por WhatsApp y te ayudamos a encontrar la prenda
                correcta.
              </p>
            </div>
            <WhatsAppCTA label="Consultar por WhatsApp" variant="secondary" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
