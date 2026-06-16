import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { Product, ProductCategory, ProductStockStatus } from "@/types/product";

import { WhatsAppCTA } from "./whatsapp-cta";

type ProductCardProps = {
  product: Product;
};

const categoryLabels: Record<ProductCategory, string> = {
  jeans: "Jeans",
  tops: "Tops",
  sweaters: "Sweaters",
  buzos: "Buzos",
  pantalones: "Pantalones",
  camperas: "Camperas",
  conjuntos: "Conjuntos",
  accesorios: "Accesorios",
  otros: "Otros",
};

const stockBadgeVariant: Record<
  ProductStockStatus,
  "available" | "soldOut" | "askStock"
> = {
  available: "available",
  sold_out: "soldOut",
  ask_stock: "askStock",
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images
    .slice()
    .sort((firstImage, secondImage) => firstImage.position - secondImage.position)
    .at(0);

  return (
    <article className="group flex h-full flex-col">
      <Link
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A2E2E]"
        href={`/catalogo/${product.slug}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8D6C0]/45">
          {primaryImage ? (
            <Image
              alt={primaryImage.alt}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              src={primaryImage.url}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-[#6B5A50]">
              Imagen pendiente
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.isNewArrival && <Badge variant="new" />}
            {product.isFeatured && <Badge variant="featured" />}
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant={stockBadgeVariant[product.stockStatus]} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 border-x border-b border-[#E7D8CC] bg-white p-4">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8A5A3C]">
            {categoryLabels[product.category]}
          </p>
          <h3 className="mt-2 text-base font-semibold text-[#2E2A27]">
            <Link
              className="transition-colors hover:text-[#7A2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A2E2E]"
              href={`/catalogo/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-[#6B5A50]">
            {formatPriceARS(product.price)}
          </p>
        </div>

        <WhatsAppCTA
          className="w-full"
          label="Consultar"
          productName={product.name}
          size="sm"
          variant="secondary"
        />
      </div>
    </article>
  );
}
