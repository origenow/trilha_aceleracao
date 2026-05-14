import { client } from "@/sanity/client";
import { WebinarsSectionClient } from "./WebinarsSectionClient";

const query = `*[_type == "evento"] | order(dataEvento asc) {
  _id,
  tipo,
  tagPill,
  titulo,
  subtitulo,
  dataEvento,
  local,
  imagem,
  "urlPdf": arquivo.asset->url
}`;

export type Evento = {
  _id: string;
  tipo: "webinar" | "presencial";
  tagPill?: string;
  titulo: string;
  subtitulo?: string;
  dataEvento?: string;
  local?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagem?: any;
  urlPdf?: string;
};

export async function WebinarsSection() {
  const eventos: Evento[] = await client.fetch(query, {}, { next: { revalidate: 30 } });

  const webinars = eventos.filter((e) => e.tipo === "webinar");
  const presenciais = eventos.filter((e) => e.tipo === "presencial");

  return <WebinarsSectionClient webinars={webinars} presenciais={presenciais} />;
}
