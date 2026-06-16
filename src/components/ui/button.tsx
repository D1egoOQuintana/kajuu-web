import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center border font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[#3A2418] bg-[#3A2418] text-[#FFF8F1] hover:bg-[#2E2A27]",
  secondary:
    "border-[#8A5A3C] bg-[#FFF8F1] text-[#3A2418] hover:bg-[#E8D6C0]",
  ghost:
    "border-transparent bg-transparent text-[#3A2418] hover:bg-[#E8D6C0]/60",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...props}
    />
  );
}
