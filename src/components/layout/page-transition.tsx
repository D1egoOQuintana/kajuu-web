"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="kajuu-page-transition" key={pathname}>
      {children}
    </div>
  );
}
