import type { Metadata } from "next";
import { VideoPlayerSection } from "@/components/sections/VideoPlayerSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { FasesSection } from "@/components/sections/FasesSection";
import { ComoFuncionaSection } from "@/components/sections/ComoFuncionaSection";
import { WebinarsSection } from "@/components/sections/WebinarsSection";
import { CtaFinalSection } from "@/components/sections/CtaFinalSection";
import { Footer } from "@/components/sections/Footer";
import { TikTokIntro } from "@/components/ui/TikTokIntro";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

export const metadata: Metadata = {
  alternates: {
    canonical: "/#webinars",
  },
};

const MOBILE_MENU_ITEMS = [
  { label: "Trilha", ariaLabel: "Trilha de Aceleração", link: "/", color: "#F1204A" },
  { label: "Biblioteca", ariaLabel: "Biblioteca de conteúdos", link: "/polo-moda", color: "#2DCCD3" },
];

export default function Home() {
  return (
    <>
      {/* Splash screen de entrada — remove-se automaticamente após ~3.2s */}
      <TikTokIntro />

      {/* Mobile: menu overlay staggered — toggle oculto em md+ */}
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={MOBILE_MENU_ITEMS}
        colors={["#F1204A", "#033624", "#2DCCD3"]}
        accentColor="#F1204A"
        logoUrl="/tiktok-white.png"
        displaySocials={false}
        displayItemNumbering={false}
        toggleClassName="md:hidden"
      />

      <main
        className="relative w-full mx-auto"
        style={{ minHeight: "100vh" }}
      >
        <VideoPlayerSection />
        <HeroSection />
        <FasesSection />
        <ComoFuncionaSection />
        <WebinarsSection />
        <CtaFinalSection />
        <Footer />
      </main>
    </>
  );
}
