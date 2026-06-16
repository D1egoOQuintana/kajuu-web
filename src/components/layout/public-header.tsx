"use client";

import Link from "next/link";
import { useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ultimos-ingresos", label: "Últimos ingresos" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7D8CC] bg-[#FFF8F1]/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          className="text-xl font-semibold tracking-wide text-[#3A2418] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A2E2E]"
          href="/"
        >
          Kajuu
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm font-medium text-[#2E2A27] transition-colors hover:text-[#7A2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A2E2E]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center lg:flex">
          <WhatsAppCTA label="WhatsApp" size="sm" variant="secondary" />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#E7D8CC] text-[#3A2418] transition-colors hover:bg-[#E8D6C0]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E] lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span className="text-sm font-medium">
            {isMenuOpen ? "Cerrar" : "Menú"}
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          aria-label="Navegación mobile"
          className="border-t border-[#E7D8CC] bg-[#FFF8F1] lg:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="block py-3 text-base font-medium text-[#2E2A27] transition-colors hover:text-[#7A2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <WhatsAppCTA className="w-full" label="Consultar por WhatsApp" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
