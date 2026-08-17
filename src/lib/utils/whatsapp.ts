type CreateProductWhatsAppUrlParams = {
  productName: string;
  phoneNumber?: string;
  size?: string;
  color?: string;
  priceLabel?: string;
  productUrl?: string;
};

const DEFAULT_KAJUU_WHATSAPP_PHONE = "5491112345678";

export function createProductWhatsAppUrl({
  productName,
  phoneNumber = DEFAULT_KAJUU_WHATSAPP_PHONE,
  size,
  color,
  priceLabel,
  productUrl,
}: CreateProductWhatsAppUrlParams): string {
  const lines = [
    "Hola Kajuu, vengo de la web.",
    `Quiero consultar por: ${productName}`,
  ];

  if (size) lines.push(`Talla: ${size}`);
  if (color) lines.push(`Color: ${color}`);
  if (priceLabel) lines.push(`Precio: ${priceLabel}`);
  if (productUrl) lines.push(productUrl);

  lines.push("¿Tienen stock disponible?");

  const message = lines.join("\n");
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
