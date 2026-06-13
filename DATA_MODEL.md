Kajuu Web — Data Model
Overview

Kajuu Web uses Firestore to store catalog data.

Version 1 focuses on:

products
product images
categories as simple values
visibility states
stock states
featured and new arrival flags

Do not add unnecessary collections until needed.

Main Collection
products

Each product document represents one catalog item.

Product Type
export type ProductCategory =
  | "jeans"
  | "tops"
  | "sweaters"
  | "buzos"
  | "pantalones"
  | "camperas"
  | "conjuntos"
  | "accesorios"
  | "otros";

export type ProductStockStatus =
  | "available"
  | "sold_out"
  | "ask_stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  stockStatus: ProductStockStatus;
  images: ProductImage[];
  isVisible: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductImage = {
  url: string;
  path?: string;
  alt: string;
  position: number;
};
Product Fields
name

Human-readable product name.

Example:

Jean Wide Leg Celeste

Required.

slug

URL-safe product identifier.

Example:

jean-wide-leg-celeste

Rules:

lowercase
no spaces
no accents
no unsafe characters
unique
description

Short product description.

Example:

Jean wide leg de tiro alto, ideal para looks urbanos y cómodos.
price

Number value.

Example:

49900

Do not store formatted strings like $49.900.

Formatting belongs to the UI.

category

Allowed values:

jeans
tops
sweaters
buzos
pantalones
camperas
conjuntos
accesorios
otros
sizes

Array of available or possible sizes.

Examples:

["S", "M", "L"]
["36", "38", "40", "42"]
["Único"]
colors

Array of colors.

Example:

["Celeste", "Azul denim"]
stockStatus

Allowed values:

available
sold_out
ask_stock

UI labels:

available -> Disponible
sold_out -> Agotado
ask_stock -> Consultar stock
images

Array of product images.

Each image has:

{
  url: string;
  path?: string;
  alt: string;
  position: number;
}
isVisible

Controls public visibility.

If false, product must not appear publicly.

isFeatured

Controls featured sections.

isNewArrival

Controls latest arrivals sections.

Public Query Rules

Public website must only query:

isVisible == true

Examples:

visible products
visible products by category
visible featured products
visible new arrivals
visible product by slug
Admin Query Rules

Admin can read:

visible products
hidden products
sold out products
draft-like products

Admin requires authentication and authorization.

Optional Future Collections

Do not create these yet unless needed:

categories
lookbook
site_settings
brand_assets
Zod Validation

Create product schema in:

src/lib/validators/product.schema.ts

Validation requirements:

name required
slug required
price number >= 0
category allowed enum
sizes array
colors array
stockStatus enum
images array
booleans required
description max length reasonable
Initial Mock Products

Use realistic products:

Jean Wide Leg Celeste
Top Morley Bordó
Sweater Tejido Chocolate
Campera Negra Urbana
Pantalón Sastrero Negro
Buzo Off White
Remera Vintage
Cargo Denim
Polera Básica Blanca
Conjunto Gris y Negro
Data Principle

The data model must be simple, readable, exportable, and easy to migrate later.

DESIGN_SYSTEM.md