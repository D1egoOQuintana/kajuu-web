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
  new: "border-[#e7d8cc]/85 bg-[#faf9f7]/92 text-[#2f140d] backdrop-blur-sm",
  featured: "border-[#2f140d]/85 bg-[#2f140d]/92 text-[#faf9f7] backdrop-blur-sm",
  available: "border-[#e7d8cc]/85 bg-[#faf9f7]/92 text-[#3a2418] backdrop-blur-sm",
  soldOut: "border-[#c4c7c7]/85 bg-[#faf9f7]/92 text-[#444748] backdrop-blur-sm",
  askStock: "border-[#d8b9b1]/85 bg-[#faf9f7]/92 text-[#7a2e2e] backdrop-blur-sm",
  neutral: "border-[#c4c7c7] bg-[#faf9f7] text-[#444748]",
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
        "inline-flex w-fit max-w-full items-center border px-2 py-1 text-[0.62rem] font-semibold uppercase leading-none tracking-[0.08em]",
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
