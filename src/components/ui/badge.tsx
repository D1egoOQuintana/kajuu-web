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
  new: "border-[#faf9f7] bg-[#faf9f7] text-[#000000] shadow-sm",
  featured: "border-[#000000] bg-[#000000] text-[#ffffff] shadow-sm",
  available: "rounded-full border-[#faf9f7]/80 bg-[#faf9f7]/80 text-[#000000] shadow-sm backdrop-blur",
  soldOut: "rounded-full border-[#faf9f7]/80 bg-[#faf9f7]/80 text-[#444748] shadow-sm backdrop-blur",
  askStock: "rounded-full border-[#faf9f7]/80 bg-[#faf9f7]/80 text-[#a03d3f] shadow-sm backdrop-blur",
  neutral: "border-[#c4c7c7] bg-[#ffffff] text-[#444748]",
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
        "label-caps inline-flex w-fit items-center border px-3 py-1 leading-none",
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
