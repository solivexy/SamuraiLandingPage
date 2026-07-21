import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-3xl font-display font-bold tracking-widest text-white uppercase">
            Samurai<span className="text-brand-primary">Shidown</span>
          </Link>
          <p className="mt-4 text-zinc-400 max-w-sm">
            Experience the ultimate samurai combat game. Master the blade, defeat your enemies, and restore honor to your clan.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/Ymr76/SamuraiShidown" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-card-bg border border-card-border flex items-center justify-center hover:border-brand-primary transition-colors text-zinc-400 hover:text-brand-primary">
              <Code2 className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-display tracking-widest text-white mb-4 uppercase">Game</h4>
          <ul className="space-y-3 text-sm text-zinc-400 font-display tracking-wide uppercase">
            <li><Link href="#features" className="hover:text-brand-primary transition-colors">Features</Link></li>
            <li><Link href="#showcase" className="hover:text-brand-primary transition-colors">Showcase</Link></li>
            <li><Link href="#download" className="hover:text-brand-primary transition-colors">Download</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16 pt-8 border-t border-card-border text-sm text-zinc-500 flex flex-col md:flex-row items-start md:items-center justify-between font-display tracking-widest uppercase gap-4 md:gap-0">
        <p>© 2026 SamuraiShidown. All rights reserved.</p>
        <p>Forged in Blood & Code.</p>
      </div>
    </footer>
  );
}
