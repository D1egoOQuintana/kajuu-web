import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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

const rotations = ["-4deg", "2deg", "-1.5deg", "3deg", "-2.5deg", "1.5deg"];
const lifts = ["0rem", "0.65rem", "-0.2rem", "0.45rem", "-0.1rem", "0.75rem"];

export function InstagramCardStackCarousel({
  cards,
}: InstagramCardStackCarouselProps) {
  const carouselCards = [...cards, ...cards];

  return (
    <section className="kajuu-card-stack-section" aria-labelledby="instagram-title">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-16">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="label-caps mb-2 text-[#7a2e2e]">Kajuu social</p>
            <h2
              className="editorial-heading text-[32px] text-[#2f140d] md:text-[48px]"
              id="instagram-title"
            >
              Encontranos en Instagram
            </h2>
          </div>
          <a
            className="label-caps text-[#8a5a3c] transition-colors hover:text-[#2f140d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
            href="https://www.instagram.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            @KAJUU.INDUMENTARIA
          </a>
        </div>
      </div>

      <div
        aria-label="Carrusel editorial de imágenes de Instagram de Kajuu"
        className="kajuu-card-stack-viewport"
      >
        <div className="kajuu-card-stack-track">
          {carouselCards.map((card, index) => {
            const isDuplicate = index >= cards.length;
            const style = {
              "--stack-rotate": rotations[index % rotations.length],
              "--stack-lift": lifts[index % lifts.length],
            } as CSSProperties;

            return (
              <Link
                aria-hidden={isDuplicate}
                className="kajuu-card-stack-slide"
                href={card.href}
                key={`${card.title}-${index}`}
                style={style}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                <article className="kajuu-card-stack-card">
                  <Image
                    alt={isDuplicate ? "" : card.imageAlt}
                    className="h-full w-full object-cover sepia-[0.08]"
                    height={760}
                    sizes="(min-width: 1024px) 18rem, (min-width: 768px) 15rem, 12rem"
                    src={card.imageSrc}
                    width={570}
                  />
                  <div className="kajuu-card-stack-content">
                    <span className="label-caps text-[#fff8f1]/85">
                      {card.eyebrow}
                    </span>
                    <h3 className="editorial-heading mt-2 text-2xl text-[#fff8f1]">
                      {card.title}
                    </h3>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
