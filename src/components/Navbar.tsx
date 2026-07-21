"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? "bg-black/70 backdrop-blur-xl border-white/5 py-0" : "bg-gradient-to-b from-black/80 to-transparent border-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="text-xl sm:text-2xl font-display font-bold tracking-widest text-white uppercase flex items-center gap-2">
          Samurai<span className="text-brand-primary hidden sm:inline">Shidown</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 font-display text-sm tracking-[0.2em] text-zinc-500 uppercase">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#demo" onClick={(e) => {
            e.preventDefault();
            document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => window.dispatchEvent(new CustomEvent('playDemo')), 800);
          }} className="hidden sm:flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">
            <div className="w-8 h-[1px] bg-zinc-600" />
            Watch Demo
          </a>
          <MagneticButton
            href="#download"
            className="group relative inline-flex h-8 sm:h-10 items-center justify-center bg-brand-primary px-4 sm:px-6 font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-secondary active:scale-95 slash-hover z-10"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-4 h-4" /> Download
            </span>
          </MagneticButton>

          <button 
            className="md:hidden text-zinc-300 hover:text-white transition-colors p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4 font-display text-sm tracking-[0.2em] text-zinc-400 uppercase">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-2">Features</a>
              <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-2">Demo</a>
              <a href="#showcase" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors py-2">Showcase</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
