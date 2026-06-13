# Kajuu Web — Architecture

## 1. Project Overview

Kajuu Web is a professional fashion catalog website for **Kajuu Indumentaria**.

The product is designed as a premium digital catalog, not a full ecommerce platform.

The business model is:

```txt
Instagram / WhatsApp traffic
        ↓
Kajuu Web
        ↓
Catalog / Lookbook / Product Detail
        ↓
WhatsApp inquiry
        ↓
Manual sale coordination
```

There is no cart, no checkout, no payment processing, and no customer account system in the first version.

## 2. Architecture Goals

The architecture must optimize for:

* security
* low cost
* clean code
* maintainability
* mobile-first user experience
* good SEO
* good performance
* easy catalog management
* future migration if needed

The website should be simple enough for a small boutique but structured enough to look and behave like a professional production project.

## 3. Selected Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* App Router
* Server Components where appropriate
* Client Components only when interaction is needed

### Backend / BaaS

* Firebase Auth
* Firestore
* Firebase Storage later for product images
* Firebase Security Rules
* Firebase Emulator Suite

### Hosting

* Vercel for the Next.js app
* Firebase used as backend services

## 4. High-Level System Design

```txt
User Browser
   |
   | visits public website
   v
Next.js App on Vercel
   |
   | reads public visible products
   v
Firestore
   |
   | returns only public catalog data
   v
Next.js renders catalog/product pages

Admin Owner
   |
   | visits private route
   v
/kajuu-panel
   |
   | signs in with Firebase Auth
   v
Admin Panel
   |
   | creates/updates products
   v
Firestore + Storage
```

## 5. Public Website Scope

Public pages:

```txt
/
/catalogo
/catalogo/[slug]
/ultimos-ingresos
/lookbook
/como-comprar
/guia-talles
/contacto
```

### Home

Purpose:

* introduce Kajuu as a premium boutique
* drive users to catalog and WhatsApp
* show new arrivals and featured products
* communicate trust and style

### Catalog

Purpose:

* show product grid
* allow category filtering
* show stock status
* allow direct WhatsApp inquiry

### Product Detail

Purpose:

* show full product information
* show gallery
* show sizes, colors, price, and status
* convert through WhatsApp

### New Arrivals

Purpose:

* show latest products
* make the store feel active and updated

### Lookbook

Purpose:

* show outfit inspiration
* make the brand feel more curated and boutique-like

### How to Buy

Purpose:

* explain the buying process clearly
* reduce user doubts
* build trust

### Size Guide / Exchanges

Purpose:

* provide basic size and exchange information
* reduce repetitive WhatsApp questions

### Contact / FAQ

Purpose:

* centralize WhatsApp, Instagram, location, hours, and frequent questions

## 6. Admin Scope

Private route:

```txt
/kajuu-panel
```

Admin pages:

```txt
/kajuu-panel
/kajuu-panel/productos
/kajuu-panel/productos/nuevo
/kajuu-panel/productos/[id]/editar
```

The admin panel must allow:

* login
* logout
* list products
* create product
* edit product
* hide product
* mark product as sold out
* mark product as featured
* mark product as new arrival
* upload product images later
* delete product only with confirmation

The admin panel must not be linked from the public navigation.

## 7. Source Code Structure

Recommended structure:

```txt
src/
  app/
    (public)/
      page.tsx
      catalogo/
        page.tsx
        [slug]/
          page.tsx
      ultimos-ingresos/
        page.tsx
      lookbook/
        page.tsx
      como-comprar/
        page.tsx
      guia-talles/
        page.tsx
      contacto/
        page.tsx

    (admin)/
      kajuu-panel/
        page.tsx
        productos/
          page.tsx
          nuevo/
            page.tsx
          [id]/
            editar/
              page.tsx

  components/
    ui/
    layout/
    product/
    admin/

  features/
    catalog/
      catalog.service.ts
      catalog.queries.ts
      catalog.types.ts

    admin-products/
      admin-products.service.ts
      admin-products.actions.ts
      admin-products.types.ts

    auth/
      auth.service.ts
      auth.guard.ts

  lib/
    firebase/
      client.ts
      admin.ts

    validators/
      product.schema.ts

    utils.ts

  types/
    product.ts
```

## 8. Layer Responsibilities

### `app/`

Responsible for:

* routes
* page composition
* metadata
* layouts
* route-level loading and error states

Not responsible for:

* complex business logic
* raw Firebase logic mixed into UI

### `components/`

Responsible for:

* reusable presentational components
* layout components
* product cards
* buttons
* admin UI elements

Components should not contain raw Firestore queries.

### `features/`

Responsible for:

* feature-specific business logic
* data access functions
* product operations
* auth workflows
* admin product workflows

### `lib/`

Responsible for:

* Firebase initialization
* shared utilities
* validation schemas
* reusable infrastructure code

### `types/`

Responsible for:

* shared TypeScript types

## 9. Firebase Architecture

### Firebase Client SDK

Used for:

* client-side auth state
* admin panel interactions when appropriate
* authenticated product writes with rules

Location:

```txt
src/lib/firebase/client.ts
```

### Firebase Admin SDK

Used for:

* server-side privileged reads if needed
* secure server actions if needed
* future admin-only operations

Location:

```txt
src/lib/firebase/admin.ts
```

The Admin SDK must never be imported into Client Components.

## 10. Firestore Collections

### `products`

Stores catalog products.

Fields:

```ts
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  stockStatus: "available" | "sold_out" | "ask_stock";
  images: string[];
  isVisible: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: unknown;
  updatedAt: unknown;
};
```

### Optional future collections

```txt
categories
lookbook
settings
```

Do not add these until needed.

## 11. Security Model

### Public users

Can:

* read visible products
* view public pages
* open WhatsApp links
* view public images

Cannot:

* create products
* edit products
* delete products
* upload files
* access admin data

### Admin user

Can:

* create products
* edit products
* delete products
* upload images
* hide or show products
* mark product states

Admin authorization must be enforced by Firebase Security Rules, not only by UI conditions.

## 12. Firestore Rules Strategy

Initial rule concept:

```txt
products:
- public can read only documents where isVisible == true
- admin can read all
- admin can create/update/delete
```

Admin detection should use authenticated user claims or a secure allowlist.

Preferred long-term strategy:

* Firebase Auth user
* custom claim: admin == true

Temporary development strategy:

* email allowlist can be used only during early development
* must be replaced or documented before production

## 13. Storage Strategy

Storage will be used later for:

* product images
* lookbook images
* hero images

Storage rules:

```txt
public:
- read product images

admin:
- upload images
- delete images
```

Rules must prevent public uploads.

Images must be organized like:

```txt
products/{productId}/{imageName}
lookbook/{lookbookId}/{imageName}
brand/{imageName}
```

## 14. Image Rules

Images must be:

* compressed before upload
* preferably WebP
* reasonably small
* responsive in the UI
* lazy-loaded when below the fold
* given useful alt text

Avoid:

* uploading raw 5MB phone photos directly
* using unoptimized image galleries
* loading all images eagerly

## 15. Performance Strategy

Public pages should avoid excessive Firestore reads.

Recommended approach:

* fetch only visible products
* use query limits
* cache public catalog data where possible
* avoid real-time listeners on public pages
* use real-time updates only inside admin if needed
* use static or incremental rendering when practical
* optimize product images

Catalog queries should be designed for scale:

```txt
visible products
visible products by category
featured visible products
new visible products
product by slug
```

## 16. SEO Strategy

Each public page must have:

* meaningful title
* meaningful description
* correct heading hierarchy
* readable URLs
* product-specific metadata where possible

Example product URL:

```txt
/catalogo/jean-wide-leg-celeste
```

Avoid:

```txt
/catalogo/123abc-random-id
```

## 17. Accessibility Strategy

The UI must:

* use semantic HTML
* preserve keyboard navigation
* include labels in forms
* include alt text for images
* keep visible focus states
* use accessible contrast
* avoid div-only buttons

## 18. Design System Direction

The design system must be custom for Kajuu.

Visual direction:

```txt
warm boutique
ivory
beige
brown
charcoal
muted rose
burgundy accents
soft premium spacing
mobile-first
```

Avoid:

```txt
generic ecommerce
cold black-white editorial
neon tech aesthetic
random glassmorphism
template-like sections
```

## 19. Future Scalability

This architecture must allow future improvements:

* Cloudflare R2 for images if Firebase Storage becomes expensive
* custom domain
* product import/export
* analytics events
* category management
* lightweight CMS migration
* owner handoff to another Firebase account
* Vercel production deployment

Do not build future features prematurely.

## 20. Development Workflow

Every meaningful task should follow:

```txt
1. understand requirement
2. identify affected files
3. implement smallest safe change
4. run lint
5. run build
6. explain security and architecture impact
7. commit with clear message
```

Suggested commit style:

```txt
chore:
feat:
fix:
refactor:
docs:
style:
```

## 21. First Implementation Roadmap

Phase 1:

* project structure
* Firebase client setup
* product types
* Zod schema
* mock products
* public layout

Phase 2:

* home page
* catalog page
* product detail page
* WhatsApp CTA

Phase 3:

* admin login
* private admin route
* product listing
* create/edit product forms

Phase 4:

* Firestore integration
* security rules
* Firebase emulators
* production-safe checks

Phase 5:

* Storage image upload
* image validation
* image optimization workflow

Phase 6:

* deploy to Vercel
* connect domain
* production Firebase rules
* budget alerts
* App Check

## 22. Architecture Principle

The project must stay simple but not amateur.

Every technical decision should answer:

```txt
Is it secure?
Is it maintainable?
Is it affordable?
Is it easy for the owner?
Is it good for mobile users?
Can it scale without rewriting everything?
```
