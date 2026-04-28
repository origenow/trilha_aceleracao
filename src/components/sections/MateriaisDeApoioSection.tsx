"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Megaphone, Settings, Heart, Baby, ShieldAlert, RotateCcw, BarChart2, Zap, Gem, X, GraduationCap } from "lucide-react";
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
    label: "Categoria de Semi-Jóias",
    description: "Requisitos e boas práticas para vender jóias e semi-jóias",
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
              className="w-full py-4 rounded-full font-display font-black text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: "#033624", color: "#FFFFFF", boxShadow: "0 6px 20px rgba(3,54,36,0.28)" }}
            >
              Sim, já vendo! ✅
            </button>
            <button
              onClick={onNo}
              className="w-full py-4 rounded-full font-display font-black text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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

function OnboardingModal({ onClose }: { onClose: () => void }) {
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
          className="relative w-full sm:max-w-[720px] rounded-t-[36px] sm:rounded-[36px] overflow-hidden flex flex-col sm:flex-row"
          style={{ boxShadow: "0 40px 100px rgba(1,26,18,0.55)", minHeight: "0" }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* ══ PAINEL ESQUERDO — hero dark ══ */}
          <div
            className="relative flex flex-col justify-between px-7 pt-6 pb-7 sm:w-[42%] sm:min-h-full overflow-hidden flex-shrink-0"
            style={{ background: "linear-gradient(160deg, #033624 0%, #011a12 100%)" }}
          >
            {/* Handle mobile */}
            <div className="flex justify-center mb-4 sm:hidden">
              <div className="w-9 h-1 rounded-full" style={{ backgroundColor: "rgba(186,246,240,0.22)" }} />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              {/* Pílula sticker */}
              <div style={{ transform: "rotate(-4deg)", alignSelf: "flex-start" }}>
                <span
                  className="font-body text-xs font-semibold px-3 py-1.5 rounded-full inline-block"
                  style={{ backgroundColor: "#2DCCD3", color: "#033624" }}
                >
                  📋 Antes de começar
                </span>
              </div>

              {/* Título */}
              <h2
                className="font-display font-black leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(1.7rem, 5vw, 2.4rem)", color: "#FFFFFF" }}
              >
                Configure{" "}
                <span style={{ color: "#F1204A" }}>sua loja</span>
                <br />
                do jeito certo.
              </h2>

              <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(186,246,240,0.6)", maxWidth: "22ch" }}>
                3 passos essenciais antes de entrar na Trilha.
              </p>
            </div>

            {/* Pílula flutuante */}
            <div
              className="relative z-10 self-start mt-6 font-body text-[10px] font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: "#FBEB35", color: "#033624", transform: "rotate(5deg)" }}
            >
              TikTok Shop ✦
            </div>

            {/* Doodle estrela */}
            <svg className="absolute top-6 right-6 animate-float pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
              <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 3.97 2.09-6.26L3 8.26h6.91z" fill="#FBEB35" />
            </svg>

            {/* Doodle flor */}
            <svg className="absolute bottom-10 right-4 animate-float-reverse pointer-events-none" width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.3, animationDelay: "1.1s" }}>
              <circle cx="16" cy="16" r="4" fill="#2DCCD3" />
              <ellipse cx="16" cy="6" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="16" cy="26" rx="3" ry="5" fill="#2DCCD3" opacity="0.6" transform="rotate(180 16 16)" />
              <ellipse cx="6" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
              <ellipse cx="26" cy="16" rx="5" ry="3" fill="#2DCCD3" opacity="0.6" />
            </svg>

            {/* Doodle seta */}
            <svg className="absolute bottom-24 left-5 animate-float pointer-events-none" width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3, animationDelay: "0.7s" }}>
              <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#EDBBE8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M17 8l2 4-4 1" stroke="#EDBBE8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          {/* ══ PAINEL DIREITO — conteúdo branco ══ */}
          <div className="bg-white flex flex-col flex-1 min-w-0">

            {/* Topbar com close */}
            <div className="flex items-center justify-between px-6 pt-5 pb-0 flex-shrink-0">
              <span className="font-body text-[11px] font-semibold" style={{ color: "#033624", opacity: 0.45 }}>
                3 passos rápidos
              </span>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(3,54,36,0.08)" }}
              >
                <X size={14} style={{ color: "#033624" }} />
              </button>
            </div>

            {/* Steps — scrollable */}
            <div className="overflow-y-auto flex-1 px-6 py-4 flex flex-col gap-4" style={{ maxHeight: "60vh" }}>

              {/* STEP 1 — Seller Academy */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-display font-black text-[11px] flex-shrink-0" style={{ backgroundColor: "#2DCCD3", color: "#033624" }}>1</span>
                  <p className="font-display font-black text-sm" style={{ color: "#033624" }}>Seller Academy</p>
                  <span className="font-body text-[9px] font-semibold px-2 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "#BAF6F0", color: "#033624", transform: "rotate(2deg)", display: "inline-block" }}>
                    obrigatório
                  </span>
                </div>
                <a
                  href="https://seller-br.tiktok.com/university/home?default_language=pt-BR&identity=1&content_id=3875145967404801&role=seller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(120deg,#BAF6F0,#dffaf8)", border: "1.5px solid rgba(45,204,211,0.3)" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#2DCCD3", boxShadow: "0 3px 10px rgba(45,204,211,0.35)" }}>
                    <GraduationCap size={16} style={{ color: "#033624" }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black text-[13px] leading-tight" style={{ color: "#033624" }}>Saiba tudo sobre TikTok Shop</p>
                    <p className="font-body text-[11px]" style={{ color: "#033624", opacity: 0.5 }}>Seller Academy · University</p>
                  </div>
                  <ExternalLink size={13} style={{ color: "#2DCCD3" }} className="flex-shrink-0" />
                </a>
              </div>

              {/* STEP 2 — Políticas */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-display font-black text-[11px] flex-shrink-0" style={{ backgroundColor: "#FBEB35", color: "#033624" }}>2</span>
                  <p className="font-display font-black text-sm" style={{ color: "#033624" }}>Políticas da Plataforma</p>
                </div>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid rgba(241,32,74,0.13)" }}>
                  <div className="px-3.5 py-2.5 flex flex-col gap-1.5" style={{ backgroundColor: "#FFF8F8" }}>
                    {[
                      { label: "Comissão TikTok", value: "6% + R$4/item" },
                      { label: "Frete TikTok", value: "6%" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-body text-[11px]" style={{ color: "#4A0505", opacity: 0.7 }}>{row.label}</span>
                        <span className="font-display font-black text-[11px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(241,32,74,0.1)", color: "#4A0505" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-3.5 py-2.5 flex items-start gap-2" style={{ backgroundColor: "rgba(241,32,74,0.05)", borderTop: "1px solid rgba(241,32,74,0.09)" }}>
                    <span className="text-sm flex-shrink-0">💡</span>
                    <div>
                      <p className="font-display font-black text-[11px]" style={{ color: "#F1204A" }}>Isenção por 60 dias</p>
                      <p className="font-body text-[10px] leading-snug mt-0.5" style={{ color: "#4A0505", opacity: 0.7 }}>Habilite a missão no Seller Center</p>
                      <span className="font-body text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: "rgba(3,54,36,0.07)", color: "#033624" }}>
                        Menu lateral → Crescimento → Missões
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3 — Abertura de contas */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-display font-black text-[11px] flex-shrink-0" style={{ backgroundColor: "#EDBBE8", color: "#4A0505" }}>3</span>
                  <p className="font-display font-black text-sm" style={{ color: "#033624" }}>
                    Abertura de <span style={{ color: "#F1204A" }}>novas contas</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {ACCOUNT_LINKS.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between gap-2.5 p-3 rounded-2xl"
                      style={{ backgroundColor: "#FAFAFA", border: "1.5px solid rgba(3,54,36,0.08)" }}
                    >
                      <p className="font-body text-[11px] font-semibold leading-snug" style={{ color: "#033624" }}>{item.regions}</p>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-full font-body text-[10px] font-semibold transition-all duration-200 hover:scale-[1.04]"
                        style={{ backgroundColor: "#F1204A", color: "#FFFFFF", boxShadow: "0 3px 10px rgba(241,32,74,0.3)" }}
                      >
                        Abrir conta <ExternalLink size={10} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: "1.5px solid rgba(3,54,36,0.07)" }}>
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full font-display font-black text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#033624", boxShadow: "0 6px 20px rgba(3,54,36,0.3)" }}
              >
                Entendi, vamos começar! 🚀
              </button>
            </div>

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
      <FloatingDoodle src="/assets_new/bolsa.svg"    size={110} top="4%"  left="-2%"  rotate={-15} opacity={0.13} delay={0}   />
      <FloatingDoodle src="/assets_new/cosmetics.svg" size={90}  top="2%"  right="1%"  rotate={18}  opacity={0.11} delay={0.8} reverse />
      <FloatingDoodle src="/assets_new/manequim.svg" size={80}  top="38%" left="1%"   rotate={10}  opacity={0.08} delay={1.5} />
      <FloatingDoodle src="/assets_new/camera.svg"   size={75}  bottom="30%" right="0%" rotate={-20} opacity={0.10} delay={0.4} reverse />
      <FloatingDoodle src="/assets_new/4.svg"        size={50}  bottom="8%"  left="5%"  rotate={30}  opacity={0.09} delay={1.1} />
      <FloatingDoodle src="/assets_new/9.svg"        size={42}  top="20%"  right="3%"  rotate={-35} opacity={0.08} delay={2.0} reverse />

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
