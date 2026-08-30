import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1b1815] text-[#f7f1e6] border-t border-[rgba(247,241,230,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Top Gazette Newsletter Row */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[rgba(247,241,230,0.04)] border border-[rgba(247,241,230,0.08)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a227] block">
              The Bridal Henna Gazette
            </span>
            <h3 className="font-serif-editorial text-2xl font-bold text-[#f7f1e6]">
              Curated bridal lookbooks & oxidation rituals.
            </h3>
            <p className="text-xs text-[#f7f1e6]/70">
              Delivered fortnightly to discerning brides in Dubai, London, and New York.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your bridal email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[rgba(247,241,230,0.08)] border border-[rgba(247,241,230,0.14)] rounded-full px-4 py-2.5 text-xs text-[#f7f1e6] placeholder-[rgba(247,241,230,0.4)] focus:outline-none focus:border-[#c9a227]"
              />
              <button
                type="submit"
                className="btn btn-primary !py-2.5 !px-5 !text-xs whitespace-nowrap !rounded-full"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-[#c9a227] flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you. Your wedding invitation archive is confirmed.</span>
              </p>
            )}
          </form>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <span className="font-serif-editorial text-xl font-bold text-[#f7f1e6] block">
              Zari & Henna
            </span>
            <p className="text-[#f7f1e6]/70 leading-relaxed">
              The premier global marketplace connecting discerning brides with certified master mehndi ateliers.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#c9a227] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified 100% Organic Henna</span>
            </div>
          </div>

          {/* Col 2: Marketplace */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9a227] block">
              Explore Atelier
            </span>
            <ul className="space-y-2 text-[#f7f1e6]/70">
              <li><Link to="/artists" className="hover:text-white transition-colors">Master Artisans</Link></li>
              <li><Link to="/artists?style=Bridal" className="hover:text-white transition-colors">Royal Bridal Packages</Link></li>
              <li><Link to="/artists?style=Arabic" className="hover:text-white transition-colors">Khaleeji Floral Motifs</Link></li>
              <li><Link to="/artists?style=Rajasthani" className="hover:text-white transition-colors">Rajasthani Figurine Jaal</Link></li>
            </ul>
          </div>

          {/* Col 3: Destination Hubs */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9a227] block">
              Destination Hubs
            </span>
            <ul className="space-y-2 text-[#f7f1e6]/70">
              <li><Link to="/artists?city=Dubai" className="hover:text-white transition-colors">Dubai & Emirates</Link></li>
              <li><Link to="/artists?city=London" className="hover:text-white transition-colors">London & Mayfair</Link></li>
              <li><Link to="/artists?city=New+York" className="hover:text-white transition-colors">New York & Tri-State</Link></li>
              <li><Link to="/artists?city=Delhi" className="hover:text-white transition-colors">Delhi NCR & Lahore</Link></li>
            </ul>
          </div>

          {/* Col 4: Standards & Editorial */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9a227] block">
              Editorial & Legal
            </span>
            <ul className="space-y-2 text-[#f7f1e6]/70">
              <li><Link to="/blog" className="hover:text-white transition-colors">The Henna Gazette</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Botanical Purity Pledge</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Bridal Concierge</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Artist Studio Portal</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Hairline & Copyright */}
        <div className="pt-8 border-t border-[rgba(247,241,230,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#f7f1e6]/50">
          <p>© {new Date().getFullYear()} Zari & Henna Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Dubai · London · New York</span>
            <span>Escrow Protected</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
