import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "new"
  | "featured"
  | "available"
  | "soldOut"
  | "askStock"
  | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const badgeLabels: Record<BadgeVariant, string> = {
  new: "Nuevo",
  featured: "Destacado",
  available: "Disponible",
  soldOut: "Agotado",
  askStock: "Consultar stock",
  neutral: "Catálogo",
};

const variantClasses: Record<BadgeVariant, string> = {
  new: "border-[#C98B7A]/50 bg-[#C98B7A]/15 text-[#7A2E2E]",
  featured: "border-[#8A5A3C]/40 bg-[#E8D6C0]/60 text-[#3A2418]",
  available: "border-[#8A5A3C]/35 bg-[#FFF8F1] text-[#3A2418]",
  soldOut: "border-[#2E2A27]/20 bg-[#2E2A27]/10 text-[#2E2A27]",
  askStock: "border-[#7A2E2E]/35 bg-[#7A2E2E]/10 text-[#7A2E2E]",
  neutral: "border-[#E7D8CC] bg-white text-[#2E2A27]",
};

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center border px-2.5 py-1 text-xs font-medium leading-none",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children ?? badgeLabels[variant]}
    </span>
  );
}
