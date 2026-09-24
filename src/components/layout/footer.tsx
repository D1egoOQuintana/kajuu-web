import Link from "next/link";

import { BotanicalBloom } from "@/components/brand/botanical-bloom";
import { BrandLogo } from "@/components/brand/brand-logo";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const assistanceLinks = [
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/contacto", label: "Preguntas y contacto" },
] as const;

const exploreLinks = [
  { href: "/catalogo", label: "Catálogo completo" },
  { href: "/catalogo?categoria=jeans", label: "Cortes de jeans" },
  { href: "/catalogo?filter=new", label: "Últimos ingresos" },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <BotanicalBloom
        className="site-footer__botanical"
        motion="sway"
        tone="dark"
        variant="footer-flower"
      />

      <div className="site-footer__inner">
        <div className="site-footer__topline">
          <p className="site-footer__topline-brand">KAJÚ · INDUMENTARIA FEMENINA · BUENOS AIRES</p>
          <div className="site-footer__topline-badges">
            <span>ATENCIÓN PERSONALIZADA</span>
            <span aria-hidden="true">·</span>
            <span>ENVÍOS A TODO EL PAÍS</span>
            <span aria-hidden="true">·</span>
            <span>CABA · BUENOS AIRES</span>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link
              aria-label="KAJÚ — ir al inicio"
              className="site-footer__logo focus-inverse"
              href="/"
            >
              <BrandLogo alt="" variant="horizontal-inverse" />
            </Link>
            <p className="site-footer__eyebrow">Calce, textura y detalles urbanos</p>
            <p className="site-footer__description">
              Selección cuidada de jeans y prendas urbanas pensadas para
              acompañar tu estilo todos los días. Escríbenos para recibir
              atención personalizada y coordinar tu entrega.
            </p>
            <WhatsAppCTA
              className="site-footer__cta focus-inverse"
              label="Hablar con KAJÚ"
              variant="primary"
            />
          </div>

          <nav aria-label="Ayuda" className="site-footer__nav">
            <h2>Ayuda</h2>
            <ul>
              {assistanceLinks.map((item) => (
                <li key={item.href}>
                  <Link className="site-footer__link focus-inverse" href={item.href}>
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explorar" className="site-footer__nav">
            <h2>Colecciones</h2>
            <ul>
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link className="site-footer__link focus-inverse" href={item.href}>
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h2>Atención & Entregas</h2>
            <p>Asesoramiento 1 a 1 por WhatsApp e Instagram de lunes a sábado.</p>
            <a
              aria-label={`Seguir a KAJÚ en Instagram: ${INSTAGRAM_HANDLE}`}
              className="site-footer__social focus-inverse"
              href={INSTAGRAM_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Instagram Oficial</span>
              <strong>{INSTAGRAM_HANDLE}</strong>
              <span aria-hidden="true">↗</span>
            </a>
            <p className="site-footer__location">
              Entregas en CABA y envíos a todo el país, con coordinación previa.
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 KAJÚ Indumentaria · Todos los derechos reservados</p>
          <p>Moda urbana femenina · Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
