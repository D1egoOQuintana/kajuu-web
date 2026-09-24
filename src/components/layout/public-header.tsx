"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/contacto", label: "Contacto" },
] as const;

const SCROLL_HIDE_THRESHOLD = 80;
const SCROLL_CAPSULE_THRESHOLD = 24;

export function PublicHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCapsule, setIsCapsule] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const currentY = window.scrollY;

      setIsCapsule(currentY > SCROLL_CAPSULE_THRESHOLD);
      setIsHidden(currentY >= SCROLL_HIDE_THRESHOLD);
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
          <Link
            aria-label="KAJÚ — ir al inicio"
            className="kajuu-header-brand"
            href="/"
          >
            <BrandLogo alt="" priority variant="horizontal" />
          </Link>

          <nav
            aria-label="Navegación principal"
            className="kajuu-header-nav hidden lg:flex"
          >
            {navigationItems.map((item) => (
              <Link
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className="kajuu-header-link"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="kajuu-header-actions hidden lg:flex">
            <span
              aria-hidden="true"
              className="kajuu-header-whatsapp-anchor"
              data-whatsapp-header-anchor
            />
          </div>

          <button
            aria-controls="kajuu-mobile-drawer"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="kajuu-header-burger inline-flex lg:hidden"
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
          "kajuu-drawer-backdrop lg:hidden",
          isMenuOpen ? "is-open" : "",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        aria-hidden={!isMenuOpen}
        aria-label="Menú móvil"
        aria-modal={isMenuOpen}
        className={[
          "kajuu-drawer lg:hidden",
          isMenuOpen ? "is-open" : "",
        ].join(" ")}
        id="kajuu-mobile-drawer"
        inert={!isMenuOpen}
        ref={drawerRef}
        role="dialog"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <Link
            aria-label="KAJÚ — ir al inicio"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <BrandLogo
              alt=""
              className="w-[132px]"
              priority
              variant="horizontal"
            />
          </Link>
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
          {navigationItems.map((item, index) => (
            <Link
              aria-current={isCurrent(item.href) ? "page" : undefined}
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
      </aside>
    </>
  );
}
