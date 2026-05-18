"use client";

import React from "react";
import { motion } from "motion/react";
import { ExternalLink, ChevronRight, Info, Tag, Truck } from "lucide-react";
import { HighlightedText } from "@/components/ui/highlighted-text";

/* ── Componente principal ─────────────────────────────────────── */
export function InfoLojaSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#BAF6F0" }}
    >
      {/* Doodle estrela — topo direito */}
      <svg
        className="absolute top-6 right-4 pointer-events-none animate-float"
        style={{ opacity: 0.4 }}
        width="44" height="44" viewBox="0 0 44 44" fill="none"
      >
        <path
          d="M22 2 L25.6 15.4 L38 12 L29.2 22 L38 32 L25.6 28.6 L22 42 L18.4 28.6 L6 32 L14.8 22 L6 12 L18.4 15.4 Z"
          stroke="#033624" strokeWidth="1.6" strokeLinejoin="round"
        />
      </svg>

      {/* Doodle flor — esquerda */}
      <svg
        className="absolute bottom-16 left-3 pointer-events-none animate-float-reverse"
        style={{ opacity: 0.3, animationDelay: "1s" }}
        width="36" height="36" viewBox="0 0 36 36" fill="none"
      >
        <circle cx="18" cy="18" r="4" stroke="#F1204A" strokeWidth="1.8" fill="none" />
        {[0, 72, 144, 216, 288].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = (18 + 9 * Math.cos(rad)).toFixed(2);
          const cy = (18 + 9 * Math.sin(rad)).toFixed(2);
          return (
            <ellipse
              key={angle}
              cx={cx} cy={cy} rx="3.5" ry="5.5"
              transform={`rotate(${angle}, ${cx}, ${cy})`}
              stroke="#F1204A" strokeWidth="1.6" fill="none" opacity="0.7"
            />
          );
        })}
      </svg>

      <div className="relative z-10 w-full max-w-[430px] mx-auto px-5 py-12 flex flex-col gap-10">

        {/* ─── Bloco 1: Seller Academy ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          {/* Label */}
          <span
            className="font-body text-xs font-semibold px-4 py-1.5 inline-block self-start"
            style={{
              backgroundColor: "#033624",
              color: "#BAF6F0",
              borderRadius: "999px",
              transform: "rotate(-2deg)",
            }}
          >
            🎓 Conteúdo oficial
          </span>

          <h2
            className="font-display font-black leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.3rem)", color: "#033624" }}
          >
            Seller{" "}
            <HighlightedText highlightColor="#FBEB35" from="bottom" inView delay={0.15}>
              Academy
            </HighlightedText>
          </h2>

          <p
            className="font-body text-sm leading-relaxed -mt-1"
            style={{ color: "#4A0505", opacity: 0.75 }}
          >
            Saiba tudo sobre TikTok Shop — do cadastro à escala — com os treinamentos oficiais da plataforma.
          </p>

          {/* Card CTA Seller Academy */}
          <a
            href="https://seller-br.tiktok.com/university/home"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-3xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #033624 0%, #055a3a 100%)",
              boxShadow: "0 6px 24px rgba(3,54,36,0.22)",
            }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: "rgba(186,246,240,0.12)" }}
            >
              🎓
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-black text-sm" style={{ color: "#BAF6F0" }}>
                Acessar Seller Academy
              </p>
              <p
                className="font-body text-xs mt-0.5 leading-snug"
                style={{ color: "rgba(186,246,240,0.55)" }}
              >
                Treinamentos oficiais TikTok Shop
              </p>
            </div>
            <ExternalLink
              size={15}
              className="shrink-0 opacity-35 group-hover:opacity-80 transition-opacity"
              style={{ color: "#BAF6F0" }}
            />
          </a>
        </motion.div>

        {/* ─── Bloco 2: Abrindo sua loja ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Label */}
          <span
            className="font-body text-xs font-semibold px-4 py-1.5 inline-block self-start"
            style={{
              backgroundColor: "#F1204A",
              color: "#ffffff",
              borderRadius: "999px",
              transform: "rotate(2deg)",
            }}
          >
            🏪 Primeiros passos
          </span>

          <h2
            className="font-display font-black leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.3rem)", color: "#033624" }}
          >
            Abrindo sua{" "}
            <HighlightedText highlightColor="#F1204A" from="bottom" inView delay={0.15}>
              loja
            </HighlightedText>
          </h2>

          {/* Card: Políticas da Plataforma */}
          <a
            href="https://seller-br.tiktok.com/university/home"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #e0fdfb 0%, #BAF6F0 100%)",
              boxShadow: "0 4px 18px rgba(45,204,211,0.22)",
              border: "1.5px solid #2DCCD3",
            }}
          >
            <div
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#2DCCD3", boxShadow: "0 4px 12px rgba(45,204,211,0.4)" }}
            >
              <Info size={18} style={{ color: "#033624" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-black text-sm" style={{ color: "#033624" }}>
                Políticas da Plataforma
              </p>
              <p className="font-body text-xs mt-0.5" style={{ color: "#033624", opacity: 0.6 }}>
                Regras e termos para vender no TikTok Shop
              </p>
            </div>
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: "#2DCCD3" }}
            >
              <ExternalLink size={13} style={{ color: "#033624" }} />
            </div>
          </a>

          {/* Cards de taxas — 2 colunas */}
          <div className="grid grid-cols-2 gap-3">
            {/* comissão */}
            <div
              className="rounded-2xl p-4 flex flex-col gap-1.5 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #F1204A 0%, #c01038 100%)",
                boxShadow: "0 6px 24px rgba(241,32,74,0.35)",
              }}
            >
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
                style={{ backgroundColor: "#ffffff" }}
              />
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <Tag size={15} style={{ color: "#ffffff" }} />
              </div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>
                comissão TikTok
              </p>
              <p className="font-display font-black leading-none" style={{ fontSize: "2.2rem", color: "#ffffff" }}>
                6%
              </p>
              <p className="font-body text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                + R$ 4,00 por item
              </p>
            </div>

            {/* Frete */}
            <div
              className="rounded-2xl p-4 flex flex-col gap-1.5 relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #033624 0%, #055a3a 100%)",
                boxShadow: "0 6px 24px rgba(3,54,36,0.35)",
              }}
            >
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
                style={{ backgroundColor: "#2DCCD3" }}
              />
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                style={{ backgroundColor: "rgba(45,204,211,0.2)" }}
              >
                <Truck size={15} style={{ color: "#2DCCD3" }} />
              </div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(186,246,240,0.7)" }}>
                Taxa de Frete
              </p>
              <p className="font-display font-black leading-none" style={{ fontSize: "2.2rem", color: "#BAF6F0" }}>
                6%
              </p>
              <p className="font-body text-[10px]" style={{ color: "rgba(186,246,240,0.6)" }}>
                sobre o pedido
              </p>
            </div>
          </div>

          {/* Nota de isenção */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FBEB35 0%, #f5e020 100%)",
              boxShadow: "0 6px 24px rgba(251,235,53,0.45)",
            }}
          >
            <div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full opacity-15"
              style={{ backgroundColor: "#033624" }}
            />
            <div className="flex items-start gap-3 relative z-10">
              <span style={{ fontSize: "1.75rem", lineHeight: 1, marginTop: "1px" }}>💡</span>
              <div className="flex flex-col gap-1">
                <p className="font-display font-black text-base" style={{ color: "#033624" }}>
                  Isenção de comissão por 60 dias
                </p>
                <p className="font-body text-xs leading-relaxed" style={{ color: "#033624", opacity: 0.75 }}>
                  Habilite a tarefa no Seller Center para participar e aproveite 0% de comissão nos primeiros 60 dias.
                </p>
              </div>
            </div>

            {/* Caminho de navegação */}
            <div
              className="flex items-center gap-1 flex-wrap rounded-xl px-3 py-2 relative z-10"
              style={{ backgroundColor: "rgba(3,54,36,0.12)" }}
            >
              <span className="font-body text-[10px] font-semibold" style={{ color: "#033624" }}>
                Menu lateral
              </span>
              <ChevronRight size={10} style={{ color: "#033624", opacity: 0.6 }} />
              <span className="font-body text-[10px] font-semibold" style={{ color: "#033624" }}>
                Crescimento
              </span>
              <ChevronRight size={10} style={{ color: "#033624", opacity: 0.6 }} />
              <span
                className="font-body text-[10px] font-black px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#F1204A", color: "#ffffff" }}
              >
                tarefas
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
