"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

const screenshots = [
  "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/Screenshot_21-Jul_13-04-24_22597.png",
  "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/Screenshot_21-Jul_13-04-36_30681.png",
  "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/Screenshot_21-Jul_13-04-49_6885.png",
  "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/Screenshot_21-Jul_13-05-03_22341.png",
];

function TiltCard({ src, yTransform, className = "" }: { src: string; yTransform: MotionValue<string>; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ y: yTransform }}
      className={`relative w-full aspect-[4/3] ${className} will-change-transform`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 group cursor-pointer shadow-2xl will-change-transform"
      >
        <Image
          src={src}
          alt="Gameplay screenshot"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110 grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </motion.div>
    </motion.div>
  );
}

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["15%", "-25%"]);

  return (
    <section id="showcase" ref={containerRef} className="py-24 md:py-40 relative bg-card-bg border-y border-card-border overflow-hidden perspective-[2000px]">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8"
        >
          <div className="w-8 md:w-12 h-[1px] bg-brand-primary" />
          <span className="text-brand-primary font-display tracking-[0.3em] uppercase text-xs md:text-sm">Visuals</span>
          <div className="w-8 md:w-12 h-[1px] bg-brand-primary" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-white uppercase leading-none"
        >
          Blood & <span className="text-brand-primary">Steel</span>
        </motion.h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TiltCard src={screenshots[0]} yTransform={y1} className="md:mt-0" />
          <TiltCard src={screenshots[1]} yTransform={y2} className="md:mt-32" />
          <TiltCard src={screenshots[2]} yTransform={y1} className="md:mt-0" />
          <TiltCard src={screenshots[3]} yTransform={y2} className="md:mt-32" />
        </div>
        
        {/* Global Vignette over grid */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-20" />
      </div>
    </section>
  );
}
