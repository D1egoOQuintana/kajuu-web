"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import {
  createAdminProduct,
  getAdminProduct,
  updateAdminProduct,
} from "@/features/admin-products/admin-products.service";
import { CATEGORY_LABELS } from "@/lib/site";
import { productWriteSchema } from "@/lib/validators/product.schema";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STOCK_STATUSES,
  type Product,
  type ProductImage,
  type ProductStockStatus,
} from "@/types/product";

const STOCK_LABELS: Record<ProductStockStatus, string> = {
  available: "Disponible",
  sold_out: "Agotado",
  ask_stock: "Consultar disponibilidad",
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function splitValues(value: string): string[] {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function AdminProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const isEditing = Boolean(productId);
  const [loadedProduct, setLoadedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<(typeof PRODUCT_CATEGORIES)[number]>("jeans");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [stockStatus, setStockStatus] = useState<ProductStockStatus>("available");
  const [images, setImages] = useState<ProductImage[]>([]);
  const [removedPaths, setRemovedPaths] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState("0");
  const [isNewArrival, setIsNewArrival] = useState(true);

  useEffect(() => {
    if (!productId) return;
    let active = true;
    void getAdminProduct(productId)
      .then((product) => {
        if (!active) return;
        if (!product) throw new Error("No se encontró el producto.");
        setLoadedProduct(product);
        setName(product.name);
        setSlug(product.slug);
        setDescription(product.description);
        setPrice(String(product.price));
        setCategory(product.category);
        setSizes(product.sizes.join(", "));
        setColors(product.colors.join(", "));
        setStockStatus(product.stockStatus);
        setImages(product.images);
        setIsVisible(product.isVisible);
        setIsFeatured(product.isFeatured);
        setFeaturedOrder(String(product.featuredOrder ?? 0));
        setIsNewArrival(product.isNewArrival);
      })
      .catch((loadError) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el producto.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [productId]);

  const previewUrls = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );
  useEffect(() => () => previewUrls.forEach(({ url }) => URL.revokeObjectURL(url)), [previewUrls]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!isEditing && !slugTouched) setSlug(slugify(value));
  };

  const removeExistingImage = (image: ProductImage) => {
    setImages((current) => current.filter((item) => item !== image));
    if (image.path) setRemovedPaths((current) => [...current, image.path!]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const parsed = productWriteSchema.safeParse({
      name,
      slug,
      description,
      price: Number(price),
      category,
      sizes: splitValues(sizes),
      colors: splitValues(colors),
      stockStatus,
      images,
      isVisible,
      isFeatured,
      featuredOrder: Number(featuredOrder),
      isNewArrival,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Revisa los datos ingresados.");
      return;
    }
    setSubmitting(true);
    try {
      if (productId) {
        await updateAdminProduct(productId, parsed.data, files, removedPaths);
      } else {
        await createAdminProduct(parsed.data, files);
      }
      router.push("/kajuu-panel/productos");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "No se pudo guardar el producto.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="py-12 text-[#5f5048]" role="status">Cargando producto…</p>;
  if (isEditing && !loadedProduct) return <p className="border border-red-200 bg-red-50 p-4 text-red-800" role="alert">{error}</p>;

  const inputClass = "mt-2 min-h-12 w-full border border-[#cdbeb2] bg-white px-4 outline-none focus:border-[#7a2e2e]";
  return (
    <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
      <section className="grid gap-6 border border-[#e7d8cc] bg-white p-6 md:grid-cols-2 md:p-8">
        <label className="text-sm font-medium text-[#2f140d] md:col-span-2">Nombre
          <input className={inputClass} maxLength={120} onChange={(event) => handleNameChange(event.target.value)} required value={name} />
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Slug
          <input className={inputClass} maxLength={140} onChange={(event) => { setSlugTouched(true); setSlug(slugify(event.target.value)); }} readOnly={isEditing} required value={slug} />
          <span className="mt-1 block text-xs font-normal text-[#6d5c4e]">URL única. No se puede cambiar después de crear.</span>
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Precio
          <input className={inputClass} min="0" onChange={(event) => setPrice(event.target.value)} required step="1" type="number" value={price} />
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Categoría
          <select className={inputClass} onChange={(event) => setCategory(event.target.value as typeof category)} value={category}>
            {PRODUCT_CATEGORIES.map((value) => <option key={value} value={value}>{CATEGORY_LABELS[value]}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Estado de disponibilidad
          <select className={inputClass} onChange={(event) => setStockStatus(event.target.value as ProductStockStatus)} value={stockStatus}>
            {PRODUCT_STOCK_STATUSES.map((value) => <option key={value} value={value}>{STOCK_LABELS[value]}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Variantes disponibles separadas por coma
          <input className={inputClass} onChange={(event) => setSizes(event.target.value)} placeholder="S, M, L" required value={sizes} />
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Colores separados por coma
          <input className={inputClass} onChange={(event) => setColors(event.target.value)} placeholder="Negro, Crudo" required value={colors} />
        </label>
        <label className="text-sm font-medium text-[#2f140d] md:col-span-2">Descripción
          <textarea className="mt-2 min-h-36 w-full border border-[#cdbeb2] bg-white p-4 outline-none focus:border-[#7a2e2e]" maxLength={500} onChange={(event) => setDescription(event.target.value)} required value={description} />
        </label>
      </section>

      <section className="border border-[#e7d8cc] bg-white p-6 md:p-8">
        <h2 className="editorial-heading text-2xl text-[#2f140d]">Imágenes</h2>
        <p className="mt-2 text-sm text-[#5f5048]">JPG, PNG, WebP o AVIF. Máximo 5 MB por archivo y 12 imágenes.</p>
        {(images.length > 0 || previewUrls.length > 0) && (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div className="relative aspect-[4/5] overflow-hidden border border-[#e7d8cc]" key={image.url}>
                <Image alt={image.alt} className="object-cover" fill sizes="180px" src={image.url} />
                <button aria-label={`Quitar ${image.alt}`} className="absolute right-2 top-2 bg-white px-2 py-1 text-xs shadow" onClick={() => removeExistingImage(image)} type="button">Quitar</button>
              </div>
            ))}
            {previewUrls.map(({ file, url }, index) => (
              <div className="relative aspect-[4/5] overflow-hidden border border-[#e7d8cc]" key={`${file.name}-${file.lastModified}`}>
                <Image alt={`Vista previa ${file.name}`} className="object-cover" fill sizes="180px" src={url} unoptimized />
                <button aria-label={`Quitar ${file.name}`} className="absolute right-2 top-2 bg-white px-2 py-1 text-xs shadow" onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))} type="button">Quitar</button>
              </div>
            ))}
          </div>
        )}
        <label className="mt-6 inline-flex cursor-pointer border border-[#2f140d] px-5 py-3 text-sm font-semibold text-[#2f140d]">
          Seleccionar imágenes
          <input accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} type="file" />
        </label>
      </section>

      <section className="grid gap-4 border border-[#e7d8cc] bg-white p-6 sm:grid-cols-2 lg:grid-cols-4 md:p-8">
        <label className="flex items-start gap-3 text-sm font-medium">
          <input checked={isVisible} className="mt-1" onChange={(event) => setIsVisible(event.target.checked)} type="checkbox" />
          <span>Visible en el sitio<small className="mt-1 block font-normal leading-5 text-[#6d5c4e]">Publica la prenda en el catálogo.</small></span>
        </label>
        <label className="flex items-start gap-3 text-sm font-medium">
          <input checked={isFeatured} className="mt-1" onChange={(event) => setIsFeatured(event.target.checked)} type="checkbox" />
          <span>Destacado en portada<small className="mt-1 block font-normal leading-5 text-[#6d5c4e]">Los jeans destacados alimentan el carrusel principal.</small></span>
        </label>
        <label className="text-sm font-medium text-[#2f140d]">Orden en portada
          <input className={inputClass} disabled={!isFeatured} max="99" min="0" onChange={(event) => setFeaturedOrder(event.target.value)} type="number" value={featuredOrder} />
          <span className="mt-1 block text-xs font-normal leading-5 text-[#6d5c4e]">0 aparece antes que 1, 2 y 3.</span>
        </label>
        <label className="flex items-start gap-3 text-sm font-medium">
          <input checked={isNewArrival} className="mt-1" onChange={(event) => setIsNewArrival(event.target.checked)} type="checkbox" />
          <span>Último ingreso<small className="mt-1 block font-normal leading-5 text-[#6d5c4e]">Lo muestra en la sección de novedades.</small></span>
        </label>
      </section>

      {error && <p className="border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p>}
      <div className="flex flex-wrap gap-4">
        <button className="min-h-12 bg-[#2f140d] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-60" disabled={submitting} type="submit">{submitting ? "Guardando…" : "Guardar producto"}</button>
        <button className="min-h-12 border border-[#2f140d] px-7 text-sm" onClick={() => router.push("/kajuu-panel/productos")} type="button">Cancelar</button>
      </div>
    </form>
  );
}
