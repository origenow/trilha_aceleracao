"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Headphones,
  Zap,
  Tag,
  Gem,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  accent: string;
  accentRgb: string;
  phase: string;
  featured: boolean;
};

const BENEFICIOS: Benefit[] = [
  {
    Icon: Trophy,
    title: "Até R$ 2.400 em cupons",
    desc: "de plataforma nas primeiras fases",
    detail: "Complete as tarefas da Fase 1 em apenas 5 dias e desbloqueie cupons de plataforma para reinvestir no crescimento da sua loja.",
    accent: "#2DCCD3",
    accentRgb: "45,204,211",
    phase: "Fase 1",
    featured: false,
  },
  {
    Icon: Headphones,
    title: "Sessões de suporte",
    desc: "com especialistas TikTok Shop",
    detail: "Acesso a especialistas da plataforma para tirar dúvidas, ajustar sua estratégia e acelerar resultados reais no seu negócio.",
    accent: "#033624",
    accentRgb: "3,54,36",
    phase: "Fase 1–2",
    featured: false,
  },
  {
    Icon: Zap,
    title: "Incentivo de tráfego",
    desc: "para seus produtos em destaque",
    detail: "Tráfego impulsionado pela plataforma direcionado aos seus produtos mais estratégicos — sem custo adicional para você.",
    accent: "#F1204A",
    accentRgb: "241,32,74",
    phase: "Fase 2",
    featured: false,
  },
  {
    Icon: Tag,
    title: "Cupons até 30% off",
    desc: "para atrair mais compradores",
    detail: "Distribua cupons de desconto para aumentar a conversão, fidelizar compradores e escalar o volume de pedidos consistentemente.",
    accent: "#4A0505",
    accentRgb: "74,5,5",
    phase: "Fase 3",
    featured: false,
  },
  {
    Icon: Gem,
    title: "Matching com Top Criadores",
    desc: "e Ads Credits para escalar",
    detail: "Conecte-se automaticamente com os maiores criadores de conteúdo do TikTok e receba créditos de anúncios para escalar ao próximo nível.",
    accent: "#F1204A",
    accentRgb: "241,32,74",
    phase: "Fase 4 · Diamante",
    featured: true,
  },
];

const HERO_STATS = [
  { val: "R$ 9.800", label: "em benefícios totais", accent: "#F1204A" },
  { val: "8", label: "regiões participantes", accent: "#033624" },
  { val: "0%", label: "comissão por 60 dias", accent: "#2DCCD3" },
];

const heroLine = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

function BenefitsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + BENEFICIOS.length) % BENEFICIOS.length);
  };

  const goTo = (idx: number) => {
    setDirection(idx >= current ? 1 : -1);
    setCurrent(idx);
  };

  const b = BENEFICIOS[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  const navBtn: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(3,54,36,0.06)",
    border: "1px solid rgba(3,54,36,0.10)",
    color: "rgba(3,54,36,0.55)",
    cursor: "pointer",
    transition: "all 0.2s",
    flexShrink: 0,
  };

  return (
    <div id="beneficios">
      {/* Section label — aligned with content padding */}
      <div className="px-6 md:px-20 mb-6 md:mb-8">
        <p
          className="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-center md:text-left"
          style={{ color: "rgba(3,54,36,0.45)" }}
        >
          O que você ganha entrando na Trilha
        </p>
      </div>

      {/* Slide wrapper — padded + rounded on mobile, full-width on desktop */}
      <div
        className="relative overflow-hidden mx-6 rounded-3xl md:mx-0 md:rounded-none min-h-[280px] md:min-h-[420px]"
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-5"
            style={{
              background: b.featured
                ? "linear-gradient(135deg, rgba(241,32,74,0.92) 0%, rgba(192,16,56,0.97) 100%)"
                : "rgba(255,255,255,0.72)",
              borderTop: `3px solid ${b.featured ? "rgba(255,255,255,0.20)" : `rgba(${b.accentRgb},0.35)`}`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: b.featured
                ? "0 12px 48px rgba(241,32,74,0.28)"
                : "0 8px 40px rgba(3,54,36,0.10)",
            }}
          >
            {/* ── Text side (3/5 on desktop) ── */}
            <div className="md:col-span-3 flex flex-col justify-center p-8 md:pl-20 md:pr-12 md:py-14">
              <span
                className="inline-flex w-fit mb-5 px-4 py-1.5 rounded-full font-body font-semibold text-xs uppercase tracking-widest"
                style={{
                  background: b.featured ? "rgba(255,255,255,0.18)" : `rgba(${b.accentRgb},0.12)`,
                  border: b.featured ? "1px solid rgba(255,255,255,0.25)" : `1px solid rgba(${b.accentRgb},0.25)`,
                  color: b.featured ? "rgba(255,255,255,0.90)" : b.accent,
                }}
              >
                {b.phase}
              </span>

              <h3
                className="font-display font-black leading-tight"
                style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                  color: b.featured ? "#ffffff" : "#033624",
                }}
              >
                {b.title}
              </h3>

              <p
                className="font-body mt-1.5 text-sm md:text-base"
                style={{
                  color: b.featured ? "rgba(255,255,255,0.58)" : "rgba(74,5,5,0.48)",
                  fontStyle: "italic",
                }}
              >
                {b.desc}
              </p>

              <p
                className="font-body mt-4 text-sm md:text-base leading-relaxed"
                style={{
                  color: b.featured ? "rgba(255,255,255,0.80)" : "rgba(74,5,5,0.68)",
                  maxWidth: 460,
                }}
              >
                {b.detail}
              </p>

              {b.featured && (
                <motion.a
                  href="https://seller-br.tiktok.com/account/register?channel=BrunaSeller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-fit inline-flex items-center gap-2 font-display font-black text-sm px-7 py-3.5 rounded-full"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#F1204A",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(0,0,0,0.22)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Começar agora <ArrowRight size={15} />
                </motion.a>
              )}
            </div>

            {/* ── Visual side (2/5 on desktop) ── */}
            <div
              className="hidden md:flex md:col-span-2 items-center justify-center"
              style={{
                background: b.featured
                  ? "rgba(0,0,0,0.08)"
                  : `rgba(${b.accentRgb},0.06)`,
                borderLeft: b.featured
                  ? "1px solid rgba(255,255,255,0.12)"
                  : `1px solid rgba(${b.accentRgb},0.12)`,
              }}
            >
              <div className="flex flex-col items-center gap-5">
                <motion.div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 160,
                    height: 160,
                    background: b.featured
                      ? "rgba(255,255,255,0.14)"
                      : `rgba(${b.accentRgb},0.10)`,
                    border: b.featured
                      ? "1px solid rgba(255,255,255,0.28)"
                      : `1px solid rgba(${b.accentRgb},0.22)`,
                    boxShadow: `0 0 72px rgba(${b.accentRgb},0.20)`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <b.Icon
                    size={62}
                    style={{
                      color: b.featured ? "rgba(255,255,255,0.92)" : b.accent,
                      strokeWidth: 1.5,
                    }}
                  />
                </motion.div>

                <p
                  className="font-body font-semibold text-[10px] tracking-[0.22em] uppercase"
                  style={{
                    color: b.featured ? "rgba(255,255,255,0.38)" : `rgba(${b.accentRgb},0.50)`,
                  }}
                >
                  {b.phase}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row — aligned with content padding */}
      <div className="flex items-center justify-between mt-5 px-6 md:px-20">
        <button
          onClick={() => go(-1)}
          style={navBtn}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(241,32,74,0.10)";
            el.style.borderColor = "rgba(241,32,74,0.25)";
            el.style.color = "#F1204A";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(3,54,36,0.06)";
            el.style.borderColor = "rgba(3,54,36,0.10)";
            el.style.color = "rgba(3,54,36,0.55)";
          }}
          aria-label="Benefício anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {BENEFICIOS.map((benefit, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ver ${benefit.title}`}
              style={{
                height: 8,
                width: i === current ? 28 : 8,
                borderRadius: 999,
                backgroundColor:
                  i === current
                    ? b.featured ? "#F1204A" : b.accent
                    : "rgba(3,54,36,0.18)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "none",
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          style={navBtn}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(241,32,74,0.10)";
            el.style.borderColor = "rgba(241,32,74,0.25)";
            el.style.color = "#F1204A";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(3,54,36,0.06)";
            el.style.borderColor = "rgba(3,54,36,0.10)";
            el.style.color = "rgba(3,54,36,0.55)";
          }}
          aria-label="Próximo benefício"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function PoloModaSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#EDBBE8" }}>

      {/* Noise grain */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(3,54,36,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Depth glows */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 28% 38%, rgba(241,32,74,0.07) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 40% at 80% 18%, rgba(45,204,211,0.06) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 50% at 10% 82%, rgba(3,54,36,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block"
        style={{ top: "3%", right: "1%", width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(3,54,36,0.10)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block"
        style={{ top: "8%", right: "6%", width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(3,54,36,0.07)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing dots */}
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block w-1.5 h-1.5 rounded-full"
        style={{ top: "20%", left: "5%", backgroundColor: "rgba(241,32,74,0.55)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block w-1.5 h-1.5 rounded-full"
        style={{ top: "55%", left: "2%", backgroundColor: "rgba(45,204,211,0.65)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute pointer-events-none z-0 hidden md:block w-1.5 h-1.5 rounded-full"
        style={{ top: "30%", right: "18%", backgroundColor: "rgba(3,54,36,0.45)" }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* ── ① HERO — padded, centered ── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-20 pt-12 md:pt-16 pb-0 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          className="inline-flex mb-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body font-semibold text-xs uppercase tracking-widest"
            style={{
              background: "rgba(241,32,74,0.10)",
              border: "1px solid rgba(241,32,74,0.25)",
              color: "#F1204A",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#F1204A" }} />
            Exclusivo para Polos de Moda
          </span>
        </motion.div>

        {/* Headline */}
        <h2
          className="font-display font-black leading-[1.1] md:leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 8vw, 3.8rem)" }}
        >
          <motion.span className="block" style={{ color: "#033624" }} {...heroLine(0.18)}>
            Venda moda{" "}
            <span style={{ color: "#F1204A" }}>no TikTok Shop</span>
          </motion.span>
          <motion.span className="block mt-1.5" style={{ color: "#033624" }} {...heroLine(0.28)}>
            e desbloqueie
          </motion.span>

          {/* Animated highlight reveal */}
          <motion.span className="block mt-4 md:mt-2" {...heroLine(0.36)}>
            <span className="relative inline-block">
              <motion.span
                className="absolute inset-0 rounded-xl md:rounded-lg"
                style={{
                  backgroundColor: "#F1204A",
                  boxShadow: "0 6px 28px rgba(241,32,74,0.35)",
                  transformOrigin: "left center",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10 inline-block px-4 py-2 md:px-3 md:py-1 text-white">
                benefícios exclusivos
              </span>
            </span>
          </motion.span>
        </h2>

        {/* Subtitle */}
        <motion.p
          className="font-body mt-5 text-sm md:text-base leading-relaxed"
          style={{ color: "#4A0505", opacity: 0.68, maxWidth: "480px" }}
          {...heroLine(0.46)}
        >
          Se sua loja está cadastrada com o CEP de um Polo de Moda,
          você já faz parte automaticamente.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap items-center justify-center gap-4 mt-6" {...heroLine(0.52)}>
          <motion.a
            href="https://seller-br.tiktok.com/account/register?channel=BrunaSeller"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 font-display font-black text-white text-sm md:text-base px-8 py-4 rounded-full cursor-pointer"
            style={{
              backgroundColor: "#F1204A",
              boxShadow: "0 8px 28px rgba(241,32,74,0.35)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 16px 44px rgba(241,32,74,0.50)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 20 }}
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              style={{ skewX: -12 }}
              initial={{ x: "-110%" }}
              whileHover={{ x: "110%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <span className="relative flex items-center gap-2">
              Abrir conta agora <ArrowRight size={17} />
            </span>
          </motion.a>

          <a
            href="#beneficios"
            className="group inline-flex items-center gap-1.5 font-body text-sm font-medium relative pb-0.5 cursor-pointer"
            style={{ color: "rgba(3,54,36,0.55)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(3,54,36,1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(3,54,36,0.55)"; }}
          >
            Ver benefícios ↓
            <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "rgba(3,54,36,0.40)" }} />
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          className="flex items-center gap-2 font-body text-xs mt-4"
          style={{ color: "rgba(74,5,5,0.55)" }}
          {...heroLine(0.58)}
        >
          <span style={{ color: "#2DCCD3" }}>✓</span>
          Vendedores de Birigui, Brás, Franca, Goiânia e mais 4 regiões já participam
        </motion.p>

        {/* Trust bar */}
        <motion.div
          className="hidden md:flex items-stretch justify-center mt-8 pt-6 pb-0"
          style={{ borderTop: "1px solid rgba(3,54,36,0.12)", width: "100%", maxWidth: 560 }}
          {...heroLine(0.64)}
        >
          {HERO_STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                paddingRight: i < HERO_STATS.length - 1 ? "2.5rem" : 0,
                paddingLeft: i > 0 ? "2.5rem" : 0,
                borderRight: i < HERO_STATS.length - 1 ? "1px solid rgba(3,54,36,0.12)" : "none",
              }}
            >
              <p className="font-display font-black leading-none" style={{ fontSize: "1.9rem", color: s.accent }}>
                {s.val}
              </p>
              <p className="font-body text-xs mt-1" style={{ color: "rgba(74,5,5,0.55)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── ② CAROUSEL — full width on desktop ── */}
      <motion.div
        className="relative z-10 w-full mt-12 md:mt-14"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <BenefitsCarousel />
      </motion.div>

      {/* ── ③ CONVERSION CARD ── */}
      <div className="relative z-10 w-full max-w-[430px] md:max-w-screen-xl mx-auto px-6 md:px-20 pt-8 md:pt-10 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.60)",
              border: "1px solid rgba(3,54,36,0.10)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 8px 40px rgba(3,54,36,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(241,32,74,0.35) 50%, transparent 100%)" }}
            />

            <div className="p-6 md:p-10 md:grid md:grid-cols-2 md:gap-10 md:items-center">
              <div>
                <h3 className="font-display font-black text-lg md:text-2xl mb-2" style={{ color: "#033624" }}>
                  Abrir conta no TikTok Shop
                </h3>
                <p className="font-body text-xs md:text-sm" style={{ color: "#4A0505", opacity: 0.58 }}>
                  Escolha o link da sua região para criar sua conta. Já tem conta? Confirme se seu CEP é de um Polo participante.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-5 md:mt-0">
                {[
                  {
                    href: "https://seller-br.tiktok.com/account/register?channel=BrunaSeller",
                    regioes: "Brás · Franca · Birigui · Goiânia",
                    ref: "via Bruna Seller",
                  },
                  {
                    href: "https://seller-br.tiktok.com/account/register?channel=AnaCastro",
                    regioes: "N. Friburgo · Nova Serrana · Mar de Espanha",
                    ref: "via Ana Castro",
                  },
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-5 py-4 rounded-2xl transition-colors duration-200 cursor-pointer"
                    style={{
                      background: "rgba(3,54,36,0.05)",
                      border: "1px solid rgba(3,54,36,0.10)",
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(3,54,36,0.09)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(3,54,36,0.05)"; }}
                  >
                    <div>
                      <p className="font-display font-black text-sm" style={{ color: "#033624" }}>
                        {link.regioes}
                      </p>
                      <p className="font-body text-xs mt-0.5" style={{ color: "#4A0505", opacity: 0.50 }}>
                        {link.ref}
                      </p>
                    </div>
                    <span
                      className="font-display font-black text-white text-xs px-5 py-2.5 rounded-full shrink-0 ml-3 group-hover:scale-105 transition-transform duration-200"
                      style={{ backgroundColor: "#F1204A", boxShadow: "0 4px 14px rgba(241,32,74,0.30)" }}
                    >
                      Abrir →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
