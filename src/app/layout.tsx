import type { Metadata } from "next";
import { headers } from "next/headers";
import { DM_Serif_Display, Inter } from "next/font/google";

import { PageTransition } from "@/components/layout/page-transition";
import { WhatsAppFloating } from "@/components/product/whatsapp-floating";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Catálogo boutique`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Catálogo boutique femenino`,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "es_AR",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: "/products/zara3.webp", alt: "Colección KAJÚ Indumentaria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Catálogo boutique femenino`,
    description: SITE_DESCRIPTION,
    images: ["/products/zara3.webp"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Leer headers fuerza render dinámico, necesario para los nonces CSP por solicitud.
  await headers();

  return (
    <html
      lang="es"
      className={`${inter.variable} ${dmSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen antialiased">
        <PageTransition>{children}</PageTransition>
        <WhatsAppFloating />
      </body>
    </html>
  );
}
