import { BotanicalBloom } from "@/components/brand/botanical-bloom";
import { BrandLogo } from "@/components/brand/brand-logo";

export default function LoadingPage() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="kajuu-loading-screen"
    >
      <div aria-hidden="true" className="kajuu-loading__panel" />
      <BotanicalBloom
        className="kajuu-loading__botanical"
        motion="sway"
        variant="hero-vine"
      />

      <header className="kajuu-loading__header">
        <span>KAJÚ · INDUMENTARIA FEMENINA</span>
        <span>BUENOS AIRES</span>
      </header>

      <div className="kajuu-loading__content">
        <p className="kajuu-loading__eyebrow">Colección en movimiento</p>
        <BrandLogo
          className="kajuu-loading__logo"
          priority
          variant="horizontal"
        />
        <div aria-hidden="true" className="kajuu-loading__progress">
          <span className="kajuu-loading__progress-bar" />
        </div>
        <p className="kajuu-loading__status" role="status">
          <span className="sr-only">Cargando contenido de KAJÚ.</span>
          <span aria-hidden="true">Preparando la colección</span>
        </p>
      </div>

      <footer className="kajuu-loading__footer">
        <span>JEANS · MODA URBANA</span>
        <span>CABA · BUENOS AIRES</span>
      </footer>
    </main>
  );
}
