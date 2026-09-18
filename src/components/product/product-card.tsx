import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/site";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { Product } from "@/types/product";

import { WhatsAppCTA } from "./whatsapp-cta";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
};

type ProductBadgeVariant = "new" | "featured" | "soldOut" | "askStock";

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

export function ProductCard({ product, eager = false }: ProductCardProps) {
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
        className="block"
        href={`/catalogo/${product.slug}`}
      >
        <div className="image-container relative aspect-[4/5] overflow-hidden border border-[var(--border)] bg-[var(--surface-emphasis)]">
          {primaryImage ? (
            <Image
              alt={primaryImage.alt}
              className="product-img object-cover"
              fill
              loading={eager ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 25vw, 50vw"
              src={primaryImage.url}
            />
          ) : (
            <div
              aria-hidden="true"
              className="product-placeholder h-full w-full"
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

      <div className="mt-4 flex flex-1 flex-col items-start gap-3 px-1 sm:flex-row sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h3 className="text-[0.96rem] font-medium leading-6 text-[var(--text-primary)]">
            <Link
              className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--brand)]"
              href={`/catalogo/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--text-primary)]">
            {formatPriceARS(product.price)}
          </p>
        </div>

        <WhatsAppCTA
          className="shrink-0 !px-0 !text-xs sm:-mr-2 sm:!px-2"
          label="Consultar"
          productName={product.name}
          size="sm"
          variant="ghost"
        />
      </div>
    </article>
  );
}
