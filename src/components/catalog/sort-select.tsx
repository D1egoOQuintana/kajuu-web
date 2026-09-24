"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import styles from "./sort-select.module.css";

export type SortOption = "recent" | "price-asc" | "price-desc";

const SORT_OPTIONS: ReadonlyArray<{ label: string; value: SortOption }> = [
  { label: "Recientes", value: "recent" },
  { label: "Precio: menor a mayor", value: "price-asc" },
  { label: "Precio: mayor a menor", value: "price-desc" },
];

type SortSelectProps = {
  current: SortOption;
};

export function SortSelect({ current }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const labelId = useId();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentIndex = Math.max(
    0,
    SORT_OPTIONS.findIndex((option) => option.value === current),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const currentLabel = SORT_OPTIONS[currentIndex].label;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  const openMenu = (index = currentIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const selectOption = (next: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "recent") {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }

    closeMenu(true);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(
        event.key === "ArrowUp" ? SORT_OPTIONS.length - 1 : currentIndex,
      );
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key === "Tab") {
      closeMenu();
      return;
    }

    const lastIndex = SORT_OPTIONS.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex !== index) {
      event.preventDefault();
      setActiveIndex(nextIndex);
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <span className={styles.label} id={labelId}>
        Ordenar
      </span>

      <div className={styles.control}>
        <button
          aria-controls={menuId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${labelId} ${menuId}-value`}
          className={styles.trigger}
          onClick={() => (isOpen ? closeMenu() : openMenu())}
          onKeyDown={handleTriggerKeyDown}
          ref={triggerRef}
          type="button"
        >
          <span id={`${menuId}-value`}>{currentLabel}</span>
          <span
            aria-hidden="true"
            className={[styles.chevron, isOpen ? styles.chevronOpen : ""]
              .filter(Boolean)
              .join(" ")}
          />
        </button>

        {isOpen ? (
          <div
            aria-labelledby={labelId}
            className={styles.menu}
            id={menuId}
            role="listbox"
          >
            {SORT_OPTIONS.map((option, index) => {
              const isSelected = option.value === current;
              return (
                <button
                  aria-selected={isSelected}
                  className={[
                    styles.option,
                    isSelected ? styles.optionSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={option.value}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  role="option"
                  tabIndex={activeIndex === index ? 0 : -1}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.optionMark} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
