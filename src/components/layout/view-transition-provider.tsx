"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type ViewTransitionProviderProps = {
  children: ReactNode;
};

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

export function ViewTransitionProvider({
  children,
}: ViewTransitionProviderProps) {
  const router = useRouter();

  useEffect(() => {
    // Warm-prefetch routes so the FIRST navigation is instant (no RSC fetch delay
    // → view-transition snapshot 'new' matches the actual updated DOM → animation visible)
    const routes = [
      "/",
      "/catalogo",
      "/como-comprar",
      "/guia-talles",
      "/contacto",
      "/lookbook",
    ];
    routes.forEach((route) => router.prefetch(route));
  }, [router]);

  useEffect(() => {
    const doc = document as DocumentWithViewTransitions;
    if (typeof doc.startViewTransition !== "function") return;

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition === "true") return;

      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(href, window.location.origin);
      if (
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const transition = doc.startViewTransition!(() => {
        router.push(href);
      });
      // Silently swallow benign timeouts (Next.js can abort transitions if
      // the route fetch is slow on cold cache; the navigation still happens)
      transition.finished.catch(() => {});
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [router]);

  return <>{children}</>;
}
