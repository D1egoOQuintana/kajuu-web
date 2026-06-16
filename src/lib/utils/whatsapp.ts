type CreateProductWhatsAppUrlParams = {
  productName: string;
  phoneNumber?: string;
};

const DEFAULT_KAJUU_WHATSAPP_PHONE = "5491112345678";

export function createProductWhatsAppUrl({
  productName,
  phoneNumber = DEFAULT_KAJUU_WHATSAPP_PHONE,
}: CreateProductWhatsAppUrlParams): string {
  const message = `Hola Kajuu, vengo de la web. Quiero consultar por el producto: ${productName}. ¿Tienen stock disponible?`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
