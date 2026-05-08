"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { Trophy, ShoppingBag, Crown, Rocket, Gem, Gift, Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw } from "lucide-react";
import { ModaHandwriting } from "@/components/ui/ModaHandwriting";

/* ── Floating Doodle component ───────────────────────────────── */
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
  reverse = false,
  parallaxX,
  parallaxY
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
  parallaxX?: any;
  parallaxY?: any;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${reverse ? 'animate-float-reverse' : 'animate-float'}`}
    style={{
      top, left, right, bottom,
      width: size, height: size,
      animationDelay: `${delay}s`,
      opacity,
      x: parallaxX,
      y: parallaxY,
    }}
  >
    <img
      src={src}
      alt=""
      className="w-full h-full object-contain"
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  </motion.div>
);

/* ── Badge circular girando ───────────────────────────────────── */
const CircularBadge = () => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[#EDBBE8] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(237,187,232,0.6)] rotate-12 hover:scale-110 hover:rotate-0 transition-all duration-500 cursor-pointer border-[3px] border-white/40">
    <div className="absolute inset-1 animate-[spin_12s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          id="circlePath"
          d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text
          style={{ fontSize: "10px", fontFamily: "TikTokSansDisplay", fontWeight: 900, letterSpacing: "0.15em" }}
          fill="#4A0505"
        >
          <textPath href="#circlePath" startOffset="0%">
            CATEGORIA MODA • CATEGORIA MODA •{" "}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center group">
      <Trophy size={40} color="#4A0505" className="group-hover:scale-110 transition-transform" />
    </div>
  </div>
);

/* ── Arrow components for bottom section (adapted to TikTok aesthetics) ───────────────────────────────── */
const ArrowBlack1 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#033624] stroke-current overflow-visible" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const ArrowBlack2 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#033624] stroke-current overflow-visible" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

export function HeroSectionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const hasAutoStarted = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 70, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 70, damping: 20 });

  // Parallax vectors
  const parallax1X = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  const parallax1Y = useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]);

  const parallax2X = useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]);
  const parallax2Y = useTransform(mouseYSpring, [-0.5, 0.5], [40, -40]);

  const parallax3X = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const parallax3Y = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  // Scroll-driven video expansion — starts earlier with "start 80%"
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start 80%", "end start"],
  });

  // Scale-based growth from center: 138px → 70vw (faster, stops at 0.20)
  const targetWidth = typeof window !== "undefined" ? window.innerWidth * 0.7 : 1008;
  const scaleFactor = targetWidth / 138;
  const videoScale = useTransform(videoScrollProgress, [0, 0.38], [1, scaleFactor]);
  const videoBorderRadius = useTransform(videoScrollProgress, [0, 0.38], [20, 24 / scaleFactor]);
  const videoRotate = useTransform(videoScrollProgress, [0, 0.28], [8, 0]);
  const smallInfoOpacity = useTransform(videoScrollProgress, [0, 0.20], [1, 0]);
  const controlsOpacity = useTransform(videoScrollProgress, [0, 0.38], [0, 1]);
  const sectionExitOpacity = useTransform(videoScrollProgress, [0.82, 0.96], [1, 0]);

  // Play + unmute once when fully expanded; mute when exiting
  useEffect(() => {
    const unsubscribe = videoScrollProgress.on("change", (v) => {
      if (!videoRef.current) return;
      if (v > 0.38 && !hasAutoStarted.current) {
        videoRef.current.play().catch(() => { });
        videoRef.current.muted = false;
        setIsPlaying(true);
        setIsMuted(false);
        hasAutoStarted.current = true;
      }
      if (v <= 0.38) {
        hasAutoStarted.current = false;
      }
      if (v > 0.82) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    });
    return unsubscribe;
  }, [videoScrollProgress]);

  // Video control handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const skipBack = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
  };

  const skipForward = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
  };

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    videoRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * videoRef.current.duration;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.duration) setVideoProgress(video.currentTime / video.duration);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col font-sans selection:bg-[#F1204A] selection:text-white relative overflow-hidden w-full"
      style={{ backgroundColor: "#BAF6F0" }}
    >

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#03362415_1px,transparent_1px),linear-gradient(to_bottom,#03362415_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      {/* Doodles absolutos com Parallax */}
      <FloatingDoodle src="/assets_new/manequim.svg" size={86} bottom="32%" left="4%" rotate={12} delay={0.5} opacity={0.4} reverse parallaxX={parallax1X} parallaxY={parallax1Y} />
      <FloatingDoodle src="/assets_new/2.svg" size={60} top="45%" right="4%" rotate={-12} delay={1.5} opacity={0.35} parallaxX={parallax2X} parallaxY={parallax2Y} />
      <FloatingDoodle src="/assets_new/camera.svg" size={72} top="38%" left="6%" rotate={45} delay={0.8} opacity={0.4} reverse parallaxX={parallax3X} parallaxY={parallax3Y} />
      <FloatingDoodle src="/assets_new/5.svg" size={56} top="18%" right="10%" rotate={0} delay={2.1} opacity={0.25} parallaxX={parallax1X} parallaxY={parallax2Y} />
      <FloatingDoodle src="/assets_new/cosmetics.svg" size={79} top="8%" right="6%" rotate={-15} delay={1.2} opacity={0.3} parallaxX={parallax2X} parallaxY={parallax1Y} />
      <FloatingDoodle src="/assets_new/7.svg" size={50} bottom="15%" right="8%" rotate={20} delay={0.3} opacity={0.15} reverse parallaxX={parallax3X} parallaxY={parallax2Y} />
      <FloatingDoodle src="/assets_new/8.svg" size={38} top="25%" left="8%" rotate={-30} delay={2.5} opacity={0.2} parallaxX={parallax1X} parallaxY={parallax1Y} />
      <FloatingDoodle src="/assets_new/9.svg" size={52} bottom="40%" right="12%" rotate={10} delay={1.8} opacity={0.1} parallaxX={parallax2X} parallaxY={parallax3Y} />
      <FloatingDoodle src="/assets_new/10.svg" size={46} top="55%" left="2%" rotate={5} delay={0.1} opacity={0.3} parallaxX={parallax3X} parallaxY={parallax1Y} />
      <FloatingDoodle src="/assets_new/manequim.svg" size={58} bottom="5%" left="15%" rotate={-20} delay={3.2} opacity={0.25} reverse parallaxX={parallax2X} parallaxY={parallax2Y} />


      {/* Hero Section Main Content */}
      <main className="flex-1 relative z-10 pt-10 pb-16 md:pt-12 md:pb-20 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto min-h-[60vh]">

        {/* Massive Typography & Elements Container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-2 mb-8">

          {/* Text Stack */}
          <motion.div
            style={{ x: parallax3X, y: parallax3Y }}
            className="w-full flex flex-col items-center relative z-10 space-y-6 md:space-y-10"
          >
            {/* TRILHA DE */}
            <div className="w-full flex justify-start pl-[5%] md:pl-[15%] relative z-30">
              <h1
                className="text-[clamp(4.5rem,11vw,150px)] font-black leading-[0.85] tracking-tighter text-[#033624] m-0 p-0 uppercase hover:scale-105 transition-transform duration-500 cursor-default"
                style={{
                  fontFamily: 'TikTokSansDisplay, "Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 rgba(255,255,255,0.8), 2px 2px 0 rgba(255,255,255,0.8), 3px 3px 0 rgba(255,255,255,0.8), 4px 4px 0 rgba(255,255,255,0.8)'
                }}
              >
                TRILHA DE
              </h1>
            </div>

            {/* ACELERAÇÃO */}
            <div className="w-full flex justify-center relative z-20">
              <h1
                className="text-[clamp(4.5rem,13vw,200px)] font-black leading-[0.85] tracking-tighter text-[#F1204A] m-0 p-0 uppercase hover:scale-[1.02] transition-transform duration-500 cursor-default"
                style={{
                  fontFamily: 'TikTokSansDisplay, "Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #033624, 2px 2px 0 #033624, 3px 3px 0 #033624, 4px 4px 0 #033624, 5px 5px 0 #033624, 6px 6px 0 #033624, 7px 7px 0 #033624, 8px 8px 0 #033624, 9px 9px 0 #033624, 10px 10px 0 #033624, 11px 11px 0 #033624'
                }}
              >
                ACELERAÇÃO
              </h1>
            </div>

            {/* TIKTOK SHOP */}
            <div className="w-full flex justify-start pl-[15%] md:pl-[30%] relative z-10">
              <h1
                className="text-[clamp(4.5rem,11vw,150px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase hover:scale-105 hover:-rotate-1 transition-transform duration-500 cursor-default"
                style={{
                  fontFamily: 'TikTokSansDisplay, "Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #033624, 2px 2px 0 #033624, 3px 3px 0 #033624, 4px 4px 0 #033624, 5px 5px 0 #033624, 6px 6px 0 #033624, 7px 7px 0 #033624, 8px 8px 0 #033624, 9px 9px 0 #033624'
                }}
              >
                TIKTOK SHOP
              </h1>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href="#fases"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(241, 32, 74, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 md:mt-12 relative z-50 px-10 py-5 rounded-full text-white text-lg font-display font-black flex items-center gap-3 overflow-hidden group cursor-pointer"
            style={{ backgroundColor: "#F1204A" }}
          >
            {/* Brilho animado passando no botão */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            <Rocket size={24} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            Começar a Trilha
          </motion.a>

          {/* Absolute Overlays (Cards & Badge) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">

            {/* Floating Glass Card 1 (Bottom Left) */}
            <motion.div
              style={{ x: parallax2X, y: parallax2Y }}
              className="absolute bottom-[20%] md:bottom-[10%] left-[0%] md:left-[10%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 md:w-56 aspect-[3/3.5] bg-white/20 backdrop-blur-xl border-2 border-white/50 rounded-[2rem] p-6 flex flex-col items-center justify-center rotate-[-12deg] shadow-[0_20px_50px_rgba(3,54,36,0.15)] hover:rotate-0 hover:scale-110 hover:bg-white/40 transition-all duration-500 cursor-pointer group"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#2DCCD3] rounded-full flex items-center justify-center mb-4 shadow-inner border-[4px] border-white/60 overflow-hidden group-hover:rotate-12 transition-transform duration-500">
                  <ShoppingBag size={40} className="text-[#033624]" />
                </div>
                <div className="text-center mt-2">
                  <p className="font-display font-black text-sm md:text-xl text-[#033624]">Fase 1</p>
                  <p className="text-[10px] md:text-sm font-black text-[#F1204A] mt-1">Até R$ 2.400</p>
                  <p className="text-[9px] md:text-[11px] font-bold text-[#033624]/70 leading-tight mt-1 uppercase tracking-wide">em cupons</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Cursive "Moda" — topo direito superior com parallax */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute pointer-events-none z-20"
              style={{
                right: "-20%",
                top: "3%",
                width: "clamp(160px, 18vw, 280px)",
                rotate: 10,
                x: parallax3X,
                y: parallax3Y,
                filter: "drop-shadow(2px 3px 0px rgba(255,255,255,0.55))",
              }}
            >
              <ModaHandwriting color="#033624" strokeWidth={5} />
            </motion.div>

            {/* Floating Glass Card 2 (Yellow — Diamante) */}
            <motion.div
              style={{ x: parallax1X, y: parallax1Y, right: "calc(-6% - 60px)" }}
              className="absolute top-[5%] md:top-auto md:bottom-[0%] z-30 pointer-events-auto"
            >
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-40 md:w-56 aspect-[3/3.5] bg-white/20 backdrop-blur-xl border-2 border-white/50 rounded-[2rem] p-6 flex flex-col items-center justify-center rotate-[12deg] shadow-[0_20px_50px_rgba(3,54,36,0.15)] hover:rotate-0 hover:scale-110 hover:bg-white/40 transition-all duration-500 cursor-pointer group"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#FBEB35] rounded-full flex items-center justify-center mb-4 shadow-inner border-[4px] border-white/60 overflow-hidden group-hover:-rotate-12 transition-transform duration-500">
                  <Crown size={40} className="text-[#033624]" />
                </div>
                <div className="text-center mt-2">
                  <p className="font-display font-black text-sm md:text-xl text-[#033624]">Diamante</p>
                  <p className="text-[10px] md:text-sm font-black text-[#F1204A] mt-1">Gerente VIP</p>
                  <p className="text-[9px] md:text-[11px] font-bold text-[#033624]/70 leading-tight mt-1 uppercase tracking-wide">Exclusivo</p>
                </div>
              </motion.div>
            </motion.div>


            {/* Circular Badge */}
            <motion.div
              style={{ x: parallax2X, y: parallax1Y }}
              className="absolute bottom-[-10%] md:bottom-[-15%] right-[5%] md:right-[15%] z-40 pointer-events-auto"
            >
              <CircularBadge />
            </motion.div>

          </div>
        </div>
      </main>

      {/* ═══ Seção do Vídeo expandindo no scroll ═══ */}
      <div ref={videoSectionRef} className="relative z-10 w-full" style={{ height: "125vh" }}>
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#BAF6F0" }}>
          {/* Background grid contínuo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#03362415_1px,transparent_1px),linear-gradient(to_bottom,#03362415_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Wrapper com fade-out de saída */}
          <motion.div
            style={{ opacity: sectionExitOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Video container — cresce do centro usando scale */}
            <motion.div
              style={{
                scale: videoScale,
                borderRadius: videoBorderRadius,
                rotate: videoRotate,
              }}
              className="relative overflow-hidden border-2 border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.25)] origin-center cursor-pointer"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                className="object-cover"
                src="/assets/videos/Videobruna_opt.mp4"
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                style={{ width: 138, aspectRatio: "16/9" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Small overlay — fades out */}
              <motion.div
                className="absolute bottom-0 inset-x-0 p-2"
                style={{ opacity: smallInfoOpacity }}
              >
                <p className="text-white text-[9px] font-display font-black leading-tight">@bruna.moda</p>
                <p className="text-white/60 text-[8px] font-body">Trilha de Aceleração</p>
              </motion.div>

            </motion.div>

            {/* ═══ Video Controls (aparecem junto com a expansão) ═══ */}
            <motion.div
              style={{ opacity: controlsOpacity }}
              className="absolute bottom-[12%] z-50 flex flex-col items-center gap-3 pointer-events-auto"
            >
              {/* Progress bar */}
              <div
                className="w-[min(70vw,1008px)] h-[3px] rounded-full bg-white/20 cursor-pointer relative overflow-hidden group"
                onClick={seekVideo}
              >
                <div
                  className="h-full bg-blaze rounded-full group-hover:bg-blaze/90 transition-colors duration-200"
                  style={{ width: `${videoProgress * 100}%` }}
                />
              </div>

              {/* Buttons row */}
              <div className="flex items-center gap-3">

                {/* Skip Back 10s */}
                <button
                  onClick={skipBack}
                  className="w-12 h-12 rounded-full flex flex-col items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Voltar 10 segundos"
                >
                  <RotateCcw size={16} className="text-white" />
                  <span className="text-white text-[9px] font-bold leading-none mt-0.5">10s</span>
                </button>

                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-white" fill="white" />
                  ) : (
                    <Play size={20} className="text-white ml-0.5" fill="white" />
                  )}
                </button>

                {/* Skip Forward 10s */}
                <button
                  onClick={skipForward}
                  className="w-12 h-12 rounded-full flex flex-col items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Adiantar 10 segundos"
                >
                  <RotateCw size={16} className="text-white" />
                  <span className="text-white text-[9px] font-bold leading-none mt-0.5">10s</span>
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label={isMuted ? "Ativar som" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX size={20} className="text-white" />
                  ) : (
                    <Volume2 size={20} className="text-white" />
                  )}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Tela cheia"
                >
                  <Maximize size={20} className="text-white" />
                </button>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <section className="bg-white text-[#033624] rounded-t-[3.5rem] px-6 py-8 md:px-10 md:py-12 relative z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.08)] w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

          {/* Card 1: tarefas */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-[#F8F9FA] to-white rounded-[2.5rem] p-6 flex flex-col items-center text-center relative h-64 border-2 border-gray-50 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#BAF6F0] rounded-full mb-4 flex items-center justify-center text-[#033624]">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl md:text-[1.7rem] uppercase leading-none mb-3 font-black font-display text-[#033624] tracking-tight">
              COMPLETE<br />TAREFAS
            </h3>
            <p className="text-[11px] md:text-[0.8rem] text-[#033624]/60 font-bold uppercase tracking-widest mb-auto font-body">
              3 Fases em 60 dias
            </p>

            {/* Pill Graphic */}
            <div className="relative w-full flex justify-center mt-6">
              <div className="flex items-center bg-[#2DCCD3] rounded-2xl p-2 pr-12 shadow-lg relative z-10 border border-white/20">
                <div className="w-10 h-10 bg-white rounded-full mr-3 flex items-center justify-center flex-shrink-0">
                  <Rocket size={20} className="text-[#033624]" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black font-display text-[#033624] leading-none">Fase Inicial</p>
                  <p className="text-[9px] text-[#033624]/80 font-bold uppercase tracking-wider mt-1">1 a 5 dias</p>
                </div>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#033624] text-white font-black text-[10px] px-3 py-2 rounded-xl z-20 shadow-md">
                + Pontos
              </div>
            </div>

            {/* Arrow pointing to next card */}
            <div className="hidden md:block absolute -right-14 bottom-12 w-20 h-20 z-30 opacity-60">
              <ArrowBlack1 />
            </div>
          </motion.div>

          {/* Card 2: Recompensas */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-[#F8F9FA] to-white rounded-[2.5rem] p-6 flex flex-col items-center text-center relative h-64 border-2 border-gray-50 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#F1204A]/10 rounded-full mb-4 flex items-center justify-center text-[#F1204A]">
              <Gift size={24} />
            </div>
            <h3 className="text-xl md:text-[1.7rem] uppercase leading-none mb-3 font-black font-display text-[#033624] tracking-tight">
              DESBLOQUEIE<br />CUPONS
            </h3>
            <p className="text-[11px] md:text-[0.8rem] text-[#033624]/60 font-bold uppercase tracking-widest mb-auto font-body">
              Até R$2.400 em verba
            </p>

            {/* Pill Graphic */}
            <div className="relative w-full flex justify-center mt-6">
              <div className="flex items-center bg-[#F1204A] rounded-full p-2 shadow-xl border border-white/20">
                <div className="bg-white/20 text-white font-black text-sm px-5 py-2.5 rounded-full mr-2 backdrop-blur-md">
                  R$ 2.400
                </div>
                <div className="font-black text-xs px-4 text-white uppercase tracking-wider">
                  CUPOM
                </div>
              </div>

              {/* Small floating green pill */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-5 right-1/4 bg-[#2DCCD3] rounded-full p-2.5 shadow-lg transform rotate-12 z-20 border border-white"
              >
                <Gift size={18} className="text-[#033624]" />
              </motion.div>
            </div>

            {/* Arrow pointing to next card */}
            <div className="hidden md:block absolute -right-14 bottom-12 w-20 h-20 z-30 opacity-60">
              <ArrowBlack2 />
            </div>
          </motion.div>

          {/* Card 3: Diamante */}
          <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-[#F8F9FA] to-white rounded-[2.5rem] p-6 flex flex-col items-center text-center relative h-64 border-2 border-gray-50 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#FBEB35]/20 rounded-full mb-4 flex items-center justify-center text-[#8a7a00]">
              <Gem size={24} />
            </div>
            <h3 className="text-xl md:text-[1.7rem] uppercase leading-none mb-3 font-black font-display text-[#033624] tracking-tight">
              TORNE-SE<br />DIAMANTE
            </h3>
            <p className="text-[11px] md:text-[0.8rem] text-[#033624]/60 font-bold uppercase tracking-widest mb-auto font-body">
              Suporte VIP Exclusivo
            </p>

            {/* Pill Graphic */}
            <div className="flex flex-col items-center bg-[#FBEB35] rounded-[2rem] px-8 py-5 text-[#033624] shadow-xl mt-6 relative w-full max-w-[220px] border border-white/40">
              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5 font-body opacity-80">Status Alcançado</p>
              <p className="text-2xl font-black font-display flex items-center gap-2"><Gem size={20} /> VIP</p>

              {/* Speech bubble tail */}
              <div className="absolute -bottom-2.5 left-10 w-6 h-6 bg-[#FBEB35] transform rotate-45 border-r border-b border-white/10"></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Tailwind custom animation for shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
