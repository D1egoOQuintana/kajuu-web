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
import { CATEGORY_LABELS } from "@/lib/site";
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
    "Explora el catálogo de KAJÚ Indumentaria por categoría y consulta la disponibilidad por WhatsApp.",
  alternates: { canonical: "/catalogo" },
};

type CatalogPageProps = {
  searchParams?: Promise<{
    categoria?: string | string[];
    filter?: string | string[];
    sort?: string | string[];
  }>;
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

  const baseProducts = await (isNewFilter
    ? getNewArrivalProducts()
    : selectedCategory
      ? getProductsByCategory(selectedCategory)
      : getVisibleProducts());
  const products = sortProducts(baseProducts, selectedSort);

  return (
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="w-full pb-24">
        <header className="catalog-hero relative isolate mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 overflow-hidden px-5 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36 lg:grid-cols-12 lg:items-end lg:pt-[136px]">
          <div className="relative z-10 lg:col-span-7">
            <h1 className="editorial-title text-[clamp(3rem,11vw,4.5rem)] leading-[1.05] text-[var(--text-primary)] md:text-[68px]">
              {isNewFilter ? "Últimos ingresos" : "Nuestra colección"}
            </h1>
          </div>

          <div className="relative z-10 max-w-xl lg:col-span-5 lg:justify-self-end">
            <p className="text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
              {isNewFilter
                ? "Las prendas que llegaron esta semana a la tienda. ¿Te gustó algo? Consulta su disponibilidad por WhatsApp."
                : "Todo lo disponible en la tienda, actualizado. ¿Te gustó algo? Consulta su disponibilidad por WhatsApp."}
            </p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              {products.length === 1
                ? "1 prenda"
                : `${products.length} prendas`}
            </p>
          </div>
        </header>

        <div className="kajuu-filter-bar sticky z-40 w-full border-b border-[var(--border)] bg-[var(--background-primary)]">
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
                      "inline-flex min-h-11 min-w-11 items-center whitespace-nowrap border-b text-xs font-semibold transition-colors",
                      !isNewFilter && !selectedCategory
                        ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                        : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--brand-hover)]",
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
                      "inline-flex min-h-11 min-w-11 items-center whitespace-nowrap border-b text-xs font-semibold transition-colors",
                      isNewFilter
                        ? "border-[var(--brand)] text-[var(--brand)]"
                        : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--brand-hover)]",
                    ].join(" ")}
                    href="/catalogo?filter=new"
                  >
                    Últimos ingresos
                  </Link>
                </li>
                <li aria-hidden="true" className="shrink-0">
                  <span className="block h-4 w-px bg-[var(--border)]" />
                </li>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      aria-current={
                        selectedCategory === category ? "page" : undefined
                      }
                      className={[
                        "inline-flex min-h-11 min-w-11 items-center whitespace-nowrap border-b text-xs font-semibold transition-colors",
                        selectedCategory === category
                          ? "border-[var(--text-primary)] text-[var(--text-primary)]"
                          : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--brand-hover)]",
                      ].join(" ")}
                      href={`/catalogo?categoria=${category}`}
                    >
                      {CATEGORY_LABELS[category]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-5 md:gap-6">
              <span
                aria-hidden="true"
                className="hidden h-5 w-px bg-[var(--border)] md:block"
              />
              <SortSelect current={selectedSort} />
            </div>
          </Container>
        </div>

        {(isNewFilter || selectedCategory) && (
          <Container className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] py-4">
            <p className="label-caps text-[var(--text-muted)]">
              Mostrando{" "}
              <span className="text-[var(--text-primary)]">{products.length}</span>{" "}
              {products.length === 1 ? "prenda" : "prendas"}
              <span className="mx-2 text-[var(--brand-secondary)]">·</span>
              <span className="text-[var(--text-primary)]">
                {isNewFilter ? "Últimos ingresos" : CATEGORY_LABELS[selectedCategory!]}
              </span>
            </p>
            <Link
              className="label-caps inline-flex min-h-11 items-center gap-2 border-b border-[var(--border-strong)] text-[var(--brand)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--brand-hover)]"
              href={selectedSort === "recent" ? "/catalogo" : `/catalogo?sort=${selectedSort}`}
            >
              Limpiar filtros
              <span aria-hidden="true">×</span>
            </Link>
          </Container>
        )}

        <section className="catalog-grid relative isolate mx-auto w-full max-w-[1440px] overflow-hidden px-5 py-10 md:px-16 md:py-14">
          <div className="relative z-10">
            <ProductGrid products={products} />
          </div>
        </section>

        <Container>
          <div className="catalog-help relative isolate flex flex-col items-start justify-between gap-5 overflow-hidden border-t border-[var(--border)] pt-8 md:flex-row md:items-center">
            <div className="relative z-10">
              <h2 className="editorial-heading mb-2 text-2xl text-[var(--text-primary)]">
                ¿Necesitas ayuda para elegir?
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
                Escríbenos por WhatsApp y te ayudamos a encontrar la prenda
                correcta.
              </p>
            </div>
            <WhatsAppCTA className="relative z-10" label="Cuéntanos qué buscas" variant="secondary" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
