"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { WhatsAppMascotLink } from "@/components/whatsapp/whatsapp-mascot-link";

export function WhatsAppFloating() {
  const pathname = usePathname();
  const portalRef = useRef<HTMLDivElement>(null);
  const transitionTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const routeSettleTimer = useRef<number | null>(null);
  const previousPathname = useRef(pathname);
  const currentMode = useRef<"header" | "floating">("header");
  const hasMeasured = useRef(false);
  const [mode, setMode] = useState<"header" | "floating">("header");
  const [isReady, setIsReady] = useState(false);
  const [isRouteSettling, setIsRouteSettling] = useState(false);
  const [isTraveling, setIsTraveling] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const measurePosition = useCallback((nextMode: "header" | "floating") => {
    const portal = portalRef.current;
    if (!portal) return;

    const margin = window.innerWidth < 640 ? 12 : 24;
    const width = portal.offsetWidth || 144;
    const height = portal.offsetHeight || 52;
    const anchor = document.querySelector<HTMLElement>(
      "[data-whatsapp-header-anchor]",
    );
    const anchorBounds = anchor?.getBoundingClientRect();
    const headerShell = anchor?.closest<HTMLElement>(".kajuu-header-shell");
    const headerTransform = headerShell
      ? window.getComputedStyle(headerShell).transform
      : "none";
    const headerMatrix =
      headerTransform !== "none"
        ? new DOMMatrixReadOnly(headerTransform)
        : null;
    const canUseHeader =
      nextMode === "header" &&
      anchorBounds &&
      anchorBounds.width > 0 &&
      anchorBounds.height > 0;

    // En el primer frame el CSS responsive todavía puede no haber medido el
    // ancla. Esperamos el siguiente pase en vez de mostrar el botón abajo.
    if (nextMode === "header" && !canUseHeader) return;

    setPosition(
      canUseHeader
        ? {
            // El header sale del viewport con transform. Restamos ese
            // desplazamiento para apuntar siempre a su posición visible final.
            x: anchorBounds.left - (headerMatrix?.m41 ?? 0),
            // Conservamos aire para que orejas y cabeza nunca crucen el
            // borde superior durante la transición de cápsula a header.
            y: Math.max(
              28,
              anchorBounds.top - (headerMatrix?.m42 ?? 0),
            ),
          }
        : {
            x: window.innerWidth - width - margin,
            y: window.innerHeight - height - margin,
          },
    );
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    if (routeSettleTimer.current !== null) {
      window.clearTimeout(routeSettleTimer.current);
    }

    setIsRouteSettling(true);
    routeSettleTimer.current = window.setTimeout(() => {
      setIsRouteSettling(false);
      routeSettleTimer.current = null;
    }, 560);

    return () => {
      if (routeSettleTimer.current !== null) {
        window.clearTimeout(routeSettleTimer.current);
        routeSettleTimer.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const nextMode =
        window.innerWidth >= 1024 && window.scrollY < 80
          ? "header"
          : "floating";

      if (!hasMeasured.current) {
        currentMode.current = nextMode;
        hasMeasured.current = true;
        setMode(nextMode);
        measurePosition(nextMode);
        return;
      }

      if (currentMode.current !== nextMode) {
        currentMode.current = nextMode;

        if (transitionTimer.current !== null) {
          window.clearTimeout(transitionTimer.current);
        }
        if (revealTimer.current !== null) {
          window.clearTimeout(revealTimer.current);
        }

        // Ocultamos suavemente el CTA, cambiamos su anclaje fuera de vista y
        // lo revelamos en el nuevo lugar. Así nunca cruza la pantalla.
        setIsTraveling(true);
        transitionTimer.current = window.setTimeout(() => {
          setMode(nextMode);
          measurePosition(nextMode);
          transitionTimer.current = null;

          revealTimer.current = window.setTimeout(() => {
            setIsTraveling(false);
            revealTimer.current = null;
          }, 40);
        }, 140);

        return;
      }

      if (transitionTimer.current === null) {
        measurePosition(nextMode);
      }
    };

    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    const settleTimers = [
      window.setTimeout(scheduleUpdate, 120),
      window.setTimeout(scheduleUpdate, 560),
    ];
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
      if (revealTimer.current !== null) {
        window.clearTimeout(revealTimer.current);
      }
      settleTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [measurePosition]);

  if (
    pathname.startsWith("/kajuu-panel") ||
    pathname.startsWith("/__preview")
  ) {
    return null;
  }

  return (
    <div
      aria-hidden={!isReady}
      className={[
        "kajuu-wa-portal",
        isReady ? "is-ready" : "",
        isRouteSettling ? "is-route-settling" : "",
        isTraveling ? "is-traveling" : "",
        mode === "header" ? "is-header" : "is-floating",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={portalRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div className="kajuu-wa-motion">
        <WhatsAppMascotLink
          className="kajuu-wa-bubble"
          label="Escríbenos"
          presentation={mode}
        />
      </div>
    </div>
  );
}
