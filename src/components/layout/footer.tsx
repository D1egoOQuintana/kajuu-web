import Link from "next/link";

import { Container } from "@/components/layout/container";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ultimos-ingresos", label: "Últimos ingresos" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/guia-talles", label: "Guía de talles" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#E7D8CC] bg-[#3A2418] py-10 text-[#FFF8F1] sm:py-14">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link
              className="text-2xl font-semibold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98B7A]"
              href="/"
            >
              Kajuu
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#E8D6C0]">
              Indumentaria femenina con una selección cálida, urbana y fácil de
              consultar por WhatsApp.
            </p>
            <p className="mt-4 text-sm text-[#E8D6C0]">
              Entregas en CABA. Punto de encuentro en Floresta a coordinar.
            </p>
          </div>

          <nav aria-label="Links del sitio">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Explorar
            </h2>
            <ul className="mt-4 grid gap-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-[#E8D6C0] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98B7A]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
              Contacto
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              <WhatsAppCTA label="Escribir por WhatsApp" variant="secondary" />
              <a
                className="inline-flex min-h-11 items-center justify-center border border-[#E8D6C0]/50 px-4 text-sm font-medium text-[#FFF8F1] transition-colors hover:bg-[#FFF8F1]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98B7A]"
                href="https://www.instagram.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
