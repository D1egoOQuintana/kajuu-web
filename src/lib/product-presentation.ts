import type { Product, ProductImage } from "@/types/product";

type ProductPresentation = {
  colors: string[];
  name: string;
  primaryImage?: ProductImage;
  usesTemporaryImage: boolean;
};

type PresentationOverride = {
  colors?: string[];
  image: ProductImage;
  name?: string;
};

const presentationOverrides: Record<string, PresentationOverride> = {
  "buzo-off-white": {
    colors: ["Blanco crudo"],
    image: {
      alt: "Modelo con buzo blanco crudo en una fotografía de moda urbana",
      position: 0,
      url: "/brand/products/buzo-blanco-crudo.webp",
    },
    name: "Buzo blanco crudo",
  },
  "campera-negra-urbana": {
    image: {
      alt: "Modelo con campera negra urbana en una fotografía editorial",
      position: 0,
      url: "/brand/products/campera-negra-urbana.webp",
    },
    name: "Campera negra urbana",
  },
  "cargo-denim": {
    colors: ["Azul índigo"],
    image: {
      alt: "Modelo con jean de bolsillos cargo en color azul índigo",
      position: 0,
      url: "/brand/campaign/kaju-jeans-cargo.webp",
    },
    name: "Jean con bolsillos cargo",
  },
  "conjunto-gris-y-negro": {
    colors: ["Gris", "Negro"],
    image: {
      alt: "Modelo con conjunto gris y negro de estilo urbano",
      position: 0,
      url: "/brand/products/conjunto-gris-negro.webp",
    },
    name: "Conjunto gris y negro",
  },
  "jean-wide-leg-celeste": {
    colors: ["Celeste", "Azul índigo"],
    image: {
      alt: "Modelo con jean azul índigo de tiro alto y corte amplio",
      position: 0,
      url: "/brand/campaign/kaju-jeans-hero-v2.webp",
    },
    name: "Jean de corte amplio",
  },
};

function isTemporaryCatalogImage(image?: ProductImage) {
  return !image || image.url.startsWith("/products/");
}

export function getProductPresentation(product: Product): ProductPresentation {
  const sortedImages = [...product.images].sort(
    (firstImage, secondImage) => firstImage.position - secondImage.position,
  );
  const catalogImage = sortedImages[0];
  const override = presentationOverrides[product.slug];
  const useOverride = Boolean(override && isTemporaryCatalogImage(catalogImage));

  return {
    colors: override?.colors ?? product.colors,
    name: override?.name ?? product.name,
    primaryImage: useOverride ? override?.image : catalogImage,
    usesTemporaryImage: useOverride,
  };
}
