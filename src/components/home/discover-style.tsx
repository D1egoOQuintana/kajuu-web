import Image from "next/image";
import Link from "next/link";

import { FloralMotif } from "@/components/brand/floral-motif";

const styleHighlights = [
  {
    alt: "Look de sastrería urbana KAJÚ",
    href: "/catalogo?categoria=pantalones",
    label: "Sastrería urbana",
    src: "/products/450e.avif",
  },
  {
    alt: "Look de básicos esenciales KAJÚ",
    href: "/catalogo?categoria=tops",
    label: "Básicos esenciales",
    src: "/products/images (1).jpg",
  },
  {
    alt: "Look de abrigos urbanos KAJÚ",
    href: "/catalogo?categoria=camperas",
    label: "Abrigos",
    src: "/products/images.jpg",
  },
] as const;

export function DiscoverStyle() {
  return (
    <section
      aria-labelledby="discover-style-title"
      className="discover-style"
    >
      <div className="discover-style__inner">
        <div className="discover-style__copy">
          <FloralMotif className="discover-style__floral" tone="dark" />
          <h2 id="discover-style-title">Descubre tu estilo</h2>
          <p>
            Encuentra pantalones, tops y abrigos para combinar con lo que ya
            usas.
          </p>
          <Link className="button button--inverse focus-inverse" href="/catalogo">
            Explorar estilos <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="discover-style__gallery">
          {styleHighlights.map((item, index) => (
            <Link
              aria-label={`${item.label}: ver selección`}
              className={
                index === 0
                  ? "discover-style__item discover-style__item--feature focus-inverse"
                  : "discover-style__item focus-inverse"
              }
              href={item.href}
              key={item.label}
            >
              <span className="discover-style__image">
                <Image
                  alt={item.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 58vw, 38vw"
                      : "(max-width: 767px) 46vw, (max-width: 1023px) 34vw, 20vw"
                  }
                  src={item.src}
                />
              </span>
              <span className="discover-style__meta">
                <span className="discover-style__label">{item.label}</span>
                <span className="discover-style__link">
                  Ver selección <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
