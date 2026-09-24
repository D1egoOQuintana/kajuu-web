"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { BotanicalBloom } from "@/components/brand/botanical-bloom";

export type HomeHeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  name: string;
  detail: string;
  href: string;
};

type HomeHeroCarouselProps = {
  slides: HomeHeroSlide[];
};

type SwipeDirection = "next" | "previous";
type SwipePhase = "idle" | "dragging" | "settling" | "committing";

type DragSession = {
  horizontal: boolean;
  pointerId: number;
  startTime: number;
  startX: number;
  startY: number;
};

export function HomeHeroCarousel({ slides }: HomeHeroCarouselProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const dragSessionRef = useRef<DragSession | null>(null);
  const swipeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [swipeDirection, setSwipeDirection] =
    useState<SwipeDirection | null>(null);
  const [swipePhase, setSwipePhase] = useState<SwipePhase>("idle");
  const activeSlide = slides[activeIndex] ?? slides[0];
  const swipePreviewIndex =
    swipeDirection === "next"
      ? (activeIndex + 1) % slides.length
      : swipeDirection === "previous"
        ? (activeIndex - 1 + slides.length) % slides.length
        : null;

  const clearSwipeTimer = () => {
    if (swipeTimerRef.current === null) return;
    window.clearTimeout(swipeTimerRef.current);
    swipeTimerRef.current = null;
  };

  const setSwipeVisuals = (offsetX: number, width: number) => {
    const image = imageRef.current;
    if (!image) return;

    const progress = Math.min(Math.abs(offsetX) / (width * 0.42), 1);
    const rotation = (offsetX / width) * 7;
    const offsetY = Math.abs(offsetX) * 0.025;
    image.style.setProperty("--swipe-x", `${offsetX}px`);
    image.style.setProperty("--swipe-y", `${offsetY}px`);
    image.style.setProperty("--swipe-rotation", `${rotation}deg`);
    image.style.setProperty("--swipe-progress", String(progress));
  };

  const resetSwipeVisuals = () => {
    const image = imageRef.current;
    if (!image) return;
    image.style.setProperty("--swipe-x", "0px");
    image.style.setProperty("--swipe-y", "0px");
    image.style.setProperty("--swipe-rotation", "0deg");
    image.style.setProperty("--swipe-progress", "0");
  };

  const goToSlide = (nextIndex: number) => {
    if (nextIndex === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(nextIndex);
  };

  const showPrevious = () => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    goToSlide((activeIndex + 1) % slides.length);
  };

  const settleSwipe = () => {
    clearSwipeTimer();
    dragSessionRef.current = null;
    setSwipePhase("settling");
    window.requestAnimationFrame(resetSwipeVisuals);
    swipeTimerRef.current = window.setTimeout(() => {
      setSwipeDirection(null);
      setSwipePhase("idle");
      setPaused(false);
      swipeTimerRef.current = null;
    }, 420);
  };

  const commitSwipe = (direction: SwipeDirection) => {
    const image = imageRef.current;
    if (!image) return;

    clearSwipeTimer();
    dragSessionRef.current = null;
    setSwipeDirection(direction);
    setSwipePhase("committing");
    window.requestAnimationFrame(() => {
      setSwipeVisuals(
        direction === "next"
          ? -image.clientWidth * 1.18
          : image.clientWidth * 1.18,
        image.clientWidth,
      );
    });

    swipeTimerRef.current = window.setTimeout(() => {
      resetSwipeVisuals();
      goToSlide(
        direction === "next"
          ? (activeIndex + 1) % slides.length
          : (activeIndex - 1 + slides.length) % slides.length,
      );
      setSwipeDirection(null);
      setSwipePhase("idle");
      setPaused(false);
      swipeTimerRef.current = null;
    }, 320);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (slides.length < 2 || swipePhase === "committing") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("a, button")) return;

    clearSwipeTimer();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragSessionRef.current = {
      horizontal: false,
      pointerId: event.pointerId,
      startTime: performance.now(),
      startX: event.clientX,
      startY: event.clientY,
    };
    setPaused(true);
    setSwipePhase("dragging");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = dragSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) return;

    const offsetX = event.clientX - session.startX;
    const offsetY = event.clientY - session.startY;
    if (!session.horizontal) {
      if (Math.hypot(offsetX, offsetY) < 7) return;
      if (Math.abs(offsetY) > Math.abs(offsetX)) {
        dragSessionRef.current = null;
        setSwipePhase("idle");
        setPaused(false);
        return;
      }
      session.horizontal = true;
    }

    event.preventDefault();
    const width = event.currentTarget.clientWidth;
    const clampedOffset = Math.max(
      -width * 0.82,
      Math.min(width * 0.82, offsetX),
    );
    const direction: SwipeDirection = clampedOffset < 0 ? "next" : "previous";
    setSwipeDirection((current) => (current === direction ? current : direction));
    setSwipeVisuals(clampedOffset, width);
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const session = dragSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const offsetX = event.clientX - session.startX;
    const elapsed = Math.max(performance.now() - session.startTime, 1);
    const velocity = Math.abs(offsetX) / elapsed;
    const threshold = Math.min(110, event.currentTarget.clientWidth * 0.18);
    const shouldCommit =
      session.horizontal &&
      (Math.abs(offsetX) >= threshold || (Math.abs(offsetX) >= 42 && velocity > 0.5));

    if (shouldCommit) {
      commitSwipe(offsetX < 0 ? "next" : "previous");
      return;
    }
    settleSwipe();
  };

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [activeIndex, paused, slides.length]);

  useEffect(
    () => () => {
      if (swipeTimerRef.current !== null) {
        window.clearTimeout(swipeTimerRef.current);
      }
    },
    [],
  );

  if (!activeSlide) return null;

  return (
    <figure
      className="home-hero__figure"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span aria-hidden="true" className="home-hero__plane" />
      <div className="home-hero__frame">
        <div
          aria-label="Carrusel de jeans. Arrastra horizontalmente para cambiar de corte."
          className={[
            "home-hero__image",
            swipePhase !== "idle" ? `is-${swipePhase}` : "",
            swipeDirection ? `is-swipe-${swipeDirection}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
          ref={imageRef}
          role="group"
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isPrevious = index === previousIndex;
            const isSwipePreview = index === swipePreviewIndex;

            return (
              <Image
                alt={isActive ? slide.imageAlt : ""}
                aria-hidden={!isActive}
                className={[
                  "home-hero__carousel-image object-cover object-center",
                  isActive ? "is-active" : "",
                  isPrevious ? "is-previous" : "",
                  isSwipePreview ? "is-swipe-preview" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                fill
                key={slide.id}
                loading="eager"
                draggable={false}
                priority={index < 3}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 70vw, 44vw"
                src={slide.image}
              />
            );
          })}

          {slides.length > 1 ? (
            <span
              aria-hidden="true"
              className="home-hero__swipe-surface"
              onPointerCancel={settleSwipe}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
            />
          ) : null}

          {slides.length > 1 ? (
            <div aria-hidden="true" className="home-hero__swipe-guide">
              <span className="home-hero__swipe-guide-idle">↔ Arrastra para explorar</span>
              <span className="home-hero__swipe-guide-direction">
                {swipeDirection === "previous" ? "Anterior" : "Siguiente"}
              </span>
            </div>
          ) : null}

          {slides.length > 1 ? (
            <div aria-label="Cambiar corte de jean" className="home-hero__carousel-controls">
              <button aria-label="Ver corte anterior" onClick={showPrevious} type="button">
                <span aria-hidden="true">←</span>
              </button>
              <span aria-live="polite">
                {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <button aria-label="Ver corte siguiente" onClick={showNext} type="button">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : null}

          <Link
            aria-label={`Ver ${activeSlide.name} en el catálogo`}
            className="home-hero__product-card"
            href={activeSlide.href}
            key={`product-${activeSlide.id}`}
          >
            <span className="home-hero__product-tag">
              Corte {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · Colección KAJÚ
            </span>
            <strong className="home-hero__product-name">{activeSlide.name}</strong>
            <small className="home-hero__product-detail">{activeSlide.detail}</small>
            <span className="home-hero__product-cta">
              Ver este calce <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
        <figcaption className="home-hero__caption">
          <span>Selección de jeans · Colección KAJÚ</span>
          <span>Elige el calce que va contigo</span>
        </figcaption>

        {slides.length > 1 ? (
          <div aria-label="Cortes disponibles" className="home-hero__carousel-tabs" role="group">
            {slides.map((slide, index) => (
              <button
                aria-label={`Mostrar ${slide.name}`}
                aria-pressed={index === activeIndex}
                key={slide.id}
                onClick={() => goToSlide(index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {slide.name
                  .replace(/^Jean (de )?/i, "")
                  .replace(/^con bolsillos /i, "")}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <span aria-hidden="true" className="home-hero__floral-rail">
        <BotanicalBloom
          className="home-hero__floral-rail-art home-hero__floral-rail-art--desktop"
          motion="sway"
          variant="hero-vine"
        />
        <BotanicalBloom
          className="home-hero__floral-rail-art home-hero__floral-rail-art--mobile"
          motion="breathe"
          variant="hero-vine"
        />
      </span>
    </figure>
  );
}
