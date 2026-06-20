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
    "border-[#000000] bg-[#000000] text-[#ffffff] hover:border-[#8c7a6b] hover:bg-[#8c7a6b]",
  secondary:
    "border-[#c4c7c7] bg-[#faf9f7] text-[#000000] hover:border-[#000000] hover:bg-[#f4f3f1]",
  ghost:
    "border-transparent bg-transparent text-[#000000] hover:text-[#8c7a6b]",
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
}: WhatsAppCTAProps) {
  const url = createProductWhatsAppUrl({
    productName: productName ?? "el catálogo de Kajuu",
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
