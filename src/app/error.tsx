"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background-primary)] px-5 text-center text-[var(--text-primary)]">
      <div className="max-w-lg">
        <p className="label-caps mb-4 text-[var(--brand)]">Ocurrió un problema</p>
        <h1 className="editorial-heading text-4xl md:text-5xl">No pudimos cargar esta página.</h1>
        <p className="mt-5 leading-7 text-[var(--text-secondary)]">Intenta nuevamente. Si el problema continúa, puedes contactarnos por WhatsApp.</p>
        <button className="button button--primary mt-8" onClick={reset} type="button">Reintentar</button>
      </div>
    </main>
  );
}
