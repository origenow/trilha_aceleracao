"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Play, Volume2, VolumeX, Heart, MessageCircle, Share2, Music2, ChevronDown } from "lucide-react";

export function VideoPlayerSection({ canPlay = false }: { canPlay?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0.35, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0.31, 0.8], [0, -100]);
  const iniciarOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  
  // Pausa o vídeo ao sair da visão (Intersection Observer)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se o vídeo não estiver mais intersectando (visível) e estiver tocando, pausamos
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 } // Dispara quando menos de 10% do vídeo está visível
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Autoplay só depois que o intro terminar E o vídeo estiver pronto
  useEffect(() => {
    if (!canPlay) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().then(() => setIsPlaying(true)).catch(() => { });
    };

    // readyState >= 3 (HAVE_FUTURE_DATA) = já tem dados suficientes para tocar
    if (video.readyState >= 3) {
      tryPlay();
    } else {
      // Aguarda o vídeo estar pronto
      video.addEventListener("canplay", tryPlay, { once: true });
      return () => video.removeEventListener("canplay", tryPlay);
    }
  }, [canPlay]);

  // Progresso da barra
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const update = () => {
      const p = (video.currentTime / video.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };
    video.addEventListener("timeupdate", update);
    return () => video.removeEventListener("timeupdate", update);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      // Unmute on first manual play interaction
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => setIsPlaying(true)).catch(() => { });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full bg-[#e8e8e8] md:hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.section
          style={{ scale, borderRadius, opacity, y }}
          className="relative w-full h-full bg-black overflow-hidden shadow-2xl origin-center"
        >
          {/* Logo TikTok */}
          <div className="absolute top-8 left-6 z-50 pointer-events-none">
            <img src="/tiktok-icon.svg" alt="TikTok" className="w-16 h-16" />
          </div>

          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            src="/assets/videos/Video%20Mobile_opt.mp4"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onClick={togglePlay}
          />

          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">

            {/* Ações direita */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center pointer-events-auto">
              <motion.div whileTap={{ scale: 0.8 }} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-colors">
                  <Heart size={24} fill="white" />
                </div>
                <span className="text-[10px] text-white font-bold">24.5K</span>
              </motion.div>

              <motion.div whileTap={{ scale: 0.8 }} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-colors">
                  <MessageCircle size={24} fill="white" />
                </div>
                <span className="text-[10px] text-white font-bold">1.2K</span>
              </motion.div>

              <motion.div whileTap={{ scale: 0.8 }} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-colors">
                  <Share2 size={24} fill="white" />
                </div>
                <span className="text-[10px] text-white font-bold">Compartilhar</span>
              </motion.div>

              <motion.button
                whileTap={{ scale: 0.8 }}
                animate={isMuted ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={isMuted ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" } : {}}
                onClick={toggleMute}
                className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 ${isMuted ? "bg-[#F1204A]/80 shadow-[0_0_15px_rgba(241,32,74,0.5)]" : "bg-black/40"
                  }`}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </motion.button>
            </div>

            {/* Rodapé */}
            <div className="flex flex-col gap-3 max-w-[80%] pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-white text-lg tracking-tight">@tiktokshop_br</span>
                <span className="bg-[#F1204A] text-white text-[9px] font-black px-2 py-0.5 rounded-sm">OFICIAL</span>
              </div>
              <p className="text-white text-sm font-body leading-snug">
                Descubra como a Trilha de Aceleração pode transformar seu negócio hoje! 🚀 #TikTokShop #Moda #Ecommerce
              </p>
              <div className="flex items-center gap-2 text-white/80 overflow-hidden">
                <Music2 size={14} className="shrink-0" />
                <div className="text-[11px] whitespace-nowrap animate-marquee-video">
                  Som original - TikTok Shop Brasil - Cresça com a gente
                </div>
              </div>
            </div>

            {/* Play/Pause overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-20 h-20 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 text-white">
                    <Play size={40} fill="white" className="ml-2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Barra de progresso */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.section>

        {/* Botão "iniciar" + seta para próxima seção — some ao scrollar */}
        <motion.div
          style={{ opacity: iniciarOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
        >
          <button
            onClick={togglePlay}
            className="px-7 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-display font-bold tracking-widest uppercase shadow-lg hover:bg-white/25 transition-colors"
            aria-label="Iniciar vídeo"
          >
            iniciar
          </button>
          <button
            onClick={() => {
              const next = document.querySelector<HTMLElement>("#hero");
              next?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
            aria-label="Ir para próxima seção"
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="flex"
            >
              <ChevronDown size={18} />
            </motion.span>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee-video {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-video {
          animation: marquee-video 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
