# KAJUU V2 — BRAND APPROVAL PACK

**Fase:** 0.5 — Brand Approval & Asset Validation  
**Fecha:** 17 de septiembre de 2026  
**Estado:** preparado para decisión de Akira; sin implementación  
**Fuentes auditadas:** `KAJUU_V2_VISUAL_DIRECTION_SPEC_v1.md`, `DESIGN_SYSTEM.md`, código y metadata actuales, referencias de `design-reference/stitch/`, `public/` y el adjunto de esta fase.

## Resumen ejecutivo

La dirección **Rosewood Urban Botanical** ya tiene suficiente definición para conservar paleta, jerarquía, accesibilidad, distribución tipográfica y reglas de composición. La validación de marca todavía no puede cerrarse porque el repositorio auditado no contiene `public/brand/`, las tres variantes del logo ni el archivo o nombre verificable de la serif elegida por Akira.

El proyecto usa de forma consistente **Kajuu/KAJUU** en el sitio, la documentación y las referencias de Stitch. **KAJÚ** no aparece como identidad implementada; solo aparece en la Visual Direction Spec para registrar esta discrepancia. Eso convierte a KAJUU en el nombre operativo actual, pero no demuestra que sea el nombre oficial.

El gate recomendado es:

- **GO técnico limitado** para tokens, espaciado, contraste, componentes funcionales y roles tipográficos que no dependan del logo o de la familia display definitiva.
- **NO-GO de marca** para navbar, footer, favicon, wordmark, metadata definitiva y títulos display hasta recibir logos, confirmar el nombre y cerrar la serif.

---

## A. Estado de logos

### Resultado de la inspección

No existe el directorio `public/brand/` en la copia auditada del proyecto. `public/` contiene únicamente cuatro imágenes de producto y cinco SVG de inicio de Next.js. El adjunto de esta fase contiene solo el brief en texto. Por tanto, no hay archivos reales de marca que permitan medir dimensiones, proporción, caja visual, transparencia, color, calidad de curvas o autenticidad vectorial.

| Variante esperada | Archivo encontrado | Formato | Proporción | Fondo / transparencia | Vector real | Uso provisional | Problemas web comprobables |
|---|---|---|---|---|---|---|---|
| Logo principal | **No disponible** | N/D | N/D | N/D | No evaluable | Footer y piezas institucionales | No se pueden validar legibilidad mínima, versión inversa, peso ni área de protección |
| Logo horizontal | **No disponible** | N/D | N/D | N/D | No evaluable | Navbar desktop | No se puede confirmar si cabe a 132–156 px sin perder descriptor o detalle |
| Logo compacto | **No disponible** | N/D | N/D | N/D | No evaluable | Navbar mobile, favicon y espacios reducidos | No se puede confirmar lectura a 16, 24, 32 y 48 px |

### Matriz de uso

La matriz propuesta sigue siendo la asignación correcta **como hipótesis de contexto**:

| Contexto | Variante prevista | Estado |
|---|---|---|
| Desktop navbar | Horizontal | Correcto en principio; pendiente de validar la proporción real |
| Mobile navbar | Compacto | Correcto en principio; pendiente de probar reconocimiento a 28–34 px |
| Footer | Principal | Correcto en principio; requiere versión clara/inversa oficial |
| Favicon / espacios reducidos | Compacto | Correcto en principio; requiere una versión simplificada legible a 16 px |

Esta matriz se debe corregir si los archivos revelan que “principal” y “horizontal” tienen otra función, que el compacto conserva texto ilegible o que no existe una variante inversa.

### Criterio de aceptación cuando lleguen los archivos

1. Preferir SVG con `viewBox`, curvas convertidas a trazados y sin tipografías enlazadas.
2. Rechazar SVG que solo incruste una imagen raster o que dependa de una fuente externa.
3. Solicitar versión clara y oscura aprobadas; no invertir un PNG con filtros CSS.
4. Verificar que el lienzo no tenga márgenes transparentes excesivos.
5. Probar el compacto a 16, 24, 32 y 48 px, y el horizontal a 120–156 px.
6. Exportar PNG solo como respaldo; debe tener canal alfa y resolución suficiente para pantallas de alta densidad.

No se debe recrear ninguna variante con HTML, CSS, Playfair Display ni una letra “K” provisional.

---

## B. Naming

### Inventario de variantes

| Variante | Dónde aparece | Lectura |
|---|---|---|
| **KAJÚ** | Solo en `KAJUU_V2_VISUAL_DIRECTION_SPEC_v1.md`, dentro de tres notas que describen la inconsistencia y la decisión pendiente | No está implementada ni respaldada por un logo disponible |
| **KAJUU** | Wordmark tipográfico del footer, títulos y wordmarks de las referencias de Stitch, y título de la documentación V2 | Es la variante visual en mayúsculas del nombre operativo |
| **Kajuu** | Metadata, copy público, mensajes de WhatsApp, textos de administración y documentación del proyecto | Es el nombre operativo predominante |
| **Kajuu Indumentaria** | `SITE_NAME`, metadata, datos estructurados, documentación y referencias visuales | Es el descriptor comercial operativo actual |
| **kajuu** | Rutas, clases CSS, nombres de tipos/componentes, paquete, dominio provisional, handle de Instagram e identificadores de Firebase | Son identificadores técnicos o direcciones; no prueban por sí mismos la ortografía oficial |

### Identidad que sugieren los datos actuales

Sin logos reales, la identidad oficial **no se puede inferir con certeza**. La evidencia digital disponible favorece **KAJUU / Kajuu Indumentaria**: es la forma presente en el sitio, `SITE_NAME`, las referencias de Stitch y el handle configurado. Esta conclusión solo describe el estado del proyecto; la decisión de Akira o del propietario tiene prioridad.

La confirmación debe responder en una sola línea:

> Nombre visible oficial: **KAJÚ** o **KAJUU**. Descriptor oficial: **Indumentaria**, otro, o ninguno.

### Archivos con identidad visible que deberán normalizarse

#### Fuente central, metadata y datos estructurados

- `src/lib/site.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/catalogo/page.tsx`
- `src/app/catalogo/[slug]/page.tsx`
- `src/app/como-comprar/page.tsx`
- `src/app/contacto/page.tsx`
- `src/app/guia-talles/page.tsx`
- `src/app/lookbook/page.tsx`
- `src/app/ultimos-ingresos/page.tsx`
- `src/app/loading.tsx`

#### Navegación, footer, mensajes y administración

- `src/components/layout/public-header.tsx`
- `src/components/layout/footer.tsx`
- `src/components/product/whatsapp-cta.tsx`
- `src/components/product/whatsapp-floating.tsx`
- `src/lib/utils/whatsapp.ts`
- `src/components/admin/admin-gate.tsx`
- `src/app/kajuu-panel/page.tsx`

#### Documentación vigente

- `README.md`
- `AGENTS.md`
- `CODEX.md`
- `ARCHITECTURE.md`
- `DATA_MODEL.md`
- `DEFINITION_OF_DONE.md`
- `DESIGN_SYSTEM.md`
- `SECURITY.md`
- `TASKS.md`
- `KAJUU_V2_VISUAL_DIRECTION_SPEC_v1.md`
- `KAJUU_V2_BRAND_APPROVAL_PACK.md`

#### Referencias que contienen naming visible

- `design-reference/stitch/code.html`
- `design-reference/stitch/home_kajuu_boutique_warm/code.html`
- `design-reference/stitch/ltimos_ingresos_kajuu_warm/code.html`
- `design-reference/stitch/detalle_jean_wide_leg_kajuu_warm/code.html`
- `design-reference/stitch/lookbook_kajuu_boutique_warm/code.html`
- `design-reference/stitch/c_mo_comprar_kajuu_guide/code.html`
- `design-reference/stitch/c_mo_comprar_kajuu_warm/code.html`
- `design-reference/stitch/contacto_y_faq_kajuu_warm/code.html`
- `design-reference/stitch/gu_a_de_talles_y_cambios_kajuu_warm/code.html`
- `design-reference/stitch/kajuu_indumentaria/DESIGN.md`

Las referencias pueden conservarse como registro histórico si se marcan explícitamente como tales. No deben seguir actuando como fuente de verdad con un nombre antiguo.

### Identificadores que no se deben renombrar automáticamente

La decisión visual no autoriza por sí sola a cambiar `/kajuu-panel`, clases `kajuu-*`, símbolos como `KajuuFaq`, el nombre del paquete, el proyecto Firebase, el dominio o `@kajuu_indumentaria`. Esos cambios pueden romper URLs, accesos, SEO, despliegues o enlaces externos. Solo se migran si el propietario también decide cambiar las direcciones e identificadores técnicos.

---

## C. Typography status

### A. ¿Conocemos la fuente exacta elegida por Akira?

**No.** No hay archivo `.ttf`, `.otf`, `.woff` o `.woff2` de marca en `public/`, `design-reference/` ni en el adjunto. Tampoco hay una referencia original con nombre de familia, enlace de licencia o especificación del diseñador.

### B. ¿Playfair Display coincide realmente con la elección?

**No se puede confirmar.** El proyecto carga `Playfair_Display` e `Inter` mediante `next/font/google`, y las referencias generadas de Stitch también declaran Playfair Display. Esto prueba coherencia entre prototipo e implementación, pero no prueba que Playfair sea la serif de la referencia original elegida por Akira.

### C. Estado de Playfair Display

**Provisional.** Es técnicamente apta para web y funciona con la dirección editorial, pero es muy reconocible y puede verse genérica si se usa en exceso. Se mantiene únicamente como candidata de títulos; nunca debe usarse para reconstruir el logo.

### D. Dato que falta para cerrar la decisión

Se necesita al menos uno de estos elementos:

1. nombre exacto de la familia y pesos aprobados;
2. archivo de fuente con licencia web;
3. enlace oficial de la fundición o proveedor;
4. referencia original de alta resolución con el nombre de la fuente indicado por quien la diseñó.

Una captura sin identificación puede servir para comparar, pero no basta para declarar una coincidencia exacta.

### Decisión funcional

**Inter se mantiene como candidata aprobada para UI funcional**: navegación, cuerpo, botones, precios, filtros, formularios, FAQ y panel. No hay una razón de legibilidad o arquitectura que justifique cambiarla en esta fase.

---

## D. Floral Direction A — Contorno botánico editorial

**Intención:** una firma delicada con mucho espacio negativo, semejante a un dibujo de estudio de moda.

| Atributo | Especificación |
|---|---|
| Tipo de forma | Flor abierta no literal, con pétalos largos, un tallo y como máximo dos hojas incompletas; nunca ramo |
| Complejidad | Media: 7–10 gestos, sin centro detallado, relleno, sombreado ni nervaduras realistas |
| Grosor visual | 0.8–1.1 px cuando la caja mide 400 px; extremos limpios y sin apariencia caligráfica |
| Color en fondo claro | `#7A1E33` |
| Color en rosewood | `#E8A8B8` |
| Regla cromática | Un solo color por aplicación; ambos colores pertenecen a Rosewood Blush y no aparecen simultáneamente |
| Opacidad | 5–7% sobre claro; 7–9% sobre `#7A1E33` |
| Escala y recorte | Caja de 360–520 px en desktop, recortada 40–60% por un borde |
| Aplicaciones | Apertura de Lookbook, alternativa contenida de “Descubre tu estilo” o cierre editorial de Contacto; solo una de esas zonas por página |
| Lugares prohibidos | Logo y su área de protección, navbar, drawer, catálogo, cards, fotos de producto, precio, stock, filtros, formularios, FAQ y panel admin |
| Mobile | Se elimina por debajo de 768 px; no se reduce hasta convertirse en un adorno pequeño |

**Control de tono:** el gran tamaño, el recorte y la ausencia de simetría evitan el lenguaje de invitación de boda. El trazo no debe encerrar títulos ni formar coronas.

---

## E. Floral Direction B — Pétalo gestual abstracto

**Intención:** una forma contemporánea que pueda leerse a la vez como pétalo, pliegue de tela y movimiento.

| Atributo | Especificación |
|---|---|
| Tipo de forma | Tres a cinco curvas continuas con quiebres suaves; sugiere una flor sin dibujar una especie, tallo o bouquet |
| Complejidad | Baja-media: 3–5 gestos principales, una única dirección de movimiento y grandes vacíos |
| Grosor visual | 1.2–1.6 px cuando la caja mide 400 px; ligeramente más firme que A |
| Color en fondo claro | `#C86B82` o, si necesita más contraste, `#7A1E33`; nunca ambos en la misma pieza |
| Color en rosewood/chocolate | `#E8A8B8` |
| Regla cromática | Un solo color por aplicación; máximo dos colores definidos para todo el sistema |
| Opacidad | 7–10% sobre claro; 8–11% sobre `#7A1E33` o `#2B1B1E` |
| Escala y recorte | Caja de 420–620 px en desktop, recortada 50–70% para que funcione como gesto y no como ilustración |
| Aplicaciones | Propuesta principal de “Descubre tu estilo”, un bloque de campaña o un cierre de marca; máximo una zona visible por viewport |
| Lugares prohibidos | Alrededor del logo, navegación, categorías como iconos, catálogo, cards, galería, controles, WhatsApp, formularios, tablas y admin |
| Mobile | Se elimina por debajo de 768 px; la composición móvil depende de fotografía, color y jerarquía |

**Recomendación:** presentar **Dirección B primero a Akira**. Conserva la intención floral, conecta con el movimiento de la ropa y protege mejor el carácter urbano. Su abstracción reduce el riesgo de boda, cosmética y vintage. Dirección A debe mostrarse como la opción más suave si Akira busca una presencia botánica más reconocible.

---

## F. Descubre tu estilo — Propuesta principal

### Tríptico rosewood asimétrico

| Decisión | Definición |
|---|---|
| Estructura | Banda full-width con grilla de 12 columnas. Texto en 4 columnas; composición fotográfica en 8. Una imagen dominante y dos secundarias escalonadas |
| Jerarquía | 1) fotografía dominante, 2) título, 3) categorías, 4) texto breve y CTA. No eyebrow obligatorio |
| Background | `#7A1E33` sólido, sin gradiente, glass, textura artificial ni tarjetas |
| Uso de `#7A1E33` | Plano completo de la sección y señal del único momento cromático intenso de Home |
| Uso de `#2B1B1E` | Plano vertical estrecho detrás de una foto secundaria y texto del CTA sobre fondo claro. Nunca texto chocolate directamente sobre rosewood por falta de contraste |
| Presencia floral | Dirección B, `#E8A8B8` a 8–10%, recortada detrás del título y sin tocar letras, rostro o prenda |
| Fotografías | Una foto 4:5 dominante y dos 3:4. Looks completos, luz natural cálida, crop coherente y diferencias claras entre estilos |
| Categorías | Exactamente 3: **Sastrería urbana**, **Básicos esenciales**, **Abrigos** |
| CTA | Botón claro `#F6D5DC` con texto `#2B1B1E`: **Explorar estilos** |
| Hover / focus | Imagen a escala máxima 1.015; título subrayado; flecha se desplaza 4 px. Ring claro visible. La flor no se anima |
| Desktop | Padding vertical 120–144 px; separación 24–32 px; bordes rectos; sin superponer texto sobre fotos |
| Mobile | Sin flor ni plano chocolate decorativo. Título y texto primero, foto dominante a ancho completo y dos secundarias en 2 columnas. CTA a ancho completo; sin carrusel ni scroll horizontal obligatorio |

**Copy guía:** explicar que la sección ayuda a encontrar combinaciones y prendas. Evitar “descubre tu esencia”, “eleva tu energía” o frases abstractas.

---

## G. Descubre tu estilo — Alternativa

### Galería editorial contenida

| Decisión | Definición |
|---|---|
| Estructura | Contenedor máximo de 1280 px sobre una banda suave. Introducción en 4 columnas y galería escalonada en 8, sin ocupar todo el fondo oscuro |
| Jerarquía | Título y primera imagen comparten protagonismo; categorías y CTA quedan en segundo nivel |
| Background | `#FCEEF1`, con amplio margen de `#FFF9FA` antes y después |
| Uso de `#7A1E33` | Título, links activos, divisor de 2 px y borde/hover del CTA |
| Uso de `#2B1B1E` | Texto, nombres de categoría y captions sobre fondos claros |
| Presencia floral | Dirección A en `#7A1E33` a 5–6%, recortada desde una esquina exterior; solo desktop |
| Fotografías | Una 4:5 y dos 3:4, alineadas por una línea base parcial. Sin marcos, sombras ni collages |
| Categorías | Las mismas 3 categorías de la propuesta principal para comparar dirección, no contenido |
| CTA | Outline `#7A1E33`: **Explorar estilos**; hover con fondo rosewood y texto `#FFF9FA` |
| Hover / focus | Leve escala 1.01, subrayado de categoría y ring rosewood. Sin desplazamiento de bloques |
| Desktop | Padding vertical 96–120 px; composición asimétrica con más espacio negativo que la principal |
| Mobile | Sin flor; tres bloques apilados con imagen, categoría y link. CTA a ancho completo al final |

Esta alternativa conserva la nueva identidad, pero reduce el área rosewood y la presión visual si Akira considera demasiado intensa la propuesta principal.

---

## H. Elementos que debe aprobar Akira

1. **Nombre visible oficial y descriptor:** KAJÚ o KAJUU; “Indumentaria” u otra forma.
2. **Logos reales:** principal, horizontal y compacto, más sus variantes clara/oscura; confirmar la matriz tras inspeccionarlos.
3. **Serif display exacta:** nombre/archivo/licencia o aprobación expresa de Playfair Display como familia definitiva.
4. **Dirección floral:** B recomendada como primera opción o A como alternativa delicada.
5. **“Descubre tu estilo”:** tríptico rosewood principal o galería editorial contenida.

---

## I. Elementos que ya están cerrados

1. El concepto rector es **Rosewood Urban Botanical**.
2. La familia cromática y sus roles son los definidos en la Visual Direction Spec: base clara, `#7A1E33` para acción y momento protagonista, y `#2B1B1E` para lectura y profundidad.
3. No se usan gradientes cromáticos, glassmorphism ornamental, tarjetas genéricas ni decoración aleatoria.
4. Inter ocupa los roles funcionales; la serif se reserva para H1 y títulos editoriales. La familia serif exacta sigue pendiente.
5. El logo siempre será un asset oficial; no se reconstruye con tipografía, HTML, CSS ni una “K”.
6. El sistema floral usa line art, máximo una zona por viewport, baja opacidad y ningún uso en UI funcional o producto.
7. “Descubre tu estilo” será el único gran momento de marca de Home, con fotografía protagonista, composición asimétrica y tres categorías reales.
8. La experiencia se diseña mobile-first; la decoración desaparece cuando compite con lectura, producto o conversión.
9. Se mantienen las reglas de contraste y foco de la Visual Direction Spec.

---

## Check de coherencia

| Riesgo | Qué lo produciría | Regla que lo evita |
|---|---|---|
| Wedding stationery | Flor centrada o simétrica, marco botánico, serif caligráfica e italic abundante | Flor grande y recortada, composición asimétrica, sin coronas/marcos, máximo una aparición e italic excepcional |
| Beauty / cosmetics | Rosa sobre rosa, macro pétalos, brillo, gradientes, superficies suaves repetidas | Producto textil protagonista, fondos sólidos, contraste chocolate, UI Inter y floral lejos de cards/fotos |
| Romantic vintage | Sepia, crema envejecida, ornamentos, óvalos, bordes decorativos y serif en toda la interfaz | Rosewood limpio, bordes rectos, tipografía funcional sans, fotografía urbana y ausencia de texturas envejecidas |
| Pinterest template | Tres tarjetas idénticas, collage aspiracional, quotes y decoración por sección | Una imagen dominante + dos secundarias, categorías concretas, contenido comercial y asimetría basada en grilla |
| Diseño generado por IA | Gradiente, glass, eyebrow repetido, copy abstracta, flor aleatoria y exceso de microanimación | Una razón funcional por elemento, copy de prendas, movimiento solo en hover/focus y checklist Anti-IA antes de aprobar |

La combinación propuesta es coherente si estas reglas se consideran límites del sistema y no sugerencias opcionales.

---

## J. Go / No-Go

### Decisión

**NO-GO para iniciar una Fase 1 completa que incluya identidad de marca.** Faltan tres evidencias fundamentales:

1. los tres logos reales y sus variantes de color;
2. la confirmación humana de KAJÚ vs KAJUU y del descriptor;
3. la identificación o aprobación explícita de la serif display.

**GO limitado** para preparar el refactor de tokens, espaciado, accesibilidad, contraste y componentes funcionales con Inter, siempre que navbar, footer, favicon, metadata definitiva, wordmark y familia display queden fuera de implementación hasta cerrar las decisiones anteriores.

### Condición de desbloqueo

Fase 1 queda plenamente habilitada cuando:

- `public/brand/` contenga principal, horizontal y compacto en formatos verificables;
- Akira confirme el nombre visible y la serif;
- Akira elija Dirección A o B y propuesta principal o alternativa para “Descubre tu estilo”.

Hasta entonces, cualquier integración de marca produciría retrabajo o convertiría una inferencia en una decisión oficial.
