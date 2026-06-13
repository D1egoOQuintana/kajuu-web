# Kajuu Web — Agent Operating Rules

## Project Identity

This project is a professional web catalog for **Kajuu Indumentaria**, a women's fashion boutique.

The website is not a traditional ecommerce platform. It must work as a premium fashion catalog with product discovery and conversion through WhatsApp and Instagram.

The final product must feel:

* warm
* premium
* feminine
* boutique-like
* trustworthy
* mobile-first
* non-generic
* handcrafted
* production-ready

The project must avoid:

* generic ecommerce templates
* AI-looking layouts
* insecure admin logic
* unnecessary complexity
* shopping cart or checkout
* customer login
* online payments in the first version

## Tech Stack

Use the following stack:

* Next.js
* TypeScript
* Tailwind CSS
* Firebase Auth
* Firestore
* Firebase Storage later, only when image upload is implemented
* Vercel for deployment
* Firebase Security Rules
* Firebase Emulator Suite for local testing

Do not introduce a new framework, backend, CMS, database, UI library, or state management library unless explicitly approved.

## Primary User Flows

### Public visitor flow

1. User lands on the home page.
2. User explores categories, new arrivals, lookbook, or catalog.
3. User opens a product detail page.
4. User checks sizes, colors, stock status, and price.
5. User taps the WhatsApp CTA.
6. The WhatsApp message is prefilled with the selected product information.

### Admin flow

1. Owner enters a private route.
2. Owner signs in with Firebase Auth.
3. Owner manages products.
4. Owner can create, edit, hide, mark as sold out, mark as featured, or mark as new arrival.
5. Owner can upload images only after Storage rules are correctly defined.

There must be no visible public admin button in the customer website.

## Non-Functional Requirements

Every implementation must respect these requirements:

### Security

* Never expose private keys.
* Never expose Firebase Admin credentials in client-side code.
* Never trust the UI for authorization.
* All write operations must be protected by Firebase Auth and Security Rules.
* Public users may only read visible products.
* Only approved admin users may create, update, delete, or hide products.
* Do not store customer personal data in this version.
* Do not implement payment processing in this version.
* Do not implement customer accounts in this version.
* Do not expose internal admin routes in the public navigation.
* Do not rely on route obscurity as the only security layer.
* Use environment variables for configuration.
* Do not commit `.env.local` or service account files.

### Performance

* The website must be mobile-first.
* Avoid unnecessary client-side Firestore reads.
* Public catalog pages should use server-side data fetching or cached reads when possible.
* Avoid loading all products if not needed.
* Use pagination, limits, or category-based queries for catalog views.
* Optimize images before upload.
* Use lazy loading for images.
* Avoid heavy animation libraries unless explicitly approved.
* Run lint and build after meaningful changes.

### Accessibility

* Use semantic HTML.
* All interactive elements must be keyboard accessible.
* Buttons must be real buttons or proper links.
* Images must have useful alt text.
* Maintain readable contrast.
* Do not remove focus states.
* Forms must have labels and validation messages.

### SEO

* Public pages must have meaningful metadata.
* Product pages must have unique titles and descriptions.
* URLs must be readable and slug-based.
* Avoid generic page titles.
* Use structured content and headings properly.

### Maintainability

* Keep components small and focused.
* Separate UI components from data access.
* Separate public features from admin features.
* Use TypeScript types for product data.
* Use Zod schemas for product validation.
* Avoid duplicated business logic.
* Avoid hardcoded Firebase queries inside UI components.
* Prefer clear names over clever abstractions.

## Coding Rules

Before modifying files, the agent must:

1. Read this file.
2. Read `ARCHITECTURE.md`.
3. Read `SECURITY.md` if it exists.
4. Read `DATA_MODEL.md` if it exists.
5. Explain the intended change briefly.
6. Modify only files required for the requested task.
7. Run checks when possible.

## Required Checks

After meaningful code changes, run:

```bash
npm run lint
npm run build
```

If Firebase rules are modified, explain:

* what changed
* why it is safe
* which user roles are affected
* what reads/writes are allowed or denied

## Project Routes

Public routes:

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

Private admin routes:

```txt
/kajuu-panel
/kajuu-panel/productos
/kajuu-panel/productos/nuevo
/kajuu-panel/productos/[id]/editar
```

Do not add extra routes without explaining why they are needed.

## UI Direction

The visual style must follow a warm boutique direction:

* ivory background
* warm beige
* soft brown
* charcoal typography
* muted rose or burgundy accents
* premium spacing
* editorial but approachable
* feminine urban fashion style

Avoid:

* cold black-and-white editorial direction
* neon colors
* startup SaaS style
* random gradients
* excessive glassmorphism
* generic ecommerce look
* AI-generated symmetry

## Admin Design Direction

The admin panel must be:

* simple
* private
* fast
* clear
* not overdesigned
* focused only on catalog management

The admin is not the visual star of the project. The public brand website is.

## Data Access Rules

Do not query Firestore directly inside random UI components.

Preferred structure:

```txt
features/
  catalog/
    catalog.service.ts
    catalog.queries.ts
    catalog.types.ts

  admin-products/
    admin-products.service.ts
    admin-products.actions.ts
```

Firebase client setup belongs in:

```txt
src/lib/firebase/client.ts
```

Firebase admin/server setup belongs in:

```txt
src/lib/firebase/admin.ts
```

Do not create Firebase app instances in multiple files.

## Product Rules

A product must support:

* name
* slug
* description
* price
* category
* sizes
* colors
* stock status
* visibility
* featured flag
* new arrival flag
* image URLs
* timestamps

Public pages must only show products where `isVisible` is true.

## WhatsApp Conversion

The WhatsApp CTA is the real conversion mechanism.

Product messages must be prefilled with product context.

Example:

```txt
Hola Kajuu, vengo de la web. Quiero consultar por el producto: Jean Wide Leg Celeste. ¿Tienen stock disponible?
```

Do not implement cart or checkout in this version.

## Forbidden Actions

The agent must not:

* expose `.env.local`
* commit private keys
* add payments
* add cart functionality
* add customer login
* disable security rules
* make Firestore fully public
* make Storage uploads public
* install unnecessary libraries
* rewrite the whole project without approval
* change the stack without approval
* use `any` casually
* ignore TypeScript errors
* leave TODOs that affect security
* create fake admin security only in the UI

## Definition of Done

A task is done only when:

* code is typed
* lint passes
* build passes
* security implications are explained
* files changed are listed
* no secrets are exposed
* UI remains consistent with the Kajuu design direction
* implementation is simple, maintainable, and production-oriented

## Communication Style

Respond in Spanish.

Be direct, senior, and critical.

If a request is unsafe, overcomplicated, or bad architecture, say so clearly and propose a better approach.

Do not blindly accept instructions that would make the project insecure, slow, or hard to maintain.
