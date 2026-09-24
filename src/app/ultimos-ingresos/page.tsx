import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Últimos ingresos",
  alternates: { canonical: "/catalogo?filter=new" },
  robots: { index: false, follow: true },
};

export default function NewArrivalsCompatibilityPage() {
  permanentRedirect("/catalogo?filter=new");
}
