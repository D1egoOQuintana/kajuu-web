import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

type PageHeroProps = {
  eyebrow: string;
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
    <header className="bg-[#faf9f7]">
      <Container className="grid gap-8 pb-10 pt-20 md:pb-14 md:pt-28 lg:grid-cols-12 lg:items-end lg:pt-[104px]">
        <div className="lg:col-span-7">
          <p className="label-caps mb-4 text-[#8a5a3c]">{eyebrow}</p>
          <h1 className="editorial-title text-[clamp(3.15rem,12vw,5rem)] leading-[1.02] text-[#2f140d] md:text-[80px]">
            {title}
            {accent ? (
              <>
                <br />
                <span className="italic text-[#8a5a3c]">{accent}</span>
              </>
            ) : null}
          </h1>
        </div>

        <div className="max-w-xl lg:col-span-5 lg:justify-self-end">
          <p className="text-base leading-[1.75] text-[#5f5048] md:text-lg">
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </Container>
    </header>
  );
}
