"use client";

import { useEffect, useRef } from "react";

import styles from "./whatsapp-system.module.css";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function InteractiveWhatsAppCat() {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const update = () => {
      frame = 0;
      const bounds = root.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height * 0.45;
      const eyeX = clamp((clientX - centerX) / 34, -2.4, 2.4);
      const eyeY = clamp((clientY - centerY) / 42, -1.7, 1.7);
      root.style.setProperty("--cat-eye-x", `${eyeX}px`);
      root.style.setProperty("--cat-eye-y", `${eyeY}px`);
    };

    const track = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", track, { passive: true });
    return () => {
      window.removeEventListener("pointermove", track);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className={styles.buttonCat}
      ref={rootRef}
    >
      <svg className={styles.buttonCatSvg} viewBox="0 0 120 92">
        <path
          className={styles.buttonCatTail}
          d="M31 73C12 78 4 64 12 51c5-8 14-7 17-1-8-2-11 5-7 10 3 4 8 3 12 1"
        />
        <path
          className={styles.buttonCatBody}
          d="M31 83c1-24 13-36 29-36s28 12 29 36H31Z"
        />
        <g className={styles.buttonCatHead}>
          <path
            className={styles.buttonCatEar}
            d="M34 31 29 7l22 15M86 31 91 7 69 22"
          />
          <path
            className={styles.buttonCatFace}
            d="M32 32c0-16 12-25 28-25s28 9 28 25v14c0 18-12 29-28 29S32 64 32 46V32Z"
          />
          <path className={styles.buttonCatEarInner} d="m35 22-3-10 11 8M85 22l3-10-11 8" />
          <g className={styles.buttonCatEyes}>
            <ellipse cx="49" cy="38" rx="8" ry="9" />
            <ellipse cx="71" cy="38" rx="8" ry="9" />
            <g className={styles.buttonCatPupils}>
              <circle cx="49" cy="39" r="3.2" />
              <circle cx="71" cy="39" r="3.2" />
            </g>
          </g>
          <path className={styles.buttonCatNose} d="m57 50 3-2 3 2-3 3-3-3Z" />
          <path className={styles.buttonCatMouth} d="M60 53c0 5-8 6-10 2m10-2c0 5 8 6 10 2" />
          <path
            className={styles.buttonCatHappyMouth}
            d="M48 54c3 10 21 10 24 0-7 5-17 5-24 0Z"
          />
          <g className={styles.buttonCatCheeks}>
            <circle cx="42" cy="52" r="4" />
            <circle cx="78" cy="52" r="4" />
          </g>
          <path
            className={styles.buttonCatWhiskers}
            d="M45 52 20 47m25 10-27 1m57-6 25-5M75 57l27 1"
          />
        </g>
        <g className={styles.buttonCatPaws}>
          <ellipse cx="44" cy="79" rx="12" ry="8" />
          <ellipse cx="76" cy="79" rx="12" ry="8" />
          <path d="M39 78h10m22 0h10" />
        </g>
      </svg>
    </span>
  );
}
