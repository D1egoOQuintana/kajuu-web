import Image from "next/image";
import Link from "next/link";

import { CATEGORY_LABELS } from "@/lib/site";
import { getProductPresentation } from "@/lib/product-presentation";
import { formatPriceARS } from "@/lib/utils/format-price";
import type { Product } from "@/types/product";

import { WhatsAppCTA } from "./whatsapp-cta";

type ProductCardProps = {
  product: Product;
  eager?: boolean;
};

type ProductBadge = {
  label: string;
  variant: "new" | "soldOut" | "askStock" | "featured";
};

function getProductBadge(product: Product): ProductBadge | null {
  if (product.stockStatus === "sold_out") {
    return { label: "Agotado", variant: "soldOut" };
  }
  if (product.isNewArrival) {
    return { label: "Nuevo", variant: "new" };
  }
  if (product.stockStatus === "ask_stock") {
    return { label: "Consultar", variant: "askStock" };
  }
  if (product.isFeatured) {
    return { label: "Destacado", variant: "featured" };
  }
  return null;
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  const presentation = getProductPresentation(product);
  const sortedImages = product.images
    .slice()
    .sort((firstImage, secondImage) => firstImage.position - secondImage.position);
  const primaryImage = presentation.primaryImage;
  const secondaryImage = presentation.usesTemporaryImage ? undefined : sortedImages.at(1);

  const badge = getProductBadge(product);
  const colors = presentation.colors.slice(0, 2).join(" · ");

  return (
    <article className="product-card group">
      <Link
        aria-label={`Ver detalle de ${presentation.name}`}
        className="product-card__media"
        href={`/catalogo/${product.slug}`}
      >
        <div className="product-card__image">
          {primaryImage ? (
            <>
              <Image
                alt={primaryImage.alt}
                className={[
                  "product-card__img product-card__img--primary object-cover object-center",
                  secondaryImage ? "product-card__img--has-secondary" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                fill
                loading={eager ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                src={primaryImage.url}
              />
              {secondaryImage ? (
                <Image
                  alt={secondaryImage.alt}
                  className="product-card__img product-card__img--secondary object-cover object-center"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  src={secondaryImage.url}
                />
              ) : null}
            </>
          ) : (
            <div
              aria-hidden="true"
              className="product-placeholder h-full w-full"
            />
          )}

          {badge ? (
            <div className={`product-card__badge product-card__badge--${badge.variant}`}>
              <span>{badge.label}</span>
            </div>
          ) : null}

          <div aria-hidden="true" className="product-card__action-hint">
            <span>Ver prenda</span>
            <span className="product-card__action-arrow">→</span>
          </div>
        </div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__eyebrow">
          <span className="product-card__category">{CATEGORY_LABELS[product.category]}</span>
          {product.stockStatus === "ask_stock" ? (
            <span className="product-card__stock product-card__stock--ask_stock">
              Disponibilidad a confirmar
            </span>
          ) : product.stockStatus === "sold_out" ? (
            <span className="product-card__stock product-card__stock--sold_out">
              Agotado
            </span>
          ) : null}
        </div>

        <h3 className="product-card__title">
          <Link href={`/catalogo/${product.slug}`}>{presentation.name}</Link>
        </h3>

        <div className="product-card__meta">
          {colors ? (
            <span className="product-card__meta-item product-card__meta-item--color">
              {colors}
            </span>
          ) : null}
        </div>

        <div className="product-card__footer">
          <div className="product-card__price-wrapper">
            <span className="product-card__price-label">Precio</span>
            <p className="product-card__price">{formatPriceARS(product.price)}</p>
          </div>
          <WhatsAppCTA
            className="product-card__cta"
            label="Preguntar"
            productName={presentation.name}
            size="sm"
            variant="ghost"
          />
        </div>
      </div>
    </article>
  );
}
