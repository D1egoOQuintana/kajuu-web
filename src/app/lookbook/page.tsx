import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Galería de estilo",
  alternates: { canonical: "/catalogo" },
  robots: { index: false, follow: true },
};

export default function LookbookCompatibilityPage() {
  permanentRedirect("/catalogo");
}
