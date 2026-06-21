import type { Metadata } from "next";
import Link from "next/link";

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
    filter?: string | string[];
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

  const isNewFilter = filterParam === "new";
  const selectedCategory =
    !isNewFilter && categoryParam && isProductCategory(categoryParam)
      ? categoryParam
      : undefined;

  const products = isNewFilter
    ? getNewArrivalProducts()
    : selectedCategory
      ? getProductsByCategory(selectedCategory)
      : getVisibleProducts();

  const selectedLabel = isNewFilter
    ? "Últimos ingresos"
    : selectedCategory
      ? categoryLabels[selectedCategory]
      : "Toda la selección";

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="w-full pb-24">
        <header className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 pb-10 pt-28 md:px-16 md:pb-14 md:pt-36 lg:grid-cols-12 lg:items-end lg:pt-[136px]">
          <div className="lg:col-span-7">
            <p className="label-caps mb-4 text-[#8a5a3c]">{selectedLabel}</p>
            <h1 className="editorial-title text-[clamp(3.25rem,12vw,5rem)] leading-[1.02] text-[#2f140d] md:text-[80px]">
              {isNewFilter ? "Últimos" : "Nuestra"}
              <br />
              <span className="italic text-[#8a5a3c]">
                {isNewFilter ? "ingresos." : "Colección."}
              </span>
            </h1>
          </div>

          <div className="max-w-xl lg:col-span-5 lg:justify-self-end">
            <p className="text-base leading-[1.75] text-[#5f5048] md:text-lg">
              {isNewFilter
                ? "Las piezas que entraron al showroom esta temporada. Calce, textura y actitud para renovar el uso diario, sin carrito ni pasos innecesarios."
                : "Una selección curada de prendas urbanas, texturas cálidas y siluetas fáciles de usar. Elegí una pieza y consultá stock por WhatsApp, sin carrito ni pasos innecesarios."}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-12 bg-[#c98b7a]/70" />
              <p className="label-caps text-[#747878]">
                {products.length} piezas visibles
              </p>
            </div>
          </div>
        </header>

        <div className="sticky top-[78px] z-30 w-full border-y border-[#e7d8cc]/80 bg-[#faf9f7]/96 backdrop-blur-md">
          <Container className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Filtrar el catálogo" className="w-full">
              <ul className="no-scrollbar flex w-full gap-6 overflow-x-auto pb-1 md:gap-8 md:pb-0">
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

            <p className="label-caps hidden shrink-0 text-[#8c7a6b] lg:block">
              Catálogo editorial
            </p>
          </Container>
        </div>

        <section className="mx-auto w-full max-w-[1440px] px-5 py-10 md:px-16 md:py-14">
          <ProductGrid products={products} variant="editorial" />
        </section>

        <Container>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-[#e7d8cc] pt-8 md:flex-row md:items-center">
            <div>
              <p className="label-caps mb-2 text-[#8a5a3c]">
                Asistencia personalizada
              </p>
              <p className="max-w-xl text-sm leading-7 text-[#5f5048]">
                Si buscás un talle, color o combinación puntual, te ayudamos a
                encontrar la prenda correcta por WhatsApp.
              </p>
            </div>
            <WhatsAppCTA label="Consulta personalizada" variant="secondary" />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
