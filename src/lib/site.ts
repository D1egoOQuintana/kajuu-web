import type { ProductCategory } from "@/types/product";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configuredSiteUrl || "https://kajuu-web.vercel.app").replace(
  /\/$/,
  "",
);
export const SITE_NAME = "KAJÚ Indumentaria";
export const SITE_DESCRIPTION =
  "Catálogo de indumentaria femenina urbana. Descubre prendas seleccionadas y consulta su disponibilidad por WhatsApp.";
export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "") || "51989498385";
export const INSTAGRAM_HANDLE = "@kajuu_indumentaria";
export const INSTAGRAM_URL = "https://www.instagram.com/kajuu_indumentaria/";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  jeans: "Jeans",
  tops: "Remeras",
  sweaters: "Suéteres",
  buzos: "Buzos",
  pantalones: "Pantalones",
  camperas: "Camperas",
  conjuntos: "Conjuntos",
  accesorios: "Accesorios",
  otros: "Otros",
};

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, `${SITE_URL}/`).toString();
}
