import type { Metadata } from "next";

import { KajuuFaq } from "@/components/content/kajuu-faq";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

import styles from "./contacto.module.css";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a KAJÚ por WhatsApp o Instagram para consultar disponibilidad, colores, entregas y cambios.",
  alternates: { canonical: "/contacto" },
};

const faqs = [
  {
    question: "¿Cómo consulto la disponibilidad?",
    answer:
      "Abre la ficha de la prenda y toca Preguntar por esta prenda. El mensaje incluye el producto y puede sumar el color seleccionado.",
  },
  {
    question: "¿Puedo coordinar un cambio?",
    answer:
      "Sí. Escríbenos con el nombre de la prenda. Revisamos el estado, las etiquetas y la disponibilidad del producto antes de coordinar.",
  },
  {
    question: "¿Cómo coordinan las entregas?",
    answer:
      "Coordinamos entregas en CABA y envíos a todo el país. La modalidad disponible se confirma por WhatsApp.",
  },
  {
    question: "¿Dónde veo los últimos ingresos?",
    answer:
      "Están en el inicio y en el filtro Últimos ingresos dentro del catálogo.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PublicHeader />

      <main>
        <header className={styles.hero}>
          <Container className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Contacto · KAJÚ</p>
              <h1 className={styles.heroTitle}>
                Estamos para ayudarte a elegir.
              </h1>
            </div>

            <div className={styles.heroIntro}>
              <p className={styles.heroLead}>
                Consulta disponibilidad, colores, entregas o cambios. Te
                respondemos de forma personal para que compres con claridad.
              </p>
              <dl className={styles.serviceFacts}>
                <div>
                  <dt>Atención</dt>
                  <dd>Lunes a sábado</dd>
                </div>
                <div>
                  <dt>Envíos</dt>
                  <dd>CABA y todo el país</dd>
                </div>
              </dl>
            </div>
          </Container>
        </header>

        <section className={styles.channels} aria-labelledby="contact-channels">
          <Container>
            <div className={styles.sectionIntro}>
              <div>
                <p className={styles.eyebrow}>Canales de atención</p>
                <h2 className={styles.sectionTitle} id="contact-channels">
                  Elige cómo comunicarte.
                </h2>
              </div>
            </div>

            <div className={styles.channelGrid}>
              <article className={styles.primaryChannel}>
                <div>
                  <p className={styles.channelNumber}>01 / WhatsApp</p>
                  <h3 className={styles.primaryTitle}>
                    La forma más directa de consultar.
                  </h3>
                  <p className={styles.primaryBody}>
                    Confirma una prenda, un color o la modalidad de entrega con
                    una persona del equipo.
                  </p>
                </div>

                <div className={styles.primaryAction}>
                  <div className={styles.topicList} aria-label="Puedes consultar por">
                    <span>Disponibilidad</span>
                    <span>Colores</span>
                    <span>Entregas y cambios</span>
                  </div>
                  <WhatsAppCTA
                    className={styles.whatsappButton}
                    label="Escríbenos por WhatsApp"
                    variant="inverse"
                  />
                </div>
              </article>

              <div className={styles.secondaryChannels}>
                <a
                  aria-label={`Abrir Instagram de KAJÚ: ${INSTAGRAM_HANDLE}`}
                  className={`${styles.secondaryChannel} ${styles.instagramChannel}`}
                  href={INSTAGRAM_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className={styles.channelNumber}>02 / Instagram</span>
                  <span className={styles.secondaryContent}>
                    <strong>Novedades y prendas en uso.</strong>
                    <span>
                      Sigue los nuevos ingresos y la selección diaria de KAJÚ.
                    </span>
                  </span>
                  <span className={styles.channelLink}>
                    {INSTAGRAM_HANDLE} <span aria-hidden="true">↗</span>
                  </span>
                </a>

                <article className={styles.secondaryChannel}>
                  <span className={styles.channelNumber}>03 / Entregas</span>
                  <span className={styles.secondaryContent}>
                    <strong>Coordinación antes de comprar.</strong>
                    <span>
                      Entregas en CABA y envíos a todo el país, según la opción
                      disponible para tu pedido.
                    </span>
                  </span>
                  <span className={styles.locationNote}>Buenos Aires · Argentina</span>
                </article>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <Container className={styles.faqGrid}>
            <div className={styles.faqIntro}>
              <p className={styles.eyebrow}>Antes de escribirnos</p>
              <h2 className={styles.faqTitle} id="faq-title">
                Preguntas frecuentes
              </h2>
              <p className={styles.faqLead}>
                Respuestas rápidas sobre disponibilidad, cambios y entregas.
              </p>
            </div>

            <div className={styles.faqList}>
              <KajuuFaq items={[...faqs]} />
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
