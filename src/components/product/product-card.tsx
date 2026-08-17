import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { Product, ProductCategory } from "@/types/product";

import { WhatsAppCTA } from "./whatsapp-cta";

type ProductCardProps = {
  product: Product;
};

type ProductBadgeVariant =
  | "new"
  | "featured"
  | "available"
  | "soldOut"
  | "askStock";

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

const placeholderTone: Record<ProductCategory, string> = {
  jeans: "from-[#d7dde1] via-[#b9c6cc] to-[#6d7d83]",
  tops: "from-[#ead7cf] via-[#d7aea1] to-[#8a4b45]",
  sweaters: "from-[#eadacb] via-[#c79c7c] to-[#5a3428]",
  buzos: "from-[#f2eee8] via-[#ded2c5] to-[#a79a8b]",
  pantalones: "from-[#e4ddd7] via-[#bdb0a5] to-[#332d2a]",
  camperas: "from-[#ddd6ce] via-[#867c72] to-[#1a1c1b]",
  conjuntos: "from-[#e6e0dc] via-[#b7aaa4] to-[#3b3532]",
  accesorios: "from-[#ead7cf] via-[#c98b7a] to-[#7a2e2e]",
  otros: "from-[#efe4d8] via-[#d6bdab] to-[#8a5a3c]",
};

function getProductBadgeVariants(product: Product): ProductBadgeVariant[] {
  if (product.stockStatus === "sold_out") {
    return ["soldOut"];
  }

  if (product.stockStatus === "ask_stock") {
    return product.isNewArrival ? ["new", "askStock"] : ["askStock"];
  }

  if (product.isNewArrival) {
    return ["new"];
  }

  return [];
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images
    .slice()
    .sort((firstImage, secondImage) => firstImage.position - secondImage.position)
    .at(0);
  const badgeVariants = getProductBadgeVariants(product);
  const primaryBadge = badgeVariants[0];
  const secondaryBadge = badgeVariants[1];

  return (
    <article className="editorial-card group flex h-full flex-col">
      <Link
        aria-label={`Ver detalle de ${product.name}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]"
        href={`/catalogo/${product.slug}`}
      >
        <div className="image-container relative aspect-[4/5] overflow-hidden border border-[#e7d8cc]/60 bg-[#efeeec]">
          {primaryImage ? (
            <Image
              alt={primaryImage.alt}
              className="product-img object-cover sepia-[0.08]"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              src={primaryImage.url}
            />
          ) : (
            <div
              aria-hidden="true"
              className={[
                "product-placeholder h-full w-full bg-gradient-to-br",
                placeholderTone[product.category],
              ].join(" ")}
            />
          )}

          {primaryBadge ? (
            <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-3 sm:inset-x-4 sm:top-4">
              <Badge
                className={
                  primaryBadge === "askStock" ? "max-w-[9rem]" : undefined
                }
                variant={primaryBadge}
              />
              {secondaryBadge ? (
                <Badge
                  className="hidden sm:inline-flex"
                  variant={secondaryBadge}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="label-caps mb-2 text-[#8a5a3c]">
            {categoryLabels[product.category]}
          </p>
          <h3 className="text-[0.96rem] font-medium leading-6 text-[#2f140d]">
            <Link
              className="transition-colors hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
              href={`/catalogo/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-[#5f5048]">
            {formatPriceARS(product.price)}
          </p>
        </div>

        <WhatsAppCTA
          className="!min-h-11 shrink-0 !border-transparent !bg-transparent !px-2 -mr-2 !text-xs text-[#5f5048] underline decoration-transparent underline-offset-4 hover:!bg-transparent hover:!text-[#7a2e2e] hover:decoration-[#7a2e2e]"
          label="Consultar"
          productName={product.name}
          size="sm"
          variant="ghost"
        />
      </div>
    </article>
  );
}
