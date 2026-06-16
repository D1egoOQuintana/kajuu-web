import type { Product } from "@/types/product";

import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-[#E7D8CC] bg-white px-4 py-10 text-center">
        <h2 className="text-lg font-semibold text-[#2E2A27]">
          No hay productos disponibles.
        </h2>
        <p className="mt-2 text-sm text-[#6B5A50]">
          Probá volver más tarde o consultanos por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
