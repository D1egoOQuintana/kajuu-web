import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const assistanceLinks = [
  { href: "/como-comprar", label: "Cómo Comprar" },
  { href: "/guia-talles", label: "Guía de Tallas" },
  { href: "/contacto", label: "Contacto" },
] as const;

const exploreLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ultimos-ingresos", label: "Últimos Ingresos" },
  { href: "/lookbook", label: "Lookbook" },
] as const;

export function Footer() {
  return (
    <footer className="mt-0 w-full border-t border-[var(--border)] bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-4 md:px-16 md:py-24">
        <div className="col-span-1 md:col-span-2">
          <Link
            aria-label="KAJÚ — ir al inicio"
            className="focus-inverse mb-8 block w-fit bg-[var(--surface-emphasis)] p-5"
            href="/"
          >
            <BrandLogo alt="" className="w-[190px] md:w-[220px]" variant="primary" />
          </Link>
          <p className="mb-8 max-w-sm text-base leading-[1.65] text-[var(--footer-text)]">
            Ropa femenina urbana, elegida prenda por prenda. Vendemos por
            WhatsApp y coordinamos entregas en CABA.
          </p>
        </div>

        <nav className="col-span-1 mt-8 md:mt-0" aria-label="Asistencia">
          <h2 className="label-caps mb-4 text-[var(--footer-text)]">Asistencia</h2>
          <ul>
            {assistanceLinks.map((item) => (
              <li className="mb-2" key={item.href}>
                <Link
                  className="focus-inverse block min-h-11 py-3 text-sm text-[var(--footer-text)] transition-colors duration-200 hover:text-[var(--accent)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-1 mt-4 md:mt-0">
          <nav aria-label="Explorar">
            <h2 className="label-caps mb-4 text-[var(--footer-text)]">Explorar</h2>
            <ul>
              {exploreLinks.map((item) => (
                <li className="mb-2" key={item.href}>
                  <Link
                    className="focus-inverse block min-h-11 py-3 text-sm text-[var(--footer-text)] transition-colors duration-200 hover:text-[var(--accent)]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8">
            <WhatsAppCTA
              className="focus-inverse !border-[var(--footer-text)] !bg-transparent !text-[var(--footer-text)] hover:!bg-[var(--surface-emphasis)] hover:!text-[var(--text-primary)]"
              label="WhatsApp"
              variant="secondary"
            />
            <a
              className="focus-inverse mt-4 block min-h-11 w-fit py-3 text-sm text-[var(--footer-text)] transition-colors duration-200 hover:text-[var(--accent)]"
              href={INSTAGRAM_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <p className="mt-4 text-sm leading-[1.6] text-[var(--footer-text)]">
              Entregas en CABA. Punto Floresta a coordinar.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
