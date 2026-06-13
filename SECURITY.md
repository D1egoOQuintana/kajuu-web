# Kajuu Web — Security Guidelines

## 1. Security Objective

Kajuu Web must be safe enough for a real boutique catalog website.

The project does not handle payments, customer accounts, or private customer data in the first version. This reduces risk, but the admin panel and catalog management must still be protected professionally.

The main security goal is:

```txt
Public users can browse the catalog.
Only the authorized owner/admin can manage products.
No private credentials or dangerous permissions are exposed.
```

## 2. Security Principles

Every implementation must follow these principles:

* Never trust the frontend for authorization.
* Never expose private keys.
* Never expose Firebase Admin SDK credentials in client-side code.
* Never make Firestore fully public.
* Never allow public uploads to Storage.
* Never rely only on hiding routes.
* Always enforce access with Firebase Security Rules.
* Use least privilege.
* Validate data before writing.
* Keep admin features private and minimal.
* Avoid storing sensitive user/customer information.
* Avoid payments and checkout in version 1.

## 3. Environment Variables

The project may use public Firebase config values in the browser through:

```txt
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

These are not considered secret by themselves.

Private server-side credentials must never use `NEXT_PUBLIC_`.

Private variables may include:

```txt
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

Rules:

* `.env.local` must never be committed.
* Service account JSON files must never be committed.
* Firebase Admin credentials must only be used server-side.
* Do not print secrets in logs.
* Do not hardcode secrets in source files.

## 4. Git Ignore Requirements

The following files must stay ignored:

```gitignore
.env
.env.local
.env.*.local
*-service-account.json
serviceAccountKey.json
firebase-adminsdk*.json
```

Before every push, run:

```bash
git status
```

Ensure no private environment file or service account file appears.

## 5. Authentication Model

Kajuu will use Firebase Auth.

Allowed admin login methods:

* Email/password
* Magic link in the future if approved

Public visitors do not need login.

There must be no customer account system in version 1.

## 6. Admin Authorization

Only the approved owner/admin can access catalog management.

Preferred production strategy:

```txt
Firebase Auth user
+
custom claim: admin == true
```

Temporary early-development strategy:

```txt
email allowlist
```

The email allowlist is acceptable only during early development and must be documented clearly.

Admin authorization must be enforced in:

1. UI route protection
2. Firestore Security Rules
3. Storage Security Rules
4. Server actions or API routes if used

UI protection alone is not enough.

## 7. Admin Route Rules

Private admin routes:

```txt
/kajuu-panel
/kajuu-panel/productos
/kajuu-panel/productos/nuevo
/kajuu-panel/productos/[id]/editar
```

Rules:

* Do not link admin routes from public navigation.
* Do not show admin links to public visitors.
* If unauthenticated, redirect to login.
* If authenticated but not admin, deny access.
* Do not expose admin-only data in public pages.

Important:

```txt
Obscure route names are not real security.
Security must come from Auth + Rules.
```

## 8. Firestore Security Model

Collection:

```txt
products
```

Public users can:

* read products where `isVisible == true`

Public users cannot:

* create products
* update products
* delete products
* read hidden products

Admin users can:

* read all products
* create products
* update products
* delete products

Conceptual Firestore rule:

```txt
allow read: if resource.data.isVisible == true || isAdmin();
allow create, update, delete: if isAdmin();
```

Actual rules must be carefully written and tested before deploy.

## 9. Product Visibility

A product can be hidden from the public website using:

```txt
isVisible: false
```

Hidden products must not appear in:

* catalog
* new arrivals
* featured products
* search
* product detail pages
* related products

Public queries must always filter by:

```txt
isVisible == true
```

## 10. Data Validation

All product writes must be validated before reaching Firestore.

Use Zod schemas for:

* name
* slug
* description
* price
* category
* sizes
* colors
* stockStatus
* images
* isVisible
* isFeatured
* isNewArrival

Validation rules:

* name is required
* slug is required
* price must be a positive number or zero if price is hidden
* category must be one of the allowed categories
* stockStatus must be valid
* images must be valid URLs or Storage paths
* sizes and colors must be arrays of strings
* boolean flags must be booleans

Do not trust form values directly.

## 11. Slug Safety

Product URLs use slugs:

```txt
/catalogo/jean-wide-leg-celeste
```

Slug rules:

* lowercase
* no spaces
* no special unsafe characters
* no duplicate slugs
* generated from product name but editable if needed
* validated before save

Do not use raw product names directly in URLs.

## 12. Firestore Query Safety

Avoid unbounded reads.

Public pages should use:

* limits
* filters
* specific queries
* cached/server-side reads when appropriate

Avoid:

* loading every product on every page
* real-time listeners on public pages
* client-only reads for large catalog data
* reading hidden products publicly

Admin pages can use broader reads but must still be authenticated.

## 13. Storage Security Model

Firebase Storage will be used later for:

* product images
* lookbook images
* hero images

Public users can:

* read public product images

Public users cannot:

* upload images
* replace images
* delete images

Admin users can:

* upload product images
* replace product images
* delete product images

Storage upload must require admin authentication.

## 14. Storage Paths

Recommended structure:

```txt
products/{productId}/{fileName}
lookbook/{lookbookId}/{fileName}
brand/{fileName}
```

Do not upload files to random root-level paths.

Avoid:

```txt
/image.jpg
/uploads/random.jpg
/test.png
```

## 15. Image Upload Rules

Before upload:

* validate file type
* limit file size
* prefer WebP
* compress images
* generate safe file names
* avoid raw phone images over 5MB

Allowed image types:

```txt
image/jpeg
image/png
image/webp
```

Preferred output:

```txt
image/webp
```

Recommended max size per image:

```txt
500KB to 1MB
```

Do not allow arbitrary file uploads.

## 16. Firebase Admin SDK

Firebase Admin SDK may only be used in server-side files.

Allowed location:

```txt
src/lib/firebase/admin.ts
```

Forbidden:

* importing Admin SDK into Client Components
* exposing private key to browser
* using Admin SDK inside public client UI
* logging Admin SDK credentials
* committing service account JSON

## 17. Client SDK

Firebase Client SDK may be used for:

* Firebase Auth
* client-side admin session state
* Firestore operations when protected by rules
* Storage uploads when protected by rules

Allowed location:

```txt
src/lib/firebase/client.ts
```

Do not initialize Firebase repeatedly in multiple files.

## 18. WhatsApp Links

WhatsApp links must be generated safely.

Allowed:

```txt
https://wa.me/{phoneNumber}?text={encodedMessage}
```

Rules:

* encode message text with `encodeURIComponent`
* do not include private user data
* do not include internal product IDs unless needed
* prefer product name and URL

Example message:

```txt
Hola Kajuu, vengo de la web. Quiero consultar por el producto: Jean Wide Leg Celeste. ¿Tienen stock disponible?
```

## 19. No Sensitive Customer Data

Version 1 must not store:

* customer names
* customer phone numbers
* addresses
* order history
* payment data
* delivery information
* private WhatsApp messages

The sale is coordinated manually through WhatsApp.

## 20. No Payments

Do not implement:

* Mercado Pago
* Stripe
* PayPal
* card payments
* checkout
* order database
* invoices
* customer accounts

Payments are out of scope for version 1.

## 21. App Check

Firebase App Check should be enabled before production if possible.

Purpose:

* reduce abuse from unauthorized clients
* protect Firebase resources
* make automated abuse harder

App Check does not replace Security Rules.

## 22. Budget and Abuse Protection

Before production:

* configure Google Cloud/Firebase budget alerts
* optimize images
* avoid unbounded reads
* avoid unnecessary realtime listeners
* use query limits
* monitor usage

Budget alerts are warnings, not hard spending limits.

## 23. Error Handling

Do not expose internal error details to users.

Good user-facing messages:

```txt
No pudimos cargar los productos. Intentá nuevamente.
No tenés permisos para acceder a esta sección.
No se pudo guardar el producto. Revisá los datos.
```

Bad user-facing messages:

```txt
FirebaseError: Missing or insufficient permissions at products/...
Private key parsing failed...
Admin SDK credential error...
```

Internal logs may be used during development but must not reveal secrets.

## 24. Access Denied Behavior

If a user is not logged in:

```txt
redirect to admin login
```

If a user is logged in but not admin:

```txt
show access denied
```

Do not silently show an empty admin panel.

## 25. Security Testing Checklist

Before production, verify:

* public user can read visible products
* public user cannot read hidden products
* public user cannot create products
* public user cannot update products
* public user cannot delete products
* public user cannot upload images
* admin can create products
* admin can update products
* admin can hide products
* admin can delete products
* admin can upload images
* `.env.local` is not committed
* service account files are not committed
* build passes
* lint passes

## 26. Agent Rules for Security Work

When modifying security-sensitive files, the agent must explain:

* which files changed
* what risk is being addressed
* what users can now do
* what users still cannot do
* whether rules became stricter or more permissive

Security-sensitive files include:

```txt
firestore.rules
storage.rules
src/lib/firebase/client.ts
src/lib/firebase/admin.ts
auth-related files
admin route guards
server actions
API routes
```

## 27. Forbidden Security Shortcuts

Do not:

* set Firestore rules to allow read/write for everyone
* make admin decisions only in React state
* hide products only in the UI
* trust request body without validation
* upload any file type
* allow public Storage writes
* use admin email hardcoded across many files
* store secrets in source code
* expose Admin SDK to browser
* ignore Firebase rule errors
* disable lint/build checks to pass quickly

## 28. Security Principle

The final security standard is:

```txt
If somebody finds the admin URL, inspects the browser, or calls Firebase directly, they still cannot modify Kajuu data unless they are authenticated and authorized as admin.
```
