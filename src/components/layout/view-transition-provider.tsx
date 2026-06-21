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

      document.documentElement.classList.add("is-view-transitioning");
      const transition = doc.startViewTransition!(() => {
        router.push(href);
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove("is-view-transitioning");
      });
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, [router]);

  return <>{children}</>;
}
