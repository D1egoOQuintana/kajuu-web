import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-[var(--border)] bg-[var(--background-secondary)] px-5 py-14 text-center md:px-10">
        <h2 className="editorial-heading text-3xl md:text-4xl">
          No encontramos prendas para este filtro.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
          Puedes volver a la colección completa o escribirnos para saber qué
          está entrando al showroom.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
      {products.map((product, index) => (
        <ProductCard eager={index < 2} key={product.id} product={product} />
      ))}
    </div>
  );
}
