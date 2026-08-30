import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1A18] text-[#F7F5F0] border-t border-[#2A2724] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Newsletter & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#2A2724] items-start">
          <div className="lg:col-span-6 space-y-3">
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-white font-bold">
              The Bridal Henna Gazette
            </h3>
            <p className="text-xs text-[#A8A298] max-w-md leading-relaxed">
              Curated seasonal lookbooks, stain aftercare rituals, and private opening alerts from master artisans across Dubai, London, and New York.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-3.5 rounded-lg bg-[#23211E] border border-[#385648] text-[#5E8C75] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the Atelier Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#23211E] border border-[#383430] text-white text-xs placeholder-[#6E6860] focus:outline-none focus:border-[#D4A373]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#F7F5F0] text-[#1C1A18] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Hubs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#2A2724] text-xs">
          
          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-[#A8A298] text-[11px]">Collections</p>
            <ul className="space-y-2 text-[#D1C9BC]">
              <li><Link to="/artists" className="hover:text-white transition-colors">Master Artisans</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">Bridal Traditions</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Lookbook & Care</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-[#A8A298] text-[11px]">Atelier Hubs</p>
            <ul className="space-y-2 text-[#D1C9BC]">
              <li><Link to="/artists?city=Dubai" className="hover:text-white transition-colors">Dubai & Gulf</Link></li>
              <li><Link to="/artists?city=London" className="hover:text-white transition-colors">London & Mayfair</Link></li>
              <li><Link to="/artists?city=New%20York" className="hover:text-white transition-colors">New York & Tri-State</Link></li>
              <li><Link to="/artists?city=New%20Delhi" className="hover:text-white transition-colors">Delhi NCR & Jaipur</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-[#A8A298] text-[11px]">For Artisans</p>
            <ul className="space-y-2 text-[#D1C9BC]">
              <li><Link to="/signup?role=artist" className="hover:text-white transition-colors">Join Atelier</Link></li>
              <li><Link to="/artist-dashboard" className="hover:text-white transition-colors">Studio Portal</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Botanical Standards</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-semibold uppercase tracking-wider text-[#A8A298] text-[11px]">Inquiries</p>
            <ul className="space-y-2 text-[#D1C9BC]">
              <li><Link to="/contact" className="hover:text-white transition-colors">Private Concierge</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Heritage Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Botanical Guarantee + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6860]">
          <p>
            100% Pure Botanical Henna Promise · Zero Synthetic Chemical Enhancers.
          </p>
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} ZARI & HENNA ATELIER INC.</p>
            <Link to="/about" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
