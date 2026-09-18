"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  deleteAdminProduct,
  listAdminProducts,
} from "@/features/admin-products/admin-products.service";
import { CATEGORY_LABELS } from "@/lib/site";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { Product } from "@/types/product";

export function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setError(null);
    try {
      setProducts(await listAdminProducts());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadProducts(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadProducts]);

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`¿Eliminar definitivamente “${product.name}”?`)) return;
    setDeletingId(product.id);
    setError(null);
    try {
      await deleteAdminProduct(product);
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "No se pudo eliminar el producto.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="mt-8 text-[#5f5048]" role="status">Cargando productos…</p>;

  return (
    <>
      {error && <p className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
      {products.length === 0 ? (
        <div className="mt-8 border border-[#e7d8cc] bg-white p-8 text-center">
          <p className="text-[#5f5048]">Todavía no hay productos cargados.</p>
          <Link className="mt-4 inline-block bg-[#2f140d] px-5 py-3 text-sm text-white" href="/kajuu-panel/productos/nuevo">Crear el primero</Link>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto border border-[#e7d8cc] bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[#efe7df] text-[#2f140d]">
              <tr>
                <th className="px-5 py-4 font-semibold">Producto</th>
                <th className="px-5 py-4 font-semibold">Categoría</th>
                <th className="px-5 py-4 font-semibold">Precio</th>
                <th className="px-5 py-4 font-semibold">Estado</th>
                <th className="px-5 py-4 font-semibold">Publicación</th>
                <th className="px-5 py-4 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr className="border-t border-[#e7d8cc]" key={product.id}>
                  <td className="px-5 py-4"><span className="font-medium text-[#2f140d]">{product.name}</span><span className="mt-1 block text-xs text-[#6d5c4e]">/{product.slug}</span></td>
                  <td className="px-5 py-4">{CATEGORY_LABELS[product.category]}</td>
                  <td className="px-5 py-4">{formatPriceARS(product.price)}</td>
                  <td className="px-5 py-4">{product.stockStatus === "available" ? "Disponible" : product.stockStatus === "sold_out" ? "Agotado" : "Consultar"}</td>
                  <td className="px-5 py-4">{product.isVisible ? "Visible" : "Oculto"}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-3">
                      <Link className="border border-[#2f140d] px-3 py-2 hover:bg-[#f4f3f1]" href={`/kajuu-panel/productos/${product.id}/editar`}>Editar</Link>
                      <button className="border border-red-300 px-3 py-2 text-red-800 hover:bg-red-50 disabled:opacity-50" disabled={deletingId === product.id} onClick={() => void handleDelete(product)} type="button">{deletingId === product.id ? "Eliminando…" : "Eliminar"}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
