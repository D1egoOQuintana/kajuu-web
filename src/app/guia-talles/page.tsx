import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Guía de talles | Kajuu Indumentaria",
  description:
    "Guía general de talles Kajuu con consejos para tomar medidas y consultar dudas por WhatsApp.",
};

const measurements = [
  {
    title: "Busto / Pecho",
    body: "Medí alrededor de la parte más amplia, manteniendo la cinta horizontal.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9h18M3 9v6h18V9M6 9V7M10 9V7M14 9V7M18 9V7" />
      </svg>
    ),
  },
  {
    title: "Cintura",
    body: "Medí la parte más angosta del torso, en postura natural y sin ajustar.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5c2 4 2 10 0 14M19 5c-2 4-2 10 0 14M5 12h14" />
      </svg>
    ),
  },
  {
    title: "Cadera",
    body: "Medí el contorno por la parte más amplia de la cadera, con una prenda liviana.",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 22c0-5 2-8 6-8s6 3 6 8" />
      </svg>
    ),
  },
] as const;

const topsSweaters = [
  { size: "S", bust: "84 – 88", waist: "64 – 68", length: "58" },
  { size: "M", bust: "89 – 93", waist: "69 – 73", length: "60" },
  { size: "L", bust: "94 – 98", waist: "74 – 78", length: "62" },
] as const;

const jeansBottoms = [
  { size: "36 / S", waist: "64 – 68", hip: "90 – 94", inseam: "78" },
  { size: "38 / M", waist: "69 – 73", hip: "95 – 99", inseam: "80" },
  { size: "40 / L", waist: "74 – 78", hip: "100 – 104", inseam: "82" },
] as const;

const exchangePolicies = [
  {
    eyebrow: "Plazo de cambio",
    title: "Hasta 30 días",
    body: "Dispones de 30 días corridos desde la recepción para coordinar un cambio por talle, color u otra prenda de la colección.",
  },
  {
    eyebrow: "Condiciones",
    title: "Prenda en estado original",
    body: "La pieza debe devolverse sin uso, sin lavar, con todas las etiquetas adheridas y en su packaging.",
  },
  {
    eyebrow: "Proceso",
    title: "Coordinación por WhatsApp",
    body: "El cambio se inicia escribiéndonos al WhatsApp. Coordinamos retiro y entrega de manera personalizada en CABA.",
  },
] as const;

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <Container className="pt-20 pb-12 md:pt-28 md:pb-16">
          <div className="max-w-3xl">
            <p
              className="label-caps mb-5 block text-[#7a2e2e] fade-in-up"
            >
              Medidas y cambios
            </p>
            <h1
              className="editorial-title text-[clamp(3rem,11vw,5rem)] leading-[1.04] text-[#2f140d] md:text-[80px] fade-in-up"
              style={{ animationDelay: "120ms", textWrap: "balance" }}
            >
              Guía de Talles y Cambios
            </h1>
            <p
              className="mt-6 max-w-2xl text-base leading-[1.7] text-[#5f5048] md:text-lg fade-in-up"
              style={{ animationDelay: "240ms" }}
            >
              Encontrá tu calce perfecto. Las medidas son orientativas y pueden
              variar según tela y silueta, por eso siempre podemos confirmar
              dudas puntuales por WhatsApp.
            </p>
          </div>
        </Container>

        <Container>
          {/* Guía de Talles section title */}
          <section className="pb-16">
            <h2 className="editorial-heading mb-10 border-b border-[#e7d8cc] pb-4 text-3xl text-[#2f140d] md:text-[44px]">
              Guía de Talles
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Sidebar — Cómo medirte + imagen */}
              <aside className="flex flex-col gap-6 lg:col-span-4">
                <div className="rounded-lg border border-[#e7d8cc] bg-[#f4f3f1] p-7 md:p-8">
                  <p className="label-caps mb-5 text-[#7a2e2e]">Cómo medirte</p>
                  <ul className="space-y-5">
                    {measurements.map((item) => (
                      <li className="flex items-start gap-4" key={item.title}>
                        <span className="mt-0.5 shrink-0 text-[#8a5a3c]">
                          {item.icon}
                        </span>
                        <div>
                          <p className="text-[15px] font-semibold text-[#2f140d]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[13px] leading-6 text-[#5f5048]">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="image-container relative aspect-[4/5] overflow-hidden rounded-lg border border-[#e7d8cc] bg-[#efeeec]">
                  <Image
                    alt="Referencia editorial Kajuu de tomas de medidas"
                    className="object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src="/products/450e.avif"
                  />
                </div>
              </aside>

              {/* Tablas */}
              <div className="flex flex-col gap-10 lg:col-span-8">
                <div className="overflow-x-auto">
                  <h3 className="label-caps mb-4 text-[#2f140d]">
                    Tops & Sweaters (cm)
                  </h3>
                  <table className="w-full min-w-[480px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-[#2f140d]">
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Talle
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Busto
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Cintura
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Largo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topsSweaters.map((row) => (
                        <tr
                          className="border-b border-[#e7d8cc]/60 transition-colors hover:bg-[#f4f3f1]"
                          key={row.size}
                        >
                          <th className="py-5 text-base font-medium text-[#2f140d]" scope="row">
                            {row.size}
                          </th>
                          <td className="py-5 text-[#5f5048]">{row.bust}</td>
                          <td className="py-5 text-[#5f5048]">{row.waist}</td>
                          <td className="py-5 text-[#5f5048]">{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto">
                  <h3 className="label-caps mb-4 text-[#2f140d]">
                    Jeans & Bottoms (cm)
                  </h3>
                  <table className="w-full min-w-[480px] border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-[#2f140d]">
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Talle / Eq
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Cintura
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Cadera
                        </th>
                        <th className="label-caps py-4 text-[#5f5048]" scope="col">
                          Entrepierna
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jeansBottoms.map((row) => (
                        <tr
                          className="border-b border-[#e7d8cc]/60 transition-colors hover:bg-[#f4f3f1]"
                          key={row.size}
                        >
                          <th className="py-5 text-base font-medium text-[#2f140d]" scope="row">
                            {row.size}
                          </th>
                          <td className="py-5 text-[#5f5048]">{row.waist}</td>
                          <td className="py-5 text-[#5f5048]">{row.hip}</td>
                          <td className="py-5 text-[#5f5048]">{row.inseam}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Políticas de Cambio */}
          <section className="pb-12">
            <h2 className="editorial-heading mb-10 border-b border-[#e7d8cc] pb-4 text-3xl text-[#2f140d] md:text-[44px]">
              Políticas de Cambio
            </h2>

            <div className="stagger grid grid-cols-1 gap-6 md:grid-cols-3">
              {exchangePolicies.map((policy) => (
                <article
                  className="lift-card flex h-full flex-col items-start rounded-lg border border-[#e7d8cc] bg-[#faf9f7] p-7 md:p-8"
                  key={policy.eyebrow}
                >
                  <p className="label-caps mb-4 text-[#7a2e2e]">
                    {policy.eyebrow}
                  </p>
                  <h3 className="editorial-heading text-xl text-[#2f140d] md:text-2xl">
                    {policy.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#5f5048]">
                    {policy.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppCTA
                className="link-arrow group"
                label="Iniciar un cambio"
                variant="primary"
              />
              <p className="text-sm leading-7 text-[#5f5048]">
                Respondemos durante el día por WhatsApp para coordinar talle,
                medidas o cambios.
              </p>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
