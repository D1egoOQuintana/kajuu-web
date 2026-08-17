import Link from "next/link";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const assistanceLinks = [
  { href: "/como-comprar", label: "Cómo Comprar" },
  { href: "/guia-talles", label: "Guía de Tallas" },
  { href: "/contacto", label: "Contacto" },
] as const;

const exploreLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/catalogo?filter=new", label: "Últimos Ingresos" },
] as const;

export function Footer() {
  return (
    <footer className="mt-0 w-full border-t border-[#e7d8cc]/20 bg-[#24130d] text-[#faf9f7]">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-4 md:px-16 md:py-24">
        <div className="col-span-1 md:col-span-2">
          <Link
            className="editorial-heading mb-8 block w-fit text-[48px] uppercase tracking-[-0.04em] text-[#faf9f7] transition-colors duration-300 hover:text-[#c98b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c98b7a]"
            href="/"
          >
            KAJUU
          </Link>
          <p className="mb-8 max-w-sm text-base leading-[1.6] text-[#e8d6c0]/80">
            Ropa femenina urbana, elegida prenda por prenda. Vendemos por
            WhatsApp y coordinamos entregas en CABA.
          </p>
        </div>

        <nav className="col-span-1 mt-8 md:mt-0" aria-label="Asistencia">
          <h2 className="label-caps mb-4 text-[#faf9f7]">Asistencia</h2>
          <ul>
            {assistanceLinks.map((item) => (
              <li className="mb-2" key={item.href}>
                <Link
                  className="label-caps block py-1 text-[#e8d6c0]/75 transition-colors duration-300 hover:text-[#c98b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c98b7a]"
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
            <h2 className="label-caps mb-4 text-[#faf9f7]">Explorar</h2>
            <ul>
              {exploreLinks.map((item) => (
                <li className="mb-2" key={item.href}>
                  <Link
                    className="label-caps block py-1 text-[#e8d6c0]/75 transition-colors duration-300 hover:text-[#c98b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c98b7a]"
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
              className="!border-[#e8d6c0]/40 !bg-transparent !text-[#faf9f7] hover:!border-[#e8d6c0] hover:!bg-transparent hover:!text-[#e8d6c0]"
              label="WhatsApp"
              variant="secondary"
            />
            <a
              className="label-caps mt-4 block w-fit text-[#e8d6c0]/75 transition-colors duration-300 hover:text-[#c98b7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c98b7a]"
              href="https://www.instagram.com/kajuu_indumentaria/"
              rel="noopener noreferrer"
              target="_blank"
            >
              @kajuu_indumentaria
            </a>
            <p className="mt-4 text-sm leading-[1.6] text-[#e8d6c0]/70">
              Entregas en CABA. Punto Floresta a coordinar.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
