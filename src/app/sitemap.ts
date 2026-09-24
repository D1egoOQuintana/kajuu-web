import type { MetadataRoute } from "next";

import { getVisibleProducts } from "@/features/catalog/catalog.service";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/catalogo",
    "/como-comprar",
    "/contacto",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = (await getVisibleProducts()).map((product) => ({
    url: `${SITE_URL}/catalogo/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
