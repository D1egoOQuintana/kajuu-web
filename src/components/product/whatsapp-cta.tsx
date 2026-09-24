import { createProductWhatsAppUrl } from "@/lib/utils/whatsapp";

type WhatsAppCTAVariant = "primary" | "secondary" | "ghost" | "inverse";
type WhatsAppCTASize = "sm" | "md" | "lg";

type WhatsAppCTAProps = {
  productName?: string;
  label?: string;
  className?: string;
  variant?: WhatsAppCTAVariant;
  size?: WhatsAppCTASize;
  productColor?: string;
  priceLabel?: string;
  productUrl?: string;
};

const variantClasses: Record<WhatsAppCTAVariant, string> = {
  primary: "button--primary",
  secondary: "button--secondary",
  ghost: "button--ghost",
  inverse: "button--inverse",
};

const sizeClasses: Record<WhatsAppCTASize, string> = {
  sm: "button--sm",
  md: "",
  lg: "button--lg",
};

export function WhatsAppCTA({
  productName,
  label,
  className,
  variant = "primary",
  size = "md",
  productColor,
  priceLabel,
  productUrl,
}: WhatsAppCTAProps) {
  const url = createProductWhatsAppUrl({
    productName: productName ?? "el catálogo de KAJÚ",
    color: productColor,
    priceLabel,
    productUrl,
  });

  return (
    <a
      className={[
        "button",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {label ?? "Escríbenos por WhatsApp"}
    </a>
  );
}
