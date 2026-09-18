import Link from "next/link";

export default function AdminHomePage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <p className="label-caps mb-3 text-[#8a5a3c]">Administración</p>
      <h1 className="editorial-heading text-4xl text-[#2f140d] md:text-5xl">Catálogo KAJÚ</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#5f5048]">
        Crea productos, actualiza disponibilidad, organiza imágenes y controla qué prendas se muestran en el sitio.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Link className="border border-[#e7d8cc] bg-white p-7 transition-transform hover:-translate-y-1" href="/kajuu-panel/productos">
          <h2 className="editorial-heading text-2xl text-[#2f140d]">Ver productos</h2>
          <p className="mt-2 text-sm leading-6 text-[#5f5048]">Edita, publica u oculta el catálogo existente.</p>
        </Link>
        <Link className="border border-[#e7d8cc] bg-white p-7 transition-transform hover:-translate-y-1" href="/kajuu-panel/productos/nuevo">
          <h2 className="editorial-heading text-2xl text-[#2f140d]">Nuevo producto</h2>
          <p className="mt-2 text-sm leading-6 text-[#5f5048]">Carga la información y las imágenes de una prenda.</p>
        </Link>
      </div>
    </main>
  );
}
