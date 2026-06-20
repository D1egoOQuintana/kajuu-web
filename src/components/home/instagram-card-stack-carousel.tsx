import Image from "next/image";
import Link from "next/link";

export type InstagramCardStackItem = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
};

type InstagramCardStackCarouselProps = {
  cards: InstagramCardStackItem[];
};

export function InstagramCardStackCarousel({
  cards,
}: InstagramCardStackCarouselProps) {
  const marqueeCards = [...cards, ...cards];

  return (
    <section
      aria-labelledby="instagram-title"
      className="kajuu-ig-strip-section"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="label-caps mb-3 text-[#7a2e2e]">Kajuu social</p>
            <h2
              className="editorial-heading text-[32px] text-[#2f140d] md:text-[44px]"
              id="instagram-title"
            >
              Seguinos en Instagram
            </h2>
          </div>
          <a
            className="label-caps inline-flex items-center gap-2 border-b border-[#2f140d]/40 pb-1 text-[#2f140d] transition-colors hover:border-[#7a2e2e] hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
            href="https://www.instagram.com/kajuu.indumentaria/"
            rel="noopener noreferrer"
            target="_blank"
          >
            @kajuu.indumentaria
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div
        aria-label="Feed editorial de Instagram de Kajuu"
        className="kajuu-ig-strip-viewport"
      >
        <div className="kajuu-ig-strip-track">
          {marqueeCards.map((card, index) => {
            const isDuplicate = index >= cards.length;

            return (
              <Link
                aria-hidden={isDuplicate}
                aria-label={isDuplicate ? undefined : `Ver ${card.title} en Instagram`}
                className="kajuu-ig-strip-item group"
                href={card.href}
                key={`${card.title}-${index}`}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                <div className="kajuu-ig-strip-frame">
                  <Image
                    alt={isDuplicate ? "" : card.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    height={760}
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 60vw"
                    src={card.imageSrc}
                    width={760}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
