"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const leftNavigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ultimos-ingresos", label: "Últimos ingresos" },
  { href: "/lookbook", label: "Lookbook" },
] as const;

const rightNavigationItems = [
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/contacto", label: "Contacto" },
] as const;

const mobileNavigationItems = [
  ...leftNavigationItems,
  ...rightNavigationItems,
] as const;

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        "kajuu-public-header sticky top-0 z-50 isolate border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300",
        isScrolled
          ? "border-[#d8c6b8] bg-[#faf9f7]/98 shadow-[0_10px_30px_rgba(58,36,24,0.07)]"
          : "border-[#e7d8cc]/80 bg-[#faf9f7]/94 shadow-[0_1px_0_rgba(58,36,24,0.04)]",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 sm:px-8 xl:gap-8 xl:px-16",
          "transition-all duration-300",
          isScrolled
            ? "min-h-[60px] py-2 xl:min-h-[66px]"
            : "min-h-[68px] py-3 xl:min-h-[76px]",
        ].join(" ")}
      >
        <nav
          aria-label="Navegación principal izquierda"
          className="hidden min-w-0 xl:block"
        >
          <ul className="flex min-w-0 items-center gap-5 2xl:gap-8">
            {leftNavigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="nav-link label-caps whitespace-nowrap text-[#3a2418] transition-colors duration-300 hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span aria-hidden="true" className="xl:hidden" />

        <Link
          className="editorial-heading justify-self-center text-[29px] font-bold uppercase tracking-[-0.035em] text-[#2f140d] transition-colors duration-300 hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] xl:text-[33px]"
          href="/"
        >
          Kajuu
        </Link>

        <div className="hidden min-w-0 items-center justify-end gap-5 xl:flex 2xl:gap-8">
          <nav aria-label="Navegación principal derecha">
            <ul className="flex min-w-0 items-center gap-5 2xl:gap-8">
              {rightNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="nav-link label-caps whitespace-nowrap text-[#3a2418] transition-colors duration-300 hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <WhatsAppCTA label="WhatsApp" size="sm" variant="ghost" />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="justify-self-end border border-[#e7d8cc] bg-[#faf9f7]/90 px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#3a2418] transition-colors duration-300 hover:border-[#8a5a3c] hover:bg-[#f4f3f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] xl:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Navegación mobile"
          className="border-t border-[#e7d8cc] bg-[#faf9f7]/98 backdrop-blur-md xl:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto flex w-full max-w-[1440px] flex-col px-5 py-5 sm:px-8">
            {mobileNavigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block border-b border-[#e7d8cc] py-4 text-lg text-[#2e2a27] transition-colors hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <WhatsAppCTA className="w-full" label="Consultar por WhatsApp" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
