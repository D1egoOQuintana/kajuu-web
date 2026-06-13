Kajuu Web — Definition of Done

A task is complete only when it meets all conditions below.

General
Requirement is understood.
Only necessary files are changed.
Code is simple and maintainable.
No unnecessary library is installed.
No unrelated refactor is performed.
No hidden security risk is introduced.
Code Quality
TypeScript is used correctly.
No casual any.
Components are small and focused.
UI and data access are separated.
Firebase logic is not scattered randomly.
Repeated logic is extracted.
Naming is clear.
Security
No secrets are committed.
.env.local remains ignored.
No private Firebase credentials are exposed.
Public users cannot write to Firestore.
Public users cannot upload files.
Hidden products are not shown publicly.
Admin logic is protected by Auth and Rules, not only UI.
Performance
No unnecessary client-side reads.
No public realtime listener unless justified.
Images are lazy-loaded when appropriate.
Catalog queries have limits or filters.
Mobile performance is considered.
Accessibility
Semantic HTML is used.
Buttons and links are correct.
Keyboard accessibility is preserved.
Images have alt text.
Forms have labels.
Focus states are not removed.
SEO
Public pages have meaningful metadata.
Product pages use readable slugs.
Heading structure is logical.
Content is not generic placeholder text.
UI
Design matches warm boutique direction.
Mobile-first layout is respected.
UI does not look like a generic template.
CTAs are clear.
WhatsApp conversion is easy.
Admin UI is simple and functional.
Validation

Before a task is considered done, run:

npm run lint
npm run build

If either fails, the task is not done.

Explanation Required

After changes, the agent must report:

files changed
what was implemented
why it is safe
security impact
performance impact
remaining risks or next steps
Final Rule

Do not optimize for speed of implementation at the cost of security, maintainability, or professional quality.