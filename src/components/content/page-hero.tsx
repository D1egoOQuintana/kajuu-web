import type { ReactNode } from "react";

import { BotanicalBloom } from "@/components/brand/botanical-bloom";
import { Container } from "@/components/layout/container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
}: PageHeroProps) {
  return (
    <header className="page-hero relative isolate overflow-hidden bg-[var(--background-primary)]">
      <BotanicalBloom
        className="page-hero__botanical"
        motion="none"
        variant="stem"
      />
      <Container className="relative z-10 grid gap-8 pb-10 pt-28 md:pb-14 md:pt-36 lg:grid-cols-12 lg:items-end lg:pt-[136px]">
        <div className="lg:col-span-7">
          {eyebrow ? (
            <p className="mb-4 text-sm font-medium text-[var(--brand)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="editorial-title text-[clamp(3.15rem,12vw,5rem)] md:text-[80px]">
            {title}
            {accent ? (
              <>
                <br />
                <span className="text-[var(--brand)]">{accent}</span>
              </>
            ) : null}
          </h1>
        </div>

        <div className="max-w-xl lg:col-span-5 lg:justify-self-end">
          <p className="text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
