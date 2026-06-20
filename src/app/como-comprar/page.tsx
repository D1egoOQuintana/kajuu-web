import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Cómo comprar | Kajuu Indumentaria",
  description:
    "Conocé cómo comprar en Kajuu: elegí una prenda, consultá stock y coordiná entrega por WhatsApp.",
};

type StepIcon = "apparel" | "chat" | "delivery" | "package";

const steps: ReadonlyArray<{
  number: string;
  title: string;
  body: string;
  icon: StepIcon;
}> = [
  {
    number: "01",
    title: "Elegí tu prenda",
    body: "Recorré el catálogo o los últimos ingresos. Cada ficha muestra talle, color, precio y disponibilidad orientativa.",
    icon: "apparel",
  },
  {
    number: "02",
    title: "Consultá por WhatsApp",
    body: "Escribinos desde la ficha del producto para confirmar medidas, color y disponibilidad real antes de avanzar.",
    icon: "chat",
  },
  {
    number: "03",
    title: "Coordiná entrega",
    body: "Acordamos entrega en CABA o punto de encuentro en Floresta, según el día, horario y prenda disponible.",
    icon: "delivery",
  },
  {
    number: "04",
    title: "Recibí tu pedido",
    body: "Confirmamos los detalles finales y coordinamos la entrega. Atención cálida y sin pasos innecesarios.",
    icon: "package",
  },
];

function StepIconSvg({ name }: { name: StepIcon }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "apparel":
      return (
        <svg {...common}>
          <path d="M8.5 3 12 5.2 15.5 3l4.5 2.6L17.8 9 16 8v12H8V8L6.2 9 4 5.6 8.5 3Z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5Z" />
          <path d="M8 10h8M8 13h5" />
        </svg>
      );
    case "delivery":
      return (
        <svg {...common}>
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7" />
          <circle cx="7" cy="18" r="1.6" />
          <circle cx="17" cy="18" r="1.6" />
        </svg>
      );
    case "package":
      return (
        <svg {...common}>
          <path d="M12 3 3 7v10l9 4 9-4V7l-9-4Z" />
          <path d="M3 7l9 4 9-4M12 11v10" />
        </svg>
      );
  }
}

export default function HowToBuyPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        {/* Header — replica Stitch: col-span-8 col-start-2, eyebrow + display + body */}
        <header className="bg-[#faf9f7]">
          <Container className="grid grid-cols-1 gap-8 pt-20 pb-12 md:pt-28 md:pb-16 lg:grid-cols-12 lg:pt-[104px]">
            <div className="lg:col-span-9 lg:col-start-2">
              <p className="label-caps mb-5 block text-[#7a2e2e] fade-in-up">
                La experiencia
              </p>
              <h1
                className="editorial-title text-[clamp(3.15rem,12vw,5rem)] leading-[1.02] text-[#2f140d] md:text-[80px] fade-in-up"
                style={{ animationDelay: "120ms", textWrap: "balance" }}
              >
                Cómo Comprar
              </h1>
              <p
                className="mt-7 max-w-2xl text-base leading-[1.7] text-[#5f5048] md:text-lg fade-in-up"
                style={{ animationDelay: "240ms" }}
              >
                Un proceso diseñado para ser tan cuidado como nuestras prendas.
                Cada paso está pensado para que adquieras tu próxima pieza Kajuu
                con asistencia personalizada y total tranquilidad.
              </p>
            </div>
          </Container>
        </header>

        {/* Steps — 4 cards centradas con círculo de icono, hover lift, stagger reveal */}
        <Container>
          <section
            aria-label="Pasos para comprar"
            className="stagger grid grid-cols-1 gap-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20"
          >
            {steps.map((step) => (
              <article
                className="lift-card group flex h-full flex-col items-center rounded-lg border border-[#e7d8cc] bg-[#f4f3f1] p-8 text-center shadow-[0_1px_2px_rgba(47,20,13,0.04)]"
                key={step.number}
              >
                <span className="step-icon-circle mb-7">
                  <StepIconSvg name={step.icon} />
                </span>
                <p className="label-caps mb-3 text-[#7a2e2e]">
                  Paso {step.number}
                </p>
                <h2 className="editorial-heading text-2xl text-[#2f140d]">
                  {step.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#5f5048]">
                  {step.body}
                </p>
              </article>
            ))}
          </section>

          {/* Bento — image card 7/5 con offset translate-y, hover image-zoom */}
          <section className="grid grid-cols-1 gap-6 py-14 md:grid-cols-12 lg:py-20">
            <article className="lift-card md:col-span-7 group overflow-hidden rounded-lg border border-[#e7d8cc] bg-[#faf9f7]">
              <div className="image-container relative h-64 w-full overflow-hidden md:h-80">
                <Image
                  alt="Entrega cuidada en CABA"
                  className="object-cover object-center sepia-[0.06]"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  src="/products/zara3.webp"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2f140d]/35 via-transparent to-transparent"
                />
              </div>
              <div className="p-8 md:p-10">
                <p className="label-caps mb-4 text-[#7a2e2e]">Logística</p>
                <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-[42px]" style={{ textWrap: "balance" }}>
                  Entregas en CABA, coordinadas con calma.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[#5f5048]">
                  Confirmamos disponibilidad real y forma de entrega antes de
                  cerrar el pedido. Sin formularios fríos ni dudas de último
                  momento.
                </p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-[#8c7a6b]/60" />
                  <p className="label-caps text-[#8c7a6b]">CABA · Floresta</p>
                </div>
              </div>
            </article>

            <article className="lift-card md:col-span-5 md:translate-y-12 group flex flex-col justify-between rounded-lg border border-[#e7d8cc] bg-[#f4f3f1] p-8 md:p-10">
              <div>
                <p className="label-caps mb-4 text-[#7a2e2e]">Espacio físico</p>
                <h3 className="editorial-heading text-2xl text-[#2f140d] md:text-3xl">
                  Showroom en Floresta
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#5f5048] md:text-base md:leading-8">
                  Un espacio íntimo y privado para que conozcas las prendas en
                  persona. Coordinamos tu visita por WhatsApp.
                </p>
              </div>
              <div className="mt-8">
                <WhatsAppCTA
                  className="link-arrow group"
                  label="Coordinar visita"
                  variant="primary"
                />
              </div>
              <div className="image-container mt-8 h-48 w-full overflow-hidden rounded-lg md:h-56">
                <Image
                  alt="Showroom Kajuu en Floresta"
                  className="h-full w-full object-cover object-center sepia-[0.06]"
                  height={480}
                  src="/products/images.jpg"
                  width={720}
                />
              </div>
            </article>
          </section>

          {/* Closing CTA — centered con border-top */}
          <section className="mt-16 flex flex-col items-center gap-7 border-t border-[#e7d8cc] py-16 text-center md:py-20">
            <p className="label-caps text-[#7a2e2e]">Asistencia personalizada</p>
            <h2
              className="editorial-heading max-w-2xl text-[34px] leading-[1.1] text-[#2f140d] md:text-[52px]"
              style={{ textWrap: "balance" }}
            >
              ¿Lista para tu próxima pieza?
            </h2>
            <p className="max-w-lg text-sm leading-7 text-[#5f5048] md:text-base">
              Empezá por el catálogo o escribinos para una recomendación
              personalizada.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[2px] border border-[#2f140d] bg-[#e8d6c0] px-8 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[#2f140d] shadow-[0_8px_20px_-12px_rgba(47,20,13,0.28)] transition-all duration-300 hover:bg-[#d4bf9f] hover:shadow-[0_14px_28px_-12px_rgba(47,20,13,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                href="/catalogo"
              >
                Iniciar consulta
              </Link>
              <WhatsAppCTA label="Hablar por WhatsApp" variant="secondary" />
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
