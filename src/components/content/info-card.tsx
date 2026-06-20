import type { HTMLAttributes, ReactNode } from "react";

type InfoCardProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function InfoCard({
  eyebrow,
  title,
  children,
  className,
  ...props
}: InfoCardProps) {
  return (
    <article
      className={[
        "border border-[#e7d8cc] bg-[#faf9f7] p-5 transition-colors duration-300 hover:border-[#c98b7a] md:p-7",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {eyebrow ? (
        <p className="label-caps mb-4 text-[#8a5a3c]">{eyebrow}</p>
      ) : null}
      <h2 className="editorial-heading text-2xl text-[#2f140d] md:text-3xl">
        {title}
      </h2>
      <div className="mt-4 text-sm leading-7 text-[#5f5048] md:text-base md:leading-8">
        {children}
      </div>
    </article>
  );
}
