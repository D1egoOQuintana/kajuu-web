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
      className={["py-16 sm:py-20 lg:py-28", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl sm:mb-14">
            {eyebrow && (
              <p className="label-caps mb-4 text-[#7a2e2e]">{eyebrow}</p>
            )}
            {title && (
              <h2 className="editorial-heading text-4xl text-[#1a1c1b] sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#70675f] sm:text-lg">
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
