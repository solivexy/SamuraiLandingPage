"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.controls = true;
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const onPlayDemo = () => {
      handlePlay();
    };
    window.addEventListener('playDemo', onPlayDemo);
    return () => window.removeEventListener('playDemo', onPlayDemo);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="demo" className="py-32 md:py-48 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Witness The <br /><span className="font-black text-brand-primary">Carnage</span>
          </h2>
        </div>
        <div className="w-full md:w-1/3 text-zinc-400 font-light text-sm md:text-base leading-relaxed">
          Experience the visceral combat and stunning environments in our latest gameplay demo. Every frame is rendered in real-time engine footage.
        </div>
      </div>

      <div id="demo-video">
        <motion.div 
          style={{ scale, opacity, y }}
          className="w-full max-w-[90rem] mx-auto px-4 md:px-6 relative will-change-transform"
        >
        <div className="aspect-video w-full bg-black relative group rounded-sm overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(185,28,28,0.1)]">
          <video 
            ref={videoRef}
            className={`w-full h-full object-cover transition-transform duration-1000 ${!isPlaying ? "group-hover:scale-105" : ""}`}
            playsInline
            preload="metadata"
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime >= 30) {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 30;
              }
            }}
          >
            <source src="https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/demo-compressed.webm#t=0,30" type="video/webm" />
            <source src="https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/demo-compressed.mp4#t=0,30" type="video/mp4" />
          </video>
          
          {!isPlaying && (
            <div onClick={handlePlay} className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 flex items-center justify-center cursor-pointer z-20">
              <div className="w-24 h-24 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary/20 group-hover:border-brand-primary/50 transition-all duration-500">
                <Play className="w-8 h-8 text-white ml-2 opacity-80 group-hover:opacity-100 group-hover:text-brand-primary transition-colors" />
              </div>
            </div>
          )}
          
          {/* Subtle cinematic overlays */}
          {!isPlaying && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none z-10" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none z-10" />
            </>
          )}
        </div>
        </motion.div>
      </div>
    </section>
  );
}
