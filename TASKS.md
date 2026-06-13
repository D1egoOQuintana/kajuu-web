Kajuu Web — Implementation Tasks
Phase 0 — Project Base

Verify .env.local is ignored

Verify Firebase project is connected

Verify npm run lint

Verify npm run build

Commit base setup

Keep repository private

Phase 1 — Documentation and Agent Control

Create AGENTS.md

Create CODEX.md

Create ARCHITECTURE.md

Create SECURITY.md

Create DATA_MODEL.md

Create DESIGN_SYSTEM.md

Create DEFINITION_OF_DONE.md

Commit docs

Phase 2 — Core Types and Validation

Create src/types/product.ts

Create src/lib/validators/product.schema.ts

Create product categories enum/type

Create stock status enum/type

Create product image type

Add Zod product schema

Add slug utility

Add price formatting utility

Phase 3 — Mock Catalog

Create mock product data

Create catalog service using mock data

Create product lookup by slug

Create featured products query

Create new arrivals query

Create category filtering

Phase 4 — Public UI Foundation

Create design tokens

Create Button component

Create Container component

Create Section component

Create Badge component

Create Header component

Create Footer component

Create WhatsApp CTA utility/component

Phase 5 — Public Pages

Home page

Catalog page

Product detail page

New arrivals page

Lookbook page

How to buy page

Size guide page

Contact/FAQ page

Phase 6 — Firebase Read Integration

Create Firebase client setup

Create Firestore catalog read functions

Read only visible products publicly

Add query limits

Avoid realtime listeners on public pages

Add loading and error states

Phase 7 — Admin Auth

Create admin login route

Add Firebase Auth email/password login

Add logout

Add admin route protection

Add access denied state

Avoid public admin navigation link

Phase 8 — Admin Product Management

Product list

Create product form

Edit product form

Hide/show product

Mark as featured

Mark as new arrival

Mark as sold out

Delete with confirmation

Phase 9 — Security Rules

Write Firestore rules

Public can read only visible products

Admin can manage products

Test denied public writes

Test denied hidden product reads

Document rules

Phase 10 — Storage Later

Activate Firebase Storage only when needed

Add image upload

Validate image file type

Validate image size

Use safe Storage paths

Write Storage rules

Test denied public uploads

Phase 11 — Quality

Mobile QA

Accessibility QA

SEO metadata

Performance review

Image optimization

npm run lint

npm run build

Phase 12 — Deploy

Create private GitHub repo

Deploy to Vercel

Add environment variables in Vercel

Set Firebase authorized domain

Configure budget alerts

Enable App Check if possible

Final production QA