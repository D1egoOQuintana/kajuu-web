import type { Metadata } from "next";
import Link from "next/link";

import { BotanicalBloom } from "@/components/brand/botanical-bloom";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

import styles from "./como-comprar.module.css";

export const metadata: Metadata = {
  title: "Cómo comprar",
  description:
    "Descubre cómo comprar en KAJÚ: elige una prenda, consulta su disponibilidad y coordina la entrega por WhatsApp.",
  alternates: { canonical: "/como-comprar" },
};

type StepIcon = "apparel" | "chat" | "delivery" | "package";

const steps: ReadonlyArray<{
  number: string;
  title: string;
  body: string;
  detail: string;
  icon: StepIcon;
}> = [
  {
    number: "01",
    title: "Elige tu prenda",
    body: "Recorre el catálogo y abre la ficha para conocer el precio, los colores y los detalles del modelo.",
    detail: "Catálogo actualizado",
    icon: "apparel",
  },
  {
    number: "02",
    title: "Consúltanos por WhatsApp",
    body: "Desde cada ficha puedes iniciar una consulta con la información de la prenda ya incluida.",
    detail: "Atención personalizada",
    icon: "chat",
  },
  {
    number: "03",
    title: "Confirmamos disponibilidad",
    body: "Revisamos el stock real y aclaramos cualquier duda antes de avanzar con la compra.",
    detail: "Confirmación antes de comprar",
    icon: "package",
  },
  {
    number: "04",
    title: "Coordinamos la entrega",
    body: "Definimos por WhatsApp la modalidad de entrega en CABA y envíos a todo el país.",
    detail: "Entrega coordinada",
    icon: "delivery",
  },
];

function StepIconSvg({ name }: { name: StepIcon }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
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
    <div className={styles.page}>
      <PublicHeader />

      <main>
        <section className={styles.hero}>
          <Container className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Cómo comprar en KAJÚ</p>
              <h1 className={styles.heroTitle}>
                Elige tu próxima prenda con atención personalizada.
              </h1>
              <p className={styles.heroLead}>
                Una experiencia simple y acompañada: explora la colección,
                consulta por WhatsApp y coordinamos la entrega contigo.
              </p>

              <div className={styles.heroActions}>
                <Link className="button button--primary" href="/catalogo">
                  Explorar catálogo
                </Link>
                <WhatsAppCTA
                  label="Hablar con KAJÚ"
                  variant="secondary"
                />
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Resumen de compra">
              <div className={styles.heroPanelCopy}>
                <p className={styles.panelIndex}>01 — 04</p>
                <p className={styles.panelTitle}>Sin carrito. Sin vueltas.</p>
                <p className={styles.panelBody}>
                  Te acompañamos desde la elección hasta la entrega.
                </p>
              </div>
              <div className={styles.heroArt}>
                <BotanicalBloom
                  className={styles.heroFlower}
                  motion="none"
                  tone="dark"
                  variant="cluster"
                />
              </div>
            </aside>
          </Container>
        </section>

        <section className={styles.process} aria-labelledby="purchase-process">
          <Container>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>El proceso</p>
                <h2 className={styles.sectionTitle} id="purchase-process">
                  Cuatro pasos, una conversación.
                </h2>
              </div>
              <p className={styles.sectionLead}>
                Cada compra se confirma de forma personal para que sepas qué
                estás eligiendo y cómo vas a recibirlo.
              </p>
            </div>

            <ol className={styles.steps}>
              {steps.map((step) => (
                <li className={styles.step} key={step.number}>
                  <div className={styles.stepTopline}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <span className={styles.stepIcon} aria-hidden="true">
                      <StepIconSvg name={step.icon} />
                    </span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                  <p className={styles.stepDetail}>{step.detail}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <Container className={styles.closingWrap}>
          <section className={styles.closing}>
            <div className={styles.closingCopy}>
              <p className={styles.closingEyebrow}>Entrega y envíos</p>
              <h2 className={styles.closingTitle}>
                Coordinamos cada detalle antes de cerrar la compra.
              </h2>
              <p className={styles.closingBody}>
                Realizamos entregas en CABA y envíos a todo el país. La modalidad disponible se confirma de forma personalizada por WhatsApp.
              </p>
            </div>

            <div className={styles.closingActions}>
              <WhatsAppCTA
                className={styles.closingButton}
                label="Escríbenos por WhatsApp"
                variant="inverse"
              />
              <Link
                className={`${styles.closingLink} link-arrow`}
                href="/catalogo"
              >
                Ver la colección <span className="arrow">→</span>
              </Link>
            </div>

          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
