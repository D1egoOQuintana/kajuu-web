import type { Metadata } from "next";
import Image from "next/image";
import { DM_Serif_Display } from "next/font/google";

import { FloralMotifA, FloralMotifB } from "./_components/floral-motifs";
import styles from "./phase-0-6.module.css";

const dmSerif = DM_Serif_Display({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "KAJÚ — Aprobación visual Fase 0.6",
  description:
    "Preview interno para comparar el sistema floral y la sección Descubre tu estilo de KAJÚ.",
  robots: { follow: false, index: false },
};

const logoAssets = [
  {
    name: "Principal",
    source: "/brand/Logo con fondo.png",
    dimensions: "1448 × 1086",
  },
  {
    name: "Horizontal",
    source: "/brand/Logo horizontal con fondo.png",
    dimensions: "1672 × 941",
  },
  {
    name: "Compacto",
    source: "/brand/Logo compacto con fondo.png",
    dimensions: "1254 × 1254",
  },
] as const;

const categoryImages = [
  {
    alt: "Look de sastrería urbana usado como referencia de composición",
    href: "#proposal-one-notes",
    label: "Sastrería urbana",
    source: "/products/zara3.webp",
  },
  {
    alt: "Look de básicos esenciales usado como referencia de composición",
    href: "#proposal-one-notes",
    label: "Básicos esenciales",
    source: "/products/images.jpg",
  },
  {
    alt: "Look de abrigos usado como referencia de composición",
    href: "#proposal-one-notes",
    label: "Abrigos",
    source: "/products/images%20(1).jpg",
  },
] as const;

function LogoUsagePreview() {
  return (
    <div className={styles.logoUsageGrid}>
      <article className={styles.desktopContext}>
        <div className={styles.contextLabel}>Navbar desktop</div>
        <div className={styles.mockDesktopNav}>
          <span>Inicio</span>
          <span>Catálogo</span>
          <div className={styles.horizontalLogoCrop}>
            <Image
              alt="Logo horizontal oficial KAJÚ Indumentaria"
              height={941}
              priority
              src="/brand/Logo horizontal sin fondo.png"
              width={1672}
            />
          </div>
          <span>Galería de estilo</span>
          <span>Contacto</span>
        </div>
        <p>Horizontal transparente. Mantiene la lectura del descriptor sin elevar el navbar.</p>
      </article>

      <article className={styles.mobileContext}>
        <div className={styles.contextLabel}>Navbar mobile / app icon</div>
        <div className={styles.phoneShell}>
          <div className={styles.mockMobileNav}>
            <div className={styles.compactLogoCrop}>
              <Image
                alt="Monograma compacto oficial KAJÚ"
                height={1254}
                src="/brand/Logo compacto sin fondo.png"
                width={1254}
              />
            </div>
            <span className={styles.menuIcon} aria-hidden="true">
              <i />
              <i />
            </span>
          </div>
          <div className={styles.phoneBody}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <p>Compacto transparente. Es la única variante que conserva reconocimiento en espacios reducidos.</p>
      </article>

      <article className={styles.footerContext}>
        <div className={styles.contextLabel}>Footer</div>
        <div className={styles.mockFooter}>
          <div className={styles.principalLogoCrop}>
            <Image
              alt="Logo principal oficial KAJÚ Indumentaria"
              height={1086}
              src="/brand/Logo sin fondo.png"
              width={1448}
            />
          </div>
          <p>Indumentaria femenina con mirada propia.</p>
          <div className={styles.footerRule} />
          <small>Catálogo · WhatsApp · Instagram</small>
        </div>
        <p>Principal transparente sobre una superficie blush clara. No existe una versión inversa para usar directamente sobre chocolate.</p>
      </article>
    </div>
  );
}

function ProposalOne() {
  return (
    <article className={styles.proposalArticle} id="proposal-one">
      <header className={styles.proposalHeader}>
        <div>
          <p className={styles.optionNumber}>Propuesta 1</p>
          <h3>Galería editorial contenida</h3>
        </div>
        <p>Elegante · refinada · silenciosa</p>
      </header>

      <div className={styles.discoverOne}>
        <FloralMotifA className={styles.discoverOneFlower} />
        <div className={styles.discoverOneCopy}>
          <p className={styles.sectionIndex}>01 — Curaduría KAJÚ</p>
          <h4>Descubre<br />tu estilo</h4>
          <p>
            Tres formas de vestir la ciudad, seleccionadas para combinar entre sí y acompañarte todos los días.
          </p>
          <a href="#proposal-one-notes">
            Explorar estilos <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.editorialGallery}>
          {categoryImages.map((category, index) => (
            <a
              className={index === 0 ? styles.editorialFeature : styles.editorialSecondary}
              href={category.href}
              key={category.label}
            >
              <span className={styles.editorialImage}>
                <Image
                  alt={category.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 760px) 100vw, 38vw" : "(max-width: 760px) 50vw, 18vw"}
                  src={category.source}
                />
              </span>
              <span className={styles.categoryName}>{category.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.proposalNotes} id="proposal-one-notes">
        <p><strong>Sensación:</strong> revista boutique, calma y curaduría.</p>
        <p><strong>Floral:</strong> Dirección A, apenas visible y fuera de las prendas.</p>
        <p><strong>Riesgo:</strong> puede sentirse demasiado discreta si la portada necesita un quiebre más memorable.</p>
      </div>
    </article>
  );
}

function ProposalTwo() {
  return (
    <article className={styles.proposalArticle} id="proposal-two">
      <header className={styles.proposalHeader}>
        <div>
          <p className={styles.optionNumber}>Propuesta 2</p>
          <h3>Tríptico rosewood de impacto</h3>
        </div>
        <p>Memorable · boutique · urbana</p>
      </header>

      <div className={styles.discoverTwo}>
        <FloralMotifB className={styles.discoverTwoFlower} />
        <div className={styles.discoverTwoCopy}>
          <p className={styles.sectionIndex}>Estilos para habitar la ciudad</p>
          <h4>Descubre<br />tu estilo</h4>
          <p>
            Siluetas versátiles, texturas y capas para construir un guardarropa que se sienta propio.
          </p>
          <a href="#proposal-two-notes">
            Explorar estilos <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={styles.impactGallery}>
          <a className={styles.impactFeature} href="#proposal-two-notes">
            <span className={styles.impactImage}>
              <Image
                alt={categoryImages[0].alt}
                fill
                sizes="(max-width: 760px) 100vw, 38vw"
                src={categoryImages[0].source}
              />
            </span>
            <span className={styles.impactCaption}>
              <b>01</b>
              {categoryImages[0].label}
            </span>
          </a>

          <div className={styles.impactSecondaryStack}>
            {categoryImages.slice(1).map((category, index) => (
              <a href="#proposal-two-notes" key={category.label}>
                <span className={styles.impactSmallImage}>
                  <Image
                    alt={category.alt}
                    fill
                    sizes="(max-width: 760px) 50vw, 17vw"
                    src={category.source}
                  />
                </span>
                <span className={styles.impactCaption}>
                  <b>0{index + 2}</b>
                  {category.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.proposalNotes} id="proposal-two-notes">
        <p><strong>Sensación:</strong> una firma de marca clara, contemporánea y reconocible.</p>
        <p><strong>Floral:</strong> Dirección B como gesto de fondo, sin cruzar producto ni texto.</p>
        <p><strong>Control:</strong> es el único bloque oscuro de la portada; el resto de la página recupera aire.</p>
      </div>
    </article>
  );
}

export default function PhaseZeroSixPreview() {
  return (
    <main className={`${styles.preview} ${dmSerif.variable}`} id="phase-0-6-preview">
      <a className={styles.skipLink} href="#preview-content">Ir al contenido</a>

      <header className={styles.previewNav}>
        <a className={styles.previewBrand} href="#top" aria-label="KAJÚ — volver al inicio del preview">
          <span className={styles.previewBrandMark}>
            <Image
              alt=""
              height={1254}
              priority
              src="/brand/Logo compacto sin fondo.png"
              width={1254}
            />
          </span>
          <span>Aprobación visual</span>
        </a>
        <nav aria-label="Secciones del preview">
          <a href="#logos">Logos</a>
          <a href="#floral">Floral</a>
          <a href="#discover">Descubre tu estilo</a>
          <a href="#recommendation">Recomendación</a>
        </nav>
      </header>

      <div id="preview-content">
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.phaseLabel}>Fase 0.6 · Dirección visual final</p>
            <h1>Una identidad botánica con carácter urbano.</h1>
            <p className={styles.heroLead}>
              Comparación visual para decidir el sistema floral y el momento de marca más importante de la portada.
            </p>
            <div className={styles.heroMeta}>
              <span>KAJÚ</span>
              <span>DM Serif Display + Inter</span>
              <span>Rosewood Blush</span>
            </div>
          </div>

          <div className={styles.heroLogoStage}>
            <div className={styles.heroFlowerCrop}>
              <FloralMotifB />
            </div>
            <Image
              alt="Logo principal oficial KAJÚ Indumentaria"
              height={1086}
              priority
              src="/brand/Logo sin fondo.png"
              width={1448}
            />
          </div>
        </section>

        <section className={styles.brandSystem} aria-labelledby="brand-system-title">
          <div>
            <p className={styles.sectionLabel}>Sistema base confirmado</p>
            <h2 id="brand-system-title">Calidez, contraste y una voz editorial precisa.</h2>
          </div>
          <div className={styles.palette} aria-label="Paleta Rosewood Blush">
            <span style={{ background: "#fff9fa" }}><b>Base</b>#FFF9FA</span>
            <span style={{ background: "#f6d5dc" }}><b>Blush</b>#F6D5DC</span>
            <span style={{ background: "#c86b82" }}><b>Rose</b>#C86B82</span>
            <span className={styles.lightSwatch} style={{ background: "#7a1e33" }}><b>Rosewood</b>#7A1E33</span>
            <span className={styles.lightSwatch} style={{ background: "#2b1b1e" }}><b>Chocolate</b>#2B1B1E</span>
          </div>
          <div className={styles.typeSample}>
            <p className={styles.displaySample}>DM Serif Display para la voz editorial.</p>
            <p>Inter mantiene clara la navegación, el producto y la conversión.</p>
          </div>
        </section>

        <section className={styles.contentSection} id="logos" aria-labelledby="logos-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Activos oficiales</p>
            <h2 id="logos-title">Nueve PNG detectados. Tres variantes útiles para web.</h2>
            <p>
              Los archivos confirman KAJÚ con tilde. Las variantes transparentes son las adecuadas para interfaz; las versiones “Redes” conservan una composición cuadrada para publicaciones.
            </p>
          </div>

          <LogoUsagePreview />

          <div className={styles.assetStrip}>
            {logoAssets.map((asset) => (
              <article key={asset.name}>
                <div className={styles.assetImage}>
                  <Image
                    alt={`Logo ${asset.name.toLowerCase()} de KAJÚ`}
                    fill
                    sizes="(max-width: 760px) 100vw, 30vw"
                    src={asset.source}
                  />
                </div>
                <div>
                  <strong>{asset.name}</strong>
                  <span>PNG · {asset.dimensions}</span>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.assetWarning}>
            <strong>Limitación técnica</strong>
            <p>
              No hay SVG ni logos claros/inversos. Los PNG pesan entre 92 KB y 889 KB. Antes de producción conviene pedir exportaciones SVG oficiales y una variante clara; no corresponde recolorear los actuales con CSS.
            </p>
          </aside>
        </section>

        <section className={styles.floralSection} id="floral" aria-labelledby="floral-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Sistema floral</p>
            <h2 id="floral-title">Dos direcciones con funciones distintas.</h2>
            <p>
              Ambas viven en el fondo, usan una sola tinta por aplicación y desaparecen cuando interfieren con la prenda o la lectura.
            </p>
          </div>

          <div className={styles.floralGrid}>
            <article className={styles.floralCard}>
              <div className={styles.floralCardHead}>
                <div>
                  <p>Dirección A</p>
                  <h3>Contorno editorial</h3>
                </div>
                <span>Protagonismo 2/5</span>
              </div>
              <div className={`${styles.floralCanvas} ${styles.floralCanvasLight}`}>
                <FloralMotifA />
                <p>Delicada, abierta y silenciosa.</p>
              </div>
              <div className={`${styles.floralCanvas} ${styles.floralCanvasDark}`}>
                <FloralMotifA />
                <p>Una tinta blush sobre rosewood.</p>
              </div>
              <dl className={styles.specList}>
                <div><dt>Trazo</dt><dd>Line art · 0.8–1.1 px</dd></div>
                <div><dt>Color</dt><dd>#7A1E33 / #E8A8B8</dd></div>
                <div><dt>Opacidad</dt><dd>5–9%</dd></div>
                <div><dt>Uso</dt><dd>Galería de estilo, cierre editorial, propuesta 1</dd></div>
                <div><dt>No usar</dt><dd>Logo, producto, cards, controles o móvil</dd></div>
              </dl>
              <p className={styles.riskNote}>
                <strong>Riesgo:</strong> repetida o centrada puede acercarse a papelería de boda. Se controla con escala grande, recorte y asimetría.
              </p>
            </article>

            <article className={`${styles.floralCard} ${styles.recommendedCard}`}>
              <div className={styles.recommendTag}>Recomendada</div>
              <div className={styles.floralCardHead}>
                <div>
                  <p>Dirección B</p>
                  <h3>Pétalo gestual</h3>
                </div>
                <span>Protagonismo 3/5</span>
              </div>
              <div className={`${styles.floralCanvas} ${styles.floralCanvasModern}`}>
                <FloralMotifB />
                <p>Movimiento de pétalo y pliegue textil.</p>
              </div>
              <div className={`${styles.floralCanvas} ${styles.floralCanvasChocolate}`}>
                <FloralMotifB />
                <p>Mayor presencia, con control de escala.</p>
              </div>
              <dl className={styles.specList}>
                <div><dt>Trazo</dt><dd>Semi-outline · 1.2–1.6 px</dd></div>
                <div><dt>Color</dt><dd>#C86B82 / #E8A8B8</dd></div>
                <div><dt>Opacidad</dt><dd>7–11%</dd></div>
                <div><dt>Uso</dt><dd>Momento de marca, campaña, propuesta 2</dd></div>
                <div><dt>No usar</dt><dd>Logo, navegación, producto, UI o móvil</dd></div>
              </dl>
              <p className={styles.riskNote}>
                <strong>Riesgo:</strong> con relleno alto puede sentirse cosmético. El relleno queda al 10% y la forma nunca se repite como patrón.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.discoverSection} id="discover" aria-labelledby="discover-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Momento visual de la portada</p>
            <h2 id="discover-title">“Descubre tu estilo” con una dirección de arte propia.</h2>
            <p>
              Las dos propuestas usan el mismo contenido para que la decisión se base en composición, intensidad y personalidad de marca.
            </p>
          </div>

          <ProposalOne />
          <ProposalTwo />
        </section>

        <section className={styles.recommendation} id="recommendation" aria-labelledby="recommendation-title">
          <FloralMotifB className={styles.recommendationFlower} />
          <div>
            <p className={styles.sectionLabel}>Recomendación senior</p>
            <h2 id="recommendation-title">Dirección B + Propuesta 2.</h2>
          </div>
          <div className={styles.recommendationCopy}>
            <p>
              Es la combinación con más identidad para KAJÚ: relaciona flor y movimiento textil, crea un quiebre memorable en la portada y diferencia la marca sin convertir el sitio en cosmética o papelería romántica.
            </p>
            <p>
              La condición es mantenerla excepcional: una sola sección rosewood, una sola flor de gran escala y ninguna ornamentación dentro de catálogo, cards o controles.
            </p>
          </div>
          <div className={styles.decisionGrid}>
            <article><span>01</span><strong>Floral</strong><p>Elegir A o B.</p></article>
            <article><span>02</span><strong>Sección</strong><p>Elegir propuesta 1 o 2.</p></article>
            <article><span>03</span><strong>Activos</strong><p>Solicitar SVG y versión inversa.</p></article>
          </div>
        </section>
      </div>
    </main>
  );
}
