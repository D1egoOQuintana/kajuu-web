import Link from "next/link";

import { AdminProductsList } from "@/components/admin/admin-products-list";

export default function AdminProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="label-caps mb-3 text-[#8a5a3c]">Catálogo</p>
          <h1 className="editorial-heading text-4xl text-[#2f140d] md:text-5xl">Productos</h1>
        </div>
        <Link className="min-h-12 bg-[#2f140d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white" href="/kajuu-panel/productos/nuevo">Nuevo producto</Link>
      </div>
      <AdminProductsList />
    </main>
  );
}
