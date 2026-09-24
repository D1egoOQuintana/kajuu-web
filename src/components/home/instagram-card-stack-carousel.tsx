import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

export function InstagramCardStackCarousel() {
  return (
    <section
      aria-labelledby="instagram-title"
      className="instagram-strip relative isolate overflow-hidden border-t border-[var(--border)] bg-[var(--background-secondary)] py-12 md:py-14"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-16">
        <div>
          <h2
            className="editorial-heading text-[28px] md:text-[38px]"
            id="instagram-title"
          >
            Novedades en Instagram
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)] md:text-base">
            Nuevos ingresos, prendas en uso y horarios del local.
          </p>
        </div>
        <a
          className="button button--secondary shrink-0"
          href={INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {INSTAGRAM_HANDLE}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
