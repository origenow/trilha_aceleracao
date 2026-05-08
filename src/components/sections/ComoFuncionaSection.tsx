"use client";

import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, TrendingUp, Gift, Trophy, ArrowRight } from "lucide-react";
import { HighlightedText } from "@/components/ui/highlighted-text";
import confetti from "canvas-confetti";

/* ── Dados ───────────────────────────────────────────────────── */
const PASSOS = [
  {
    num: "1",
    icon: ShoppingBag,
    title: "Acesse Central do Vendedor",
    desc: "Vá em Crescimento no menu principal do Seller Center",
  },
  {
    num: "2",
    icon: TrendingUp,
    title: 'Clique em "Iniciar"',
    desc: "Selecione a fase e siga os passos de cada tarefa",
  },
  {
    num: "3",
    icon: Gift,
    title: "Conclua e atualize",
    desc: "Ao completar a tarefa, recarregue a página para registrar o progresso",
  },
  {
    num: "4",
    icon: Trophy,
    title: "Resgate seus benefícios",
    desc: 'Acesse "Minhas Recompensas" e use seus cupons e créditos',
  },
];

const FloatingDoodle = ({
  src,
  size = 40,
  top,
  left,
  right,
  bottom,
  delay = 0,
  rotate = 0,
  opacity = 0.3,
  reverse = false
}: {
  src: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  rotate?: number;
  opacity?: number;
  reverse?: boolean;
}) => (
  <div
    className={`absolute pointer-events-none ${reverse ? 'animate-float-reverse' : 'animate-float'}`}
    style={{
      top, left, right, bottom,
      width: size, height: size,
      animationDelay: `${delay}s`,
      opacity
    }}
  >
    <img
      src={src}
      alt=""
      className="w-full h-full object-contain"
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  </div>
);

/* ── Componente principal ─────────────────────────────────────── */
export function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-white -z-20" />

      {/* Mesh Gradient Effect (Efeito de Malha) */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-15 lg:opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, #BAF6F0 0%, transparent 40%),
            radial-gradient(circle at 90% 10%, #EDBBE8 0%, transparent 40%),
            radial-gradient(circle at 80% 90%, #FBEB35 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, #F1204A 0%, transparent 35%),
            radial-gradient(circle at 50% 50%, #2DCCD3 0%, transparent 50%)
          `,
          filter: "blur(40px)"
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#033624 1px, transparent 1px), linear-gradient(90deg, #033624 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Decorative icons */}
      <FloatingDoodle src="/assets_new/camera.svg" size={108} top="2%" left="4%" rotate={-12} opacity={0.12} />
      <FloatingDoodle src="/assets_new/cosmetics.svg" size={99} bottom="10%" right="4%" rotate={12} opacity={0.15} reverse />
      <FloatingDoodle src="/assets_new/manequim.svg" size={81} top="40%" right="2%" rotate={25} opacity={0.08} />
      <FloatingDoodle src="/assets_new/2.svg" size={35} bottom="20%" left="6%" rotate={-45} opacity={0.1} />
      <FloatingDoodle src="/assets_new/5.svg" size={50} top="15%" right="10%" rotate={10} opacity={0.05} />
      <div className="w-full max-w-[430px] lg:max-w-screen-xl mx-auto lg:px-16 flex flex-col items-center">

        {/* ── Header Centralizado ── */}
        <motion.div
          className="px-6 lg:px-0 mb-16 text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full font-body text-xs font-black uppercase tracking-widest mb-5 border border-[#FBEB35]/60 bg-[#FBEB35]/15 text-[#033624]"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Recompensas
          </motion.span>
          <h2
            className="font-display font-black leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#033624" }}
          >
            Como resgatar seus{" "}
            <HighlightedText highlightColor="#F1204A" from="bottom" inView delay={0.3}>
              benefícios?
            </HighlightedText>
          </h2>
          <p
            className="font-body text-sm lg:text-base mt-5 font-medium max-w-lg mx-auto leading-relaxed"
            style={{ color: "#4A0505", opacity: 0.72 }}
          >
            Depois de completar as tarefas estratégicas da Trilha, veja como retirar suas recompensas no Seller Center e impulsionar suas vendas.
          </p>
        </motion.div>

        {/* ── Timeline Centralizada ── */}
        <div className="w-full lg:max-w-[480px] px-6 lg:px-0">
          {/* Steps */}
          <div className="flex flex-col border-t-2 border-dashed lg:border-none" style={{ borderColor: "#2DCCD3" }}>
            {PASSOS.map((passo, i) => {
              const Icon = passo.icon;
              const colors = ["#F1204A", "#FBEB35", "#EDBBE8", "#2DCCD3"];
              const textColors = ["#ffffff", "#033624", "#4A0505", "#033624"];
              const bgTints = ["rgba(241,32,74,0.10)", "rgba(251,235,53,0.18)", "rgba(237,187,232,0.25)", "rgba(45,204,211,0.14)"];
              const color = colors[i];
              const nextColor = colors[i + 1];
              const textColor = textColors[i];
              const bgTint = bgTints[i];
              const isLast = i === PASSOS.length - 1;

              return (
                <React.Fragment key={i}>
                  {/* ── Mobile ── */}
                  <motion.div
                    className="lg:hidden flex gap-4 border-b border-dashed py-5"
                    style={{ borderBottomColor: color }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-sm shadow-md"
                      style={{ backgroundColor: color, color: textColor }}
                    >
                      {passo.num}
                    </div>
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <Icon size={15} style={{ color, opacity: 0.8 }} />
                      <h3 className="font-display font-black text-sm mt-0.5" style={{ color: "#033624" }}>
                        {passo.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "#4A0505", opacity: 0.7 }}>
                        {passo.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* ── Desktop ── */}
                  <motion.div
                    className="hidden lg:flex gap-4 items-start"
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.11, type: "spring", stiffness: 90 }}
                  >
                    {/* Bolinha + linha conectora */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 44 }}>
                      <motion.div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-base z-10 relative shadow-lg cursor-default select-none"
                        style={{ backgroundColor: color, color: textColor }}
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 280, damping: 14, delay: i * 0.11 }}
                        whileHover={{ scale: 1.18, rotate: 6 }}
                      >
                        {passo.num}
                      </motion.div>

                      {!isLast && (
                        <motion.div
                          className="w-[2px] flex-1 min-h-[32px] mt-2 rounded-full"
                          style={{
                            background: `linear-gradient(to bottom, ${color}90, ${nextColor}55)`,
                            transformOrigin: "top",
                          }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.11 + 0.28, ease: "easeOut" }}
                        />
                      )}
                    </div>

                    {/* Card de conteúdo */}
                    <motion.div
                      className="flex-1 rounded-2xl p-4 mb-4 cursor-default overflow-hidden relative"
                      style={{
                        background: "white",
                        boxShadow: `0 4px 24px rgba(3,54,36,0.07), 0 0 0 1px ${color}22`,
                        borderColor: `${color}30`,
                      }}
                      whileHover={{
                        y: -4,
                        boxShadow: `0 14px 40px rgba(3,54,36,0.13), 0 0 0 1.5px ${color}55`,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    >
                      {/* Acento colorido no topo do card */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                        style={{ background: `linear-gradient(to right, ${color}, ${color}44)` }}
                      />

                      <div className="flex items-center gap-3 mb-2 mt-1">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: bgTint }}
                        >
                          <Icon size={15} style={{ color }} />
                        </div>
                        <h3 className="font-display font-black text-sm leading-tight" style={{ color: "#033624" }}>
                          {passo.title}
                        </h3>
                      </div>
                      <p className="font-body text-xs leading-relaxed pl-11" style={{ color: "#4A0505", opacity: 0.68 }}>
                        {passo.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-8 lg:mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <motion.a
              href="https://seller-br.tiktok.com/challenges/growth"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-display font-black text-sm lg:text-base px-7 py-4 w-full justify-center"
              style={{
                color: "#ffffff",
                backgroundColor: "#F1204A",
                borderRadius: "999px",
                boxShadow: "0 10px 32px rgba(241,32,74,0.32)",
              }}
              whileHover={{ y: -3, boxShadow: "0 18px 44px rgba(241,32,74,0.42)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
              onClick={() => {
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.8 },
                  colors: ["#F1204A", "#FBEB35", "#2DCCD3", "#EDBBE8"],
                  zIndex: 9999,
                });
              }}
            >
              Resgatar recompensas agora{" "}
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
