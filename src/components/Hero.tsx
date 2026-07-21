"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

function AshParticles() {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, scale: number, duration: number, randomXOffset: number, delay: number}[]>([]);
  
  useEffect(() => {
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      scale: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 10 + 10, // 10-20 seconds
      randomXOffset: Math.random() * 10 - 5,
      delay: Math.random() * (Math.random() * 10 + 10),
    }));
    
    let mounted = true;
    setTimeout(() => {
      if (mounted) setParticles(newParticles);
    }, 0);
    return () => { mounted = false; };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 left-0 w-1 h-1 bg-brand-primary/40 rounded-full blur-[1px] will-change-transform"
          initial={{ y: "-5vh", x: `${p.x}vw`, scale: p.scale, opacity: 0 }}
          animate={{
            y: "105vh",
            x: [`${p.x}vw`, `${p.x + p.randomXOffset}vw`, `${p.x}vw`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Cinematic Poster */}
      <motion.div style={{ scale, y: yBg }} className="absolute inset-0 z-0 will-change-transform">
        <Image 
          src="https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/hero-bg-v2.png" 
          alt="Samurai Background"
          fill
          priority
          className="object-cover object-center opacity-40 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
      </motion.div>

      <AshParticles />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center pt-20"
      >
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display tracking-tighter text-white mb-6 sm:mb-8 uppercase leading-[0.9]"
        >
          <span className="font-light text-zinc-300">Forge Your</span> <br />
          <span className="font-black text-brand-primary">Legacy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-3xl font-light text-zinc-400 max-w-2xl mb-8 sm:mb-12 border-l-2 border-brand-primary pl-4 sm:pl-6 leading-relaxed"
        >
          Draw your blade in a brutal, uncompromising world. Master fluid combat mechanics and strike down your enemies with lethal precision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton
            href="https://github.com/Ymr76/SamuraiShidown/archive/refs/heads/main.zip"
            className="group relative inline-flex h-14 items-center justify-center bg-brand-primary px-8 font-display font-bold text-white transition-all hover:bg-brand-secondary active:scale-95 slash-hover w-full sm:w-auto uppercase tracking-[0.2em] text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-5 h-5" /> Download Game
            </span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-6 md:left-auto md:right-12 flex items-center gap-4 text-zinc-500 z-20"
      >
        <div className="w-12 h-[1px] bg-brand-primary" />
        <span className="text-xs uppercase tracking-[0.2em] font-display">Scroll Down</span>
      </motion.div>
    </section>
  );
}
