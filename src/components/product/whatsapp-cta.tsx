import { createProductWhatsAppUrl } from "@/lib/utils/whatsapp";

type WhatsAppCTAVariant = "primary" | "secondary" | "ghost";
type WhatsAppCTASize = "sm" | "md" | "lg";

type WhatsAppCTAProps = {
  productName?: string;
  label?: string;
  className?: string;
  variant?: WhatsAppCTAVariant;
  size?: WhatsAppCTASize;
};

const variantClasses: Record<WhatsAppCTAVariant, string> = {
  primary:
    "border-[#3A2418] bg-[#3A2418] text-[#FFF8F1] hover:bg-[#2E2A27]",
  secondary:
    "border-[#8A5A3C] bg-[#FFF8F1] text-[#3A2418] hover:bg-[#E8D6C0]",
  ghost:
    "border-transparent bg-transparent text-[#3A2418] hover:bg-[#E8D6C0]/60",
};

const sizeClasses: Record<WhatsAppCTASize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

export function WhatsAppCTA({
  productName,
  label,
  className,
  variant = "primary",
  size = "md",
}: WhatsAppCTAProps) {
  const url = createProductWhatsAppUrl({
    productName: productName ?? "el catálogo de Kajuu",
  });

  return (
    <a
      className={[
        "inline-flex items-center justify-center border font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]",
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
      {label ?? "Consultar por WhatsApp"}
    </a>
  );
}
