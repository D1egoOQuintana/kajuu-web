# KAJUU V2 — VISUAL DIRECTION SPEC v1

**Estado:** dirección visual propuesta para aprobación  
**Alcance:** identidad visual, dirección de arte y design system  
**Fecha:** 17 de septiembre de 2026  
**Implementación:** fuera del alcance de esta fase

## Base auditada

La auditoría incluyó la documentación operativa y de diseño, `globals.css`, Home, navegación, footer, catálogo, detalle de producto, componentes editoriales, fuentes, `public/` y las referencias de Stitch. La implementación actual usa **Playfair Display** como serif editorial e **Inter** para interfaz. Las referencias también especifican esa pareja. El sistema actual conserva demasiados colores heredados, repite `label-caps` con uppercase y tracking amplio, y todavía utiliza italic como recurso editorial recurrente. Esos patrones deben reducirse en Fase 1 sin recuperar los recursos “anti-IA” ya eliminados.

No se encontraron las tres variantes reales del logo ni archivos tipográficos de marca en `public/`, `design-reference/` o el adjunto de esta fase. Actualmente la navegación y el footer recrean “Kajuu” con texto y Playfair Display. La matriz de logo de este documento define el uso previsto, pero la validación final de tamaño, color y área de protección requiere los SVG/PNG oficiales.

---

## A. Concepto rector

**Rosewood Urban Botanical.** Kajuu debe sentirse como una boutique femenina contemporánea de ciudad: cercana y cálida, con una voz visual segura. La ropa sigue siendo protagonista; el rosa construye atmósfera, el rosewood dirige la acción y el chocolate aporta profundidad, lectura y contraste. La identidad no depende de adornos repetidos, sino de fotografía real, composición editorial asimétrica, tipografía con jerarquía y color bien dosificado.

El lenguaje botánico funciona como firma secundaria: trazos lineales abstractos, recortados y de baja opacidad que sugieren feminidad sin entrar en códigos de boda, cosmética o papelería artesanal. Debe aparecer solo en momentos de marca y desaparecer cuando la persona compara productos, elige talla, consulta precio o completa una acción.

## B. Personalidad de marca

1. **Femenina con carácter:** delicadeza visual respaldada por contrastes firmes.
2. **Urbana:** composiciones limpias, directas y actuales.
3. **Cálida:** superficies rosadas muy claras, lenguaje cercano y fotografía humana.
4. **Curada:** pocas decisiones visibles, bien elegidas y consistentes.
5. **Elegante sin rigidez:** serif expresiva en títulos y sans clara en uso cotidiano.
6. **Boutique, no masiva:** ritmo editorial y selección antes que densidad de marketplace.
7. **Humana:** información concreta, asesoramiento por WhatsApp y ausencia de frases abstractas.

## C. Paleta final

Los tonos derivados sirven para construir fondos, texto secundario y estados. Son tintes o mezclas directas de Rosewood Blush; no forman una paleta paralela.

| Token | HEX | Función | Ejemplos de uso | Combinaciones prohibidas o restringidas |
|---|---:|---|---|---|
| `background-primary` | `#FFF9FA` | Lienzo principal, derivado muy claro de blush | Fondo general, catálogo, detalle | No usar texto rosa claro encima |
| `background-secondary` | `#FCEEF1` | Cambio de ritmo suave | Secciones editoriales, FAQ, bloques de confianza | No combinar con texto `#C86B82` a tamaño normal |
| `surface` | `#FFFDFD` | Superficie elevada sin apariencia de tarjeta genérica | Drawer, formularios, bloques puntuales | No crear una tarjeta para cada fragmento de contenido |
| `surface-soft` | `#F6D5DC` | Superficie de marca | Highlights, badges suaves, fondos especiales | `#E8A8B8` y `#C86B82` no sirven como texto normal aquí |
| `text-primary` | `#2B1B1E` | Texto principal y títulos | Cuerpo, precio, navegación, headings | No usar sobre `#7A1E33` |
| `text-secondary` | `#5E454B` | Texto de apoyo, derivado de chocolate + rosewood | Descripciones, metadatos, ayudas | No reducir opacidad para simular un tercer gris |
| `text-muted` | `#6F585E` | Información secundaria accesible | Fechas, ayudas breves, captions sobre fondos claros | Solo sobre `background-primary`, `surface` y `surface-soft`; no sobre `#E8A8B8` |
| `border` | `#E7C7CE` | Separación tonal | Divisores, contorno decorativo | No usar como única señal de límite en un control: contraste aproximado 1.5:1 |
| `border-strong` | `#C86B82` | Límite funcional o seleccionado | Inputs, filtros activos, estado hover | No combinar con rosewood como relleno contiguo sin espacio |
| `brand-primary` | `#7A1E33` | Color de marca y acción | CTA, enlaces activos, sección protagonista | No colocar texto `#C86B82` encima |
| `brand-secondary` | `#C86B82` | Rose editorial | Acentos grandes, indicadores, bordes fuertes | No usar para párrafos sobre fondos claros; 3.43:1 sobre `#FFF9FA` |
| `accent` | `#E8A8B8` | Blush medio | Bloques decorativos, fondos de badge, detalles florales inversos | No usar como texto funcional sobre fondos claros o `#F6D5DC` |
| `button-primary-background` | `#7A1E33` | CTA principal | “Ver catálogo”, “Consultar por WhatsApp” | No alternar con varios colores primarios en una misma pantalla |
| `button-primary-text` | `#FFF9FA` | Texto del CTA principal | Botón rosewood | No usar texto rosa medio sobre rosewood |
| `button-primary-hover` | `#641728` | Hover/focus activo, derivado oscuro | Hover del CTA principal | No convertirlo en fondo de sección recurrente |
| `button-secondary-border` | `#7A1E33` | Contorno de CTA secundario | Botones outline | El texto debe ser `#7A1E33` o `#2B1B1E` |
| `focus-ring` | `#7A1E33` | Foco sobre superficies claras | Links, botones, filtros, inputs | Sobre fondos oscuros usar `#F6D5DC` como variante inversa |
| `footer-background` | `#2B1B1E` | Ancla visual final | Footer | No mezclar con negro puro |
| `footer-text` | `#F6D5DC` | Texto sobre chocolate | Logo inverso, títulos y links | El texto secundario puede usar el mismo color con menor jerarquía tipográfica, no con opacidad inferior a 75% |
| `floral-primary` | `#7A1E33` | Line art sobre fondos claros | Motivo A | Solo a baja opacidad y sin información encima |
| `floral-secondary` | `#C86B82` | Line art secundario sobre fondos claros | Motivo B | No repetir junto a `floral-primary` en la misma zona |
| `floral-inverse` | `#E8A8B8` | Line art sobre rosewood/chocolate | “Descubre tu estilo” o footer excepcional | Es decorativo; nunca texto ni icono funcional |

### Jerarquía cromática

- Los fondos más extensos usan tintes casi blancos; la web no debe verse enteramente rosa.
- `#7A1E33` es el color de acción y firma, no un color para rellenar múltiples tarjetas.
- `#2B1B1E` reemplaza negro y marrones heredados como único tono oscuro principal.
- `#C86B82` y `#E8A8B8` son acentos/superficies. No son colores de párrafo.
- No se permiten gradientes cromáticos. Las transiciones de tono se resuelven con bloques sólidos.

## D. Proporción cromática recomendada

Proporción orientativa de área visual, excluyendo fotografías:

| Grupo | Proporción | Justificación |
|---|---:|---|
| Base `background-primary` | **58%** | Mantiene aire, legibilidad y protagonismo del producto sin volver al blanco editorial frío |
| Surfaces `surface` + `background-secondary` | **16%** | Separa secciones con cambios tonales suaves, sin convertir todo en cards |
| Blush `#F6D5DC` + `#E8A8B8` | **10%** | Hace visible la nueva identidad sin teñir toda la experiencia |
| Rose `#C86B82` | **5%** | Acento editorial y contorno funcional puntual |
| Burgundy `#7A1E33` | **5%** | CTA, selección y una única sección de alto impacto |
| Chocolate `#2B1B1E` | **6%** | Texto, iconografía y footer; su presencia pequeña produce el contraste necesario |

La suma alta de base y surfaces (74%) evita que la paleta compita con los colores reales de las prendas. El 11% de tonos oscuros concentra navegación, lectura y conversión. Una página puede superar temporalmente el 5% de burgundy en “Descubre tu estilo”, compensándolo con menos rose en las secciones contiguas.

## E. Tipografía

### Auditoría actual

- **Display considerada actualmente:** Playfair Display.
- **Soporte actual:** Inter.
- Playfair Display es apta para web y está disponible en pesos 400, 500, 600, 700, 800 y 900, además de variable 400–900; existen estilos normal e italic.
- Inter está disponible como variable 100–900, normal e italic.
- La implementación actual carga ambas mediante `next/font`, pero usa italic con demasiada frecuencia y recrea el nombre Kajuu como texto. El logo real debe reemplazar esa recreación en contextos de marca.

### Decisión tipográfica propuesta

**Display provisional: Playfair Display.** Funciona para moda, aporta contraste y está optimizada para web. Sin embargo, es una fuente ampliamente usada y no debe confundirse con el logotipo. Se aprueba para títulos de producto y editoriales; su condición de fuente definitiva depende de comparar la referencia exacta elegida por Akira.

**Supporting font: Inter.** Se mantiene por legibilidad, calidad técnica y neutralidad. Deja que el logo, la paleta y la fotografía definan la personalidad.

| Rol | Fuente | Peso | Tamaño orientativo | Line-height | Reglas |
|---|---|---:|---:|---:|---|
| Hero H1 | Playfair Display | 600 | 64–80 px desktop / 42–50 px mobile | 0.98–1.06 | Normal; máximo 12–15 palabras |
| Título editorial | Playfair Display | 500 | 40–52 px / 32–40 px | 1.05–1.15 | Sin eyebrow obligatorio |
| Título de producto | Playfair Display | 500 | 44–56 px / 34–42 px | 1.04–1.12 | Prioriza nombre y lectura |
| H3 / título de bloque | Playfair Display | 500 | 26–34 px / 24–30 px | 1.15–1.25 | No combinar con italic por sistema |
| Body destacado | Inter | 400 | 18 px / 17 px | 1.6 | Máximo 65 caracteres por línea |
| Body | Inter | 400 | 16 px | 1.6–1.7 | Color `text-secondary` cuando no es información crítica |
| Navegación | Inter | 500 | 13–14 px | 1.2 | Sentence case, tracking 0.01–0.03em |
| Botón | Inter | 600 | 14–15 px | 1 | Sentence case, tracking 0–0.02em |
| Precio | Inter | 600 | 16–20 px | 1.2 | Números tabulares si están disponibles |
| Categoría / metadata | Inter | 500 | 12–13 px | 1.3 | Uppercase solo en etiquetas de 1–2 palabras; tracking máximo 0.08em |
| Formulario / FAQ | Inter | 400–600 | 15–16 px | 1.45–1.6 | Nunca serif para datos operativos |

### Italic, uppercase y tracking

- Italic: máximo una frase breve de énfasis por página editorial. No usarlo en todos los títulos ni en UI.
- Uppercase: reservado para estados cortos (`Nuevo`, `Agotado`) solo si el asset visual lo exige. Navegación y botones usan sentence case.
- Tracking: `0` en cuerpo y títulos; máximo `0.03em` en navegación/botones y `0.08em` en microetiquetas.
- No alternar serif/sans dentro de una misma oración para fabricar énfasis.
- No utilizar Playfair para precio, stock, filtros, tablas, formularios o ayudas.

## F. Logo system

### Estado de assets

Los logos oficiales no están presentes en los directorios auditados. La tabla siguiente congela la asignación por contexto, pero los tamaños deben validarse contra el bounding box real del SVG. No aplicar filtros CSS, redibujar letras ni sustituir temporalmente el logo por Playfair en el resultado final.

| Contexto | Variante | Tamaño visual recomendado | Fondo | Reglas |
|---|---|---|---|---|
| Desktop navbar | **Horizontal** | 132–156 px de ancho; 26–32 px de alto | `background-primary` o `surface` | Centrado; conservar proporción; no transformar a una “K” durante scroll |
| Mobile navbar | **Compacto** | 28–34 px de caja visual | Fondo claro | Debe reconocer la marca a 320 px de viewport; no usar la variante horizontal si obliga a reducirla demasiado |
| Footer | **Principal / normal** | 144–184 px de ancho | `footer-background` | Usar versión oficial clara/inversa; una sola aparición |
| Favicon / espacios reducidos | **Compacto** | 16, 32 y 48 px | Fondo sólido aprobado | Debe simplificarse bien; sin descriptor pequeño ilegible |
| Hero | **Ninguno** | — | — | El logo ya está en navbar. El H1 debe comunicar una propuesta, no duplicar el wordmark |

### Reglas globales del logo

- Área de protección mínima: **0.5× la altura visual del signo compacto** en los cuatro lados.
- Tamaño mínimo provisional: horizontal 120 px; principal 128 px; compacto 24 px. Confirmar al recibir los archivos.
- Sobre claro: versión oficial rosewood o chocolate, según el manual/asset.
- Sobre rosewood o chocolate: versión oficial clara. No invertir un raster con CSS.
- No usar el compacto cuando haya espacio para leer la variante horizontal.
- No usar la variante principal dentro de navbar si aumenta su altura.
- No combinar logo con flores a menos de una distancia equivalente a su área de protección.
- No añadir sombras, contornos, degradados ni animaciones al logo.

## G. Floral language

### Principio

El floral es un gesto lineal abstracto, no una ilustración botánica literal. Debe recordar movimiento de tela y silueta, más que un ramo. Se permiten **dos motivos compatibles**. No se incorpora un tercer motivo hasta demostrar una necesidad real.

### Motivo A — Contorno floral editorial

- **Función:** firma visual de una única sección protagonista.
- **Forma:** flor abstracta abierta, 5–7 gestos continuos, sin hojas realistas ni centro detallado.
- **Tamaño desktop:** 360–520 px de caja; recorte de 35–50% desde esquina o borde.
- **Posición definida:** fondo de “Descubre tu estilo”, entrando desde la esquina superior izquierda o inferior derecha, opuesta al rostro/prenda principal.
- **Color:** `floral-inverse` sobre burgundy; `floral-primary` sobre fondos claros.
- **Opacidad:** 7–10% sobre burgundy; 5–8% sobre fondo claro.
- **Trazo:** 1–1.25 px a escala final; sin relleno.
- **Tablet:** 240–320 px, opacidad 6–8%, recorte mínimo 50%.
- **Mobile:** desaparece por debajo de 768 px.
- **Frecuencia:** máximo una aparición por página y nunca repetido en secciones contiguas.

### Motivo B — Rama gestual corta

- **Función:** remate de una sección de marca o contacto.
- **Forma:** tallo simple con 2–3 hojas/pétalos geométricos; sin bouquet.
- **Tamaño desktop:** 120–180 px.
- **Posición definida:** borde exterior de la introducción de Lookbook o esquina del bloque final de Contacto. En footer solo si no se usa en otra zona de la página.
- **Color:** `floral-secondary` sobre claro o `floral-inverse` sobre oscuro.
- **Opacidad:** 10–14% sobre claro; 8–10% sobre oscuro.
- **Trazo:** 1 px; sin relleno.
- **Tablet:** 96–128 px, máximo una aparición.
- **Mobile:** desaparece por debajo de 640 px.
- **Frecuencia:** máximo una aparición por página.

### Dónde sí

- “Descubre tu estilo” como firma principal.
- Apertura de Lookbook, si existe suficiente espacio negativo.
- Cierre de Contacto o footer en desktop, de forma excluyente.

### Dónde no

- Navbar, drawer y menú.
- Catálogo y cards de producto.
- Filtros, selectores, precios y stock.
- Galería y panel funcional del detalle.
- Formularios, FAQ, tablas, errores y panel administrativo.
- Encima de fotografía de producto o cerca del rostro de una modelo.
- Más de una zona floral visible en el mismo viewport.

## H. UI components

### Navbar

- Fondo `background-primary` con transparencia mínima solo si mantiene contraste; borde inferior `border`.
- Sustituir el wordmark tipográfico por el logo horizontal/compacto real.
- Navegación en Inter 13–14/500, sentence case y tracking discreto.
- El comportamiento sticky puede mantenerse. La transformación a cápsula redondeada y el cambio del wordmark a “K” deben retirarse: se leen como tendencia de producto/SaaS, no como identidad Kajuu.
- Estado activo con subrayado rosewood de 2 px o cambio a `brand-primary`; no ambos si el resultado se siente cargado.

### Buttons

- Primario: fondo `brand-primary`, texto `button-primary-text`, altura 48–52 px, radio 0–2 px.
- Secundario: fondo transparente, borde `button-secondary-border`, texto `brand-primary`.
- Terciario: link con subrayado o flecha; sin caja.
- Sentence case. No tracking amplio ni sombras visibles.
- Un solo CTA primario por bloque. WhatsApp puede ser primario cuando es la acción de conversión.

### Product cards

- La fotografía ocupa la mayor jerarquía, ratio recomendado 4:5.
- Fondo sin tarjeta; sin flores, sombra, gradiente ni marco ornamental.
- Nombre y precio en Inter; la serif queda para encabezados de página o títulos editoriales.
- Categoría en `text-muted`, sentence case. CTA como link compacto o acceso al detalle.
- Hover: escala de imagen máxima 1.02 o leve cambio de color en el título. No levantar la tarjeta completa.

### Badges

- Fondo `surface-soft`, texto `brand-primary`; agotado puede usar superficie neutra derivada y `text-primary`.
- 12–13 px, peso 600, radio 2 px. Uppercase opcional solo para etiquetas de una palabra.
- Evitar múltiples badges simultáneos. Prioridad: stock crítico > nuevo > destacado.

### Filters

- Fondo `background-primary` o `surface`; separación con `border`.
- Texto en Inter, sentence case. Activo mediante underline o `brand-primary`.
- No convertir cada categoría en una pastilla decorativa.
- Controles seleccionados deben usar `border-strong` o `brand-primary`, no solo blush claro.

### Footer

- Fondo `footer-background`; texto principal `footer-text`.
- Logo principal real en versión clara/inversa.
- Links funcionales en Inter, sin uppercase generalizado.
- El motivo B es opcional solo en desktop y únicamente si no apareció antes en la página.

### Links

- Texto `brand-primary` sobre fondo claro; hover `button-primary-hover`.
- Subrayado para links dentro de párrafos. Flecha solo cuando comunica avance.
- No añadir línea decorativa a todos los links.

### Focus states

- Ring de 2–3 px `focus-ring`, offset 2–3 px.
- Sobre rosewood/chocolate: ring `#F6D5DC`.
- El foco no depende únicamente de color: borde/ring visible y persistente.

## I. Home

1. **Hero:** mantener una composición de fotografía dominante y texto breve, pero eliminar la duplicación del nombre como wordmark CSS. El H1 debe expresar propuesta de valor en una sola construcción, sin partir cada frase entre normal e italic.
2. **Color:** usar `background-primary`; reservar un plano blush pequeño para profundidad. Evitar rectángulos, hairlines y marcos decorativos simultáneos.
3. **Fotografía:** una imagen real protagonista, vertical, con luz cálida y prenda claramente visible. No repetir la misma foto en múltiples secciones.
4. **CTA:** un primario (catálogo o WhatsApp según objetivo de campaña) y un secundario. No dos botones con el mismo peso.
5. **Secciones:** alternar fondo claro, `background-secondary` y un único momento rosewood. Evitar la sucesión de bloques simétricos de tres cards.
6. **Últimos ingresos:** conservar el grid funcional, sin floral y con UI sobria.
7. **Instagram:** mantener el tratamiento reducido actual: título, explicación concreta y enlace. No recuperar marquee ni feed falso.
8. **Movimiento:** solo feedback de hover/focus y transiciones de imagen de 180–240 ms. Sin parallax, reveal encadenado o flor animada.

## J. “Descubre tu estilo”

### Propuesta: tríptico editorial rosewood

Esta debe ser la única sección de Home con fondo completo `#7A1E33`, creando un corte reconocible entre el hero claro y el catálogo. En desktop usa una grilla de 12 columnas: título y texto ocupan 4 columnas; la composición de imágenes ocupa 8. Una imagen vertical dominante representa el estilo principal y dos imágenes secundarias se escalonan sin encerrarse en cards idénticas. El Motivo A aparece recortado detrás del bloque de título a 7–9% en `#E8A8B8`.

**Contenido:**

- Título Playfair 500, 48–56 px, color `#F6D5DC`, sin italic.
- Descripción de máximo dos líneas que explique el beneficio: encontrar combinaciones, no “descubrir tu esencia”.
- Tres estilos reales: Sastrería urbana, Básicos esenciales y Abrigos.
- Etiquetas Inter 15–16/600, sentence case.
- CTA terciario claro: “Explorar estilos”, con flecha y underline visible en hover/focus.

**Composición:**

- Una imagen 4:5 dominante y dos recortes 3:4 secundarios.
- Separación 20–32 px; bordes rectos; sin sombras.
- Las imágenes deben mostrar looks completos y diferenciar claramente cada estilo.
- El floral permanece en espacio negativo; nunca cruza las prendas.

**Interacción:**

- Hover de imagen máximo 1.02 y desplazamiento de underline de 4 px.
- Toda la unidad estilo es un link con foco visible.
- Sin carrusel automático, flip cards, textos superpuestos ni animación de la flor.

**Responsive:**

- Tablet: encabezado arriba, composición 2 + 1; Motivo A reducido y más recortado.
- Mobile: desaparece el floral; una imagen protagonista ocupa el ancho y dos estilos secundarios forman una grilla de dos columnas debajo. Título 40–44 px. No usar scroll horizontal obligatorio.

## K. Responsive

### Desktop — 1280 px o más

- Logo horizontal centrado; navegación completa.
- Serif display en su escala máxima.
- Motivo A permitido una vez; Motivo B permitido solo si no compite.
- Asimetría mediante grilla, no mediante offsets arbitrarios.
- Máximo de contenido 1440 px, con columnas de lectura controladas.

### Tablet — 768–1279 px

- Logo horizontal si conserva ancho útil; compacto si la navegación se colapsa.
- Reducir display 15–25% y espacios verticales 20%.
- Motivo A a 240–320 px y más recortado; Motivo B a 96–128 px.
- Evitar composiciones con tres columnas estrechas; pasar a 2 + 1.
- CTA principal mantiene mínimo 48 px de alto.

### Mobile — menos de 768 px

- Logo compacto real, 28–34 px.
- Sin Motivo A; Motivo B desaparece por debajo de 640 px.
- Sin líneas largas, marcos flotantes ni offsets decorativos.
- Display máximo 50 px; títulos de sección 32–40 px.
- Un CTA principal por fila; botones de ancho completo cuando mejora el alcance del pulgar.
- Cards de producto pueden conservar dos columnas solo si nombre, precio y CTA no quedan comprimidos.
- La fotografía y la información funcional ocupan el primer viewport antes que cualquier decoración.

## L. Accesibilidad

Ratios aproximados calculados con WCAG:

| Combinación | Ratio | Uso |
|---|---:|---|
| `#2B1B1E` sobre `#FFF9FA` | **15.79:1** | Seguro para todo texto |
| `#2B1B1E` sobre `#F6D5DC` | **12.10:1** | Seguro para todo texto |
| `#2B1B1E` sobre `#E8A8B8` | **8.39:1** | Seguro para texto y controles |
| `#2B1B1E` sobre `#C86B82` | **4.60:1** | AA para texto normal; usar con moderación |
| `#7A1E33` sobre `#FFF9FA` | **9.79:1** | Seguro para links, texto y controles |
| `#7A1E33` sobre `#F6D5DC` | **7.51:1** | Seguro para texto y badges |
| `#7A1E33` sobre `#E8A8B8` | **5.20:1** | Seguro para texto normal |
| `#FFF9FA` sobre `#7A1E33` | **9.79:1** | Seguro para CTA principal |
| `#F6D5DC` sobre `#2B1B1E` | **12.10:1** | Seguro para footer |
| `#C86B82` sobre `#FFF9FA` | **3.43:1** | Solo texto grande, icono o borde; no body |
| `#7A1E33` sobre `#C86B82` | **2.85:1** | Prohibido para texto funcional |

### Restricciones

- `#F6D5DC` y `#E8A8B8` son principalmente fondos/surfaces.
- `#C86B82` no debe usarse para cuerpo o etiquetas pequeñas sobre fondos claros.
- Rosa sobre rosa no comunica jerarquía ni estado por sí solo.
- `border` es decorativo; inputs, selecciones y foco necesitan `border-strong` o `focus-ring`.
- Estados nunca dependen solo del color: añadir texto, icono, subrayado o cambio de borde.
- Mantener targets táctiles de al menos 44 × 44 px y texto base de 16 px en formularios móviles.
- Respetar `prefers-reduced-motion`; ninguna función depende de animación.

## M. Anti-IA checklist

- [ ] Cada eyebrow aporta información real; no aparece por rutina en todas las secciones.
- [ ] Hay como máximo un énfasis italic breve por página editorial.
- [ ] Ninguna sección combina gradiente, glass, sombra, línea ornamental y bordes redondeados.
- [ ] Las flores aparecen en una sola zona por viewport y nunca en UI funcional.
- [ ] Las composiciones no repiten automáticamente tres cards iguales.
- [ ] La copy nombra prendas, estilos, entrega o asesoramiento concretos.
- [ ] Cada línea, borde y flecha cumple una función de jerarquía o interacción.
- [ ] El movimiento comunica hover, foco, selección o cambio; no “decora”.
- [ ] Se usa el logo real y no una recreación tipográfica.
- [ ] La revisión final incluye 320, 375, 768, 1280 y 1440 px, además de teclado y contraste.

## N. Decisiones cerradas

1. Rosewood Blush es la única familia cromática de marca; los tonos adicionales son derivados funcionales.
2. `#7A1E33` dirige acciones y `#2B1B1E` dirige lectura/contraste.
3. `#F6D5DC`, `#E8A8B8` y `#C86B82` no se reparten con la misma intensidad.
4. Inter es la fuente de navegación, cuerpo, controles, precios, categorías, formularios y FAQ.
5. La serif display se reserva para H1, títulos editoriales y producto; nunca para toda la interfaz.
6. El logo oficial se usa como asset. No se recrea con CSS ni texto.
7. Desktop navbar usa logo horizontal; mobile y favicon usan compacto; footer usa principal/normal.
8. El hero no duplica el logo.
9. El sistema floral tiene dos motivos, lineales, monocromáticos y de baja opacidad.
10. No hay flores en catálogo, cards, filtros, precio, stock, detalle funcional, formularios, tablas, navbar o admin.
11. “Descubre tu estilo” es el momento cromático protagonista de Home y usa una composición editorial asimétrica sobre rosewood.
12. No se reintroducen marquee falso, eyebrows sistemáticos, hairlines decorativas ni italic repetitivo.
13. Se eliminan gradientes arbitrarios, glassmorphism ornamental y tarjetas sin necesidad semántica.

## O. Decisiones que todavía requieren aprobación de Akira

1. **Ortografía oficial de marca:** el pedido usa “KAJÚ INDUMENTARIA”, mientras el proyecto y las referencias usan “Kajuu/KAJUU”. El logo oficial debe resolver esta diferencia antes de tocar metadata, copy o navegación.
2. **Entrega de logos:** archivos principal, horizontal y compacto, idealmente SVG; incluir versiones clara/oscura y reglas de color si existen.
3. **Display definitiva:** confirmar Playfair Display o proporcionar el nombre/archivo/licencia de la tipografía elegida en la referencia. La arquitectura tipográfica ya está cerrada, pero la familia exacta no debe adivinarse.
4. **Motivos florales:** aprobar un boceto del Motivo A y B antes de producir SVG finales. La referencia floral original no está incluida en los assets auditados.
5. **Dirección de “Descubre tu estilo”:** aprobar el bloque rosewood de alto contraste y el tríptico asimétrico antes de desarrollar la sección.

---

## Cinco decisiones visuales más importantes

1. Base casi blanca rosada, rosewood para conversión y chocolate para lectura.
2. Tipografía dual disciplinada: serif solo editorial; Inter para toda función.
3. Logo real por contexto, sin wordmark recreado ni transformación a “K”.
4. Dos motivos florales como firma escasa, fuera de producto y controles.
5. “Descubre tu estilo” como único gran momento rosewood, asimétrico y basado en fotografía.

## Riesgos

- Sin logos reales no se puede cerrar proporción, clear space, versión inversa ni legibilidad mínima.
- La inconsistencia “KAJÚ” vs “KAJUU” puede fragmentar marca, SEO y redes si no se decide antes de implementar.
- Playfair Display puede sentirse genérica si se usa en exceso; el control de roles es obligatorio.
- Demasiado blush convertiría la web en cosmética/romántica; se limita a 10% de área aproximada.
- Flores literales, pequeñas o repetidas acercarían la identidad a eventos/papelería.
- Fotografías inconsistentes o artificiales pueden anular la mejora del design system.

## Gate para FASE 1 — Refactor del Design System

El sistema está suficientemente definido para comenzar Fase 1 en tokens, tipografía funcional, contraste y componentes. La integración de marca en navbar/footer debe quedar bloqueada hasta recibir los tres logos y confirmar **KAJÚ vs KAJUU**. La familia display puede implementarse provisionalmente como Playfair Display solo si Akira la aprueba expresamente; no debe asumirse como la fuente del logo.
