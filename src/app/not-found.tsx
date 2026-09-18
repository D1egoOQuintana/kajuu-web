import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background-primary)] px-5 text-center text-[var(--text-primary)]">
      <div className="max-w-lg">
        <p className="label-caps mb-4 text-[var(--brand)]">Error 404</p>
        <h1 className="editorial-heading text-5xl md:text-6xl">Esta página no existe.</h1>
        <p className="mt-5 leading-7 text-[var(--text-secondary)]">La prenda o sección pudo haber cambiado de dirección.</p>
        <Link className="button button--primary mt-8" href="/catalogo">Ver catálogo</Link>
      </div>
    </main>
  );
}
