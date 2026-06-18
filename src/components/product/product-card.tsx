import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPriceARS } from "@/lib/utils/format-price";
import type {
  Product,
  ProductCategory,
  ProductStockStatus,
} from "@/types/product";

import { WhatsAppCTA } from "./whatsapp-cta";

type ProductImageAspect = "portrait" | "tall" | "square" | "wide";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
  imageAspect?: ProductImageAspect;
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

const imageAspectClasses: Record<ProductImageAspect, string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/10] md:aspect-[21/9]",
};

export function ProductCard({
  product,
  compact = false,
  imageAspect,
}: ProductCardProps) {
  const primaryImage = product.images
    .slice()
    .sort((firstImage, secondImage) => firstImage.position - secondImage.position)
    .at(0);
  const aspectClass = imageAspect
    ? imageAspectClasses[imageAspect]
    : compact
      ? imageAspectClasses.portrait
      : imageAspectClasses.tall;

  return (
    <article className="editorial-card group flex h-full flex-col gap-2">
      <Link
        aria-label={`Ver detalle de ${product.name}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a03d3f]"
        href={`/catalogo/${product.slug}`}
      >
        <div
          className={[
            "image-container relative overflow-hidden bg-[#f4eee8]",
            aspectClass,
          ].join(" ")}
        >
          {primaryImage ? (
            <Image
              alt={primaryImage.alt}
                className="product-img object-cover sepia-[0.08]"
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 40vw, 100vw"
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

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.isNewArrival && <Badge variant="new">NEW IN</Badge>}
            {product.isFeatured && <Badge variant="featured">LIMITED</Badge>}
          </div>
          <div className="absolute right-4 top-4">
            <Badge variant={stockBadgeVariant[product.stockStatus]} />
          </div>
        </div>
      </Link>

      <div className="mt-2 flex flex-1 items-start justify-between gap-4 px-1">
        <div>
          <p className="label-caps mb-1 text-[#8a5a3c]">
            {categoryLabels[product.category]}
          </p>
          <h3 className="text-base font-medium leading-6 text-[#2f140d]">
            <Link
              className="transition-colors hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
              href={`/catalogo/${product.slug}`}
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-base text-[#5f5048]">
            {formatPriceARS(product.price)}
          </p>
        </div>

        <WhatsAppCTA
          className="!min-h-0 shrink-0 !border-transparent !bg-transparent !px-0 !py-0 text-[#5f5048] hover:!border-b-[#7a2e2e] hover:!bg-transparent hover:!text-[#7a2e2e]"
          label="Consultar"
          productName={product.name}
          size="sm"
          variant="ghost"
        />
      </div>
    </article>
  );
}
