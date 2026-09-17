# KAJÚ V2 — FINAL BRAND LOCK

**Estado:** aprobado y congelado  
**Fecha:** 17 de septiembre de 2026  
**Siguiente fase:** FASE 1 — Design System Refactor  
**Autoridad:** este documento prevalece ante cualquier contradicción visual o de naming en documentos anteriores.

## Regla de precedencia

`KAJUU_V2_VISUAL_DIRECTION_SPEC_v1.md`, `KAJUU_V2_BRAND_APPROVAL_PACK.md` y `KAJU_V2_PHASE_0_6_VISUAL_APPROVAL.md` se conservan como historial de decisión. Desde esta aprobación quedan obsoletas las referencias anteriores a:

- `Kajuu` o `KAJUU` como nombre visible;
- Playfair Display como serif de marca;
- Floral A o un sistema de dos direcciones florales;
- la galería editorial contenida como alternativa de “Descubre tu estilo”.

No se vuelve a abrir una decisión cerrada durante FASE 1 salvo instrucción expresa de Akira o del propietario.

---

## 1. Naming definitivo

### Nombre oficial visible

**KAJÚ**

### Descriptor

**Indumentaria** puede acompañar al nombre cuando el contexto necesita identificar la categoría comercial. El lockup oficial de los assets usa **KAJÚ INDUMENTARIA**.

### Reglas

1. Todo texto público, metadata, alt text de marca, mensaje de WhatsApp y dato estructurado usa **KAJÚ**.
2. El nombre no se escribe como `KAJUU`, `Kajuu`, `Kajú` ni `Kaju` en contenido visible.
3. El wordmark siempre se muestra mediante un asset oficial. No se reconstruye con DM Serif Display, Inter, HTML o CSS.
4. En títulos corrientes se usa `KAJÚ`; en frases, la capitalización sigue siendo la del nombre oficial.
5. `Indumentaria` no se añade de forma automática a cada mención.

### Identificadores técnicos

Los identificadores existentes sin tilde pueden mantenerse cuando cambiarlos implique una migración técnica:

- paquete `kajuu-web`;
- ruta `/kajuu-panel`;
- clases y símbolos internos `kajuu-*` / `Kajuu*`;
- proyecto Firebase;
- dominio provisional;
- handle `@kajuu_indumentaria`.

No son identidad visible y no deben renombrarse dentro del refactor visual sin un plan separado de URLs, infraestructura y compatibilidad.

---

## 2. Paleta final y tokens definitivos

La única familia cromática de marca es **Rosewood Blush**. Los colores funcionales derivados no forman una segunda paleta.

| Token definitivo | Valor | Función | Restricción |
|---|---:|---|---|
| `--background-primary` | `#FFF9FA` | Lienzo principal | No usar texto rosa claro encima |
| `--background-secondary` | `#FCEEF1` | Cambio de ritmo editorial | No usar `#C86B82` como texto normal |
| `--surface` | `#FFFDFD` | Drawer, formulario y superficie puntual | No convertir todo en cards |
| `--surface-soft` | `#F6D5DC` | Paneles de marca, badges y logo sobre footer | No usar blush medio como texto |
| `--text-primary` | `#2B1B1E` | Títulos, cuerpo crítico, precio e iconos | No usar sobre rosewood |
| `--text-secondary` | `#5E454B` | Descripciones y texto de apoyo | No reducir opacidad para fabricar más grises |
| `--text-muted` | `#6F585E` | Captions y metadata sobre fondos claros | No usar sobre `#E8A8B8` |
| `--border` | `#E7C7CE` | Divisores y contorno tonal | No sirve como única señal funcional |
| `--border-strong` | `#C86B82` | Selección y límite funcional | Debe acompañarse de texto, icono o cambio de grosor |
| `--brand-primary` | `#7A1E33` | CTA, enlaces activos y momento protagonista | No rellenar múltiples tarjetas |
| `--brand-primary-hover` | `#641728` | Hover/active del CTA principal | No usar como fondo de sección recurrente |
| `--brand-secondary` | `#C86B82` | Acento editorial y floral sobre claro | No usar para párrafos: 3.43:1 sobre `#FFF9FA` |
| `--accent` | `#E8A8B8` | Blush medio y floral inverso | Nunca texto funcional pequeño |
| `--button-primary-text` | `#FFF9FA` | Texto sobre CTA rosewood | Uso exclusivo sobre fondos oscuros accesibles |
| `--focus-ring` | `#7A1E33` | Foco sobre claro | Ring de 2–3 px |
| `--focus-ring-inverse` | `#F6D5DC` | Foco sobre rosewood/chocolate | Ring de 2–3 px |
| `--footer-background` | `#2B1B1E` | Base funcional del footer | El logo oscuro no se coloca directamente encima |
| `--footer-text` | `#F6D5DC` | Texto del footer | Opacidad mínima equivalente a 75% para contenido secundario |
| `--floral-on-light` | `#C86B82` | Floral B sobre superficies claras | Opacidad final 7–10% |
| `--floral-on-dark` | `#E8A8B8` | Floral B sobre rosewood/chocolate | Opacidad final 8–11% |

### Jerarquía de uso

- Base y superficies claras: **74%** del área no fotográfica.
- Blush `#F6D5DC` + `#E8A8B8`: **10%**.
- Rose `#C86B82`: **5%**.
- Rosewood `#7A1E33`: **5%**, salvo la sección final “Descubre tu estilo”.
- Chocolate `#2B1B1E`: **6%**.

### Reglas invariables

- No se usan gradientes cromáticos.
- Negro puro no pertenece a la paleta.
- `#7A1E33` dirige conversión y marca; `#2B1B1E` dirige lectura y profundidad.
- El producto conserva el protagonismo cromático.
- Los tonos rosa no comunican estados por sí solos.

---

## 3. Tipografía definitiva

### Familias

- **Display:** DM Serif Display, peso 400, estilo normal.
- **UI y texto:** Inter, pesos 400, 500 y 600.

Ambas se cargan mediante `next/font`. No se incorporan otras familias.

### Roles

| Rol | Familia | Peso | Tamaño | Line-height | Regla |
|---|---|---:|---:|---:|---|
| Hero H1 | DM Serif Display | 400 | `clamp(3.25rem, 6.5vw, 6.75rem)` | 0.92–0.98 | Normal, máximo 12–15 palabras |
| Título editorial H2 | DM Serif Display | 400 | `clamp(2.5rem, 4.6vw, 5rem)` | 0.98–1.05 | Sin italic ni mezcla de fuentes |
| Título de bloque H3 | DM Serif Display | 400 | `clamp(1.75rem, 2.8vw, 3.25rem)` | 1.05–1.15 | Sentence case |
| Título de producto | DM Serif Display | 400 | 40–56 px desktop / 34–42 px mobile | 1.04–1.12 | Solo en detalle de producto |
| Body destacado | Inter | 400 | 18 px / 17 px | 1.6 | Máximo 65 caracteres por línea |
| Body | Inter | 400 | 16 px | 1.6–1.7 | `text-primary` o `text-secondary` |
| Navegación | Inter | 500 | 13–14 px | 1.2 | Sentence case, tracking 0.01–0.03em |
| Botón | Inter | 600 | 14–15 px | 1 | Sentence case, tracking máximo 0.02em |
| Precio | Inter | 600 | 16–20 px | 1.2 | Números tabulares cuando estén disponibles |
| Categoría / metadata | Inter | 500 | 12–13 px | 1.3 | Uppercase solo en estados de una palabra |
| Formularios / FAQ | Inter | 400–600 | 15–16 px | 1.45–1.6 | Nunca DM Serif Display |

### Restricciones

- DM Serif Display no es el logotipo.
- No se usa italic como recurso sistemático.
- No se alterna serif y sans dentro de una frase para crear énfasis.
- Precio, stock, filtros, tablas, formularios, navegación y controles siempre usan Inter.
- Uppercase y tracking amplio no se aplican a navegación ni botones.

---

## 4. Matriz de uso de logos reales

### Assets existentes

| Contexto | Asset oficial | Presentación definitiva |
|---|---|---|
| Navbar desktop | `public/brand/Logo horizontal sin fondo.png` | Fondo `background-primary` o `surface`; caja de imagen de 180–200 px; altura visual controlada dentro de 46–52 px |
| Navbar mobile | `public/brand/Logo compacto sin fondo.png` | Fondo claro; caja de imagen de 52–60 px para obtener un monograma visible de 30–36 px |
| Footer | `public/brand/Logo sin fondo.png` | Panel separado `surface-soft` sobre o dentro del footer; caja de imagen de 180–220 px |
| Favicon / app icon | Fuente: `public/brand/Logo compacto sin fondo.png` | Requiere exportaciones específicas; no usar el lockup horizontal |
| Redes — principal | `public/brand/Logo con fondo Redes.png` | Publicaciones cuadradas |
| Redes — horizontal | `public/brand/Logo con fondo horizontal Redes.png` | Publicaciones cuadradas con lockup horizontal |
| Redes — compacto | `public/brand/Logo con fondo compacto Redes.png` | Avatar o publicación centrada |

### Versiones de respaldo con fondo

- `public/brand/Logo con fondo.png`
- `public/brand/Logo horizontal con fondo.png`
- `public/brand/Logo compacto con fondo.png`

No se usan dentro de navbar porque introducen un rectángulo de fondo ajeno a la superficie de interfaz.

### Reglas

1. Conservar proporción y área de protección mínima de 0.5× la altura visible del monograma.
2. Se puede encuadrar el lienzo transparente con un wrapper, siempre que no corte píxeles visibles.
3. No aplicar filtros CSS, `mix-blend-mode`, sombras, contornos, recoloración ni animación.
4. No convertir el logo horizontal en una “K” al hacer scroll.
5. No colocar flores dentro del área de protección.
6. El hero no repite el logo: comunica una propuesta de valor.

---

## 5. Limitación actual de assets

- Existen **nueve PNG** oficiales.
- Tres tienen transparencia real: principal, horizontal y compacto.
- Seis tienen fondo: tres generales y tres para redes.
- No existen SVG, EPS o archivos fuente vectoriales en el proyecto.
- No existe versión clara/inversa aprobada.
- No se asume que un PNG sea vectorial por tener alta resolución.
- No se inventa una versión inversa mediante CSS ni edición del color.
- Los PNG transparentes contienen márgenes amplios y requieren wrappers de presentación.
- El peso de los archivos oscila aproximadamente entre 92 KB y 889 KB.

La falta de SVG no bloquea FASE 1. Sí prohíbe colocar el logo oscuro sobre rosewood o chocolate. La solución aprobada para el footer es una zona clara/blush dedicada al logo.

---

## 6. Sistema floral definitivo

### Única dirección válida

**Floral B — Pétalo gestual**

Floral A queda descartada para implementación.

### Especificación congelada

| Variable | Valor definitivo |
|---|---|
| Forma | Tres a cinco curvas que sugieren pétalo y pliegue textil, sin especie literal |
| Técnica | Semi-outline con un relleno máximo del 10% |
| Grosor | 1.2–1.6 px a 400 px de caja |
| Fondo claro | `#C86B82` a 7–10% de opacidad final |
| Fondo rosewood/chocolate | `#E8A8B8` a 8–11% de opacidad final |
| Escala desktop | 420–620 px, con recorte del 50–70% |
| Frecuencia | Una única zona floral por viewport |
| Movimiento | Ninguno |
| Mobile | Oculto por debajo de 768 px |

### Uso autorizado en FASE 1

Solo en la sección definitiva “Descubre tu estilo” de Home. La geometría aprobada es la mostrada en `/__preview/phase-0-6`; se traslada a un componente de marca sin rediseñarla.

### Lugares prohibidos

- logo y área de protección;
- navbar, drawer y menú;
- catálogo y cards de producto;
- galería y panel funcional de producto;
- categorías como iconos;
- filtros, precio, stock y badges;
- formularios, FAQ, tablas y errores;
- WhatsApp y panel administrativo;
- encima de una prenda o un rostro;
- fondos repetidos o patrones.

---

## 7. “Descubre tu estilo” — diseño definitivo

### Dirección aprobada

**Propuesta 2 — Tríptico rosewood de mayor impacto**

No se implementa la alternativa contenida.

### Composición desktop

- Sección full-width con fondo sólido `#7A1E33`.
- Grilla de 12 columnas.
- Título, descripción y CTA: 4 columnas.
- Fotografía: 8 columnas.
- Una imagen dominante 4:5 y dos secundarias 3:4 escalonadas.
- Plano `#2B1B1E` detrás de la imagen dominante como profundidad.
- Floral B en `#E8A8B8`, recortada, estática y detrás del bloque de texto.
- Padding vertical: 120–144 px.
- Gap entre imágenes: 20–32 px.
- Bordes rectos; sin cards, sombras suaves, gradientes o texto sobre fotografía.

### Contenido

- Título: **Descubre tu estilo**.
- Descripción concreta sobre combinaciones y prendas; máximo tres líneas.
- Categorías:
  1. Sastrería urbana.
  2. Básicos esenciales.
  3. Abrigos.
- CTA: **Explorar estilos**.

### Color y tipografía

- Título DM Serif Display 400 en `#F6D5DC`.
- Body Inter 400 en `#F6D5DC`.
- CTA con fondo `#F6D5DC` y texto `#2B1B1E`.
- `#2B1B1E` no se usa como texto directamente sobre rosewood.

### Interacción

- Escala máxima de imagen: 1.015.
- CTA puede desplazarse hasta 2 px en hover.
- Flecha del CTA puede avanzar 4 px.
- Foco visible con `focus-ring-inverse`.
- Floral estática.
- Sin carrusel, autoplay, parallax, reveal encadenado ni scroll horizontal obligatorio.

### Regla de exclusividad

Es el único bloque full-width rosewood y el único uso floral de Home. Las secciones contiguas recuperan fondos claros y espacio negativo.

---

## 8. Reglas responsive

### Desktop — 1280 px o más

- Navbar usa logo horizontal.
- Grillas editoriales pueden usar 12 columnas.
- “Descubre tu estilo” mantiene relación 4/8.
- Floral B visible una vez, con gran escala y recorte.
- Ancho máximo del contenido: 1440 px.
- Ningún texto funcional supera 65 caracteres por línea.

### Tablet — 768–1279 px

- Logo horizontal solo si deja espacio útil; al colapsar navegación se usa compacto.
- Escala display y espaciado se reducen 15–25%.
- “Descubre tu estilo” coloca texto arriba y galería 2 + 1 debajo.
- Floral B se reduce a 300–420 px y se recorta al menos 60%.
- No se permiten tres columnas estrechas con copy comprimida.

### Mobile — menos de 768 px

- Navbar usa logo compacto con marca visible de 30–36 px.
- Floral B desaparece por completo.
- El plano chocolate decorativo de “Descubre tu estilo” desaparece.
- La sección conserva el fondo rosewood.
- Orden: título, descripción, CTA, imagen dominante, dos imágenes secundarias.
- Imagen dominante a ancho completo; secundarias en dos columnas.
- CTA a ancho completo cuando mejora el alcance táctil.
- Sin offsets ornamentales, marcos flotantes ni scroll horizontal.
- Targets interactivos mínimos de 44 × 44 px.

### Viewports de aceptación

Revisión obligatoria en 320, 375, 768, 1280 y 1440 px.

---

## 9. Accesibilidad

### Contraste aprobado

| Combinación | Ratio aproximado | Uso |
|---|---:|---|
| `#2B1B1E` sobre `#FFF9FA` | 15.79:1 | Todo texto |
| `#2B1B1E` sobre `#F6D5DC` | 12.10:1 | Todo texto y CTA claro |
| `#2B1B1E` sobre `#E8A8B8` | 8.39:1 | Texto y controles |
| `#7A1E33` sobre `#FFF9FA` | 9.79:1 | Links, texto y controles |
| `#7A1E33` sobre `#F6D5DC` | 7.51:1 | Texto y badges |
| `#7A1E33` sobre `#E8A8B8` | 5.20:1 | Texto normal |
| `#FFF9FA` sobre `#7A1E33` | 9.79:1 | CTA y sección rosewood |
| `#F6D5DC` sobre `#2B1B1E` | 12.10:1 | Footer |
| `#C86B82` sobre `#FFF9FA` | 3.43:1 | Solo decoración, texto grande o borde |

### Reglas

1. Floral B es decorativa y lleva `aria-hidden="true"`.
2. Ningún texto se coloca sobre fotografía en la sección aprobada.
3. Todas las imágenes significativas tienen alt text concreto; no repiten “imagen de”.
4. Estados y selección no dependen solo del color.
5. Foco visible de 2–3 px con offset de 2–3 px.
6. Sobre rosewood/chocolate el foco usa `#F6D5DC`.
7. Formularios mobile conservan base de 16 px.
8. Se respeta `prefers-reduced-motion`.
9. El hover no contiene información exclusiva.
10. Heading hierarchy, landmarks, botones y links conservan semántica nativa.

---

## 10. Reglas anti-IA

- No usar gradientes cromáticos, glassmorphism, glow ni blur ornamental.
- No repetir eyebrows en todas las secciones.
- No usar italic como firma automática.
- No crear filas de tres cards idénticas por defecto.
- No añadir hairlines, flechas o marcos sin función de jerarquía.
- No usar copy abstracta como “descubre tu esencia” o “eleva tu energía”.
- No mezclar múltiples radios, sombras y superficies flotantes.
- No colocar flores al azar ni reutilizarlas como patrón.
- No animar la flor.
- No usar imágenes falsas o inconsistentes cuando exista fotografía real.
- No duplicar el logo en hero si ya aparece en navbar.
- No recrear la marca con DM Serif Display.
- Cada sección debe tener una jerarquía principal verificable.
- El movimiento se limita a hover, foco y feedback funcional entre 180–240 ms.
- La revisión final debe comprobar que retirar un adorno no mejora la claridad; si la mejora, el adorno se elimina.

---

## 11. Archivos exactos previstos para FASE 1

Esta lista es el allowlist de implementación. Un archivo adicional requiere justificar y ampliar el alcance antes de modificarlo.

### Archivos nuevos

1. `src/components/brand/brand-logo.tsx`
2. `src/components/brand/floral-motif.tsx`
3. `src/components/home/discover-style.tsx`

### Fundamentos de marca y metadata

4. `src/app/layout.tsx`
5. `src/app/globals.css`
6. `src/lib/site.ts`
7. `src/lib/utils/whatsapp.ts`

### Navegación y footer

8. `src/components/layout/public-header.tsx`
9. `src/components/layout/footer.tsx`

### Home

10. `src/app/page.tsx`
11. `src/components/home/instagram-card-stack-carousel.tsx`

### Componentes públicos compartidos

12. `src/components/content/page-hero.tsx`
13. `src/components/content/editorial-image-card.tsx`
14. `src/components/content/kajuu-faq.tsx`
15. `src/components/catalog/sort-select.tsx`
16. `src/components/product/product-card.tsx`
17. `src/components/product/product-grid.tsx`
18. `src/components/product/product-consult-panel.tsx`
19. `src/components/product/product-gallery.tsx`
20. `src/components/product/whatsapp-cta.tsx`
21. `src/components/product/whatsapp-floating.tsx`
22. `src/components/ui/badge.tsx`

### Rutas públicas y estados

23. `src/app/catalogo/page.tsx`
24. `src/app/catalogo/[slug]/page.tsx`
25. `src/app/ultimos-ingresos/page.tsx`
26. `src/app/lookbook/page.tsx`
27. `src/app/como-comprar/page.tsx`
28. `src/app/guia-talles/page.tsx`
29. `src/app/contacto/page.tsx`
30. `src/app/loading.tsx`
31. `src/app/error.tsx`
32. `src/app/not-found.tsx`

### Naming visible del panel, sin rediseño del admin

33. `src/components/admin/admin-gate.tsx`
34. `src/app/kajuu-panel/page.tsx`

### Sincronización documental

35. `README.md`
36. `AGENTS.md`
37. `CODEX.md`
38. `ARCHITECTURE.md`
39. `DESIGN_SYSTEM.md`
40. `DEFINITION_OF_DONE.md`
41. `SECURITY.md`
42. `DATA_MODEL.md`
43. `TASKS.md`

### Exclusiones de FASE 1

- Firebase, reglas, autenticación y acceso a datos.
- Formularios y arquitectura del admin, salvo las dos cadenas visibles indicadas.
- Rutas API.
- Modelo de datos y validadores.
- Assets originales de `public/brand/`.
- Documentos históricos de Fases 0, 0.5 y 0.6.
- Preview `/__preview/phase-0-6`, que se conserva como evidencia de aprobación.

---

## 12. Assets pendientes y limitaciones

### Pendientes deseables

1. SVG o archivo vectorial fuente de principal, horizontal y compacto.
2. Versiones claras/inversas aprobadas para fondos rosewood y chocolate.
3. Favicon e iconos exportados desde el compacto oficial: 16, 32, 48, 180 y 512 px, más `.ico` si se requiere.
4. Guía oficial de área de protección y tamaños mínimos, si la diseñadora dispone de ella.
5. Fotografías finales de las tres categorías con resolución suficiente y crop coherente 4:5 / 3:4.

### Limitaciones aceptadas para FASE 1

- Se implementan PNG oficiales mediante `next/image`.
- El footer reserva una superficie clara para el logo.
- El favicon definitivo puede quedar pendiente hasta recibir/exportar los tamaños correctos.
- Las fotografías actuales pueden funcionar como placeholders de composición, pero no como aprobación fotográfica final.
- No se editan, recolorean ni vectorizan automáticamente los logos.

---

## 13. GO / NO-GO para FASE 1

### Decisión

**GO para FASE 1 — Design System Refactor.**

Están cerrados:

- nombre oficial **KAJÚ**;
- DM Serif Display + Inter;
- paleta y tokens;
- matriz de logos existentes;
- Floral B como única dirección válida;
- tríptico rosewood como diseño definitivo de “Descubre tu estilo”;
- responsive, accesibilidad y límites anti-IA;
- allowlist exacta de implementación.

### Condiciones del GO

1. Usar únicamente los PNG existentes y solo en contextos con contraste válido.
2. No crear una versión inversa ni un logo alternativo.
3. Trasladar Floral B sin rediseñarla.
4. Implementar exclusivamente la Propuesta 2.
5. Mantener Firebase y arquitectura de datos fuera del alcance.
6. Ejecutar lint, build y revisión visual en los cinco viewports de aceptación.

Los assets vectoriales, inversos y fotográficos pendientes afectan el acabado final de producción, pero no bloquean el inicio seguro de FASE 1 bajo estas condiciones.
