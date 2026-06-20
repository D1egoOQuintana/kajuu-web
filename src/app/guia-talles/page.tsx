import type { Metadata } from "next";

import { InfoCard } from "@/components/content/info-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { WhatsAppCTA } from "@/components/product/whatsapp-cta";

export const metadata: Metadata = {
  title: "Guía de talles | Kajuu Indumentaria",
  description:
    "Guía general de talles Kajuu con consejos para tomar medidas y consultar dudas por WhatsApp.",
};

const sizeRows = [
  { label: "XS", bust: "78-84", waist: "60-66", hip: "86-92" },
  { label: "S", bust: "84-90", waist: "66-72", hip: "92-98" },
  { label: "M", bust: "90-96", waist: "72-78", hip: "98-104" },
  { label: "L", bust: "96-104", waist: "78-86", hip: "104-112" },
  { label: "XL", bust: "104-112", waist: "86-94", hip: "112-120" },
] as const;

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b]">
      <PublicHeader />
      <main className="pb-24">
        <PageHero
          accent="talles."
          description="Una guía orientativa para elegir mejor. Las medidas pueden variar según tela, calce y tipo de prenda, por eso siempre confirmamos dudas por WhatsApp."
          eyebrow="Medidas y cambios"
          title="Guía de"
        >
          <WhatsAppCTA label="Consultar mi talle" variant="primary" />
        </PageHero>

        <Container>
          <section className="grid gap-5 py-10 md:grid-cols-3 lg:py-14">
            <InfoCard eyebrow="01" title="Busto">
              <p>Medí el contorno por la parte más amplia, con la cinta recta y sin ajustar demasiado.</p>
            </InfoCard>
            <InfoCard eyebrow="02" title="Cintura">
              <p>Tomá la medida en la parte más angosta del torso, manteniendo una postura natural.</p>
            </InfoCard>
            <InfoCard eyebrow="03" title="Cadera">
              <p>Medí el contorno por la parte más amplia de la cadera, idealmente con una prenda liviana.</p>
            </InfoCard>
          </section>

          <section className="border-y border-[#e7d8cc] py-10">
            <div className="mb-6">
              <p className="label-caps mb-3 text-[#8a5a3c]">Tabla general</p>
              <h2 className="editorial-heading text-3xl text-[#2f140d] md:text-5xl">
                Referencia en centímetros
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <caption className="sr-only">
                  Tabla general de talles Kajuu para busto, cintura y cadera
                </caption>
                <thead>
                  <tr className="border-b border-[#e7d8cc]">
                    <th className="label-caps py-4 text-[#2f140d]" scope="col">
                      Talle
                    </th>
                    <th className="label-caps py-4 text-[#2f140d]" scope="col">
                      Busto
                    </th>
                    <th className="label-caps py-4 text-[#2f140d]" scope="col">
                      Cintura
                    </th>
                    <th className="label-caps py-4 text-[#2f140d]" scope="col">
                      Cadera
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeRows.map((row) => (
                    <tr className="border-b border-[#e7d8cc]/70" key={row.label}>
                      <th className="py-5 text-[#2f140d]" scope="row">
                        {row.label}
                      </th>
                      <td className="py-5 text-[#5f5048]">{row.bust}</td>
                      <td className="py-5 text-[#5f5048]">{row.waist}</td>
                      <td className="py-5 text-[#5f5048]">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-5 pt-10 md:grid-cols-2">
            <InfoCard title="Consejos por prenda" eyebrow="Calce">
              <p>
                En denim y sastrería conviene confirmar cintura y cadera. En
                tops, buzos y sweaters revisamos busto, largo y elasticidad de
                la tela.
              </p>
            </InfoCard>
            <InfoCard title="Cambios" eyebrow="Recomendación">
              <p>
                Los cambios se coordinan según disponibilidad y estado de la
                prenda. Esta guía es orientativa: siempre podemos revisar tu
                caso antes de confirmar.
              </p>
            </InfoCard>
          </section>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
