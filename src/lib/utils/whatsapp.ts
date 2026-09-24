type CreateProductWhatsAppUrlParams = {
  productName: string;
  phoneNumber?: string;
  color?: string;
  priceLabel?: string;
  productUrl?: string;
};

export function createProductWhatsAppUrl({
  productName,
  phoneNumber = WHATSAPP_PHONE,
  color,
  priceLabel,
  productUrl,
}: CreateProductWhatsAppUrlParams): string {
  const safePhoneNumber = phoneNumber.replace(/\D/g, "");
  if (!safePhoneNumber) {
    throw new Error("El número de WhatsApp no está configurado.");
  }
  const lines = [
    "Hola KAJÚ, vengo de la web.",
    `Quiero consultar por: ${productName}`,
  ];

  if (color) lines.push(`Color: ${color}`);
  if (priceLabel) lines.push(`Precio: ${priceLabel}`);
  if (productUrl) lines.push(productUrl);

  lines.push("¿Está disponible?");

  const message = lines.join("\n");
  return `https://wa.me/${safePhoneNumber}?text=${encodeURIComponent(message)}`;
}
import { WHATSAPP_PHONE } from "@/lib/site";
