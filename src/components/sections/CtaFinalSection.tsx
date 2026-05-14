import { client } from "@/sanity/client";
import { CtaFinalSectionClient, type GrupoWhatsApp } from "./CtaFinalSectionClient";

const FALLBACK_GRUPOS: GrupoWhatsApp[] = [
  { _id: "1", regiao: "Birigui",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/Fi4iERd1llnDjeORN0xwK2", ordem: 1 },
  { _id: "2", regiao: "Brás",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/LUOgiqEApUc8mXOeVbPxKO", ordem: 2 },
  { _id: "3", regiao: "Franca",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/I7FD7s2GK7N5Ld5XOTKPEA", ordem: 3 },
  { _id: "4", regiao: "Goiânia",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/H46KVUKVn0jLEmDM9uQDSv", ordem: 4 },
  { _id: "5", regiao: "Mar de Espanha",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/CtfLuI455TZ0sWCekVHb2I", ordem: 5 },
  { _id: "6", regiao: "Nova Friburgo",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/EBYYg34lh2q5mb5gzKKz6J", ordem: 6 },
  { _id: "7", regiao: "Nova Serrana",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/GgWOs3eNI4n9SWdA41Oabg", ordem: 7 },
  { _id: "8", regiao: "Santa Catarina",subtitulo: "Polo de Moda · TikTok Shop", link: "https://chat.whatsapp.com/DKDpkAUKmZFLh9TuwHJpq4", ordem: 8 },
];

const query = `*[_type == "grupoWhatsapp"] | order(ordem asc) {
  _id,
  regiao,
  subtitulo,
  link,
  ordem
}`;

export async function CtaFinalSection() {
  let grupos: GrupoWhatsApp[] = [];

  try {
    grupos = await client.fetch(query, {}, { next: { revalidate: 60 } });
  } catch {
    grupos = [];
  }

  if (grupos.length === 0) {
    grupos = FALLBACK_GRUPOS;
  }

  return <CtaFinalSectionClient grupos={grupos} />;
}
