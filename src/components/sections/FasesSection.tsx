"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  TrendingUp,
  Rocket,
  Gem,
  Trophy,
  Coins,
  Target,
  Crown,
  Play,
  Users,
  Package,
  Tag,
  Video,
  UserCheck,
  Megaphone,
  Layers,
  Radio,
  Zap,
  BarChart2,
  Gift,
  Info,
  BookOpen,
  ChevronRight,
  RotateCcw,
  MessageCircle,
  Search,
  X,
  Lightbulb,
  Flame,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlightedText } from "@/components/ui/highlighted-text";

/* ── Design system colors ────────────────────────────────────── */
const DS = {
  shimmer: "#BAF6F0",
  muse: "#EDD4B2",
  thrive: "#033624",
  ember: "#4A0505",
  blaze: "#F1204A",
  glint: "#2DCCD3",
  glow: "#FBEB35",
  dawn: "#EDBBE8",
  white: "#FFFFFF",
};

/* ── Types ───────────────────────────────────────────────────── */
interface Material {
  title: string;
  url: string | null;
  type?: "webinar" | "playbook";
}

interface MissionItem {
  text: string;
  icon?: LucideIcon;
}

interface MissionGroup {
  title: string;
  icon: LucideIcon;
  items: (string | MissionItem)[];
  materials?: Material[];
  note?: { text: string; href: string; external?: boolean };
  images?: string[];
}

interface FaseData {
  id: string;
  label: string;
  shortLabel: string;
  tagLabel: string;
  icon: LucideIcon;
  duration: string;
  color: string;
  onColor: string;
  rewardBg: string;
  image: string;
  objective: string;
  tip?: string | { text: string; icon: LucideIcon };
  missionGroups: MissionGroup[];
  reward: string;
  rewardSub: string;
  rewardIcon: LucideIcon;
}

/* ── Dados das fases ─────────────────────────────────────────── */
const FASES: FaseData[] = [
  {
    id: "fase1",
    label: "Fase 1",
    shortLabel: "Começar a Vender",
    tagLabel: "Fase 1 · 5 dias",
    icon: ShoppingBag,
    duration: "5 dias",
    color: DS.glint,
    onColor: DS.thrive,
    rewardBg: DS.shimmer,
    image: "/assets/m3.jpg",
    objective: "Deixe sua loja pronta e gere as primeiras vendas",
    tip: "Complete todas as tarefas nos primeiros 5 dias para garantir as recompensas.",
    missionGroups: [
      {
        title: "Entrar na comunidade",
        icon: Users,
        items: [
          { text: "Entre no grupo de WhatsApp da sua região (dicas + suporte diário)", icon: MessageCircle },
        ],
        note: { text: "Ver grupos por região", href: "#cta" },
      },
      {
        title: "Subir seus produtos",
        icon: Package,
        items: [
          "Cadastre pelo menos 10 produtos",
        ],
        materials: [
          { title: "Webinar 1 - Trilha Aceleração", url: "https://bytedance.sg.larkoffice.com/minutes/obsgvm66g4ngwyp9m43qu3a3", type: "webinar" },
          { title: "Webinar Lives: como começar fase 1", url: "https://bytedance.sg.larkoffice.com/minutes/obsgoo4ypm8jql622h3ey545", type: "webinar" },
        ],
      },
      {
        title: "Ativar ofertas",
        icon: Tag,
        items: [
          "Coloque promoção em 5 produtos",
          "Crie 1 cupom (10 unidades)",
          "Ative 1 oferta relâmpago",
        ],
      },
      {
        title: "Começar a ter conteúdos",
        icon: Video,
        items: [
          "Garanta Amostras grátis em seus top 3 produtos",
          "Garanta Amostra reembolsável em 3 produtos",
          "Faça 1 live (pelo menos 30 min)",
          "Poste 3 vídeos com link do produto",
        ],
      },
      {
        title: "Como ganhar benefícios?",
        icon: Gift,
        items: [
          "Siga as Oportunidades de crescimento no painel [Figura Abaixo 1]",
          "Siga as Tarefas de Lives no Live Manager [Figura Abaixo 2]",
        ],
        note: { text: "Acessar Central do Vendedor", href: "https://seller-br.tiktok.com/challenges/growth", external: true },
        images: [
          "/assets/beneficios/beneficio1.png",
          "/assets/beneficios/beneficio2.png",
        ],
      },
    ],
    reward: "Até R$ 2.400 em cupons de desconto",
    rewardSub: "Sessões de suporte · 60 dias de comissão 0%",
    rewardIcon: Trophy,
  },
  {
    id: "fase2",
    label: "Fase 2",
    shortLabel: "Escalar Vendas",
    tagLabel: "Fase 2 · 30 dias",
    icon: TrendingUp,
    duration: "30 dias",
    color: DS.glow,
    onColor: DS.thrive,
    rewardBg: "#FFFDE0",
    image: "/assets/m4.png",
    objective: "ganhar volume usando criadores + conteúdo",
    tip: { text: "Mais conteúdo = mais vendas", icon: Zap },
    missionGroups: [
      {
        title: "Ativar afiliados (ESSENCIAL)",
        icon: UserCheck,
        items: [
          "Coloque TODOS os produtos em Colaboração aberta (comissão > 10%)",
          "Envie no mínimo 30 amostras grátis de um mesmo produto para criadores diversos",
        ],
        materials: [
          { title: "Webinar 2 - Trilha Aceleração", url: "https://bytedance.sg.larkoffice.com/minutes/obsgvo577q35g62w4z28yv35", type: "webinar" },
          { title: "Webinar sobre Afiliados", url: "https://bytedance.sg.larkoffice.com/minutes/obsgpacf9mx8fscn32b762g2", type: "webinar" },
        ],
      },
      {
        title: "Escalar conteúdo",
        icon: BarChart2,
        items: [
          "Poste 14 vídeos com link do produto",
          "Faça lives (mínimo 20h no total)",
        ],
        materials: [
          { title: "Veja o Playbook de Vídeos", url: "https://bytedance.sg.larkoffice.com/docx/A9WUdaFuxowRmKxKUm7lcFvGgHh", type: "playbook" },
          { title: "Veja o Playbook de Lives", url: "https://bytedance.sg.larkoffice.com/docx/F8XKdsImGop4r8xRUG1lYl9Qgdh?from=from_parent_docx", type: "playbook" },
          { title: "Webinar 2", url: "https://bytedance.sg.larkoffice.com/minutes/obsgp28ow116pnqs1y7nh89n", type: "webinar" },
          { title: "Webinar 3", url: "https://bytedance.sg.larkoffice.com/minutes/obsgr4l4269j4m3l96q9j13c", type: "webinar" },
        ],
      },
      {
        title: "Entrar nas campanhas",
        icon: Megaphone,
        items: [
          "Acompanhe em Marketing > Campanhas todas oportunidades de descontos financiados pelo TikTok",
        ],
      },
    ],
    reward: "Até R$ 3.400 em cupons + impulsionamento",
    rewardSub: "Incentivo de tráfego · 15% off cupom · comissão extra criadores",
    rewardIcon: Coins,
  },
  {
    id: "fase3",
    label: "Fase 3",
    shortLabel: "Acelerar",
    tagLabel: "Fase 3 · 60 dias",
    icon: Rocket,
    duration: "60 dias",
    color: DS.dawn,
    onColor: DS.ember,
    rewardBg: "#F9EEFA",
    image: "/assets/m2.jpg",
    objective: "escalar vendas de forma consistente usando criadores, lives e tráfego pago",
    tip: "Mais criadores + mais lives + tráfego pago = escala de verdade",
    missionGroups: [
      {
        title: "Escalar criadores (máquina de conteúdo)",
        icon: Layers,
        items: [
          "Trabalhar com criadores ativos para chegar em alto volume de vídeos (1.500 vídeos)",
          "Reforçar relacionamento com top criadores (mandar mais produtos)",
        ],
        materials: [
          { title: "Assitir o webinar 3 sobre TikTok Shop", url: "https://bytedance.sg.larkoffice.com/minutes/obsgv6t9hu43976116r93ot3", type: "webinar" },
        ],
      },
      {
        title: "Aumentar intensidade de lives",
        icon: Radio,
        items: [
          "Fazer lives frequentes",
          "Atingir 40 horas de lives no mês",
        ],
        materials: [
          { title: "Assistir o webinar 4 sobre Lives", url: "https://bytedance.sg.larkoffice.com/minutes/obsg2oo34y99uh95rv75iemz", type: "webinar" },
        ],
      },
      {
        title: "Investir em tráfego (GMV Max)",
        icon: Zap,
        items: [
          "Ativar GMV Max nos produtos com mais conteúdo",
          "Investimento inicial sugerido: R$2.500/mês",
        ],
        materials: [
          { title: "Assistir o webinar sobre GMV Max", url: "https://bytedance.sg.larkoffice.com/minutes/obsgaahwrem1hut18kqogot3", type: "webinar" },
        ],
      },
    ],
    reward: "Matching com Top Criadores + Ads Credits",
    rewardSub: "Cashback em ads até R$ 4.000 · Cupons 30% off · comissão extra",
    rewardIcon: Target,
  },
  {
    id: "fase4",
    label: "Fase 4",
    shortLabel: "Escala Avançada (Diamante)",
    tagLabel: "Fase 4 · Diamante",
    icon: Gem,
    duration: "R$ 4k/dia",
    color: DS.ember,
    onColor: DS.white,
    rewardBg: DS.muse,
    image: "/assets/m1.jpg",
    objective: "maximizar crescimento com estratégia avançada e suporte dedicado",
    tip: "Atingindo R$ 4.000/dia de média você desbloqueia benefícios exclusivos do TikTok.",
    missionGroups: [
      {
        title: "Manter alto volume de vendas",
        icon: BarChart2,
        items: [
          "Atingir média de aproximadamente R$4.000/dia em vendas",
        ],
      },
      {
        title: "O que você ganha:",
        icon: Gift,
        items: [
          { text: "Gerente de contas dedicado (TikTok)", icon: UserCheck },
          { text: "Planejamento estratégico personalizado", icon: TrendingUp },
          { text: "Acesso antecipado a oportunidades e campanhas", icon: Flame },
          { text: "Suporte direto para escalar vendas mais rápido", icon: Lightbulb },
        ],
      },
    ],
    reward: "Escala Avançada",
    rewardSub: "Benefícios exclusivos para top vendedores",
    rewardIcon: Crown,
  },
];

/* ── Animation variants ──────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 64 : -64,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -64 : 64,
    opacity: 0,
    scale: 0.96,
  }),
};

/* ── Helpers ─────────────────────────────────────────────────── */
function alpha(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── FloatingDoodle ──────────────────────────────────────────── */
const FloatingDoodle = ({
  src, size = 40, top, left, right, bottom,
  delay = 0, rotate = 0, opacity = 0.3, reverse = false,
}: {
  src: string; size?: number; top?: string; left?: string;
  right?: string; bottom?: string; delay?: number;
  rotate?: number; opacity?: number; reverse?: boolean;
}) => (
  <div
    className={`absolute pointer-events-none ${reverse ? "animate-float-reverse" : "animate-float"}`}
    style={{ top, left, right, bottom, width: size, height: size, animationDelay: `${delay}s`, opacity }}
  >
    <img src={src} alt="" className="w-full h-full object-contain" style={{ transform: `rotate(${rotate}deg)` }} />
  </div>
);

/* ── Phase selector tab ──────────────────────────────────────── */
function PhaseTab({ fase, index, isActive, onClick }: {
  fase: FaseData; index: number; isActive: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className="relative flex flex-col gap-2 p-3.5 rounded-2xl text-left transition-all duration-300 overflow-hidden cursor-pointer"
      style={isActive
        ? { backgroundColor: fase.color, boxShadow: `0 6px 20px ${alpha(fase.color, 0.45)}` }
        : { backgroundColor: DS.white, border: `1.5px solid rgba(3,54,36,0.08)` }}
    >
      {isActive && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 15%, rgba(255,255,255,0.28) 0%, transparent 55%)" }} />
      )}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: isActive ? alpha(DS.white, 0.22) : alpha(fase.color, 0.12), color: isActive ? fase.onColor : fase.color }}>
          <fase.icon size={16} />
        </div>
        <span className="font-body text-[0.58rem] font-bold px-1.5 py-0.5 rounded-md"
          style={{ backgroundColor: isActive ? alpha(DS.white, 0.18) : alpha(fase.color, 0.12), color: isActive ? fase.onColor : fase.color }}>
          {index < 3 ? `F${index + 1}` : "◆"}
        </span>
      </div>
      <div className="relative z-10">
        <p className="font-display font-black text-[0.75rem] leading-tight" style={{ color: isActive ? fase.onColor : DS.thrive }}>
          {fase.shortLabel}
        </p>
        <p className="font-body text-[0.6rem] mt-0.5" style={{ color: isActive ? alpha(fase.onColor, 0.65) : "#9ca3af" }}>
          {fase.duration}
        </p>
      </div>
    </button>
  );
}

/* ── Mission group card ──────────────────────────────────────── */
function MissionGroupCard({ group, fase, step, onImageClick }: {
  group: MissionGroup; fase: FaseData; step: number; onImageClick?: (src: string) => void;
}) {
  const GroupIcon = group.icon;
  const hasMaterials = group.materials && group.materials.length > 0;
  const hasImages = group.images && group.images.length > 0;
  const accentColor = fase.onColor === DS.white ? fase.color : fase.onColor;

  return (
    <div className="rounded-2xl overflow-hidden bg-white"
      style={{ border: `1.5px solid ${alpha(fase.color, 0.18)}` }}>

      {/* Header band */}
      <div className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: alpha(fase.color, 0.08), borderBottom: `1.5px solid ${alpha(fase.color, 0.14)}` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: alpha(fase.color, 0.18), color: accentColor }}>
          <GroupIcon size={14} strokeWidth={2} />
        </div>
        <span className="font-display font-bold text-[0.82rem] flex-1 leading-tight" style={{ color: DS.thrive }}>
          {group.title}
        </span>
        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-display font-black text-[0.6rem]"
          style={{ backgroundColor: fase.color, color: fase.onColor, boxShadow: `0 2px 6px ${alpha(fase.color, 0.4)}` }}>
          {step}
        </div>
      </div>

      {/* Items */}
      <div className={cn("px-4 pt-3.5", hasMaterials || group.note || hasImages ? "pb-3" : "pb-3.5")}>
        <ul className="space-y-3">
          {group.items.map((item, i) => {
            const isString = typeof item === "string";
            const text = isString ? item : item.text;
            const ItemIcon = isString ? null : item.icon;

            return (
              <li key={i} className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: alpha(fase.color, 0.12) }}>
                  {ItemIcon ? (
                    <ItemIcon size={11} style={{ color: fase.color }} strokeWidth={2.5} />
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: fase.color }} />
                  )}
                </div>
                <span className="font-body text-[0.95rem] leading-tight font-medium" style={{ color: "#1a2e1e" }}>{text}</span>
              </li>
            );
          })}
        </ul>
        {group.note && (
          <motion.a
            href={group.note.href}
            target={group.note.external ? "_blank" : undefined}
            rel={group.note.external ? "noopener noreferrer" : undefined}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                `0 4px 14px ${alpha(DS.glint, 0.3)}`,
                `0 6px 20px ${alpha(DS.glint, 0.5)}`,
                `0 4px 14px ${alpha(DS.glint, 0.3)}`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 mt-4 font-display font-black text-xs rounded-full px-5 py-3 transition-colors relative overflow-hidden group/btn"
            style={{
              backgroundColor: DS.glint,
              color: DS.thrive,
            }}
            onClick={(e) => {
              if (!group.note?.external) {
                e.preventDefault();
                document.querySelector(group.note!.href)?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />

            <MessageCircle size={15} strokeWidth={2.5} />
            <span className="relative z-10">{group.note.text}</span>
            <ChevronRight size={14} strokeWidth={3} className="transition-transform group-hover/btn:translate-x-1" />
          </motion.a>
        )}
      </div>

      {/* Imagens inline */}
      {hasImages && (
        <div className="px-4 pb-4" style={{ borderTop: `1px dashed ${alpha(fase.color, 0.2)}` }}>
          <p className="font-body text-[0.6rem] uppercase tracking-wider pt-3 mb-2.5" style={{ color: alpha(DS.thrive, 0.4) }}>
            Figuras de referência
          </p>
          <div className={cn("grid gap-3", group.images!.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
            {group.images!.map((src, i) => (
              <div key={i} className="w-full rounded-xl overflow-hidden flex flex-col group/img cursor-zoom-in"
                onClick={() => onImageClick?.(src)}
                style={{ border: `1px solid ${alpha(fase.color, 0.18)}` }}>
                <p className="font-body text-[0.6rem] px-2.5 py-1.5 shrink-0" style={{ backgroundColor: alpha(fase.color, 0.08), color: alpha(DS.thrive, 0.5) }}>
                  Figura {i + 1}
                </p>
                <div className="relative w-full flex-1 min-h-[120px] max-h-[180px] bg-[#f8f9fa] flex items-center justify-center p-2 overflow-hidden">
                  <img src={src} alt={`Figura ${i + 1}`} className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover/img:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                    <Search size={20} className="text-[#033624]/40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Materiais inline - Redesenhados como Cards/Thumbs em 2 colunas */}
      {hasMaterials && (
        <div className="px-4 pb-4" style={{ borderTop: `1px dashed ${alpha(fase.color, 0.2)}` }}>
          <div className="flex flex-col lg:flex-row gap-5 pt-4">

            {/* Coluna Webinars */}
            {group.materials!.some(m => m.type === "webinar") && (
              <div className="flex-1 lg:max-w-[50%]">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Video size={12} className="text-[#033624]/40" />
                  <span className="font-body text-[0.6rem] uppercase tracking-wider font-bold" style={{ color: alpha(DS.thrive, 0.4) }}>
                    Assista nossos Webinars
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {group.materials!.filter(m => m.type === "webinar").map((mat, mi) => (
                    <a key={mi} href={mat.url!} target="_blank" rel="noopener noreferrer"
                      className="group/thumb flex flex-col gap-2.5 p-2 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                      style={{ backgroundColor: alpha(fase.color, 0.05), borderColor: alpha(fase.color, 0.15) }}>
                      <div className="w-full aspect-video rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden shadow-sm">
                        <img src="/assets/fases/webinar.jpeg" alt="Capa Webinar" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-60 group-hover/thumb:opacity-40 transition-opacity" />
                        <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover/thumb:scale-110 shadow-lg">
                          <Play size={16} fill="white" strokeWidth={0} className="ml-0.5" />
                        </div>
                        {/* Play progress bar simulation */}
                        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full" />
                        <div className="absolute bottom-0 left-0 h-1 bg-white w-1/3 transition-all duration-500 group-hover/thumb:w-2/3" />
                      </div>
                      <span className="font-body text-[0.68rem] font-bold leading-tight px-1 pb-1 line-clamp-2" style={{ color: DS.thrive }}>
                        {mat.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Coluna Playbooks */}
            {group.materials!.some(m => m.type === "playbook") && (
              <div className="flex-1 lg:max-w-[50%]">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <BookOpen size={12} className="text-[#033624]/40" />
                  <span className="font-body text-[0.6rem] uppercase tracking-wider font-bold" style={{ color: alpha(DS.thrive, 0.4) }}>
                    Playbooks
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {group.materials!.filter(m => m.type === "playbook").map((mat, mi) => (
                    <a key={mi} href={mat.url!} target="_blank" rel="noopener noreferrer"
                      className="group/thumb flex flex-col gap-2.5 p-2 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:bg-white hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                      style={{ backgroundColor: alpha(DS.dawn, 0.25), borderColor: alpha(DS.dawn, 0.4) }}>
                      <div className="w-full aspect-video rounded-xl flex items-center justify-center relative overflow-hidden">
                        <img src="/assets/fases/playbook.jpeg" alt="Capa Playbook" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-60 group-hover/thumb:opacity-40 transition-opacity" />
                        <div className="relative">
                          <Tag size={18} className="text-white drop-shadow transition-transform duration-300 group-hover/thumb:scale-110" />
                        </div>
                      </div>
                      <span className="font-body text-[0.68rem] font-bold leading-tight px-1 pb-1 line-clamp-2" style={{ color: "#4A0505" }}>
                        {mat.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────── */
export function FasesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [groupStep, setGroupStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showReward, setShowReward] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const rewardRef = useRef<HTMLDivElement>(null);

  const activeFase = FASES[activeIndex];
  const totalSteps = activeFase.missionGroups.length;
  const isLastGroup = groupStep === totalSteps - 1;

  /* Muda de fase e reseta o passo */
  const selectPhase = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
    setGroupStep(0);
    setShowReward(false);
  };

  /* Avança passo / fase */
  const goNext = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLastGroup) {
      setDirection(1);
      setGroupStep((p) => p + 1);
    } else if (!showReward) {
      setShowReward(true);
      const rect = e?.currentTarget.getBoundingClientRect();
      const origin = rect
        ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
        : { y: 0.6 };
      confetti({
        particleCount: 150,
        spread: 70,
        origin,
        colors: [activeFase.color, activeFase.onColor, '#F1204A', '#FBEB35'],
        ticks: 200,
        zIndex: 9999,
      });
      setTimeout(() => rewardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    } else if (activeIndex < FASES.length - 1) {
      setDirection(1);
      setActiveIndex((i) => i + 1);
      setGroupStep(0);
      setShowReward(false);
      setTimeout(() => document.getElementById("fases")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    } else {
      selectPhase(0);
      setTimeout(() => document.getElementById("fases")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };

  /* Recua passo / fase */
  const goPrev = () => {
    if (showReward) {
      setShowReward(false);
    } else if (groupStep > 0) {
      setDirection(-1);
      setGroupStep((p) => p - 1);
    } else if (activeIndex > 0) {
      const prevLen = FASES[activeIndex - 1].missionGroups.length;
      setDirection(-1);
      setActiveIndex((i) => i - 1);
      setGroupStep(prevLen - 1);
      setShowReward(false);
    }
  };

  /* Pula diretamente para um passo */
  const jumpTo = (i: number) => {
    setDirection(i > groupStep ? 1 : -1);
    setGroupStep(i);
    setShowReward(false);
  };

  /* ── Bloco de conteúdo reutilizado em mobile e desktop ── */
  const PhaseContent = () => (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={activeFase.id}
        custom={direction}
        variants={{
          enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Imagem + Dica integrada no mobile */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-4 shadow-sm flex flex-col justify-start" style={{ minHeight: "16rem" }}>
          <Image src={activeFase.image} alt={activeFase.label} fill className="object-cover absolute inset-0 z-0" sizes="(min-width: 1024px) 700px, 430px" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/60 z-10" />
          <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl z-20" style={{ backgroundColor: activeFase.color }} />

          {/* Conteúdo superior: tag + título + objetivo */}
          <div className="relative z-20 p-5 pt-8 flex-1">
            <div className="px-3 py-1.5 rounded-full font-body text-[0.65rem] font-black uppercase tracking-widest w-fit shadow-lg mb-4"
              style={{ backgroundColor: activeFase.color, color: activeFase.onColor }}>
              {activeFase.tagLabel}
            </div>
            <h3 className="font-display font-black text-2xl leading-tight text-white drop-shadow-md mb-2">
              {activeFase.shortLabel}
            </h3>
            <p className="font-body text-xs leading-snug text-white/90 font-medium">
              {activeFase.objective}
            </p>
          </div>

          {/* Dica Crucial integrada na parte inferior do card */}
          {activeFase.tip && (
            <div className="relative z-20 mx-3 mb-3 flex items-start gap-3 rounded-xl px-4 py-3.5 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${alpha(activeFase.color, 0.22)}, ${alpha(activeFase.color, 0.12)})`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${alpha(activeFase.color, 0.45)}`,
              }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: activeFase.color, color: activeFase.onColor }}>
                {typeof activeFase.tip !== "string" && activeFase.tip.icon ? (
                  <activeFase.tip.icon size={14} strokeWidth={2.5} />
                ) : (
                  <Info size={14} strokeWidth={2.5} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-black text-[0.6rem] uppercase tracking-widest mb-1" style={{ color: activeFase.color }}>Dica Crucial</p>
                <p className="font-body text-[0.82rem] leading-snug font-bold text-white/95">
                  {typeof activeFase.tip === "string" ? activeFase.tip : activeFase.tip.text}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Step-by-step dos grupos ── */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="font-body text-xs" style={{ color: alpha(DS.thrive, 0.45) }}>
              Passo {groupStep + 1} de {totalSteps}
            </span>
            <div className="flex items-center gap-1.5">
              {activeFase.missionGroups.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    height: "6px",
                    width: i === groupStep ? "1.75rem" : "6px",
                    backgroundColor: i <= groupStep ? activeFase.color : "rgba(3,54,36,0.12)",
                  }}
                  aria-label={`Ir para passo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeFase.id}-${groupStep}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <MissionGroupCard
                group={activeFase.missionGroups[groupStep]}
                fase={activeFase}
                step={groupStep + 1}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 flex items-center gap-2.5">
            <motion.button
              onClick={goPrev}
              disabled={groupStep === 0 && activeIndex === 0 && !showReward}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 cursor-pointer"
              style={{
                backgroundColor: DS.white,
                border: "1.5px solid rgba(3,54,36,0.1)",
                color: DS.thrive,
                opacity: groupStep === 0 && activeIndex === 0 && !showReward ? 0.3 : 1,
              }}
              aria-label="Passo anterior"
            >
              <ChevronRight size={18} style={{ transform: "rotate(180deg)" }} />
            </motion.button>

            <motion.button
              onClick={(e) => goNext(e)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="flex-1 h-11 rounded-2xl font-display font-black text-sm flex items-center justify-center gap-2 transition-shadow duration-200 cursor-pointer"
              style={{
                backgroundColor: activeFase.color,
                color: activeFase.onColor,
                boxShadow: `0 4px 18px ${alpha(activeFase.color, 0.45)}`,
              }}
            >
              {isLastGroup && showReward && activeIndex < FASES.length - 1 ? (
                <><span>Próxima fase</span><ChevronRight size={15} /></>
              ) : isLastGroup && showReward ? (
                <><RotateCcw size={14} /><span>Voltar à Fase 1</span></>
              ) : isLastGroup ? (
                <><activeFase.rewardIcon size={15} /><span>Ver recompensa</span></>
              ) : (
                <><span>Próximo passo</span><ChevronRight size={15} /></>
              )}
            </motion.button>
          </div>
        </div>

        {/* ── Recompensa ── */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              ref={rewardRef}
              key="reward"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl overflow-hidden mb-6"
              style={{
                boxShadow: `0 8px 32px ${alpha(activeFase.color, 0.22)}, 0 2px 8px rgba(3,54,36,0.06)`,
                border: `1.5px solid ${alpha(activeFase.color, 0.28)}`,
              }}
            >
              <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: activeFase.color }}>
                <activeFase.rewardIcon size={16} color={activeFase.onColor} strokeWidth={2} />
                <p className="font-body text-[0.65rem] font-semibold uppercase tracking-widest"
                  style={{ color: alpha(activeFase.onColor, 0.85) }}>
                  Recompensa desbloqueada
                </p>
              </div>
              <div className="p-5" style={{ backgroundColor: activeFase.rewardBg }}>
                <p className="font-display font-black text-base leading-tight mb-1" style={{ color: DS.thrive }}>
                  {activeFase.reward}
                </p>
                <p className="font-body text-[0.75rem] leading-snug" style={{ color: DS.ember, opacity: 0.8 }}>
                  {activeFase.rewardSub}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="fases" className="relative pt-20 pb-20 overflow-hidden" style={{ backgroundColor: "#f4f6f5" }}>
      {/* Wave entrada — visível apenas no mobile */}
      <div className="lg:hidden absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[80px] block">
          <path d="M0,80 C200,20 500,70 720,30 C940,0 1180,60 1440,25 L1440,0 L0,0 Z" fill={DS.shimmer} />
        </svg>
      </div>

      {/* Floating doodles */}
      <FloatingDoodle src="/assets_new/10.svg" size={80} top="15%" right="-2%" rotate={15} opacity={0.12} />
      <FloatingDoodle src="/assets_new/5.svg" size={70} bottom="25%" left="-2%" rotate={-15} opacity={0.08} reverse />
      <FloatingDoodle src="/assets_new/manequim.svg" size={72} top="45%" left="2%" rotate={20} opacity={0.06} />
      <FloatingDoodle src="/assets_new/2.svg" size={50} bottom="5%" right="4%" rotate={-10} opacity={0.08} />
      <FloatingDoodle src="/assets_new/camera.svg" size={81} top="5%" left="4%" rotate={30} opacity={0.04} reverse />
      <FloatingDoodle src="/assets_new/cosmetics.svg" size={108} bottom="45%" right="2%" rotate={45} opacity={0.06} />

      {/* ════════════════════════════════════════════════════════ */}
      {/* MOBILE layout                                          */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="lg:hidden relative z-10">
        <div className="w-full max-w-[430px] mx-auto px-6 mb-7">
          <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: DS.glint }}>A Trilha</p>
          <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(1.8rem, 7vw, 2.4rem)", color: DS.thrive }}>
            Tarefas por{" "}
            <HighlightedText highlightColor={DS.blaze} from="bottom" inView delay={0.3}>Fase</HighlightedText>
          </h2>
          <p className="font-body text-sm mt-1.5" style={{ color: DS.ember, opacity: 0.7 }}>
            Selecione uma fase e siga os passos
          </p>
        </div>

        <div className="w-full max-w-[430px] mx-auto px-4 mb-5">
          <div className="grid grid-cols-2 gap-2.5">
            {FASES.map((fase, i) => (
              <PhaseTab key={fase.id} fase={fase} index={i} isActive={i === activeIndex} onClick={() => selectPhase(i)} />
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3.5 px-0.5">
            {FASES.map((fase, i) => (
              <button key={i} onClick={() => selectPhase(i)}
                className="h-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: i === activeIndex ? fase.color : "rgba(3,54,36,0.1)", width: i === activeIndex ? "2.5rem" : "0.5rem" }}
                aria-label={`Fase ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-[430px] mx-auto px-4">
          <PhaseContent />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* DESKTOP layout — Tabuleiro Interativo Gamificado         */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block w-full max-w-[1400px] mx-auto px-8 relative z-10">

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <p className="font-body text-sm uppercase tracking-widest mb-2 font-bold" style={{ color: DS.glint }}>
            A Trilha
          </p>
          <h2 className="font-display font-black leading-tight mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: DS.thrive }}>
            Tarefas por{" "}
            <HighlightedText highlightColor={DS.blaze} from="bottom" inView delay={0.3}>Fase</HighlightedText>
          </h2>
          <p className="font-body text-base max-w-2xl mx-auto font-medium" style={{ color: DS.ember, opacity: 0.8 }}>
            Siga o caminho, complete tarefas estratégicas e desbloqueie recompensas exclusivas a cada novo marco alcançado no TikTok Shop.
          </p>
        </div>

        {/* MAPA HORIZONTAL (TABULEIRO) */}
        <div className="relative w-full mx-auto mb-6 h-28 flex items-center">
          {/* Linha pontilhada de fundo */}
          <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1.5 rounded-full border-t-[3px] border-dashed" style={{ borderColor: alpha(DS.thrive, 0.15) }} />

          {/* Linha de progresso preenchida */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 h-2.5 rounded-full transition-all duration-700 ease-out z-0"
            style={{
              width: `${(activeIndex / (FASES.length - 1)) * 80}%`,
              backgroundColor: DS.glint,
              boxShadow: `0 0 15px ${alpha(DS.glint, 0.8)}`
            }}
          />

          {/* NÓS DAS FASES */}
          <div className="relative w-full flex justify-between z-10 px-[5%]">
            {FASES.map((fase, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <div key={fase.id} className="relative flex flex-col items-center group cursor-pointer" onClick={() => selectPhase(i)}>

                  {/* Etiqueta Superior */}
                  <div className={`absolute -top-14 transition-all duration-300 pointer-events-none ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-[0_10px_30px_rgba(3,54,36,0.1)] border border-gray-100 text-center whitespace-nowrap">
                      <p className="font-display font-black text-[0.9rem]" style={{ color: fase.color }}>{fase.shortLabel}</p>
                      <p className="font-body text-[0.55rem] font-black text-gray-400 uppercase tracking-widest">{fase.duration}</p>
                    </div>
                  </div>

                  {/* O "Nó" Circular */}
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative transition-colors duration-500 bg-white"
                    style={{
                      border: `4px solid ${isActive || isPast ? fase.color : alpha(DS.thrive, 0.1)}`,
                      boxShadow: isActive ? `0 0 0 8px ${alpha(fase.color, 0.15)}, 0 15px 30px ${alpha(fase.color, 0.3)}` : (isPast ? `0 6px 15px rgba(3,54,36,0.08)` : "none")
                    }}
                    animate={isActive ? { scale: [1, 1.05, 1], y: [0, -6, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-2 rounded-full flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: isActive || isPast ? fase.color : "transparent" }}>
                      <fase.icon
                        size={26}
                        style={{ color: isActive || isPast ? fase.onColor : alpha(DS.thrive, 0.3) }}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>

                    {isPast && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-[3px] border-[#f4f6f5] z-20 shadow-md"
                        style={{ backgroundColor: DS.glint }}
                      >
                        <svg className="w-3.5 h-3.5" style={{ color: DS.thrive }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

        {/* QUEST LOG PANEL (Detalhes da tarefa) */}
        <div ref={rewardRef} className="scroll-mt-20">
          <motion.div
            key={activeFase.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="w-full bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(3,54,36,0.08)] flex flex-row border border-gray-100 relative"
            style={{ minHeight: "520px" }}
          >
            {/* Lado Esquerdo: Imagem e Identidade */}
            <div className="w-[38%] relative flex flex-col justify-start p-10 pt-12 overflow-hidden text-white shrink-0">
              <Image src={activeFase.image} alt={activeFase.label} fill className="object-cover absolute inset-0 z-0 scale-[1.02] hover:scale-105 transition-transform duration-[2s]" sizes="500px" priority />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-10" />
              <div className="absolute inset-0 opacity-30 mix-blend-multiply z-10" style={{ backgroundColor: activeFase.color }} />

              <div className="relative z-20">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 backdrop-blur-md border shadow-lg" style={{ backgroundColor: alpha(activeFase.color, 0.4), borderColor: alpha(activeFase.color, 0.5) }}>
                  <activeFase.icon size={16} color={activeFase.onColor === DS.white ? DS.white : activeFase.onColor} />
                  <span className="font-display font-black text-[0.65rem] uppercase tracking-widest" style={{ color: activeFase.onColor === DS.white ? DS.white : activeFase.onColor }}>{activeFase.tagLabel}</span>
                </div>
                <h3 className="font-display font-black text-[2.5rem] leading-[0.9] tracking-tight mb-4 drop-shadow-md">
                  {activeFase.shortLabel}
                </h3>
                <p className="font-body text-[0.9rem] font-medium text-white/90 leading-relaxed mb-6">
                  {activeFase.objective}
                </p>

                {activeFase.tip && (
                  <div className="mt-auto bg-white/15 backdrop-blur-3xl rounded-[2rem] p-8 flex items-start gap-6 border border-white/30 shadow-[0_12px_48px_rgba(0,0,0,0.4)] relative overflow-hidden group/tip">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-10 group-hover/tip:opacity-25 transition-opacity duration-500" />

                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl opacity-50 transition-all duration-500 group-hover/tip:opacity-80 scale-150" style={{ backgroundColor: activeFase.color }} />
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative z-10 transition-transform duration-500 group-hover/tip:scale-110"
                        style={{ backgroundColor: activeFase.color }}>
                        <Info size={28} color={activeFase.onColor} strokeWidth={3} />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="font-display font-black text-[0.8rem] uppercase tracking-widest mb-2" style={{ color: activeFase.color, textShadow: "0 0 10px rgba(0,0,0,0.2)" }}>Dica de Ouro</p>
                      <p className="font-body text-[1.1rem] font-black text-white leading-tight tracking-tight drop-shadow-sm">
                        {typeof activeFase.tip === "string" ? activeFase.tip : activeFase.tip.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lado Direito: Conteúdo de tarefas */}
            <div className="w-[62%] p-8 flex flex-col justify-between bg-[#FCFDFD] relative">

              <div className="flex-1">
                {/* Header Steps */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                  <div>
                    <h4 className="font-display font-black text-[1.4rem] tracking-tight text-[#033624]">
                      tarefa Atual
                    </h4>
                    <p className="font-body text-xs font-bold uppercase tracking-widest mt-1.5" style={{ color: alpha(DS.thrive, 0.4) }}>
                      Passo {groupStep + 1} de {totalSteps}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {activeFase.missionGroups.map((_, i) => (
                      <button key={i} onClick={() => jumpTo(i)}
                        className="rounded-full transition-all duration-300 h-2 cursor-pointer"
                        style={{
                          width: i === groupStep ? "2.5rem" : "1rem",
                          backgroundColor: i <= groupStep ? activeFase.color : alpha(DS.thrive, 0.08),
                        }}
                        aria-label={`Ir para passo ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card da tarefa Atual */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${activeFase.id}-${groupStep}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="min-h-[220px]"
                  >
                    <MissionGroupCard
                      group={activeFase.missionGroups[groupStep]}
                      fase={activeFase}
                      step={groupStep + 1}
                      onImageClick={setZoomedImage}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controle Inferior */}
              <div className="mt-5 flex items-center gap-3">
                <motion.button
                  onClick={goPrev}
                  disabled={groupStep === 0 && activeIndex === 0 && !showReward}
                  whileTap={{ scale: 0.94 }}
                  className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center shrink-0 bg-white border-2 border-gray-100 shadow-sm transition-all hover:bg-gray-50"
                  style={{
                    color: DS.thrive,
                    opacity: groupStep === 0 && activeIndex === 0 && !showReward ? 0.3 : 1,
                    cursor: groupStep === 0 && activeIndex === 0 && !showReward ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronRight size={22} style={{ transform: "rotate(180deg)" }} strokeWidth={2.5} />
                </motion.button>

                <motion.button
                  onClick={(e) => goNext(e)}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 h-14 rounded-[1.25rem] font-display font-black text-[0.95rem] flex items-center justify-center gap-2.5 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: activeFase.color,
                    color: activeFase.onColor,
                    boxShadow: `0 8px 25px ${alpha(activeFase.color, 0.35)}`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-500 ease-out" />

                  {isLastGroup && showReward && activeIndex < FASES.length - 1 ? (
                    <><span className="relative z-10">Ir para {FASES[activeIndex + 1].label}</span><Rocket size={18} className="relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></>
                  ) : isLastGroup && showReward ? (
                    <><RotateCcw size={18} className="relative z-10 group-hover:-rotate-90 transition-transform" strokeWidth={2.5} /><span className="relative z-10">Recomeçar Trilha</span></>
                  ) : isLastGroup ? (
                    <><activeFase.rewardIcon size={20} className="relative z-10 group-hover:scale-110 transition-transform" strokeWidth={2.5} /><span className="relative z-10">Ver Recompensa da Fase</span></>
                  ) : (
                    <><span className="relative z-10">próximo passo</span><ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} /></>
                  )}
                </motion.button>
              </div>

              {/* OVERLAY DE RECOMPENSA DESKTOP */}
              <AnimatePresence>
                {showReward && (
                  <motion.div
                    key="desktop-reward"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-12"
                  >
                    {/* Fundo com glassmorphism forte */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl rounded-r-[2.5rem]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/90 via-white/40 to-transparent rounded-r-[2.5rem]" />

                    <div className="relative z-10 flex flex-col items-center w-full">
                      <motion.div
                        initial={{ rotate: -15, scale: 0 }}
                        animate={{ rotate: 10, scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.1 }}
                        className="w-28 h-28 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-2xl border-4 border-white"
                        style={{ backgroundColor: activeFase.color, color: activeFase.onColor }}
                      >
                        <activeFase.rewardIcon size={56} strokeWidth={1.5} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex px-5 py-2 rounded-full font-body text-[0.7rem] font-black uppercase tracking-widest mb-4 border-[1.5px]"
                        style={{ borderColor: activeFase.color, color: activeFase.color, backgroundColor: alpha(activeFase.color, 0.08) }}
                      >
                        Desbloqueio de Fase
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="font-display font-black text-4xl text-[#033624] mb-3 max-w-[90%] leading-[1.1] tracking-tight"
                      >
                        {activeFase.reward}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="font-body text-[0.95rem] text-gray-500 font-medium max-w-[85%] mb-10"
                      >
                        {activeFase.rewardSub}
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        onClick={goNext}
                        whileHover={{ scale: 1.04, boxShadow: "0 15px 30px rgba(241,32,74,0.4)" }}
                        whileTap={{ scale: 0.96 }}
                        className="h-14 px-10 rounded-full font-display font-black text-lg flex items-center justify-center gap-3 shadow-[0_8px_20px_rgba(241,32,74,0.3)] transition-all cursor-pointer"
                        style={{ backgroundColor: "#F1204A", color: "white" }}
                      >
                        {activeIndex < FASES.length - 1 ? (
                          <>Avançar Trilha <Rocket size={20} /></>
                        ) : (
                          <>Recomeçar Trilha <RotateCcw size={20} /></>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </div>
      </div>
      {/* Modal de Zoom da Imagem */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomedImage}
                alt="Zoom"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
