import "server-only";

import { unstable_cache } from "next/cache";

import { getAdminDb } from "@/lib/firebase/admin";
import { productSchema } from "@/lib/validators/product.schema";
import type { Product, ProductCategory } from "@/types/product";

const MAX_PUBLIC_PRODUCTS = 200;

async function loadVisibleProducts(): Promise<Product[]> {
  const snapshot = await getAdminDb()
    .collection("products")
    .where("isVisible", "==", true)
    .limit(MAX_PUBLIC_PRODUCTS)
    .get();

  return snapshot.docs
    .map((document) => productSchema.safeParse({ id: document.id, ...document.data() }))
    .filter((result) => result.success)
    .map((result) => result.data)
    .sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime());
}

const getCachedVisibleProducts = unstable_cache(
  loadVisibleProducts,
  ["public-visible-products-v2"],
  { revalidate: 60, tags: ["products"] },
);

export async function getVisibleProducts(): Promise<Product[]> {
  return getCachedVisibleProducts();
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getCachedVisibleProducts()).filter(
    (product) => product.isFeatured === true,
  );
}

export async function getNewArrivalProducts(): Promise<Product[]> {
  return (await getCachedVisibleProducts()).filter(
    (product) => product.isNewArrival === true,
  );
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  return (await getCachedVisibleProducts()).filter(
    (product) => product.category === category,
  );
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return (await getCachedVisibleProducts()).find(
    (product) => product.slug === slug,
  );
}
