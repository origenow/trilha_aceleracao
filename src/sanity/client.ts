import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "fe5jeetj", // O ID do seu projeto que configuramos antes
    dataset: "production",
    apiVersion: "2024-04-29", // Data de hoje para pegar a versão mais recente da API
    useCdn: false, // false garante que você veja as atualizações instantaneamente
});

// Essa função ajudará a extrair a URL da imagem da miniatura depois
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
    return builder.image(source);
}