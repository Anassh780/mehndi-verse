import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sparkles, ShieldCheck, Mail, ArrowRight, Check } from 'lucide-react';

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
    <footer className="bg-[#07100D] text-[#F8F5EE] border-t border-[#1F362E] pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Gradient Orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#064E3B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#7A1C2D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Organic Badge Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#1F362E] items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#282010] border border-[#C59B27]/40 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bridal Couture Gazette</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
              Receive Curated Bridal Inspiration & VIP Artist Openings
            </h3>
            <p className="text-sm text-[#B2C2BC]">
              Join 25,000+ brides receiving seasonal trend reports, stain aftercare tips, and priority booking slots.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#06281F] border border-[#10B981]/40 text-[#34D399] flex items-center gap-3 text-sm font-medium">
                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#34D399]" />
                </div>
                <span>Welcome to the Atelier! Your bridal lookbook is on its way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0E1A16] border border-[#1F362E] text-white text-sm focus:outline-none focus:border-[#C59B27] placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md whitespace-nowrap"
                >
                  <span>Join Gazette</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-b border-[#1F362E]">
          
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#064E3B] flex items-center justify-center border border-[#C59B27]/50">
                <Crown className="w-5 h-5 text-[#E5C07B]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#E5C07B]">
                ZARI & HENNA
              </span>
            </Link>
            <p className="text-xs text-[#B2C2BC] leading-relaxed mb-4 max-w-sm">
              The premier global marketplace connecting discerning brides and celebration hosts with vetted luxury Mehndi artisans. Certified 100% natural organic henna only.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#0E1A16] border border-[#1F362E] flex items-center justify-center text-[#E5C07B] hover:border-[#C59B27] transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#0E1A16] border border-[#1F362E] flex items-center justify-center text-[#E5C07B] hover:border-[#C59B27] transition-colors" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Brides & Clients */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C07B] mb-4">For Brides</h4>
            <ul className="space-y-2.5 text-xs text-[#B2C2BC]">
              <li><Link to="/artists" className="hover:text-white transition-colors">Explore All Artists</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">Bridal Mehndi Styles</Link></li>
              <li><Link to="/customer-dashboard" className="hover:text-white transition-colors">My Bridal Portal</Link></li>
              <li><Link to="/blog/secrets-to-getting-the-darkest-bridal-mehndi-stain" className="hover:text-white transition-colors">Stain Care Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">VIP Wedding Concierge</Link></li>
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C07B] mb-4">For Artists</h4>
            <ul className="space-y-2.5 text-xs text-[#B2C2BC]">
              <li><Link to="/signup?role=artist" className="hover:text-white transition-colors">Join as Master Artist</Link></li>
              <li><Link to="/artist-dashboard" className="hover:text-white transition-colors">Artist SaaS Studio</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Organic Certification</Link></li>
              <li><Link to="/artist-dashboard" className="hover:text-white transition-colors">Pro Membership</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Artist Login</Link></li>
            </ul>
          </div>

          {/* Global Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C07B] mb-4">Global Hubs</h4>
            <ul className="space-y-2.5 text-xs text-[#B2C2BC]">
              <li><Link to="/artists?city=Dubai" className="hover:text-white transition-colors">Dubai & Abu Dhabi</Link></li>
              <li><Link to="/artists?city=London" className="hover:text-white transition-colors">London & Mayfair</Link></li>
              <li><Link to="/artists?city=New%20York" className="hover:text-white transition-colors">New York & Tri-State</Link></li>
              <li><Link to="/artists?city=New%20Delhi" className="hover:text-white transition-colors">Delhi NCR & Jaipur</Link></li>
              <li><Link to="/artists?city=Lahore" className="hover:text-white transition-colors">Lahore & Karachi</Link></li>
            </ul>
          </div>

        </div>

        {/* Safety & Organic Guarantee Strip */}
        <div className="py-6 border-b border-[#1F362E] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B2C2BC]">
          <div className="flex items-center gap-2 text-[#34D399]">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-semibold text-white">The Zari & Henna Organic Guarantee:</span>
            <span>Zero PPD, zero synthetic dyes, 100% triple-sifted plant leaves and natural essential oils.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#E5C07B]">✦ Safe for Sensitive Skin</span>
            <span className="text-[#E5C07B]">✦ Destination Travel Ready</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#72847E]">
          <p>© {new Date().getFullYear()} ZARI & HENNA ATELIER INC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Help & FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
