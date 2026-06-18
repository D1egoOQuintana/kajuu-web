"use client";

import Link from "next/link";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7d8cc]/80 bg-[#fff8f1]/92 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto grid min-h-[68px] w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 py-3 sm:px-8 lg:min-h-[76px] lg:gap-8 lg:px-16">
        <nav
          aria-label="Navegación principal izquierda"
          className="hidden min-w-0 lg:block"
        >
          <ul className="flex min-w-0 items-center gap-4 xl:gap-8">
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

        <span aria-hidden="true" className="lg:hidden" />

        <Link
          className="editorial-heading justify-self-center text-[30px] font-bold uppercase tracking-[-0.04em] text-[#2f140d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] lg:text-[34px]"
          href="/"
        >
          Kajuu
        </Link>

        <div className="hidden min-w-0 items-center justify-end gap-4 lg:flex xl:gap-8">
          <nav aria-label="Navegación principal derecha">
            <ul className="flex min-w-0 items-center gap-4 xl:gap-8">
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
          className="justify-self-end border border-[#e7d8cc] bg-[#fffdf9] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#3a2418] transition-colors hover:border-[#8a5a3c] hover:bg-[#f4eee8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e] lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Navegación mobile"
          className="border-t border-[#e7d8cc] bg-[#fff8f1] lg:hidden"
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
