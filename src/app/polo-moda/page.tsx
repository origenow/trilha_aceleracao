import { SliderSection } from "@/components/sections/SliderSection";
import { MateriaisDeApoioSection } from "@/components/sections/MateriaisDeApoioSection";
import { Footer } from "@/components/sections/Footer";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

export const metadata = {
  title: "TikTok Shop · Polos",
  description:
    "Programa exclusivo para vendedores de Polos de Moda credenciados. Desbloqueie benefícios, cupons e suporte dedicado no TikTok Shop.",
  icons: {
    icon: [
      { url: "/Shoppingbag_icon-03.svg", type: "image/svg+xml" },
      { url: "/assets/favicon_io/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/assets/favicon_io/apple-touch-icon.png", sizes: "180x180" },
  },
};

const MENU_ITEMS = [
  { label: "Trilha", ariaLabel: "Trilha de Aceleração", link: "/", color: "#F1204A" },
  { label: "Biblioteca", ariaLabel: "Biblioteca de conteúdos", link: "/polo-moda", color: "#2DCCD3" },
];

export default function PoloModaPage() {
  return (
    <>
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={MENU_ITEMS}
        colors={["#F1204A", "#033624", "#2DCCD3"]}
        accentColor="#F1204A"
        logoUrl="/tiktok-white.png"
        displaySocials={false}
        displayItemNumbering={false}
        toggleClassName="md:hidden"
      />

      <main
        className="relative w-full"
        style={{ minHeight: "100vh", backgroundColor: "#EDBBE8" }}
      >
        <MateriaisDeApoioSection />
        <SliderSection />
        <Footer />
      </main>
    </>
  );
}
