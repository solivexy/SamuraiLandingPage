"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Swords, Shield, Zap, Target } from "lucide-react";

const features = [
  {
    icon: <Swords className="w-10 h-10 text-brand-primary" />,
    title: "Fluid Combat",
    description: "Experience a meticulously crafted combat system that rewards timing, precision, and strategic strikes. No button mashing here.",
    className: "md:col-span-2 md:row-span-2 min-h-[400px]",
  },
  {
    icon: <Shield className="w-8 h-8 text-zinc-400 group-hover:text-brand-primary transition-colors duration-300" />,
    title: "Unbreakable Defense",
    description: "Master the art of parrying. A well-timed block can shatter your enemy's stance and turn the tide of any battle instantly.",
    className: "md:col-span-1 min-h-[300px]",
  },
  {
    icon: <Zap className="w-8 h-8 text-zinc-400 group-hover:text-brand-primary transition-colors duration-300" />,
    title: "Lethal Agility",
    description: "Dash, dodge, and roll out of harm's way with buttery smooth, responsive movement mechanics designed for high-stakes duels.",
    className: "md:col-span-1 min-h-[300px]",
  },
  {
    icon: <Target className="w-8 h-8 text-zinc-400 group-hover:text-brand-primary transition-colors duration-300" />,
    title: "Precision Targeting",
    description: "Lock onto your foes to deliver devastating combos with absolute accuracy and lethal grace. Every strike counts.",
    className: "md:col-span-3 min-h-[300px]",
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`bg-[#0a0a0a] border border-white/5 transition-colors p-10 md:p-14 group relative overflow-hidden flex flex-col justify-end ${feature.className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 40%)`
          ),
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(185, 28, 28, 0.15), transparent 40%)`
          ),
        }}
      />
      
      {/* Hover Background */}
      <div className="absolute inset-0 bg-brand-primary/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
      
      <div className="relative z-10 mt-auto">
        <div className="mb-8">
          {feature.icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4 uppercase tracking-wider group-hover:text-brand-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-zinc-400 leading-relaxed text-lg max-w-lg">
          {feature.description}
        </p>
      </div>

      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/0 group-hover:border-brand-primary/50 transition-colors duration-500 m-6" />
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yGrid = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-40 relative overflow-hidden bg-background">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-24 md:flex items-end justify-between max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-brand-primary" />
              <span className="text-brand-primary font-display tracking-[0.3em] uppercase text-sm">Features</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-7xl font-display font-bold tracking-tight text-white uppercase leading-none"
            >
              Master The <br/><span className="text-brand-primary">Technique</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 max-w-md mt-8 md:mt-0 text-lg border-l-2 border-brand-primary pl-4"
          >
            Every encounter is a deadly dance. Learn your enemy&apos;s moves and exploit their weaknesses to survive.
          </motion.p>
        </div>

        <motion.div style={{ y: yGrid }} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-card-border will-change-transform">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
