"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  color?: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  accentColor?: string;
  isFixed: boolean;
  closeOnClickAway?: boolean;
  toggleClassName?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#2DCCD3", "#033624"],
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  className,
  logoUrl = "/assets/3.svg",
  accentColor = "#F1204A",
  isFixed = false,
  closeOnClickAway = true,
  toggleClassName,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [hoveredItemIdx, setHoveredItemIdx] = useState<number | null>(null);

  // Portal só pode ser criado no cliente
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ── Refs do overlay ──────────────────────────────────────────
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  // ── Refs do botão (no portal) ───────────────────────────────
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Fechar"]);

  // ── GSAP refs ────────────────────────────────────────────────
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  // ── Inicialização GSAP — roda após o portal montar ──────────
  // Depende de `mounted` para garantir que os refs do portal existem.
  useEffect(() => {
    if (!mounted) return;

    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    const textInner = textInnerRef.current;

    if (!panel || !plusH || !plusV || !icon || !textInner) return;

    const preLayers = preContainer
      ? (Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[])
      : [];
    preLayerElsRef.current = preLayers;

    const offscreen = position === "left" ? -100 : 100;
    gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
    if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });

    gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
    gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
    gsap.set(textInner, { yPercent: 0 });
  }, [mounted, position]);

  // ── Abrir ────────────────────────────────────────────────────
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity" as never]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsert = lastTime + (layers.length ? 0.08 : 0);
    const panelDur = 0.65;

    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDur, ease: "power4.out" }, panelInsert);

    if (itemEls.length) {
      const start = panelInsert + panelDur * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1, from: "start" } }, start);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: "power2.out", ["--sm-num-opacity" as never]: 1, stagger: { each: 0.08, from: "start" } }, start + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const ss = panelInsert + panelDur * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, ss);
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0, opacity: 1, duration: 0.55, ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
        }, ss + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  // ── Fechar ───────────────────────────────────────────────────
  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const iEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
        if (iEls.length) gsap.set(iEls, { yPercent: 140, rotate: 10 });
        const nEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
        ) as HTMLElement[];
        if (nEls.length) gsap.set(nEls, { ["--sm-num-opacity" as never]: 0 });
        const st = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const sl = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];
        if (st) gsap.set(st, { opacity: 0 });
        if (sl.length) gsap.set(sl, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  // ── Animação ícone ───────────────────────────────────────────
  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  // ── Animação texto ───────────────────────────────────────────
  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const from = opening ? "Menu" : "Fechar";
    const to = opening ? "Fechar" : "Menu";
    const seq: string[] = [from];
    let last = from;
    for (let i = 0; i < 3; i++) {
      last = last === "Menu" ? "Fechar" : "Menu";
      seq.push(last);
    }
    if (last !== to) seq.push(to);
    seq.push(to);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((seq.length - 1) / seq.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + seq.length * 0.07,
      ease: "power4.out",
    });
  }, []);

  // ── Toggle ───────────────────────────────────────────────────
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) { onMenuOpen?.(); playOpen(); }
    else         { onMenuClose?.(); playClose(); }

    animateIcon(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateText(false);
  }, [playClose, animateIcon, animateText, onMenuClose]);

  // ── Fechar ao clicar fora ────────────────────────────────────
  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeOnClickAway, open, closeMenu]);

  // ── Layers de cor (stagger) ──────────────────────────────────
  const layerColors = colors && colors.length ? colors : ["#2DCCD3", "#033624"];

  // ── Render ───────────────────────────────────────────────────
  return (
    <>
      {/* ── Overlay (pre-layers + panel) ── */}
      <div
        className={`sm-scope ${isFixed ? "fixed top-0 left-0 w-screen h-screen overflow-hidden z-[200]" : "z-40 w-full h-full"}`}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div
          className={
            (className ? className + " " : "") +
            "staggered-menu-wrapper pointer-events-none relative w-full h-full"
          }
          style={{ ["--sm-accent" as never]: accentColor } as React.CSSProperties}
          data-position={position}
          data-open={open || undefined}
        >
          {/* Pre-layers */}
          <div
            ref={preLayersRef}
            className="sm-prelayers absolute top-0 bottom-0 pointer-events-none z-[5]"
            aria-hidden="true"
          >
            {layerColors.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full"
                style={{ background: c }}
              />
            ))}
          </div>

          {/* Logo — aparece ao abrir */}
          <div
            className="absolute top-0 left-0 h-16 flex items-center pointer-events-none z-20 px-6"
            style={{ opacity: open ? 1 : 0, transition: "opacity 0.3s ease" }}
            aria-hidden="true"
          >
            <img src={logoUrl} alt="TikTok Shop" className="h-8 w-auto object-contain" />
          </div>

          {/* Panel */}
          <aside
            id="staggered-menu-panel"
            ref={panelRef}
            className="staggered-menu-panel absolute top-0 h-full flex flex-col overflow-y-auto z-10 pointer-events-auto"
            style={{ padding: "5rem 2rem 2rem 2rem", background: "#033624" }}
            aria-hidden={!open}
          >
            <div className="sm-panel-inner flex-1 flex flex-col gap-5">
              <ul
                className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
                role="list"
                data-numbering={displayItemNumbering || undefined}
              >
                {items.length ? (
                  items.map((it, idx) => (
                    <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                      <a
                        className="sm-panel-item relative cursor-pointer leading-none uppercase inline-block no-underline"
                        href={it.link}
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                        onClick={closeMenu}
                        onMouseEnter={() => setHoveredItemIdx(idx)}
                        onMouseLeave={() => setHoveredItemIdx(null)}
                        style={{ color: hoveredItemIdx === idx ? "#BAF6F0" : (it.color ?? "#BAF6F0") }}
                      >
                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                          {it.label}
                        </span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                    <span className="sm-panel-item relative leading-none uppercase inline-block">
                      <span className="sm-panel-itemLabel inline-block">Sem itens</span>
                    </span>
                  </li>
                )}
              </ul>

              {displaySocials && socialItems.length > 0 && (
                <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Links">
                  <h3 className="sm-socials-title m-0">Links</h3>
                  <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                    {socialItems.map((s, i) => (
                      <li key={s.label + i}>
                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link py-[2px] inline-block">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        <style>{`
/* ── StaggeredMenu — TikTok Shop ── */
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; pointer-events: none; }

/* Pre-layers */
.sm-scope .sm-prelayers { position: absolute; top: 0; bottom: 0; right: 0; width: clamp(280px, 55vw, 520px); pointer-events: none; }
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; }

/* Panel */
.sm-scope .staggered-menu-panel { position: absolute; top: 0; right: 0; width: clamp(280px, 55vw, 520px); height: 100%; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }

/* Menu items */
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-panel-item {
  position: relative;
  color: #033624;
  font-family: 'TikTokSansDisplay', sans-serif;
  font-weight: 900;
  font-size: clamp(1.6rem, 6vw, 2.5rem);
  cursor: pointer; line-height: 1.1; letter-spacing: -1px;
  text-transform: uppercase;
  transition: color 0.2s ease;
  display: inline-block; text-decoration: none;
}
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #F1204A); }

/* Numbering */
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem; content: counter(smItem, decimal-leading-zero);
  position: absolute; top: 0.1em; right: -1.8em;
  font-size: 14px; font-weight: 400; color: var(--sm-accent, #F1204A);
  pointer-events: none; user-select: none;
  opacity: var(--sm-num-opacity, 0);
  font-family: 'TikTokSansText', sans-serif;
}

/* Socials */
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 0.9rem; font-weight: 600; font-family: 'TikTokSansText', sans-serif; color: var(--sm-accent, #F1204A); }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 1rem; }
.sm-scope .sm-socials-link { font-size: 1rem; font-weight: 500; font-family: 'TikTokSansText', sans-serif; color: #033624; text-decoration: none; display: inline-block; transition: color 0.2s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #F1204A); }

/* Mobile full-width */
@media (max-width: 767px) {
  .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; }
}

/* Desktop: botão maior */
@media (min-width: 768px) {
  .sm-toggle-btn { font-size: 1.8rem !important; gap: 0.35rem !important; letter-spacing: 0.1em !important; }
  .sm-toggle-icon-wrap { width: 34px !important; height: 34px !important; }
}
        `}</style>
      </div>

      {/* ── Portal: botão fora do stacking context para mix-blend-mode funcionar ── */}
      {mounted && createPortal(
        <div
          className={toggleClassName ?? ""}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "64px",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            zIndex: 250,
            // mix-blend-mode: difference com color white inverte qualquer bg abaixo
            mixBlendMode: "difference",
            color: "#ffffff",
            pointerEvents: "auto",
          }}
        >
          <button
            ref={toggleBtnRef}
            className="sm-toggle-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontFamily: "'TikTokSansDisplay', sans-serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              lineHeight: 1,
              padding: 0,
            }}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            {/* Texto ciclado */}
            <span
              ref={textWrapRef}
              style={{
                position: "relative",
                marginRight: "0",
                display: "inline-block",
                height: "1em",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              aria-hidden="true"
            >
              <span
                ref={textInnerRef}
                style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
              >
                {textLines.map((l, i) => (
                  <span key={i} style={{ display: "block", height: "1em", lineHeight: 1 }}>{l}</span>
                ))}
              </span>
            </span>

            {/* Ícone ×/+ */}
            <span
              ref={iconRef}
              className="sm-toggle-icon-wrap"
              style={{
                position: "relative",
                width: 24,
                height: 24,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform",
              }}
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: "100%", height: 4.5,
                  background: "currentColor", borderRadius: 3,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform",
                }}
              />
              <span
                ref={plusVRef}
                style={{
                  position: "absolute", left: "50%", top: "50%",
                  width: "100%", height: 4.5,
                  background: "currentColor", borderRadius: 3,
                  transform: "translate(-50%, -50%)",
                  willChange: "transform",
                }}
              />
            </span>
          </button>
        </div>,
        document.body
      )}
    </>
  );
};

export default StaggeredMenu;
