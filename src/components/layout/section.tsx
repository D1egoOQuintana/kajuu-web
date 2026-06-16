import type { HTMLAttributes, ReactNode } from "react";

import { Container } from "@/components/layout/container";

type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Section({
  className,
  eyebrow,
  title,
  description,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={["py-12 sm:py-16 lg:py-20", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-8 max-w-2xl sm:mb-10">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A2E2E]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold leading-tight text-[#2E2A27] sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-7 text-[#6B5A50]">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
