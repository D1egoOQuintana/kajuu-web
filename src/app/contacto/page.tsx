import type { Metadata } from "next";

import { KajuuFaq } from "@/components/content/kajuu-faq";
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
    question: "¿Tienen cambios o devoluciones?",
    answer:
      "Aceptamos cambios dentro de los 30 días, siempre que la prenda esté sin uso y con sus etiquetas. Para iniciarlo, escribinos por WhatsApp con tus datos.",
  },
  {
    question: "¿Cómo sé cuál es mi talle?",
    answer:
      "Revisá la guía de talles con medidas en cm. Si dudás entre dos talles, escribinos tus medidas y te orientamos según la prenda exacta.",
  },
  {
    question: "¿Qué métodos de envío ofrecen?",
    answer:
      "Coordinamos entregas en CABA y punto de encuentro en Floresta. La modalidad exacta y tiempos se confirman por WhatsApp antes de cerrar el pedido.",
  },
  {
    question: "¿Dónde veo los últimos ingresos?",
    answer:
      "Los últimos ingresos están integrados en el Home y también podés filtrarlos en el catálogo con la pestaña Últimos ingresos.",
  },
] as const;

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5h16v11H8l-4 4V5Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h3l2-2h6l2 2h3v12H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v5h1" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <Container className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-3xl">
            <p className="label-caps mb-5 block text-[#7a2e2e]">
              Contacto y dudas
            </p>
            <h1
              className="editorial-title text-[clamp(3rem,11vw,5rem)] leading-[1.04] text-[#2f140d] md:text-[80px]"
              style={{ textWrap: "balance" }}
            >
              Estamos para ayudarte.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-[#5f5048] md:text-lg">
              Nuestro equipo está dedicado a brindarte una experiencia de
              compra cuidada. Explorá las preguntas frecuentes o escribinos
              directamente para asistencia personalizada.
            </p>
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-1 gap-8 pb-16 md:grid-cols-12">
            {/* Bento info column (Stitch: md:col-span-4) */}
            <aside className="stagger flex flex-col gap-6 md:col-span-4">
              <article className="lift-card group flex h-full min-h-[260px] cursor-pointer flex-col justify-between rounded-xl border border-[#e7d8cc] bg-[#f4f3f1] p-7 shadow-[0_1px_2px_rgba(47,20,13,0.04)] md:p-8">
                <div>
                  <span className="mb-5 inline-flex text-[#7a2e2e]">
                    <ChatIcon />
                  </span>
                  <h2 className="editorial-heading text-2xl text-[#2f140d] md:text-3xl">
                    Asistencia personalizada
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#5f5048]">
                    Ideal para stock, talles, colores, entregas y prendas que
                    viste en Instagram.
                  </p>
                </div>
                <WhatsAppCTA
                  className="link-arrow mt-7 !justify-start !border-transparent !bg-transparent !px-0 text-[#7a2e2e] hover:!bg-transparent hover:!text-[#5a1f1f]"
                  label="Iniciar chat"
                  variant="ghost"
                />
              </article>

              <article className="lift-card group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-[#e7d8cc] bg-[#faf9f7] p-7 shadow-[0_1px_2px_rgba(47,20,13,0.04)] md:p-8">
                <div>
                  <span className="mb-5 inline-flex text-[#2f140d]">
                    <CameraIcon />
                  </span>
                  <h2 className="editorial-heading text-2xl text-[#2f140d] md:text-3xl">
                    Instagram
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[#5f5048]">
                    Seguinos para ver ingresos, combinaciones, prendas en uso
                    y novedades del showroom.
                  </p>
                </div>
                <a
                  className="link-arrow label-caps mt-7 inline-flex w-fit items-center gap-2 border-b border-[#2f140d] pb-1 text-[#2f140d] transition-colors hover:border-[#7a2e2e] hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
                  href="https://www.instagram.com/kajuu.indumentaria/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @kajuu.indumentaria
                  <span aria-hidden="true" className="arrow">→</span>
                </a>
              </article>

              <article className="lift-card rounded-xl border border-[#e7d8cc] bg-[#faf9f7] p-7 shadow-[0_1px_2px_rgba(47,20,13,0.04)] md:p-8">
                <span className="mb-5 inline-flex text-[#8a5a3c]">
                  <InfoIcon />
                </span>
                <h3 className="editorial-heading mb-5 text-2xl text-[#2f140d] md:text-3xl">
                  Información
                </h3>
                <div className="mb-5">
                  <p className="label-caps mb-2 text-[#8c7a6b]">
                    Horarios de atención
                  </p>
                  <p className="text-[15px] leading-6 text-[#2f140d]">
                    Lunes a viernes
                    <br />
                    10:00 – 19:00 hs
                  </p>
                </div>
                <div>
                  <p className="label-caps mb-2 text-[#8c7a6b]">
                    Entregas en CABA
                  </p>
                  <p className="text-[15px] leading-6 text-[#5f5048]">
                    Mensajería privada en el día para pedidos confirmados antes
                    de las 13:00 hs.
                  </p>
                </div>
              </article>
            </aside>

            {/* FAQ column */}
            <div className="md:col-span-8 md:pl-6 lg:pl-10">
              <h2 className="editorial-heading mb-8 border-b border-[#e7d8cc] pb-4 text-3xl text-[#2f140d] md:text-[44px]">
                Preguntas Frecuentes
              </h2>

              <KajuuFaq items={[...faqs]} />

              <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl border border-[#e7d8cc] bg-[#f4f3f1] p-7 md:flex-row md:items-center md:p-8">
                <div className="max-w-lg">
                  <p className="label-caps mb-2 text-[#7a2e2e]">¿No encontraste tu respuesta?</p>
                  <p className="text-sm leading-7 text-[#5f5048]">
                    Escribinos: la atención por WhatsApp es el canal más rápido y
                    personal.
                  </p>
                </div>
                <WhatsAppCTA
                  className="link-arrow group"
                  label="Enviar consulta"
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
