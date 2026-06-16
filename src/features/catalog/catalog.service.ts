import { mockProducts } from "@/features/catalog/mock-products";
import type { Product, ProductCategory } from "@/types/product";

function visibleProducts(): Product[] {
  return mockProducts.filter((product) => product.isVisible === true);
}

export function getVisibleProducts(): Product[] {
  return visibleProducts();
}

export function getFeaturedProducts(): Product[] {
  return visibleProducts().filter((product) => product.isFeatured === true);
}

export function getNewArrivalProducts(): Product[] {
  return visibleProducts().filter((product) => product.isNewArrival === true);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return visibleProducts().filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return visibleProducts().find((product) => product.slug === slug);
}
