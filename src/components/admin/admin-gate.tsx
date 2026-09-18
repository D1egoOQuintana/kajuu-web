"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { useAdminAuth } from "@/features/auth/admin-auth-context";

function LoginForm() {
  const { configurationError, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "No se pudo iniciar sesión. Revisa tus datos.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f3f1] px-5 py-16">
      <section className="w-full max-w-md border border-[#e7d8cc] bg-[#faf9f7] p-7 shadow-xl md:p-10">
        <p className="label-caps mb-3 text-[#8a5a3c]">Acceso privado</p>
        <h1 className="editorial-heading text-4xl text-[#2f140d]">Panel KAJÚ</h1>
        <p className="mt-4 text-sm leading-6 text-[#5f5048]">
          Inicia sesión con una cuenta autorizada para administrar el catálogo.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[#2f140d]">
            Correo electrónico
            <input
              autoComplete="email"
              className="mt-2 min-h-12 w-full border border-[#cdbeb2] bg-white px-4 outline-none focus:border-[#7a2e2e]"
              disabled={Boolean(configurationError)}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label className="block text-sm font-medium text-[#2f140d]">
            Contraseña
            <input
              autoComplete="current-password"
              className="mt-2 min-h-12 w-full border border-[#cdbeb2] bg-white px-4 outline-none focus:border-[#7a2e2e]"
              disabled={Boolean(configurationError)}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {(configurationError || error) && (
            <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
              {configurationError || error}
            </p>
          )}
          <button
            className="min-h-12 w-full bg-[#2f140d] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting || Boolean(configurationError)}
            type="submit"
          >
            {submitting ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
        <Link className="mt-6 block text-center text-sm text-[#7a2e2e] underline" href="/">
          Volver al sitio
        </Link>
      </section>
    </main>
  );
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f3f1]">
        <p className="label-caps text-[#5f5048]" role="status">Validando acceso…</p>
      </main>
    );
  }
  if (!user || !isAdmin) return <LoginForm />;

  return (
    <div className="min-h-screen bg-[#f4f3f1] text-[#1a1c1b]">
      <header className="border-b border-[#e7d8cc] bg-[#2f140d] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link className="editorial-heading text-2xl" href="/kajuu-panel">KAJÚ Panel</Link>
            <nav aria-label="Administración" className="flex items-center gap-4 text-sm">
              <Link className="hover:text-[#e8d6c0]" href="/kajuu-panel/productos">Productos</Link>
              <Link className="hover:text-[#e8d6c0]" href="/kajuu-panel/productos/nuevo">Crear</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-[#e8d6c0] sm:inline">{user.email}</span>
            <button className="border border-white/40 px-3 py-2 hover:border-white" onClick={() => void logout()} type="button">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
