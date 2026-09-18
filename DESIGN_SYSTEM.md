# KAJÚ Web — Design System V2

**Estado:** implementado en FASE 1
**Fuente de verdad:** `KAJU_V2_FINAL_BRAND_LOCK.md`

Este documento describe la traducción técnica vigente de la identidad KAJÚ. Si
existe una contradicción con un documento histórico, prevalece el Final Brand
Lock.

## 1. Identidad

- Nombre visible: **KAJÚ**.
- Descriptor: **Indumentaria**, solo cuando el contexto lo requiere.
- Identificadores técnicos existentes como `kajuu-web`, `/kajuu-panel` y
  `KajuuFaq` se conservan para evitar migraciones sin beneficio visual.
- El wordmark se representa únicamente con los PNG oficiales de
  `public/brand/`. No se reconstruye con texto o CSS.

## 2. Tipografía

Las fuentes se cargan con `next/font/google`, `display: "swap"` y variables CSS.

| Rol | Familia | Pesos |
|---|---|---|
| Display editorial | DM Serif Display | 400 normal |
| UI, cuerpo y datos | Inter | 400, 500 y 600 |

Variables:

- `--font-dm-serif`
- `--font-inter`

DM Serif Display se usa en H1, H2 editoriales, títulos de bloque y título del
detalle de producto. Inter se usa en navegación, botones, precios, stock,
filtros, formularios, FAQ, tablas y texto largo.

No se usa italic como recurso sistemático. La marca no se compone con ninguna
de estas fuentes.

## 3. Tokens semánticos

Los valores viven en `src/app/globals.css`.

| Token | Valor | Uso |
|---|---:|---|
| `--background-primary` | `#FFF9FA` | Lienzo principal |
| `--background-secondary` | `#FCEEF1` | Cambio de ritmo editorial |
| `--background-soft` | `--background-secondary` | Alias funcional para fondos suaves |
| `--surface` | `#FFFDFD` | Superficie puntual |
| `--surface-emphasis` | `#F6D5DC` | Blush de marca y panel de logo |
| `--text-primary` | `#2B1B1E` | Lectura principal, precio e iconos |
| `--text-secondary` | `#5E454B` | Texto de apoyo |
| `--text-muted` | `#6F585E` | Metadata sobre fondos claros |
| `--border` | `#E7C7CE` | Divisores y contornos tonales |
| `--border-strong` | `#C86B82` | Selección y límite funcional |
| `--brand` | `#7A1E33` | CTA, links activos y marca |
| `--brand-hover` | `#641728` | Hover y active de marca |
| `--brand-secondary` | `#C86B82` | Acento editorial |
| `--accent` | `#E8A8B8` | Blush medio y floral inverso |
| `--focus-ring` | `#7A1E33` | Foco sobre claro |
| `--focus-ring-inverse` | `#F6D5DC` | Foco sobre oscuro |
| `--button-primary-bg` | `#7A1E33` | CTA primario |
| `--button-primary-text` | `#FFF9FA` | Texto del CTA primario |
| `--button-secondary-border` | `#7A1E33` | CTA secundario |
| `--footer-background` | `#2B1B1E` | Base del footer |
| `--footer-bg` | `--footer-background` | Alias funcional del footer |
| `--footer-text` | `#F6D5DC` | Texto del footer |
| `--floral-on-light` | `#C86B82` | Floral B sobre claro |
| `--floral-on-dark` | `#E8A8B8` | Floral B sobre oscuro |
| `--floral-primary` | `--floral-on-light` | Alias del ornamento sobre claro |
| `--floral-secondary` | `--floral-on-dark` | Alias del ornamento sobre oscuro |

Los componentes consumen tokens. Los hexadecimales fuera de esta tabla se
permiten solamente cuando representan una muestra física de color de producto.

## 4. Logos

El componente `BrandLogo` centraliza assets, dimensiones y recorte de los
márgenes transparentes.

| Contexto | Variante |
|---|---|
| Navbar desktop | `Logo horizontal sin fondo.png` |
| Navbar mobile y drawer | `Logo compacto sin fondo.png` |
| Footer | `Logo sin fondo.png` sobre `--surface-emphasis` |

Reglas:

- conservar proporción;
- no aplicar filtros, recoloración, sombras o `mix-blend-mode`;
- no colocar un logo oscuro directamente sobre chocolate o rosewood;
- no cargar variantes que la interfaz no utiliza;
- no generar favicon hasta contar con exportaciones aprobadas.

## 5. Botones y links

Clases base:

- `.button`
- `.button--primary`
- `.button--secondary`
- `.button--ghost`
- `.button--inverse`
- `.button--sm`
- `.button--lg`

Todos los botones tienen target mínimo de 44 px, Inter 600, sentence case,
focus visible, estados hover/active y disabled. El movimiento se limita a
180–220 ms. No se usan gradientes, glow ni sombras fuertes.

Los enlaces funcionales usan rosewood y subrayado cuando aparecen dentro de
texto. El estado activo de navegación incluye color y una línea de 2 px.

## 6. Badges

Estados admitidos:

- Nuevo
- Agotado
- Consultar stock
- Destacado, solo cuando existe una necesidad editorial concreta

No existe badge público “Disponible”. La ausencia de badge expresa el estado
normal disponible.

## 7. Cards, producto y filtros

- La fotografía conserva la jerarquía principal.
- ProductCard no usa floral, sombra, gradiente ni marco ornamental.
- Nombre, precio, categoría, stock y controles usan Inter.
- El hover de imagen no supera `scale(1.015)`.
- La selección de talla/color usa borde, texto y fondo; nunca depende solo del
  color.
- Los filtros conservan desplazamiento horizontal en mobile y muestran estado
  activo con `aria-current`.
- Los colores físicos de prendas pueden usar swatches específicos porque no son
  tokens de interfaz.

## 8. Navbar

- Fijo, responsive y accesible por teclado.
- Conserva el comportamiento de ocultarse al bajar y reaparecer al subir.
- Logo horizontal desde 1280 px; monograma compacto debajo de ese breakpoint.
- Navegación Inter 500, sentence case.
- Menú mobile usa `aria-expanded`, dialog modal, Escape, focus trap e `inert`.
- La marca es un asset oficial, nunca texto.

## 9. Footer

- Fondo `--footer-bg` y texto `--footer-text`.
- El logo principal oscuro vive en un panel `--surface-emphasis` para resolver
  el contraste sin fabricar una versión inversa.
- Links y CTA conservan foco inverso visible.
- No se usa floral en FASE 1.

## 10. Floral B

`FloralMotif` implementa únicamente **Floral B — Pétalo gestual** con la
geometría aprobada en Fase 0.6.

- `aria-hidden="true"` y `focusable="false"`;
- `pointer-events: none`;
- relleno del 10%;
- trazo equivalente a 1.4 px;
- 9% de opacidad sobre claro y 10% sobre oscuro;
- estática;
- oculta por debajo de 768 px.

En FASE 1 la base está preparada pero no se monta en Home. Su única aplicación
autorizada para FASE 2 es “Descubre tu estilo”. No se usa en producto, navbar,
cards, filtros, formularios, FAQ, WhatsApp o admin.

## 11. Descubre tu estilo

`DiscoverStyle` deja preparada la Propuesta 2 aprobada:

- bloque full-width rosewood;
- grilla 4/8 en desktop;
- una imagen 4:5 y dos imágenes 3:4;
- plano chocolate detrás de la imagen principal;
- Floral B detrás del copy;
- CTA claro;
- estructura tablet y mobile definida.

El componente permanece sin montar durante FASE 1. FASE 2 realizará la
integración final de Home y validará las fotografías definitivas.

## 12. Accesibilidad

- contraste mínimo WCAG AA para texto y controles;
- foco global de 3 px con offset de 3 px;
- foco `--focus-ring-inverse` sobre fondos oscuros;
- targets interactivos mínimos de 44 × 44 px;
- encabezados y landmarks semánticos;
- imágenes con alt concreto y logos redundantes con alt vacío dentro de links
  ya etiquetados;
- ornamentos fuera del árbol accesible;
- estados activos con señal adicional al color;
- `prefers-reduced-motion` desactiva transiciones y movimiento no esencial.

## 13. Responsive

Viewports de control de FASE 1:

- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px

No se permite scroll horizontal. Los títulos usan `clamp()` o escalas por
breakpoint. Logos e imágenes conservan proporción. Floral B desaparece en
mobile.

## 14. Performance

- fuentes con `next/font` y `display: swap`;
- logos con `next/image`, tamaños intrínsecos y `sizes` explícito;
- solo se cargan las variantes necesarias por contexto;
- Floral B es SVG inline ligero y sin animación;
- no se agregaron librerías ni frameworks de animación;
- los componentes server se mantienen server salvo interacción real.

## 15. Limitaciones vigentes

- no existen SVG oficiales;
- no existe logo claro/inverso aprobado;
- falta favicon final;
- faltan exportaciones finales de fotografía para el tríptico;
- los PNG transparentes tienen márgenes amplios, resueltos en presentación con
  wrappers de recorte sin modificar los assets.
