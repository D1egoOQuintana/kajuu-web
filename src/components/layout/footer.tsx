import Link from "next/link";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const assistanceLinks = [
  { href: "/como-comprar", label: "Cómo Comprar" },
  { href: "/guia-talles", label: "Guía de Talles" },
  { href: "/contacto", label: "Contacto" },
] as const;

const exploreLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ultimos-ingresos", label: "Últimos Ingresos" },
  { href: "/lookbook", label: "Lookbook" },
] as const;

export function Footer() {
  return (
    <footer className="mt-0 w-full bg-[#000000] text-[#ffffff]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-4 md:px-16 md:py-24">
        <div className="col-span-1 md:col-span-2">
          <Link
            className="editorial-heading mb-8 block w-fit text-[48px] uppercase tracking-[-0.04em] text-[#ffffff] transition-colors duration-300 hover:text-[#a03d3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]"
            href="/"
          >
            KAJUU
          </Link>
          <p className="mb-8 max-w-sm text-base leading-[1.6] text-[#ffffff]/70">
            Diseño contemporáneo. Minimalismo editorial. Indumentaria pensada
            como piezas de uso diario con mirada boutique.
          </p>
          <p className="label-caps text-[#ffffff]/50">
            Kajuu Indumentaria. Consulta y coordinación directa por WhatsApp.
          </p>
        </div>

        <nav className="col-span-1 mt-8 md:mt-0" aria-label="Asistencia">
          <h2 className="label-caps mb-4 text-[#ffffff]">Asistencia</h2>
          <ul>
            {assistanceLinks.map((item) => (
              <li className="mb-2" key={item.href}>
                <Link
                  className="label-caps block text-[#ffffff]/70 transition-colors duration-300 hover:text-[#a03d3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]"
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
            <h2 className="label-caps mb-4 text-[#ffffff]">Explorar</h2>
            <ul>
              {exploreLinks.map((item) => (
                <li className="mb-2" key={item.href}>
                  <Link
                    className="label-caps block text-[#ffffff]/70 transition-colors duration-300 hover:text-[#a03d3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]"
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
              className="border-[#ffffff]/35 bg-transparent text-[#ffffff] hover:border-[#ffffff] hover:bg-transparent hover:text-[#ffffff]"
              label="WhatsApp"
              variant="secondary"
            />
            <p className="mt-4 text-sm leading-[1.6] text-[#ffffff]/70">
              Entregas en CABA. Punto Floresta a coordinar.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
