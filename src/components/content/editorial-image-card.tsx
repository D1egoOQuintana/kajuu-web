import Image from "next/image";
import Link from "next/link";

type EditorialImageCardProps = {
  href?: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function EditorialImageCard({
  href,
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  description,
}: EditorialImageCardProps) {
  const content = (
    <article className="group">
      <div className="image-container relative aspect-[4/5] border border-[var(--border)] bg-[var(--surface-emphasis)]">
        <Image
          alt={imageAlt}
          className="h-full w-full object-cover sepia-[0.08]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={imageSrc}
        />
      </div>
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">{eyebrow}</p>
        <h2 className="editorial-heading text-3xl transition-colors group-hover:text-[var(--brand)]">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      className="block"
      href={href}
    >
      {content}
    </Link>
  );
}
