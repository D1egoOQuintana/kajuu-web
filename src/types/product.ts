export const PRODUCT_CATEGORIES = [
  "jeans",
  "tops",
  "sweaters",
  "buzos",
  "pantalones",
  "camperas",
  "conjuntos",
  "accesorios",
  "otros",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCT_STOCK_STATUSES = [
  "available",
  "sold_out",
  "ask_stock",
] as const;

export type ProductStockStatus = (typeof PRODUCT_STOCK_STATUSES)[number];

export type ProductImage = {
  url: string;
  path?: string;
  alt: string;
  position: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  stockStatus: ProductStockStatus;
  images: ProductImage[];
  isVisible: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: Date;
  updatedAt: Date;
};
