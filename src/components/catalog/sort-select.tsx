"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, type ChangeEvent } from "react";

export type SortOption = "recent" | "price-asc" | "price-desc";

const SORT_LABELS: Record<SortOption, string> = {
  recent: "Recientes",
  "price-asc": "Precio: menor a mayor",
  "price-desc": "Precio: mayor a menor",
};

type SortSelectProps = {
  current: SortOption;
};

export function SortSelect({ current }: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectId = useId();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as SortOption;
    const params = new URLSearchParams(searchParams.toString());
    if (next === "recent") {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <label
      className="flex shrink-0 items-center gap-3"
      htmlFor={selectId}
    >
      <span className="label-caps text-[#6d5c4e]">Ordenar</span>
      <span className="relative inline-flex items-center">
        <select
          aria-label="Ordenar productos"
          className="label-caps cursor-pointer appearance-none border-b border-[#2f140d] bg-transparent pr-6 pb-1 text-[#2f140d] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
          id={selectId}
          onChange={handleChange}
          value={current}
        >
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-[#2f140d]"
        >
          ▾
        </span>
      </span>
    </label>
  );
}
