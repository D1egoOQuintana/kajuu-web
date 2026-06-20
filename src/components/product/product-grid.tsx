import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";

type ProductGridVariant = "uniform" | "editorial";

type ProductGridProps = {
  products: Product[];
  variant?: ProductGridVariant;
};

const editorialClasses = [
  "md:col-span-7 xl:col-span-7",
  "md:col-span-5 md:pt-20 xl:col-span-5 xl:pt-28",
  "md:col-span-5 xl:col-span-4",
  "md:col-span-7 md:pt-14 xl:col-span-8 xl:pt-20",
  "md:col-span-4 xl:col-span-4",
  "md:col-span-8 md:pt-24 xl:col-span-5 xl:pt-36",
  "md:col-span-4 xl:col-span-3",
  "md:col-span-4 md:pt-10 xl:col-span-5 xl:pt-16",
  "md:col-span-4 md:pt-20 xl:col-span-4 xl:pt-28",
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
      <div className="border border-[#e7d8cc] bg-[#f4f3f1] px-5 py-14 text-center md:px-10">
        <p className="label-caps mb-3 text-[#8a5a3c]">Selección boutique</p>
        <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-4xl">
          No encontramos prendas para este filtro.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5f5048]">
          Podés volver a la colección completa o escribirnos para conocer qué
          piezas están entrando al showroom.
        </p>
      </div>
    );
  }

  if (variant === "editorial") {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
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
