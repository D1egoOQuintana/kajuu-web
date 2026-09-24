import { z } from "zod";

import { PRODUCT_CATEGORIES, PRODUCT_STOCK_STATUSES } from "@/types/product";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedImagePathPattern = /^\/(?!\/)[^\r\n]+$/;

function isImageLocation(value: string): boolean {
  if (allowedImagePathPattern.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function hasUniqueValues(values: string[]): boolean {
  return new Set(values.map((value) => value.toLocaleLowerCase("es"))).size === values.length;
}

const firestoreDateSchema = z.preprocess((value) => {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) return parsedDate;
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate();
  }
  return value;
}, z.date());

export const productImageSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "La imagen es requerida.")
    .max(2048)
    .refine(isImageLocation, "Usa una URL HTTPS o una ruta local válida."),
  path: z.string().trim().min(1).max(512).optional(),
  alt: z
    .string()
    .trim()
    .min(1, "El texto alternativo es requerido.")
    .max(180),
  position: z.number().int().min(0).max(19),
}).strict();

export const productWriteSchema = z.object({
  name: z.string().trim().min(2, "El nombre es requerido.").max(120),
  slug: z
    .string()
    .trim()
    .min(2, "El slug es requerido.")
    .max(140)
    .regex(slugPattern, "El slug solo admite minúsculas, números y guiones."),
  description: z
    .string()
    .trim()
    .min(1, "La descripcion es requerida.")
    .max(500, "La descripcion no debe superar los 500 caracteres."),
  price: z.number().finite().max(100_000_000).min(0, "El precio debe ser mayor o igual a 0."),
  category: z.enum(PRODUCT_CATEGORIES),
  sizes: z
    .array(z.string().trim().min(1).max(30))
    .min(1, "Agrega al menos una variante.")
    .max(20)
    .refine(hasUniqueValues, "Las variantes no deben repetirse."),
  colors: z
    .array(z.string().trim().min(1).max(50))
    .min(1, "Agrega al menos un color.")
    .max(20)
    .refine(hasUniqueValues, "Los colores no deben repetirse."),
  stockStatus: z.enum(PRODUCT_STOCK_STATUSES),
  images: z.array(productImageSchema).max(12, "Puedes cargar hasta 12 imágenes."),
  isVisible: z.boolean(),
  isFeatured: z.boolean(),
  featuredOrder: z.number().int().min(0).max(99).default(0),
  isNewArrival: z.boolean(),
}).strict();

export const productSchema = productWriteSchema.extend({
  id: z.string().trim().min(1, "El id es requerido.").max(140),
  createdAt: firestoreDateSchema,
  updatedAt: firestoreDateSchema,
}).strict();

export type ProductInput = z.infer<typeof productSchema>;
export type ProductWriteInput = z.infer<typeof productWriteSchema>;
