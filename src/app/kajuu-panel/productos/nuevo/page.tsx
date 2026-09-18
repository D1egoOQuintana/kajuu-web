import { AdminProductForm } from "@/components/admin/admin-product-form";

export default function NewAdminProductPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <p className="label-caps mb-3 text-[#8a5a3c]">Catálogo</p>
      <h1 className="editorial-heading text-4xl text-[#2f140d] md:text-5xl">Nuevo producto</h1>
      <AdminProductForm />
    </main>
  );
}
