import { describe, expect, it } from "vitest";

import { mockProducts } from "@/features/catalog/mock-products";
import { productSchema, productWriteSchema } from "@/lib/validators/product.schema";

const validProduct = {
  name: "Jean recto",
  slug: "jean-recto",
  description: "Jean urbano de tiro alto.",
  price: 45000,
  category: "jeans" as const,
  sizes: ["S", "M"],
  colors: ["Azul"],
  stockStatus: "available" as const,
  images: [{ url: "/products/zara3.webp", alt: "Jean recto", position: 0 }],
  isVisible: true,
  isFeatured: false,
  isNewArrival: true,
};

describe("productWriteSchema", () => {
  it("acepta un producto válido", () => {
    expect(productWriteSchema.safeParse(validProduct).success).toBe(true);
    expect(
      productWriteSchema.safeParse({
        ...validProduct,
        images: [{ url: "/products/images (1).jpg", alt: "Foto local", position: 0 }],
      }).success,
    ).toBe(true);
  });

  it("rechaza slugs y URLs inseguras", () => {
    const result = productWriteSchema.safeParse({
      ...validProduct,
      slug: "Jean Recto",
      images: [{ url: "http://inseguro.example/foto.jpg", alt: "Foto", position: 0 }],
    });
    expect(result.success).toBe(false);
  });

  it("rechaza variantes duplicadas aunque cambie la capitalización", () => {
    const result = productWriteSchema.safeParse({
      ...validProduct,
      sizes: ["M", "m"],
    });
    expect(result.success).toBe(false);
  });

  it("valida todo el catálogo inicial", () => {
    for (const product of mockProducts) {
      expect(productSchema.safeParse(product).success, product.slug).toBe(true);
    }
  });
});
