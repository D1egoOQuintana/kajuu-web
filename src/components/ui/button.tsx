import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center border text-center text-[14px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[#2f140d] bg-[#e8d6c0] font-semibold text-[#2f140d] tracking-[0.14em] shadow-[0_8px_20px_-12px_rgba(47,20,13,0.22)] hover:bg-[#d4bf9f] hover:shadow-[0_12px_26px_-12px_rgba(47,20,13,0.32)]",
  secondary:
    "border-[#2f140d] bg-[#faf9f7] font-semibold text-[#2f140d] tracking-[0.14em] hover:bg-[#f4f3f1] hover:border-[#7a2e2e]",
  ghost:
    "border-transparent bg-transparent font-semibold text-[#2f140d] tracking-[0.14em] hover:text-[#8a5a3c]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-[0.68rem]",
  md: "min-h-12 px-5 text-[0.72rem]",
  lg: "min-h-14 px-7 text-[0.76rem]",
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
