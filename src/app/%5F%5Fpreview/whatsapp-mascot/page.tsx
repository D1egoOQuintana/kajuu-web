import type { Metadata } from "next";
import Link from "next/link";

import { BrandLogo } from "@/components/brand/brand-logo";

import styles from "./preview.module.css";
import { PreviewShowcase } from "./preview-showcase";

export const metadata: Metadata = {
  title: "Preview interno · Mascota WhatsApp KAJÚ",
  description: "Vista interna del sistema de CTA de WhatsApp con mascota Rive.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function WhatsAppMascotPreviewPage() {
  return (
    <main className={styles.preview}>
      <header className={styles.header}>
        <Link aria-label="Volver al inicio" href="/">
          <BrandLogo alt="" variant="horizontal" />
        </Link>
        <div>
          <p>Preview interno · No indexable</p>
          <span>Sistema de asistencia por WhatsApp</span>
        </div>
      </header>

      <section className={styles.intro}>
        <p className={styles.kicker}>KAJÚ · Sistema de conversión</p>
        <h1>Una presencia cálida, usada con criterio.</h1>
        <p>
          Tres niveles permiten comparar la mascota destacada, el apoyo contextual
          en producto y el CTA estándar que permanece limpio en el catálogo.
        </p>
      </section>

      <PreviewShowcase />

      <section className={styles.behavior}>
        <div>
          <p className={styles.miniLabel}>Movimiento reducido</p>
          <h2>El CTA nunca depende de la animación.</h2>
        </div>
        <p>
          Con la preferencia “reducir movimiento”, el runtime pausa la máquina de
          estado y desactiva seguimiento y reacciones. Si el archivo no carga, se
          conserva el espacio y el enlace de WhatsApp continúa funcionando.
        </p>
      </section>

      <footer className={styles.footer}>
        <p>
          “Cat interaction” por Elvin_R, utilizado bajo licencia{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            rel="noopener noreferrer"
            target="_blank"
          >
            CC BY 4.0
          </a>
          .
        </p>
        <a
          href="https://rive.app/community/files/11564-22141-cat-interaction/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ver archivo original
        </a>
      </footer>
    </main>
  );
}
