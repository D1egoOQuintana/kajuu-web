import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "new"
  | "featured"
  | "soldOut"
  | "askStock"
  | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const badgeLabels: Record<BadgeVariant, string> = {
  new: "Nuevo",
  featured: "Destacado",
  soldOut: "Agotado",
  askStock: "Consultar disponibilidad",
  neutral: "Catálogo",
};

const variantClasses: Record<BadgeVariant, string> = {
  new: "border-[var(--border-strong)] bg-[var(--surface-emphasis)] text-[var(--brand)]",
  featured: "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--button-primary-text)]",
  soldOut: "border-[var(--text-muted)] bg-[var(--surface)] text-[var(--text-primary)]",
  askStock: "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--brand)]",
  neutral: "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]",
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
        "inline-flex min-h-6 w-fit max-w-full items-center rounded-[2px] border px-2 py-1 text-[0.72rem] font-semibold leading-none",
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
