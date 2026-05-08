"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Megaphone, Settings, Heart, Baby, ShieldAlert, RotateCcw, BarChart2, Zap, Gem, X, GraduationCap, Banknote, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FloatingDoodle = ({
  src, size = 40, top, left, right, bottom, delay = 0, rotate = 0, opacity = 0.18, reverse = false,
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

type MaterialItem = {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  accent: string;
  accentText: string;
  badge?: string;
  category: string;
};

const ITEMS: MaterialItem[] = [
  {
    id: "pagamentos",
    icon: BarChart2,
    label: "Política de Pagamentos",
    description: "Entenda os ciclos, prazos e regras de repasse",
    href: "https://seller-br.tiktok.com/university/essay?knowledge_id=1442971112769281&role=1&course_type=1&from=search%7BcontentIdParams%7D&identity=1",
    accent: "#2DCCD3",
    accentText: "#111111",
    category: "📚 Leitura essencial",
  },
  {
    id: "campanhas",
    icon: Megaphone,
    label: "Campanhas",
    description: "Como participar e maximizar sua exposição nas campanhas",
    href: "https://seller-br.tiktok.com/university/home?default_language=pt-BR&identity=1&content_id=3545348371269138&role=seller&keyword=saude&menu=feature",
    accent: "#F1204A",
    accentText: "#ffffff",
    category: "📚 Leitura essencial",
  },
  {
    id: "promocoes",
    icon: Settings,
    label: "Configurar Promoções",
    description: "Passo a passo para criar ofertas e cupons na plataforma",
    href: "https://seller-br.tiktok.com/university/home?default_language=pt-BR&identity=1&content_id=354534837339905&role=seller&keyword=saude&menu=feature",
    accent: "#FBEB35",
    accentText: "#111111",
    category: "📚 Leitura essencial",
  },
  {
    id: "gmvmax",
    icon: Zap,
    label: "Saiba mais sobre GMV MAX",
    description: "Como ativar e escalar com o GMV Max para maximizar suas vendas",
    href: "https://bytedance.sg.larkoffice.com/docx/T5V0dGfTiooFZ3xyTtSlPkFvghe",

    accent: "#FBEB35",
    accentText: "#111111",
    category: "📚 Leitura essencial",
  },
  {
    id: "lingerie",
    icon: Heart,
    label: "Boas Práticas de Lingerie",
    description: "Políticas e recomendações para venda nesta categoria",
    href: "https://bytedance.sg.larkoffice.com/docx/GjUddLtZZojXHRxjoAVllfTDgXe",

    accent: "#EDBBE8",
    accentText: "#4A0505",
    category: "📚 Leitura essencial",
  },
  {
    id: "semi-joias",
    icon: Gem,
    label: "Categoria de Semijoias",
    description: "Requisitos e boas práticas para vender joias e semijoias",
    href: "https://bytedance.sg.larkoffice.com/docx/N7KiddZJzopzFIxu6wVlxFMJgxb",
    accent: "#2DCCD3",
    accentText: "#111111",
    category: "🏷️ Categoria especial",
  },
  {
    id: "bebe",
    icon: Baby,
    label: "Bebê & Maternidade",
    description: "Categoria exclusiva para Polos de Moda credenciados",
    href: "https://bytedance.larkoffice.com/wiki/BhySwukIqix8RXk9eticMdvrnkd",
    accent: "#EDBBE8",
    accentText: "#4A0505",
    category: "🏷️ Categoria especial",
  },
  {
    id: "saude",
    icon: ShieldAlert,
    label: "Saúde da Conta",
    description: "Violações, impactos e como manter sua conta em dia",
    href: "https://seller-br.tiktok.com/university/essay?knowledge_id=1444948508641040&role=1&course_type=1&from=search%7BcontentIdParams%7D&identity=1",
    accent: "#F1204A",
    accentText: "#ffffff",
    category: "🎬 Treinamento gravado",
  },
  {
    id: "devolucoes",
    icon: RotateCcw,
    label: "Reembolsos e Devoluções",
    description: "Fluxo completo de gestão de devoluções e reembolsos",
    href: "https://seller-br.tiktok.com/university/essay?knowledge_id=894339073115921&default_language=pt-BR&identity=1",
    accent: "#111111",
    accentText: "#BAF6F0",
    category: "🎬 Treinamento gravado",
  },
  {
    id: "financeiro",
    icon: BarChart2,
    label: "Relatório Financeiro",
    description: "Como interpretar seus dados financeiros e crescimento",
    href: "https://seller-br.tiktok.com/university/essay?identity=1&role=1&knowledge_id=2494371300607761&from=course",
    accent: "#FBEB35",
    accentText: "#111111",
    category: "🎬 Treinamento gravado",
  },
];

const ACCOUNT_LINKS = [
  {
    regions: "Brás, Franca, Birigui, Goiânia",
    href: "https://seller-br.tiktok.com/account/register?channel=BrunaSeller",
    label: "BrunaSeller",
  },
  {
    regions: "Brás, Nova Friburgo, Nova Serrana e Mar de Espanha",
    href: "https://seller-br.tiktok.com/account/register?channel=AnaCastro",
    label: "AnaCastro",
  },
];

function GateQuestion({ onNo, onYes }: { onNo: () => void; onYes: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="gate-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ backgroundColor: "rgba(1,26,18,0.82)", backdropFilter: "blur(10px)" }}
      >
        <motion.div
          key="gate-card"
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 50 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          className="relative w-full sm:max-w-[360px] rounded-t-[40px] sm:rounded-[40px] overflow-hidden"
          style={{ boxShadow: "0 40px 90px rgba(1,26,18,0.55)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header dark */}
          <div
            className="relative px-8 pt-6 pb-10 overflow-hidden"
            style={{ background: "linear-gradient(150deg, #033624 0%, #011a12 100%)" }}
          >
            {/* Handle mobile */}
            <div className="flex justify-center mb-5 sm:hidden">
              <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(186,246,240,0.2)" }} />
            </div>

            {/* Pílula sticker */}
            <div className="mb-5 inline-block" style={{ transform: "rotate(-4deg)" }}>
              <span
                className="font-body text-xs font-semibold px-3 py-1.5 rounded-full inline-block"
                style={{ backgroundColor: "#2DCCD3", color: "#033624" }}
              >
                🛍️ TikTok Shop
              </span>
            </div>

            <h2
              className="font-display font-black leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 9vw, 2.6rem)", color: "#FFFFFF" }}
            >
              Você já vende<br />
              no <span style={{ color: "#F1204A" }}>TikTok</span>?
            </h2>

            {/* Doodle estrela */}
            <svg className="absolute top-5 right-8 animate-float pointer-events-none" width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
              <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 3.97 2.09-6.26L3 8.26h6.91z" fill="#FBEB35" />
            </svg>

            {/* Doodle flor */}
            <svg className="absolute bottom-4 right-6 animate-float-reverse pointer-events-none" width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.28, animationDelay: "0.9s" }}>
              <circle cx="16" cy="16" r="4" fill="#2DCCD3" />
              <ellipse cx="16" cy="6" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="16" cy="26" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" transform="rotate(180 16 16)" />
              <ellipse cx="6" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="26" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
            </svg>

            {/* Pílula glow decorativa */}
            <div
              className="absolute bottom-5 left-8 font-body text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: "#FBEB35", color: "#033624", transform: "rotate(5deg)" }}
            >
              Moda ✦
            </div>
          </div>

          {/* Botões */}
          <div className="bg-white px-8 py-6 flex flex-col gap-3">
            <button
              onClick={onYes}
              className="cursor-pointer w-full py-4 rounded-full font-display font-black text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#033624", color: "#FFFFFF", boxShadow: "0 6px 20px rgba(3,54,36,0.28)" }}
            >
              Sim, já vendo! ✅
            </button>
            <button
              onClick={onNo}
              className="cursor-pointer w-full py-4 rounded-full font-display font-black text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#F1204A", color: "#FFFFFF", boxShadow: "0 6px 20px rgba(241,32,74,0.3)" }}
            >
              Não, quero começar 🚀
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const STEPPER = [
  {
    id: "politicas",
    dot: "#FBEB35",
    label: "Políticas",
    sub: "da Plataforma",
    pill: "📋 Passo 1 de 3",
    pillBg: "#FBEB35",
  },
  {
    id: "contas",
    dot: "#EDBBE8",
    label: "Abertura de",
    sub: "Novas Contas",
    pill: "🏪 Passo 2 de 3",
    pillBg: "#EDBBE8",
  },
  {
    id: "academy",
    dot: "#2DCCD3",
    label: "Seller",
    sub: "Academy",
    pill: "🎓 Passo 3 de 3",
    pillBg: "#2DCCD3",
  },
];

function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const isLast = step === STEPPER.length - 1;
  const current = STEPPER[step];

  const goNext = () => { setDir(1); setStep((s) => Math.min(s + 1, STEPPER.length - 1)); };
  const goBack = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)); };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ backgroundColor: "rgba(1,26,18,0.82)", backdropFilter: "blur(10px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 64, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 64, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full sm:max-w-[540px] rounded-t-[40px] sm:rounded-[40px] overflow-hidden flex flex-col"
          style={{ boxShadow: "0 40px 100px rgba(1,26,18,0.55)" }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ══ HEADER VERDE ══ */}
          <div
            className="relative px-6 pt-5 pb-12 overflow-hidden flex-shrink-0"
            style={{ background: "linear-gradient(150deg, #033624 0%, #011a12 100%)" }}
          >
            {/* Handle mobile */}
            <div className="flex justify-center mb-3 sm:hidden">
              <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(186,246,240,0.2)" }} />
            </div>

            {/* Progress dots + close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                {STEPPER.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-400"
                    style={{
                      height: 7,
                      width: i === step ? 22 : 7,
                      backgroundColor: i <= step ? s.dot : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(186,246,240,0.12)", border: "1px solid rgba(186,246,240,0.16)" }}
              >
                <X size={14} style={{ color: "#BAF6F0" }} />
              </button>
            </div>

            {/* Pill sticker animada */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`pill-${step}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18 }}
                className="mb-3 inline-block"
                style={{ transform: "rotate(-3deg)" }}
              >
                <span
                  className="font-body text-[11px] font-semibold px-3 py-1 rounded-full inline-block"
                  style={{ backgroundColor: current.pillBg, color: "#033624" }}
                >
                  {current.pill}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Título animado */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${step}`}
                initial={{ opacity: 0, x: dir * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -20 }}
                transition={{ duration: 0.2 }}
                className="font-display font-black leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)", color: "#FFFFFF" }}
              >
                {current.label}{" "}
                <span style={{ color: "#F1204A" }}>{current.sub}</span>
              </motion.h2>
            </AnimatePresence>

            {/* Doodles */}
            <svg className="absolute top-4 right-16 animate-float pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.45 }}>
              <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 3.97 2.09-6.26L3 8.26h6.91z" fill="#FBEB35" />
            </svg>
            <svg className="absolute bottom-5 right-6 animate-float-reverse pointer-events-none" width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.24, animationDelay: "1s" }}>
              <circle cx="16" cy="16" r="4" fill="#2DCCD3" />
              <ellipse cx="16" cy="6" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="16" cy="26" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" transform="rotate(180 16 16)" />
              <ellipse cx="6" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="26" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
            </svg>
            <svg className="absolute top-14 right-5 animate-float pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.28, animationDelay: "0.6s" }}>
              <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#EDBBE8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M17 8l2 4-4 1" stroke="#EDBBE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* ══ WAVE ══ */}
          <div style={{ marginTop: "-1px", flexShrink: 0, lineHeight: 0, backgroundColor: "#FFFFFF" }}>
            <svg viewBox="0 0 540 28" preserveAspectRatio="none" style={{ width: "100%", height: "28px", display: "block" }}>
              <path d="M0,28 C90,2 180,28 270,14 C360,0 450,28 540,14 L540,0 L0,0 Z" fill="#011a12" />
            </svg>
          </div>

          {/* ══ CORPO branco — conteúdo do passo ══ */}
          <div className="bg-white flex-shrink-0 overflow-hidden" style={{ height: "260px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="px-6 py-4 h-full overflow-hidden flex flex-col gap-3"
              >

                {/* Step 0 — Políticas */}
                {step === 0 && (
                  <div className="flex flex-col gap-2.5 h-full">

                    {/* Cards numéricos — ícone grande ao lado do número */}
                    <div className="grid grid-cols-2 gap-2.5 flex-shrink-0">
                      {/* Comissão — blaze red */}
                      <div
                        className="rounded-2xl p-3.5 flex flex-col gap-2"
                        style={{ backgroundColor: "#FFF0F1", border: "1.5px solid rgba(241,32,74,0.18)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "#F1204A", boxShadow: "0 4px 12px rgba(241,32,74,0.3)" }}
                          >
                            <Banknote size={22} style={{ color: "#FFFFFF" }} strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col leading-none">
                            <span
                              className="font-display font-black"
                              style={{ fontSize: "2rem", color: "#F1204A", lineHeight: 1 }}
                            >
                              6%
                            </span>
                            <span className="font-display font-black text-xs leading-tight mt-0.5" style={{ color: "#4A0505" }}>
                              + R$4 / item
                            </span>
                          </div>
                        </div>
                        <span className="font-body text-[10px]" style={{ color: "#4A0505", opacity: 0.5 }}>
                          Comissão TikTok
                        </span>
                      </div>

                      {/* Frete — glint cyan */}
                      <div
                        className="rounded-2xl p-3.5 flex flex-col gap-2"
                        style={{ backgroundColor: "#E8FAFA", border: "1.5px solid rgba(45,204,211,0.28)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "#2DCCD3", boxShadow: "0 4px 12px rgba(45,204,211,0.3)" }}
                          >
                            <Truck size={22} style={{ color: "#033624" }} strokeWidth={1.8} />
                          </div>
                          <div className="flex flex-col leading-none">
                            <span
                              className="font-display font-black"
                              style={{ fontSize: "2rem", color: "#2DCCD3", lineHeight: 1 }}
                            >
                              6%
                            </span>
                            <span className="font-display font-black text-xs leading-tight mt-0.5" style={{ color: "#033624" }}>
                              do frete
                            </span>
                          </div>
                        </div>
                        <span className="font-body text-[10px]" style={{ color: "#033624", opacity: 0.5 }}>
                          Frete TikTok
                        </span>
                      </div>
                    </div>

                    {/* Isenção */}
                    <div
                      className="rounded-2xl px-4 py-3 flex flex-col gap-2 flex-shrink-0"
                      style={{ backgroundColor: "rgba(251,235,53,0.16)", border: "1.5px solid rgba(251,235,53,0.55)" }}
                    >
                      <span
                        className="self-start font-body text-[11px] font-bold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: "#033624", color: "#FBEB35", letterSpacing: "0.01em" }}
                      >
                        Menu lateral → Crescimento → Missões
                      </span>
                      <div className="flex items-start gap-2">
                        <span className="text-sm flex-shrink-0">💡</span>
                        <div>
                          <p className="font-display font-black text-[13px]" style={{ color: "#033624" }}>
                            Isenção de comissão por 90 dias
                          </p>
                          <p className="font-body text-[11px] leading-snug mt-0.5" style={{ color: "#033624", opacity: 0.65 }}>
                            Habilite a missão no Seller Center para participar
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Step 1 — Abertura de contas */}
                {step === 1 && (
                  <div className="flex flex-col gap-2.5">
                    <p className="font-body text-[12px] leading-relaxed" style={{ color: "#033624", opacity: 0.65 }}>
                      Crie sua conta pelo link da sua região para garantir os benefícios exclusivos.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {ACCOUNT_LINKS.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col justify-between gap-3 p-3.5 rounded-2xl"
                          style={{ backgroundColor: "#FAFAFA", border: "1.5px solid rgba(3,54,36,0.09)" }}
                        >
                          <p className="font-body text-[11px] font-semibold leading-snug" style={{ color: "#033624" }}>{item.regions}</p>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer inline-flex items-center justify-center gap-1 py-2 px-3 rounded-full font-body text-[10px] font-semibold transition-all duration-200 hover:scale-[1.04]"
                            style={{ backgroundColor: "#F1204A", color: "#FFFFFF", boxShadow: "0 3px 10px rgba(241,32,74,0.3)" }}
                          >
                            Abrir conta <ExternalLink size={10} />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Seller Academy */}
                {step === 2 && (
                  <div className="flex flex-col gap-3">
                    <p className="font-body text-[12px] leading-relaxed" style={{ color: "#033624", opacity: 0.7 }}>
                      Acesse o treinamento oficial do TikTok Shop. Lá você aprende como manter sua conta saudável e aproveitar todos os benefícios.
                    </p>
                    <a
                      href="https://seller-br.tiktok.com/university/home?default_language=pt-BR&identity=1&content_id=3875145967404801&role=seller"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(120deg,#BAF6F0,#dffaf8)", border: "1.5px solid rgba(45,204,211,0.32)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#2DCCD3", boxShadow: "0 4px 14px rgba(45,204,211,0.4)" }}
                      >
                        <GraduationCap size={22} style={{ color: "#033624" }} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-black text-base leading-tight" style={{ color: "#033624" }}>
                          Saiba tudo sobre TikTok Shop
                        </p>
                        <p className="font-body text-xs mt-1" style={{ color: "#033624", opacity: 0.55 }}>
                          Seller Academy · TikTok University
                        </p>
                      </div>
                      <ExternalLink size={16} style={{ color: "#2DCCD3" }} className="flex-shrink-0" />
                    </a>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══ FOOTER NAVEGAÇÃO ══ */}
          <div
            className="bg-white px-6 py-4 flex items-center gap-3 flex-shrink-0"
            style={{ borderTop: "1.5px solid rgba(3,54,36,0.07)" }}
          >
            {step > 0 && (
              <button
                onClick={goBack}
                className="cursor-pointer px-5 py-3 rounded-full font-display font-black text-sm transition-all duration-200 hover:scale-[1.02] flex-shrink-0"
                style={{ backgroundColor: "rgba(3,54,36,0.07)", color: "#033624" }}
              >
                ← Voltar
              </button>
            )}
            <button
              onClick={isLast ? onClose : goNext}
              className="cursor-pointer flex-1 py-3 rounded-full font-display font-black text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: isLast ? "#F1204A" : "#033624",
                boxShadow: isLast
                  ? "0 6px 20px rgba(241,32,74,0.35)"
                  : "0 6px 20px rgba(3,54,36,0.28)",
              }}
            >
              {isLast ? "Entendi, vamos começar! 🚀" : "Próximo →"}
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function MateriaisDeApoioSection() {
  const [showGate, setShowGate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const hasShown = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasShown.current) {
          hasShown.current = true;
          setShowGate(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showGate && (
        <GateQuestion
          onYes={() => setShowGate(false)}
          onNo={() => { setShowGate(false); setShowModal(true); }}
        />
      )}
      {showModal && <OnboardingModal onClose={() => setShowModal(false)} />}
      <section ref={sectionRef} id="materiais" className="relative overflow-hidden" style={{ backgroundColor: "#f4f4f4" }}>
        {/* Doodles decorativos */}
        <FloatingDoodle src="/assets_new/bolsa.svg" size={110} top="4%" left="-2%" rotate={-15} opacity={0.13} delay={0} />
        <FloatingDoodle src="/assets_new/cosmetics.svg" size={90} top="2%" right="1%" rotate={18} opacity={0.11} delay={0.8} reverse />
        <FloatingDoodle src="/assets_new/manequim.svg" size={80} top="38%" left="1%" rotate={10} opacity={0.08} delay={1.5} />
        <FloatingDoodle src="/assets_new/camera.svg" size={75} bottom="30%" right="0%" rotate={-20} opacity={0.10} delay={0.4} reverse />
        <FloatingDoodle src="/assets_new/4.svg" size={50} bottom="8%" left="5%" rotate={30} opacity={0.09} delay={1.1} />
        <FloatingDoodle src="/assets_new/9.svg" size={42} top="20%" right="3%" rotate={-35} opacity={0.08} delay={2.0} reverse />

        <div className="relative z-10 w-full max-w-[430px] lg:max-w-screen-xl mx-auto px-5 lg:px-16 py-14 flex flex-col gap-10">

          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <span
              className="font-body text-xs font-medium px-4 py-1.5 self-start"
              style={{ backgroundColor: "#111111", color: "#ffffff", borderRadius: "999px", transform: "rotate(-2deg)", display: "inline-block" }}
            >
              📖 Central de conhecimento
            </span>

            <h2
              className="font-display font-black leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 7vw, 2.4rem)", color: "#111111" }}
            >
              Materiais de Apoio
            </h2>

            <p className="font-body text-sm mt-1 leading-relaxed" style={{ color: "#666666" }}>
              Tudo o que você precisa para operar com confiança — {ITEMS.length} recursos selecionados.
            </p>
          </motion.div>

          {/* Accordion editorial — um item por link */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Accordion type="single" defaultValue="pagamentos" collapsible className="w-full">
              {ITEMS.map((item, i) => {
                const Icon = item.icon;
                const index = String(i + 1).padStart(2, "0");
                return (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="last:border-b border-[#111111]/10"
                  >
                    <AccordionTrigger
                      className={cn(
                        "text-left overflow-hidden duration-300 hover:no-underline cursor-pointer py-5",
                        "text-[#111111]/20 data-[state=open]:text-[#F1204A]",
                        "[&>svg]:hidden"
                      )}
                    >
                      <div className="flex flex-1 items-start gap-5">
                        {/* Número */}
                        <p className="font-body text-xs font-bold mt-1 tabular-nums shrink-0" style={{ color: "currentColor", opacity: 0.5 }}>
                          {index}
                        </p>

                        {/* Título + categoria */}
                        <div className="flex flex-col gap-1">
                          <h3
                            className="uppercase font-display font-black leading-[0.9] tracking-tight"
                            style={{ fontSize: "clamp(1.4rem, 5.5vw, 2.8rem)" }}
                          >
                            {item.label}
                          </h3>
                          <span className="font-body text-xs font-medium opacity-50 normal-case tracking-normal">
                            {item.category}
                            {item.badge && (
                              <span
                                className="ml-2 font-body text-[9px] font-medium px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: "#F1204A", color: "#ffffff", opacity: 1 }}
                              >
                                {item.badge}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-7 pt-0">
                      <div className="pl-0 md:pl-14">
                        <a
                          href={item.href}
                          target={item.href.startsWith("/") ? "_self" : "_blank"}
                          rel={item.href.startsWith("/") ? undefined : "noopener noreferrer"}
                          className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 hover:shadow-md"
                          style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          <div
                            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                            style={{ backgroundColor: item.accent }}
                          >
                            <Icon size={16} style={{ color: item.accentText, strokeWidth: 2.2 }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-display font-black text-sm leading-tight" style={{ color: "#111111" }}>
                              {item.label}
                            </p>
                            <p className="font-body text-xs mt-0.5 leading-snug" style={{ color: "#666666" }}>
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-body text-xs font-medium" style={{ color: "#F1204A" }}>
                              Acessar
                            </span>
                            <ExternalLink
                              size={12}
                              style={{ color: "#F1204A" }}
                            />
                          </div>
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>

        </div>
      </section>
    </>
  );
}
