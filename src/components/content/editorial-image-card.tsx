import Image from "next/image";
import Link from "next/link";

type EditorialImageCardProps = {
  href?: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
  tall?: boolean;
};

export function EditorialImageCard({
  href,
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
  tall = false,
}: EditorialImageCardProps) {
  const content = (
    <article className="group">
      <div
        className={[
          "image-container relative border border-[#e7d8cc]/70 bg-[#efeeec]",
          tall ? "aspect-[4/5]" : "aspect-[5/6]",
        ].join(" ")}
      >
        <Image
          alt={imageAlt}
          className="h-full w-full object-cover sepia-[0.08]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="mt-5">
        <p className="label-caps mb-2 text-[#8a5a3c]">{eyebrow}</p>
        <h2 className="editorial-heading text-3xl text-[#2f140d] transition-colors group-hover:text-[#7a2e2e]">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[#5f5048]">{description}</p>
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
      href={href}
    >
      {content}
    </Link>
  );
}
