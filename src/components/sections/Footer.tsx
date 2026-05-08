export function Footer() {
  return (
    <footer className="py-8 lg:py-12" style={{ backgroundColor: "#EDD4B2", borderTop: "1px solid rgba(3,54,36,0.05)" }}>
      <div className="w-full max-w-[430px] lg:max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-0">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/TTSLogoFullBlack.svg" alt="TikTok Shop" className="h-7 lg:h-9 w-auto opacity-80" />
        </div>

        {/* Copy */}
        <p className="font-body text-[0.7rem] lg:text-sm text-center lg:text-left font-medium" style={{ color: "#4A0505", opacity: 0.6 }}>
          © TikTok Shop · Programa Trilha de Aceleração · Categoria Moda
        </p>

        {/* Links */}
        <div className="flex items-center gap-6 lg:gap-8 bg-white/30 px-6 py-3 rounded-full">
          <a href="#hero" className="font-display font-black text-[0.7rem] lg:text-xs uppercase tracking-widest hover:text-[#F1204A] transition-colors" style={{ color: "#033624", opacity: 0.8 }}>
            Início
          </a>
          <a href="#fases" className="font-display font-black text-[0.7rem] lg:text-xs uppercase tracking-widest hover:text-[#F1204A] transition-colors" style={{ color: "#033624", opacity: 0.8 }}>
            A Trilha
          </a>
          <a href="https://seller-br.tiktok.com" target="_blank" rel="noopener noreferrer" className="font-display font-black text-[0.7rem] lg:text-xs uppercase tracking-widest hover:text-[#F1204A] transition-colors" style={{ color: "#033624", opacity: 0.8 }}>
            Seller Center
          </a>
        </div>
      </div>
    </footer>
  );
}
