import { createProductWhatsAppUrl } from "@/lib/utils/whatsapp";

type WhatsAppCTAVariant = "primary" | "secondary" | "ghost";
type WhatsAppCTASize = "sm" | "md" | "lg";

type WhatsAppCTAProps = {
  productName?: string;
  label?: string;
  className?: string;
  variant?: WhatsAppCTAVariant;
  size?: WhatsAppCTASize;
  productSize?: string;
  productColor?: string;
  priceLabel?: string;
  productUrl?: string;
};

const variantClasses: Record<WhatsAppCTAVariant, string> = {
  primary:
    "border-[#2f140d] bg-[#e8d6c0] font-semibold text-[#2f140d] tracking-[0.14em] shadow-[0_8px_20px_-12px_rgba(47,20,13,0.22)] hover:bg-[#d4bf9f] hover:shadow-[0_12px_26px_-12px_rgba(47,20,13,0.32)]",
  secondary:
    "border-[#2f140d] bg-[#faf9f7] font-semibold text-[#2f140d] tracking-[0.14em] hover:bg-[#f4f3f1] hover:border-[#7a2e2e]",
  ghost:
    "border-transparent bg-transparent font-semibold text-[#2f140d] tracking-[0.14em] hover:text-[#8a5a3c]",
};

const sizeClasses: Record<WhatsAppCTASize, string> = {
  sm: "min-h-10 px-4 text-[0.68rem]",
  md: "min-h-12 px-5 text-[0.72rem]",
  lg: "min-h-14 px-7 text-[0.76rem]",
};

export function WhatsAppCTA({
  productName,
  label,
  className,
  variant = "primary",
  size = "md",
  productSize,
  productColor,
  priceLabel,
  productUrl,
}: WhatsAppCTAProps) {
  const url = createProductWhatsAppUrl({
    productName: productName ?? "el catálogo de Kajuu",
    size: productSize,
    color: productColor,
    priceLabel,
    productUrl,
  });

  return (
    <a
      className={[
        "inline-flex items-center justify-center border text-center text-[14px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]",
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
