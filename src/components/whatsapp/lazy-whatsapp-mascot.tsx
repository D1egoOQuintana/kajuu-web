"use client";

import dynamic from "next/dynamic";

import styles from "./whatsapp-system.module.css";

export const LazyWhatsAppMascot = dynamic(
  () =>
    import("./whatsapp-mascot").then((module) => module.WhatsAppMascot),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className={styles.mascotPlaceholder} />,
  },
);
