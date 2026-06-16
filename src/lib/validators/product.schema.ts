import { z } from "zod";

import { PRODUCT_CATEGORIES, PRODUCT_STOCK_STATUSES } from "@/types/product";

export const productImageSchema = z.object({
  url: z.string().trim().min(1, "La imagen es requerida."),
  path: z.string().trim().min(1).optional(),
  alt: z.string().trim().min(1, "El texto alternativo es requerido."),
  position: z.number().int().min(0),
});

export const productSchema = z.object({
  id: z.string().trim().min(1, "El id es requerido."),
  name: z.string().trim().min(1, "El nombre es requerido."),
  slug: z.string().trim().min(1, "El slug es requerido."),
  description: z
    .string()
    .trim()
    .min(1, "La descripcion es requerida.")
    .max(500, "La descripcion no debe superar los 500 caracteres."),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0."),
  category: z.enum(PRODUCT_CATEGORIES),
  sizes: z.array(z.string().trim().min(1)).min(1, "Agrega al menos un talle."),
  colors: z.array(z.string().trim().min(1)).min(1, "Agrega al menos un color."),
  stockStatus: z.enum(PRODUCT_STOCK_STATUSES),
  images: z.array(productImageSchema),
  isVisible: z.boolean(),
  isFeatured: z.boolean(),
  isNewArrival: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProductInput = z.infer<typeof productSchema>;
