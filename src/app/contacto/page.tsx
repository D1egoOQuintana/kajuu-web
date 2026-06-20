import type { Metadata } from "next";

import { FaqItem } from "@/components/content/faq-item";
import { InfoCard } from "@/components/content/info-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Contacto | Kajuu Indumentaria",
  description:
    "Contactá a Kajuu por WhatsApp o Instagram. Consultas de stock, talles, entregas y últimos ingresos.",
};

const faqs = [
  {
    question: "¿Cómo consulto stock?",
    answer:
      "Entrá al producto que te interesa y tocá Consultar por WhatsApp. El mensaje llega con el nombre de la prenda para revisar disponibilidad más rápido.",
  },
  {
    question: "¿Tienen cambios?",
    answer:
      "Los cambios se coordinan según disponibilidad, estado de la prenda y talle o color requerido. Te recomendamos consultar medidas antes de confirmar.",
  },
  {
    question: "¿Cómo sé mi talle?",
    answer:
      "Podés revisar la guía de talles y escribirnos tus medidas. Te orientamos según tela, calce y tipo de prenda.",
  },
  {
    question: "¿Hacen envíos?",
    answer:
      "Coordinamos entregas en CABA y punto de encuentro en Floresta. La modalidad exacta se confirma por WhatsApp.",
  },
  {
    question: "¿Dónde veo nuevos ingresos?",
    answer:
      "Los últimos ingresos están en la sección Novedades y también se comunican por Instagram.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="Kajuu."
          description="Estamos para ayudarte a confirmar stock, elegir talle, coordinar entrega o armar una combinación. La atención es directa y personalizada."
          eyebrow="Contacto y dudas"
          title="Hablemos"
        >
          <WhatsAppCTA label="Escribir por WhatsApp" variant="primary" />
        </PageHero>

        <Container>
          <section className="grid gap-5 py-10 md:grid-cols-3 lg:py-14">
            <InfoCard eyebrow="WhatsApp" title="Consulta directa">
              <p>
                Ideal para stock, talles, colores, entregas y prendas que viste
                en Instagram.
              </p>
              <div className="mt-5">
                <WhatsAppCTA label="Abrir WhatsApp" size="sm" variant="secondary" />
              </div>
            </InfoCard>

            <InfoCard eyebrow="Instagram" title="@kajuu.indumentaria">
              <p>
                Seguinos para ver ingresos, combinaciones, prendas en uso y
                novedades del showroom.
              </p>
              <a
                className="boutique-link mt-5 text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                href="https://www.instagram.com/kajuu.indumentaria/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Ir a Instagram
              </a>
            </InfoCard>

            <InfoCard eyebrow="Ubicación" title="Floresta / CABA">
              <p>
                Coordinamos entregas y puntos de encuentro de forma privada por
                WhatsApp. No publicamos datos sensibles en la web.
              </p>
            </InfoCard>
          </section>

          <section className="grid gap-10 border-y border-[#e7d8cc] py-10 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-4">
              <p className="label-caps mb-3 text-[#8a5a3c]">FAQ</p>
              <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-5xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#5f5048]">
                Respuestas cortas para resolver dudas antes de escribirnos. Si
                necesitás algo puntual, WhatsApp sigue siendo el mejor canal.
              </p>
            </div>

            <div className="lg:col-span-8">
              {faqs.map((faq) => (
                <FaqItem
                  answer={faq.answer}
                  key={faq.question}
                  question={faq.question}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col items-start justify-between gap-5 pt-10 md:flex-row md:items-center">
            <div>
              <p className="label-caps mb-2 text-[#8a5a3c]">Horario</p>
              <p className="max-w-xl text-sm leading-7 text-[#5f5048]">
                Respondemos consultas durante el día. Si escribís fuera de
                horario, retomamos apenas estemos disponibles.
              </p>
            </div>
            <WhatsAppCTA label="Enviar consulta" variant="primary" />
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
