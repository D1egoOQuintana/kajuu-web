// Perfil oficial de Kajuu Indumentaria.
const INSTAGRAM_URL = "https://www.instagram.com/kajuu_indumentaria/";

export function InstagramCardStackCarousel() {
  return (
    <section
      aria-labelledby="instagram-title"
      className="border-t border-[#e7d8cc] bg-[#f4f3f1] py-14 md:py-16"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-16">
        <div>
          <h2
            className="editorial-heading text-[28px] text-[#2f140d] md:text-[38px]"
            id="instagram-title"
          >
            Lo nuevo se ve primero en Instagram
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5f5048] md:text-base">
            Ingresos, combinaciones y novedades del showroom.
          </p>
        </div>
        <a
          className="label-caps inline-flex shrink-0 items-center gap-2 border border-[#2f140d] bg-[#faf9f7] px-6 py-4 text-[#2f140d] transition-colors duration-300 hover:border-[#7a2e2e] hover:text-[#7a2e2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7a2e2e]"
          href={INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          @kajuu_indumentaria
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
