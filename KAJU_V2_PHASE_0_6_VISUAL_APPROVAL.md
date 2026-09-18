# KAJÚ V2 — FASE 0.6: VISUAL APPROVAL

**Estado:** listo para revisión visual de Akira  
**Preview:** `/__preview/phase-0-6`  
**Alcance:** sistema floral, logos y “Descubre tu estilo”  
**Implementación principal:** no modificada

## Resumen ejecutivo

Esta fase convierte las decisiones de marca en dos comparaciones visuales reales dentro de una ruta aislada. La identidad oficial queda normalizada para esta fase como **KAJÚ**, con **DM Serif Display** para títulos editoriales e **Inter** para interfaz y cuerpo.

La recomendación es **Floral B — Pétalo gestual** junto con **Propuesta 2 — Tríptico rosewood de impacto**. Es la combinación con mayor capacidad para construir una firma reconocible, mantener la ropa como protagonista y evitar que la marca derive hacia códigos de boda, cosmética o plantilla romántica.

La Home actual no fue reemplazada. El preview tiene metadata `noindex, nofollow`, no forma parte de la navegación pública y no consulta Firebase.

---

## Assets encontrados

La carpeta `public/brand/` contiene **nueve archivos PNG**, no seis. Son tres variantes de marca en versión transparente, tres con fondo y tres adaptaciones cuadradas para redes.

| Archivo | Dimensiones | Proporción | Transparencia | Uso recomendado |
|---|---:|---:|---|---|
| `Logo sin fondo.png` | 1448 × 1086 | 4:3 | Sí | Logo principal sobre superficies claras; footer claro o panel blush |
| `Logo horizontal sin fondo.png` | 1672 × 941 | 16:9 aprox. | Sí | Navbar desktop |
| `Logo compacto sin fondo.png` | 1254 × 1254 | 1:1 | Sí | Navbar mobile, favicon y app icon |
| `Logo con fondo.png` | 1448 × 1086 | 4:3 | No | Piezas institucionales y respaldo de exportación |
| `Logo horizontal con fondo.png` | 1672 × 941 | 16:9 aprox. | No | Material de marca horizontal; evitar en navbar por el rectángulo de fondo |
| `Logo compacto con fondo.png` | 1254 × 1254 | 1:1 | No | Aplicaciones cuadradas sobre fondo controlado |
| `Logo con fondo Redes.png` | 1254 × 1254 | 1:1 | No | Publicaciones de redes |
| `Logo con fondo horizontal Redes.png` | 1254 × 1254 | 1:1 | No | Publicaciones de redes con lockup horizontal |
| `Logo con fondo compacto Redes.png` | 1254 × 1254 | 1:1 | No | Avatar o publicación centrada |

### Conclusiones técnicas de logo

- Todos los archivos son raster PNG; **no hay SVG vectorial real**.
- Los PNG transparentes contienen márgenes amplios en el lienzo. La UI debe encuadrarlos con una caja controlada, conservando la proporción.
- Los archivos pesan aproximadamente entre 92 KB y 889 KB. Son excesivos para varios usos pequeños sin optimización.
- No existe una variante clara/inversa aprobada. El logo oscuro no debe colocarse directamente sobre rosewood o chocolate.
- El footer debe usar una superficie clara/blush para el logo actual o esperar una exportación inversa oficial.
- Antes de producción conviene solicitar SVG oficiales, versión inversa y exportaciones de favicon específicas.

### Matriz de uso validada

| Contexto | Asset |
|---|---|
| Navbar desktop | `Logo horizontal sin fondo.png` |
| Navbar mobile | `Logo compacto sin fondo.png` |
| Footer | `Logo sin fondo.png` sobre superficie clara/blush |
| Favicon / app icon | `Logo compacto sin fondo.png`, con exportación posterior a 16/32/48/180 px |
| Redes | Las tres variantes `Redes.png`, según composición |

---

## Floral A — Contorno editorial

### Concepto

Flor abierta no literal, con pétalos largos, tallo curvo y dos hojas incompletas. Tiene una lectura botánica reconocible, pero evita detalles realistas, sombreado y centro ornamental.

| Variable | Regla |
|---|---|
| Técnica | Line art puro |
| Grosor | 0.8–1.1 px a 400 px de caja |
| Trazo | Continuo, limpio, sin efecto caligráfico |
| Fondo claro | `#7A1E33`, opacidad final 5–7% |
| Fondo rosewood | `#E8A8B8`, opacidad final 7–9% |
| Protagonismo | 2/5 |
| Mobile | Oculta por debajo de 768 px |

### Dónde se usa

- apertura de Lookbook;
- cierre editorial de Contacto;
- Propuesta 1 de “Descubre tu estilo”;
- una sola zona por página.

### Dónde no se usa

Logo, navbar, drawer, catálogo, cards, fotos de producto, filtros, precio, stock, formularios, FAQ, WhatsApp y administración.

### Por qué encaja

Aporta feminidad y cuidado sin alterar la lectura de producto. Su ritmo vertical combina con DM Serif Display y con fotografía de moda de cuerpo entero.

### Riesgo

Puede parecer papelería de boda si se centra, se duplica o encierra títulos. Se controla con gran escala, recorte del 40–60%, baja opacidad y posición asimétrica.

---

## Floral B — Pétalo gestual

### Concepto

Tres curvas principales construyen una forma que puede leerse como pétalo, pliegue de tela o movimiento. Incluye un relleno muy leve para aumentar presencia sin convertirse en una ilustración decorativa.

| Variable | Regla |
|---|---|
| Técnica | Semi-outline con un relleno al 10% |
| Grosor | 1.2–1.6 px a 400 px de caja |
| Trazo | Gestual, amplio y con dirección única |
| Fondo claro | `#C86B82` o `#7A1E33`, opacidad final 7–10% |
| Fondo rosewood/chocolate | `#E8A8B8`, opacidad final 8–11% |
| Protagonismo | 3/5 |
| Mobile | Oculta por debajo de 768 px |

### Dónde se usa

- momento principal de Home;
- bloque de campaña;
- Propuesta 2 de “Descubre tu estilo”;
- máximo una zona visible por viewport.

### Dónde no se usa

Área de protección del logo, navegación, iconos de categoría, catálogo, cards, galería funcional, controles, formularios, tablas y administración.

### Por qué encaja

Conecta la intención floral con el movimiento de una prenda. Es más propia de una boutique urbana y reduce el riesgo de una estética romántica convencional.

### Riesgo

Con más relleno, brillo o repetición puede parecer cosmética. La forma no debe convertirse en patrón ni superar el 11% de opacidad.

---

## Propuesta 1 — Galería editorial contenida

### Composición

- fondo `#FCEEF1` dentro de una sección clara;
- texto en el primer tercio y galería asimétrica en los dos tercios restantes;
- una imagen 4:5 dominante y dos imágenes 3:4 secundarias;
- Floral A recortada en el fondo;
- tres categorías: Sastrería urbana, Básicos esenciales y Abrigos.

### Jerarquía

1. fotografía dominante;
2. título “Descubre tu estilo” en DM Serif Display;
3. nombres de categoría;
4. explicación breve y CTA outline.

### Color

- fondo suave `#FCEEF1`;
- texto `#2B1B1E`;
- título, enlace y floral `#7A1E33`;
- sin fondo oscuro completo.

### Interacción

- zoom máximo de imagen 1.015;
- subrayado de categoría;
- CTA outline que llena con rosewood;
- sin carrusel ni animación floral.

### Responsive

En mobile desaparece la flor, la imagen principal ocupa el ancho y las dos secundarias forman una grilla de dos columnas. El CTA pasa a ancho completo.

### Sensación y ajuste con Akira

Se siente refinada, serena y cercana a una revista boutique. Puede gustar si Akira valora la elegancia por encima del impacto. Su limitación es que el salto frente a la sección actual resulta moderado.

---

## Propuesta 2 — Tríptico rosewood de impacto

### Composición

- bloque full-width `#7A1E33`;
- texto en cuatro columnas y fotografía en ocho;
- una imagen dominante con desplazamiento vertical y dos secundarias escalonadas;
- plano chocolate detrás de la imagen principal;
- Floral B en gran escala, recortada y detrás del contenido;
- las mismas tres categorías para una comparación justa.

### Jerarquía

1. contraste del bloque rosewood;
2. título y fotografía dominante;
3. tríptico de categorías;
4. CTA claro.

### Color

- `#7A1E33` como único momento oscuro principal de Home;
- `#2B1B1E` como plano de profundidad, nunca como texto sobre rosewood;
- `#F6D5DC` para título, texto y CTA;
- `#E8A8B8` para la flor.

### Interacción

- zoom máximo de imagen 1.015;
- CTA blush con desplazamiento vertical de 2 px;
- etiquetas estables, sin texto superpuesto en fotografías;
- flor completamente estática.

### Responsive

En mobile desaparecen flor y plano chocolate. El bloque conserva rosewood, coloca el texto primero, muestra una imagen dominante a ancho completo y dos secundarias en dos columnas.

### Sensación y ajuste con Akira

Se siente memorable, segura y claramente de marca. Responde mejor al pedido de hacer la sección más llamativa sin aumentar adornos ni convertir las categorías en cards genéricas.

---

## Recomendación final

### Elegir Floral B

Tiene más relación con moda y movimiento textil, sostiene mejor la identidad urbana y diferencia a KAJÚ sin depender de flores literales. Floral A sigue siendo una buena dirección secundaria para Lookbook o piezas editoriales puntuales, pero no debería gobernar la marca.

### Elegir Propuesta 2

La sección rosewood crea el momento visual que hoy falta en Home. La composición mantiene la fotografía como protagonista, mejora el recuerdo de marca y usa los tonos aprobados con una jerarquía clara.

### Solución senior elegida

**Floral B + Propuesta 2**, con estas condiciones:

1. una sola sección rosewood de alto impacto en Home;
2. una sola forma floral visible por viewport;
3. ninguna flor en catálogo, cards, controles o mobile;
4. fotografías reales, coherentes y con mejor resolución antes de producción;
5. SVG e inversos oficiales del logo antes de integrar navbar y footer definitivos.

---

## Decisiones que debe aprobar Akira

1. Floral A o Floral B.
2. Propuesta 1 o Propuesta 2 para “Descubre tu estilo”.
3. Aprobación para solicitar/producir exportaciones oficiales SVG e inversas a partir del archivo fuente del logo, sin redibujarlo.

---

## Cómo revisar

1. Ejecutar `npm run dev`.
2. Abrir `http://localhost:3000/__preview/phase-0-6`.
3. Revisar desktop a 1280–1440 px.
4. Revisar mobile a 375 px.
5. Comparar las dos direcciones florales y las dos secciones con el mismo contenido.

La ruta es un preview de aprobación. No sustituye la Home ni autoriza todavía el refactor visual del resto del sitio.
