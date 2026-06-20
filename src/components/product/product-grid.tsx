import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";

type ProductGridVariant = "uniform" | "editorial";

type ProductGridProps = {
  products: Product[];
  variant?: ProductGridVariant;
};

const editorialClasses = [
  "md:col-span-7",
  "md:col-span-5 md:pt-24",
  "md:col-span-5",
  "md:col-span-7 md:pt-16",
  "md:col-span-4",
  "md:col-span-8 md:pt-32",
  "md:col-span-4",
  "md:col-span-4 md:pt-12",
  "md:col-span-4 md:pt-24",
];

const editorialAspects = [
  "tall",
  "portrait",
  "square",
  "tall",
  "portrait",
  "wide",
  "square",
  "tall",
  "square",
] as const;

export function ProductGrid({
  products,
  variant = "uniform",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-[#e7d8cc] bg-[#f4f3f1]/80 px-5 py-12 text-center">
        <h2 className="editorial-heading text-3xl text-[#2f140d]">
          No hay productos disponibles.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5f5048]">
          Probá volver más tarde o consultanos por WhatsApp para conocer la
          selección disponible.
        </p>
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
        {products.map((product, index) => (
          <div
            className={editorialClasses[index % editorialClasses.length]}
            key={product.id}
          >
            <ProductCard
              imageAspect={editorialAspects[index % editorialAspects.length]}
              product={product}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
      {products.map((product) => (
        <ProductCard compact key={product.id} product={product} />
      ))}
    </div>
  );
}
