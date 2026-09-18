import type { Metadata } from "next";

import { KajuuFaq } from "@/components/content/kajuu-faq";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a KAJÚ por WhatsApp o Instagram. Consultas de stock, tallas, entregas y últimos ingresos.",
  alternates: { canonical: "/contacto" },
};

const faqs = [
  {
    question: "¿Cómo consulto stock?",
    answer:
      "Entra al producto que te interesa y toca Consultar por WhatsApp. El mensaje llega con el nombre de la prenda para revisar disponibilidad más rápido.",
  },
  {
    question: "¿Tienen cambios o devoluciones?",
    answer:
      "Aceptamos cambios dentro de los 30 días, siempre que la prenda esté sin uso y con sus etiquetas. Para iniciarlo, escríbenos por WhatsApp con tus datos.",
  },
  {
    question: "¿Cómo sé cuál es mi talla?",
    answer:
      "Revisa la guía de tallas con medidas en cm. Si dudas entre dos tallas, escríbenos tus medidas y te orientamos según la prenda exacta.",
  },
  {
    question: "¿Qué métodos de envío ofrecen?",
    answer:
      "Coordinamos entregas en CABA y punto de encuentro en Floresta. La modalidad exacta y tiempos se confirman por WhatsApp antes de cerrar el pedido.",
  },
  {
    question: "¿Dónde veo los últimos ingresos?",
    answer:
      "Los últimos ingresos están integrados en el Home y también puedes filtrarlos en el catálogo con la pestaña Últimos ingresos.",
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
    <div className="min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]">
      <PublicHeader />
      <main className="pb-24">
        <Container className="pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="max-w-3xl">
            <h1
              className="editorial-title text-[clamp(3rem,11vw,5rem)] leading-[1.04] text-[var(--text-primary)] md:text-[80px]"
              style={{ textWrap: "balance" }}
            >
              Estamos para ayudarte.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">
              ¿Dudas de talla, stock o entrega? Escríbenos y te respondemos en
              el día. También puedes revisar las preguntas frecuentes.
            </p>
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-1 gap-8 pb-16 md:grid-cols-12">
            {/* Bento info column (Stitch: md:col-span-4) */}
            <aside className="stagger flex flex-col gap-6 md:col-span-4">
              <article className="lift-card group flex h-full min-h-[260px] cursor-pointer flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-7 md:p-8">
                <div>
                  <span className="mb-5 inline-flex text-[var(--brand)]">
                    <ChatIcon />
                  </span>
                  <h2 className="editorial-heading text-2xl text-[var(--text-primary)] md:text-3xl">
                    Asistencia personalizada
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Ideal para stock, tallas, colores, entregas y prendas que
                    viste en Instagram.
                  </p>
                </div>
                <WhatsAppCTA
                  className="link-arrow mt-7 !justify-start !border-transparent !bg-transparent !px-0 text-[var(--brand)] hover:!bg-transparent hover:!text-[var(--brand-hover)]"
                  label="Iniciar chat"
                  variant="ghost"
                />
              </article>

              <article className="lift-card group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--background-primary)] p-7 md:p-8">
                <div>
                  <span className="mb-5 inline-flex text-[var(--text-primary)]">
                    <CameraIcon />
                  </span>
                  <h2 className="editorial-heading text-2xl text-[var(--text-primary)] md:text-3xl">
                    Instagram
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    Síguenos para ver ingresos, combinaciones, prendas en uso
                    y novedades del showroom.
                  </p>
                </div>
                <a
                  className="link-arrow label-caps mt-7 inline-flex min-h-11 w-fit items-center gap-2 border-b border-[var(--text-primary)] text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                  href={INSTAGRAM_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {INSTAGRAM_HANDLE}
                  <span aria-hidden="true" className="arrow">→</span>
                </a>
              </article>

              <article className="lift-card rounded-xl border border-[var(--border)] bg-[var(--background-primary)] p-7 md:p-8">
                <span className="mb-5 inline-flex text-[var(--brand)]">
                  <InfoIcon />
                </span>
                <h3 className="editorial-heading mb-5 text-2xl text-[var(--text-primary)] md:text-3xl">
                  Información
                </h3>
                <div className="mb-5">
                  <p className="label-caps mb-2 text-[var(--text-muted)]">
                    Horarios de atención
                  </p>
                  <p className="text-[15px] leading-6 text-[var(--text-primary)]">
                    Lunes a viernes
                    <br />
                    10:00 – 19:00 hs
                  </p>
                </div>
                <div>
                  <p className="label-caps mb-2 text-[var(--text-muted)]">
                    Entregas en CABA
                  </p>
                  <p className="text-[15px] leading-6 text-[var(--text-secondary)]">
                    Mensajería privada en el día para pedidos confirmados antes
                    de las 13:00 hs.
                  </p>
                </div>
              </article>
            </aside>

            {/* FAQ column */}
            <div className="md:col-span-8 md:pl-6 lg:pl-10">
              <h2 className="editorial-heading mb-8 border-b border-[var(--border)] pb-4 text-3xl text-[var(--text-primary)] md:text-[44px]">
                Preguntas Frecuentes
              </h2>

              <KajuuFaq items={[...faqs]} />

              <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] p-7 md:flex-row md:items-center md:p-8">
                <div className="max-w-lg">
                  <p className="label-caps mb-2 text-[var(--brand)]">¿No encontraste tu respuesta?</p>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    Escríbenos: la atención por WhatsApp es el canal más rápido y
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
