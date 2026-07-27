import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import LazyVideo from "@/components/LazyVideo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-brand-primary/30">
      <Navbar />
      <Hero />
      <Demo />
      <Features />
      <Showcase />
      
      {/* Pre-footer Download CTA */}
      <section id="download" className="py-48 md:py-64 relative flex items-center justify-center overflow-hidden border-b border-card-border">
        <div className="absolute inset-0 bg-black" />
        <LazyVideo 
          sources={[
            { src: "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/demo-compressed.webm", type: "video/webm" },
            { src: "https://0vuqmueajuslwprp.public.blob.vercel-storage.com/samurai-assets/demo-compressed.mp4", type: "video/mp4" }
          ]}
          parallax={true}
          startTime={10}
          endTime={20}
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-brand-primary/10 mix-blend-overlay" />
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-10 tracking-tight uppercase leading-none">
            Your Blade <br /> <span className="text-brand-primary">Awaits</span>
          </h2>
          <p className="text-lg md:text-2xl text-zinc-300 mb-14 border-l-2 border-brand-primary pl-6 max-w-2xl mx-auto text-left">
            Download now and join the battle. Master the art of the sword, or perish trying.
          </p>
          <MagneticButton
            href="https://github.com/Ymr76/SamuraiShidown/releases/download/Release/SamuraiShidown.zip"
            className="group relative inline-flex h-16 items-center justify-center bg-brand-primary px-12 font-display font-bold text-white transition-all hover:bg-brand-secondary active:scale-95 slash-hover uppercase tracking-[0.2em] text-lg ring-4 ring-brand-primary/20 hover:ring-brand-primary/40"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Download className="w-6 h-6" /> Download Game
            </span>
          </MagneticButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
