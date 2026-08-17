"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

const leftNavigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
] as const;

const rightNavigationItems = [
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/guia-talles", label: "Guía de tallas" },
  { href: "/contacto", label: "Contacto" },
] as const;

const mobileNavigationItems = [
  ...leftNavigationItems,
  ...rightNavigationItems,
] as const;

const SCROLL_HIDE_THRESHOLD = 80;
const SCROLL_CAPSULE_THRESHOLD = 24;

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCapsule, setIsCapsule] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const drawerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const previousY = lastScrollY.current;

      setIsCapsule(currentY > SCROLL_CAPSULE_THRESHOLD);

      if (currentY < SCROLL_HIDE_THRESHOLD) {
        setIsHidden(false);
      } else if (currentY > previousY + 4) {
        setIsHidden(true);
      } else if (currentY < previousY - 4) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    const handleScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Elementos sticky (p. ej. filter bar del catálogo) leen esta clase para
  // ajustar su `top` cuando el header se oculta al scrollear hacia abajo.
  useEffect(() => {
    document.documentElement.classList.toggle("kajuu-header-hidden", isHidden);
    return () => {
      document.documentElement.classList.remove("kajuu-header-hidden");
    };
  }, [isHidden]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const burger = burgerRef.current;
    const drawer = drawerRef.current;
    const focusables = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        )
      : [];
    focusables[0]?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
      burger?.focus();
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={[
          "kajuu-header-shell",
          isCapsule ? "is-capsule" : "is-flush",
          isHidden ? "is-hidden" : "is-visible",
        ].join(" ")}
      >
        <header className="kajuu-header-inner">
          <nav
            aria-label="Navegación principal izquierda"
            className="kajuu-header-nav hidden xl:flex"
          >
            {leftNavigationItems.map((item) => (
              <Link
                className="kajuu-header-link"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            aria-label="Kajuu — ir al inicio"
            className="kajuu-header-brand"
            href="/"
          >
            <span className="kajuu-header-brand-full">Kajuu</span>
            <span aria-hidden="true" className="kajuu-header-brand-mark">
              K
            </span>
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            <nav aria-label="Navegación principal derecha" className="kajuu-header-nav">
              {rightNavigationItems.map((item) => (
                <Link
                  className="kajuu-header-link"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <span aria-hidden="true" className="h-4 w-px bg-[#2f140d]/20" />
            <WhatsAppCTA label="WhatsApp" size="sm" variant="ghost" />
          </div>

          <button
            aria-controls="kajuu-mobile-drawer"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="kajuu-header-burger inline-flex xl:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            ref={burgerRef}
            type="button"
          >
            <span aria-hidden="true" className="kajuu-burger-line" />
            <span aria-hidden="true" className="kajuu-burger-line" />
            <span aria-hidden="true" className="kajuu-burger-line" />
          </button>
        </header>
      </div>

      {/* Mobile drawer — slide-in desde la derecha con backdrop */}
      <div
        aria-hidden={!isMenuOpen}
        className={[
          "kajuu-drawer-backdrop xl:hidden",
          isMenuOpen ? "is-open" : "",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        aria-hidden={!isMenuOpen}
        aria-label="Menú móvil"
        aria-modal={isMenuOpen}
        className={[
          "kajuu-drawer xl:hidden",
          isMenuOpen ? "is-open" : "",
        ].join(" ")}
        id="kajuu-mobile-drawer"
        ref={drawerRef}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[#e7d8cc] px-6 py-5">
          <span className="editorial-heading text-2xl tracking-tight text-[#2f140d]">
            Kajuu
          </span>
          <button
            aria-label="Cerrar menú"
            className="kajuu-drawer-close"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label="Navegación móvil" className="flex flex-col px-6 py-4">
          {mobileNavigationItems.map((item, index) => (
            <Link
              className="kajuu-drawer-link"
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 60 + 120}ms` }}
            >
              <span className="kajuu-drawer-link-index">
                0{index + 1}
              </span>
              <span className="kajuu-drawer-link-label">{item.label}</span>
              <span aria-hidden="true" className="kajuu-drawer-link-arrow">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#e7d8cc] px-6 py-6">
          <p className="label-caps mb-3 text-[#7a2e2e]">Asistencia directa</p>
          <WhatsAppCTA
            className="w-full"
            label="Consultar por WhatsApp"
            variant="primary"
          />
        </div>
      </aside>
    </>
  );
}
