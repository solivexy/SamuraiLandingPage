"use client";

import { useRef, useEffect } from "react";
import { useInView, motion, useScroll, useTransform } from "framer-motion";

interface LazyVideoProps {
  src?: string;
  sources?: { src: string; type: string }[];
  className?: string;
  parallax?: boolean;
  startTime?: number;
  endTime?: number;
}

export default function LazyVideo({ src, sources, className = "", parallax = false, startTime, endTime }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.play().catch(e => console.log("Auto-play prevented", e));
    }
  }, [isInView]);

  if (parallax) {
    return (
      <div ref={containerRef} className={`overflow-hidden ${className}`}>
        <motion.video 
          style={{ y, scale: 1.15 }}
          ref={ref as React.Ref<HTMLVideoElement>}
          src={isInView && src ? src : undefined}
          autoPlay={isInView}
          loop={!endTime} 
          muted 
          playsInline
          preload="metadata"
          className="w-full h-full object-cover will-change-transform"
          onTimeUpdate={(e) => {
            if (endTime && e.currentTarget.currentTime >= endTime) {
              e.currentTarget.currentTime = startTime || 0;
              e.currentTarget.play();
            }
          }}
          onLoadedMetadata={(e) => {
            if (startTime) {
              e.currentTarget.currentTime = startTime;
            }
          }}
        >
          {isInView && sources && sources.map((s, i) => (
            <source key={i} src={s.src} type={s.type} />
          ))}
        </motion.video>
      </div>
    );
  }

  return (
    <video 
      ref={ref}
      src={isInView ? src : undefined}
      autoPlay={isInView}
      loop 
      muted 
      playsInline
      preload="none"
      className={className}
    />
  );
}
