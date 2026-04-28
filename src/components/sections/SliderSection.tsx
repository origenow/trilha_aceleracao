"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight as ChevronRightNav } from "lucide-react";
import "swiper/css";

const FloatingDoodle = ({
  src, size = 40, top, left, right, bottom, delay = 0, rotate = 0, opacity = 0.10, reverse = false,
}: {
  src: string; size?: number; top?: string; left?: string; right?: string; bottom?: string;
  delay?: number; rotate?: number; opacity?: number; reverse?: boolean;
}) => (
  <div
    className={`absolute pointer-events-none ${reverse ? "animate-float-reverse" : "animate-float"}`}
    style={{ top, left, right, bottom, width: size, height: size, animationDelay: `${delay}s`, opacity }}
  >
    <img src={src} alt="" className="w-full h-full object-contain" style={{ transform: `rotate(${rotate}deg)` }} />
  </div>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 as const },
  transition: { duration: 0.48, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

interface SlideData {
  tag: string;
  video: string;
  link: string;
  title: string;
  description: string;
  dark: boolean;
  tiktok?: boolean;
}

const TAB_CONFIG = [
  { name: "Abrindo sua loja",                 shortName: "Abertura",   color: "#2DCCD3", textColor: "#033624" },
  { name: "Operação para iniciantes",          shortName: "Operação",   color: "#FBEB35", textColor: "#033624" },
  { name: "Benefícios para novos vendedores",  shortName: "Benefícios", color: "#EDBBE8", textColor: "#4A0505" },
  { name: "Criadores de conteúdo/Afiliados",   shortName: "Criadores",  color: "#F1204A", textColor: "#ffffff" },
  { name: "Lives",                             shortName: "Lives",      color: "#033624", textColor: "#BAF6F0" },
];

const tabData: Record<string, SlideData[]> = {
  "Abrindo sua loja": [
    {
      tag: "Primeiro Passo",
      video: "https://www.tiktok.com/embed/v2/7502083427978595591",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7502083427978595591",
      title: "Abrir o TikTok Shop",
      description: "Os primeiros passos fundamentais para configurar seu cadastro e entender a plataforma.",
      dark: true, tiktok: true,
    },
    {
      tag: "Integração",
      video: "https://www.tiktok.com/embed/v2/7502198137864408328",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7502198137864408328",
      title: "Central de Aplicativos - ERPs/Hubs",
      description: "Conecte seu sistema de gestão para automatizar estoque e pedidos.",
      dark: false, tiktok: true,
    },
    {
      tag: "Catálogo",
      video: "https://www.tiktok.com/embed/v2/7503681930177678610",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7503681930177678610",
      title: "Publique Produtos",
      description: "Crie anúncios atraentes que seguem as diretrizes do TikTok Shop.",
      dark: true, tiktok: true,
    },
    {
      tag: "Perfil",
      video: "https://www.tiktok.com/embed/v2/7507025733382950150",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7507025733382950150",
      title: "Conecte o perfil do TikTok à Loja",
      description: "Vincule sua conta oficial para começar a vender diretamente nos seus vídeos e lives.",
      dark: false, tiktok: true,
    },
  ],
  "Operação para iniciantes": [
    {
      tag: "Fluxo",
      video: "https://www.tiktok.com/embed/v2/7507026443164044550",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7507026443164044550",
      title: "Envio de Pedidos",
      description: "Como processar as vendas e garantir que cheguem rápido ao cliente.",
      dark: true, tiktok: true,
    },
    {
      tag: "Legalização",
      video: "https://www.tiktok.com/embed/v2/7510041702322097413",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7510041702322097413",
      title: "MEI",
      description: "Tudo o que você precisa saber para operar legalmente como microempreendedor.",
      dark: false, tiktok: true,
    },
    {
      tag: "Setup",
      video: "https://www.tiktok.com/embed/v2/7510042312878198072",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7510042312878198072",
      title: "Configurações Básicas",
      description: "Checklist de configurações vitais para o sucesso da sua loja.",
      dark: true, tiktok: true,
    },
    {
      tag: "Financeiro",
      video: "https://www.tiktok.com/embed/v2/7525672837965679928",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7525672837965679928",
      title: "Liquidação e Pagamentos",
      description: "Prazos, taxas e como gerenciar o fluxo de caixa da sua loja.",
      dark: false, tiktok: true,
    },
    {
      tag: "Escala",
      video: "https://www.tiktok.com/embed/v2/7525675494965005573",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7525675494965005573",
      title: "Limites de pedidos",
      description: "Entenda como funcionam as travas iniciais e como aumentar seu volume.",
      dark: true, tiktok: true,
    },
    {
      tag: "Segurança",
      video: "https://www.tiktok.com/embed/v2/7525677475213446406",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7525677475213446406",
      title: "Autorização de Marcas e produtos falsos",
      description: "Como garantir a autenticidade dos produtos e evitar problemas de IP.",
      dark: false, tiktok: true,
    },
    {
      tag: "Transporte",
      video: "https://www.tiktok.com/embed/v2/7510044886742125829",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7510044886742125829",
      title: "Políticas de Logística",
      description: "Normas de envio, tempo de postagem e cuidados com o pacote.",
      dark: true, tiktok: true,
    },
    {
      tag: "Sucesso",
      video: "https://www.tiktok.com/embed/v2/7502037029195107602",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7502037029195107602",
      title: "Como vender no TikTok: 3 Pontos Chave",
      description: "Os pilares fundamentais para converter vídeos em faturamento real.",
      dark: false, tiktok: true,
    },
  ],
  "Benefícios para novos vendedores": [
    {
      tag: "Performance",
      video: "https://www.tiktok.com/embed/v2/7507024331042458885",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7507024331042458885",
      title: "Crescimento",
      description: "Dicas de como usar os dados a seu favor para acelerar sua jornada.",
      dark: true, tiktok: true,
    },
    {
      tag: "Vantagem",
      video: "https://www.tiktok.com/embed/v2/7507022765770231046",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7507022765770231046",
      title: "Frete Grátis",
      description: "Aproveite os subsídios de frete do TikTok para atrair clientes de todo o país.",
      dark: false, tiktok: true,
    },
    {
      tag: "Expansão",
      video: "https://www.tiktok.com/embed/v2/7502529811932400914",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7502529811932400914",
      title: "Escalar o negócio",
      description: "De 10 a 1000 pedidos: o que muda na sua operação ao escalar.",
      dark: true, tiktok: true,
    },
    {
      tag: "Tarefa",
      video: "https://www.tiktok.com/embed/v2/7553759058801577224",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7553759058801577224",
      title: "Tarefas e tarefas",
      description: "Complete os desafios do lojista iniciante para desbloquear cupons e ads grátis.",
      dark: false, tiktok: true,
    },
  ],
  "Criadores de conteúdo/Afiliados": [
    {
      tag: "Colaboração",
      video: "https://www.tiktok.com/embed/v2/7504825891302771973",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7504825891302771973",
      title: "Colabore com criadores",
      description: "Como usar o Affiliate Center para encontrar talentos que combinam com seu produto.",
      dark: true, tiktok: true,
    },
    {
      tag: "Amostras",
      video: "https://www.tiktok.com/embed/v2/7506172476494286136",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7506172476494286136",
      title: "Amostras Grátis",
      description: "Gestão estratégica de brindes para garantir vídeos de unboxing e review.",
      dark: false, tiktok: true,
    },
    {
      tag: "Modelos",
      video: "https://www.tiktok.com/embed/v2/7524246485081361670",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7524246485081361670",
      title: "Tipos",
      description: "Diferenças entre planos de comissão abertos, focados e planos de loja.",
      dark: true, tiktok: true,
    },
    {
      tag: "Parceria",
      video: "https://www.tiktok.com/embed/v2/7551496735319772427",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7551496735319772427",
      title: "Convites",
      description: "Como abordar criadores com convites que geram parcerias de longo prazo.",
      dark: false, tiktok: true,
    },
    {
      tag: "Talentos",
      video: "https://www.tiktok.com/embed/v2/7524253383537003832",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7524253383537003832",
      title: "Como escolher criadores",
      description: "Análise de métricas e nicho para garantir que seu produto chegue ao público certo.",
      dark: true, tiktok: true,
    },
    {
      tag: "Agências",
      video: "https://www.tiktok.com/embed/v2/7524258287731133701",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7524258287731133701",
      title: "Agências",
      description: "Quando vale a pena contratar uma MCN ou agência para gerenciar seus afiliados.",
      dark: false, tiktok: true,
    },
  ],
  "Lives": [
    {
      tag: "Interface",
      video: "https://www.tiktok.com/embed/v2/7517954448451177734",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7517954448451177734",
      title: "Visual da Live",
      description: "Como configurar os elementos visuais e a disposição da sua transmissão para atrair cliques.",
      dark: true, tiktok: true,
    },
    {
      tag: "Conteúdo",
      video: "https://www.tiktok.com/embed/v2/7519784141882166534",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7519784141882166534",
      title: "Roteiro",
      description: "Estrutura de fala e ganchos de retenção para manter o público engajado do início ao fim.",
      dark: false, tiktok: true,
    },
    {
      tag: "Performance",
      video: "https://www.tiktok.com/embed/v2/7520527979399646470",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7520527979399646470",
      title: "Dados da Live",
      description: "Como interpretar as métricas em tempo real para tomar decisões estratégicas durante a venda.",
      dark: true, tiktok: true,
    },
    {
      tag: "Conversão",
      video: "https://www.tiktok.com/embed/v2/7551806897725181202",
      link: "https://www.tiktok.com/@sellwithtiktokshop_br/video/7551806897725181202",
      title: "Oferta Relâmpago",
      description: "Técnicas de escassez e cupons exclusivos para converter visualizações em vendas imediatas.",
      dark: false, tiktok: true,
    },
  ],
};

export function SliderSection() {
  const [swiperInstances, setSwiperInstances] = useState<Record<string, any>>({});
  const [watched, setWatched] = useState<Record<string, Set<number>>>({});

  const setSwiperForTab = (tabName: string, swiper: any) => {
    setSwiperInstances(prev => ({ ...prev, [tabName]: swiper }));
  };

  const pauseAutoplay = (tabName: string) => {
    const sw = swiperInstances[tabName];
    if (sw?.autoplay) sw.autoplay.stop();
  };

  const toggleWatched = (tab: string, idx: number) => {
    setWatched(prev => {
      const set = new Set(prev[tab] || []);
      if (set.has(idx)) set.delete(idx); else set.add(idx);
      return { ...prev, [tab]: set };
    });
  };

  const getProgress = (tabName: string) => {
    const total = tabData[tabName]?.length || 0;
    const done = watched[tabName]?.size || 0;
    return { done, total, pct: total ? (done / total) * 100 : 0 };
  };

  const totalDone = TAB_CONFIG.reduce((a, tc) => a + (watched[tc.name]?.size || 0), 0);
  const totalVideos = TAB_CONFIG.reduce((a, tc) => a + (tabData[tc.name]?.length || 0), 0);
  const overallPct = totalVideos ? (totalDone / totalVideos) * 100 : 0;

  return (
    <section id="acceleration-sliders" className="py-24 bg-white overflow-hidden relative z-10 w-full">
      {/* Doodles decorativos */}
      <FloatingDoodle src="/assets_new/manequim.svg" size={100} top="3%"   left="-1%"   rotate={12}  opacity={0.07} delay={0}   />
      <FloatingDoodle src="/assets_new/5.svg"        size={60}  top="8%"   right="2%"   rotate={-20} opacity={0.08} delay={1.2} reverse />
      <FloatingDoodle src="/assets_new/bolsa.svg"    size={85}  top="32%"  right="-1%"  rotate={15}  opacity={0.07} delay={0.6} />
      <FloatingDoodle src="/assets_new/7.svg"        size={48}  top="55%"  left="1%"    rotate={-30} opacity={0.07} delay={1.8} reverse />
      <FloatingDoodle src="/assets_new/camera.svg"   size={78}  bottom="20%" left="-1%" rotate={20}  opacity={0.06} delay={0.3} />
      <FloatingDoodle src="/assets_new/8.svg"        size={44}  bottom="8%"  right="3%"  rotate={-10} opacity={0.08} delay={2.2} reverse />
      <FloatingDoodle src="/assets_new/10.svg"       size={55}  top="72%"  right="1%"   rotate={25}  opacity={0.06} delay={1.0} />

      <div className="w-full max-w-[430px] md:max-w-screen-2xl mx-auto md:px-20">

        {/* ── Progresso geral ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.12)} className="px-4 mb-10">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #033624 0%, #065c3d 100%)",
              boxShadow: "0 24px 64px rgba(3,54,36,0.20), 0 0 0 1px rgba(45,204,211,0.12)",
            }}
          >
            {/* Cabeçalho: título + anel de progresso */}
            <div className="flex items-start justify-between px-6 pt-6 pb-3">
              <div className="flex flex-col gap-1.5">
                <span
                  className="font-body text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#2DCCD3" }}
                >
                  Trilha de Aprendizado
                </span>
                <p className="font-display font-black leading-none" style={{ fontSize: "clamp(1.9rem,7vw,2.6rem)", color: "#BAF6F0" }}>
                  {totalDone}
                  <span className="font-body font-normal text-sm ml-2" style={{ color: "rgba(186,246,240,0.45)" }}>
                    /{totalVideos} vídeos
                  </span>
                </p>
              </div>

              {/* Anel SVG */}
              <div className="relative shrink-0 w-[60px] h-[60px] mt-1">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(186,246,240,0.1)" strokeWidth="5" />
                  <motion.circle
                    cx="32" cy="32" r="26" fill="none"
                    stroke="#2DCCD3" strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - overallPct / 100) }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-base leading-none tabular-nums" style={{ color: "#BAF6F0" }}>
                    {Math.round(overallPct)}
                  </span>
                  <span className="font-body text-[8px] font-medium" style={{ color: "rgba(186,246,240,0.45)" }}>%</span>
                </div>
              </div>
            </div>

            {/* Barra geral */}
            <div className="px-6 pb-5">
              <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(186,246,240,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #2DCCD3, #FBEB35)" }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="flex items-stretch gap-0.5 px-3 pb-5">
              {TAB_CONFIG.map((tc, i) => {
                const prog = getProgress(tc.name);
                const isComplete = prog.done > 0 && prog.done === prog.total;
                return (
                  <a
                    key={tc.name}
                    href={`#tab-${i}`}
                    className="flex-1 flex flex-col items-center gap-2 py-3 px-1 rounded-2xl group transition-all duration-300 hover:bg-white/5"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: isComplete ? tc.color : "rgba(186,246,240,0.07)",
                        color: isComplete ? tc.textColor : tc.color,
                        border: `1.5px solid ${isComplete ? tc.color : "rgba(186,246,240,0.18)"}`,
                        boxShadow: isComplete ? `0 0 18px ${tc.color}50` : "none",
                      }}
                    >
                      {isComplete ? "✓" : i + 1}
                    </div>
                    <p className="font-body text-[9px] font-medium text-center leading-tight" style={{ color: "rgba(186,246,240,0.5)" }}>
                      {tc.shortName}
                    </p>
                    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(186,246,240,0.08)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: tc.color }}
                        animate={{ width: `${prog.pct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Seções por aba ─────────────────────────────────────── */}
        <div className="flex flex-col gap-16">
          {TAB_CONFIG.map((tc, tabIdx) => {
            const slides = tabData[tc.name] || [];
            const prog = getProgress(tc.name);
            const isComplete = prog.done > 0 && prog.done === prog.total;

            return (
              <div key={tc.name} id={`tab-${tabIdx}`}>
                {/* Cabeçalho da seção */}
                <motion.div {...fadeUp(0)} className="flex items-center gap-3 px-4 mb-5">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-sm"
                    style={{ backgroundColor: tc.color, color: tc.textColor }}
                  >
                    {isComplete ? "✓" : tabIdx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black text-base leading-tight truncate" style={{ color: "#033624" }}>
                      {tc.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(3,54,36,0.10)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${prog.pct}%`,
                            backgroundColor: tc.color === "#FBEB35" || tc.color === "#EDBBE8" || tc.color === "#2DCCD3" ? "#033624" : tc.color,
                          }}
                        />
                      </div>
                      <span className="font-body text-[10px] font-bold shrink-0 tabular-nums" style={{ color: "#033624", opacity: 0.5 }}>
                        {prog.done}/{prog.total}
                      </span>
                    </div>
                  </div>
                  <div
                    className="shrink-0 px-3 py-1 rounded-full text-[10px] font-black"
                    style={{ backgroundColor: tc.color, color: tc.textColor }}
                  >
                    {slides.length} vídeos
                  </div>
                </motion.div>

                {/* Slider */}
                <motion.div {...fadeUp(0.06)} className="w-full px-4 relative md:px-0">
                  <div className="hidden md:block absolute -left-10 top-0 bottom-0 w-40 z-20 pointer-events-none bg-gradient-to-r from-white via-white/30 to-transparent" />
                  <div className="hidden md:block absolute -right-10 top-0 bottom-0 w-40 z-20 pointer-events-none bg-gradient-to-l from-white via-white/30 to-transparent" />

                  <button
                    onClick={() => swiperInstances[tc.name]?.slidePrev()}
                    aria-label="Card anterior"
                    className="absolute left-0 md:-left-12 top-[calc(50%-2.5rem)] md:top-[calc(50%-1.5rem)] -translate-y-1/2 z-30 w-9 md:w-14 h-9 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 hover:scale-110 border border-white/10 cursor-pointer"
                    style={{ backgroundColor: "rgba(3,54,36,0.98)", color: "#BAF6F0" }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={() => swiperInstances[tc.name]?.slideNext()}
                    aria-label="Próximo card"
                    className="absolute right-0 md:-right-12 top-[calc(50%-2.5rem)] md:top-[calc(50%-1.5rem)] -translate-y-1/2 z-30 w-9 md:w-14 h-9 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 hover:scale-110 border border-white/10 cursor-pointer"
                    style={{ backgroundColor: "rgba(3,54,36,0.98)", color: "#BAF6F0" }}
                  >
                    <ChevronRightNav size={24} />
                  </button>

                  <Swiper
                    onSwiper={(sw) => setSwiperForTab(tc.name, sw)}
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1.1}
                    breakpoints={{ 1024: { slidesPerView: 3.5, spaceBetween: 24 } }}
                    centeredSlides={false}
                    loop={false}
                    autoplay={{ delay: 10000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    className="mySwiper !pb-10 md:!px-10"
                  >
                    {slides.map((slide, vidIdx) => {
                      const isWatched = watched[tc.name]?.has(vidIdx) || false;
                      return (
                        <SwiperSlide key={`${tc.name}-${vidIdx}`} className="h-auto">
                          <div
                            className={`flex flex-col rounded-2xl p-6 transition-all duration-500 group md:bg-transparent md:p-0 ${slide.dark ? "bg-black text-white" : "bg-[#f4f5f5] text-black"}`}
                            onPointerDown={() => pauseAutoplay(tc.name)}
                          >
                            {/* Número do vídeo + tag */}
                            <div className="flex items-center gap-2 mb-3">
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                                style={{ backgroundColor: tc.color, color: tc.textColor }}
                              >
                                {vidIdx + 1}
                              </div>
                              <h4 className={`font-bold text-sm md:text-[#033624]/60 md:uppercase md:tracking-widest md:text-[10px] ${slide.dark ? "text-gray-300" : "text-gray-600"}`}>
                                {slide.tag}
                              </h4>
                            </div>

                            {/* Título */}
                            <h3 className="font-bold text-xl md:text-lg md:font-black leading-tight mb-2 md:text-[#033624]">
                              {slide.title}
                            </h3>

                            {/* Descrição — acima do vídeo */}
                            <p className={`text-sm leading-snug mb-4 md:text-[#033624]/70 md:leading-relaxed ${slide.dark ? "text-gray-300" : "text-gray-700"}`}>
                              {slide.description}
                            </p>

                            {/* Vídeo */}
                            <div className="relative w-full aspect-[9/16] mb-5 rounded-xl md:rounded-[24px] overflow-hidden shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:group-hover:-translate-y-2 transition-all duration-500 bg-gray-900">
                              {slide.tiktok ? (
                                <TikTokEmbed src={slide.video} />
                              ) : (
                                <video
                                  src={slide.video}
                                  className="w-full h-full object-cover"
                                  controls playsInline loop muted
                                  onPlay={() => pauseAutoplay(tc.name)}
                                />
                              )}
                            </div>

                            {/* Rodapé */}
                            <div className="flex items-center justify-between gap-3 pt-4">
                              <a
                                href={slide.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 rounded-full font-display font-black text-sm text-white cursor-pointer"
                                style={{ backgroundColor: "#F1204A", boxShadow: "0 4px 14px rgba(241,32,74,0.35)" }}
                                onClick={() => pauseAutoplay(tc.name)}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M5 3l14 9-14 9V3z" />
                                </svg>
                                Assistir agora
                              </a>

                              <button
                                onClick={(e) => { e.stopPropagation(); toggleWatched(tc.name, vidIdx); }}
                                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition-all duration-200 active:scale-95 shrink-0 cursor-pointer border ${
                                  isWatched
                                    ? ""
                                    : slide.dark
                                      ? "border-white/40 text-white hover:bg-white/10 md:border-[#033624]/30 md:text-[#033624] md:hover:bg-[#033624]/5"
                                      : "border-[#033624]/25 text-[#033624] hover:bg-[#033624]/5"
                                }`}
                                style={
                                  isWatched
                                    ? { backgroundColor: "#033624", color: "#BAF6F0", borderColor: "#033624" }
                                    : {}
                                }
                              >
                                {isWatched ? "✓ Assistido" : "Marcar"}
                              </button>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Permite overflow vertical nos slides sem quebrar o slider horizontal */
        .mySwiper.swiper { overflow-x: clip !important; overflow-y: visible !important; }
        .mySwiper .swiper-wrapper { overflow: visible; }
      `}} />
    </section>
  );
}

function TikTokEmbed({ src }: { src: string }) {
  const [activated, setActivated] = useState(false);
  const startX = useRef(0);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group/video">
      <iframe
        key={activated ? "active" : "inactive"}
        src={src}
        className={`border-0 absolute inset-0 w-full h-full transition-opacity duration-700 ${activated ? "opacity-100" : "opacity-80 md:opacity-90"}`}
        style={{ width: "calc(100% + 18px)", height: "100%", left: 0, top: 0 }}
        allow={activated ? "autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen; web-share" : "clipboard-write; encrypted-media; picture-in-picture"}
        allowFullScreen
      />
      {!activated && (
        <div
          className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/10"
          onPointerDown={(e) => { startX.current = e.clientX; }}
          onPointerUp={(e) => {
            if (Math.abs(e.clientX - startX.current) < 8) setActivated(true);
          }}
        >
          <div className="flex w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center scale-90 group-hover/video:scale-100 transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#033624" className="ml-1">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
