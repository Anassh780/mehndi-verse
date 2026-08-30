import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      
      {/* 1. Header */}
      <section className="pt-12 text-center max-w-3xl mx-auto px-4 space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
          Heritage & Mission
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] leading-tight">
          Crafted in Nature. Perfected by Masters.
        </h1>
        <p className="text-sm sm:text-base text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
          Zari & Henna was founded to elevate the historic ritual of bridal henna into a world-class luxury commission platform — connecting brides with vetted artisans who use exclusively pure botanical ingredients.
        </p>
      </section>

      {/* 2. Visual Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-editorial text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              The Botanical Standard
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
              In commercial salons worldwide, synthetic chemical additives like PPD (para-phenylenediamine) and chemical solvents are frequently added to henna paste to artificially force an instant black stain. These chemicals can cause severe allergic dermatitis and chemical burns.
            </p>
            <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
              Every artisan on the Zari & Henna platform signs our strict botanical charter. We mandate 100% pure triple-sifted Lawsonia Inermis leaves sourced from Sojat, Rajasthan, mixed solely with natural lemon juice, sugar, and therapeutic-grade cajeput or eucalyptus oils.
            </p>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] space-y-3">
              <h3 className="font-serif-editorial font-bold text-base text-[#1C1A18] dark:text-[#F7F5F0]">
                Our Quality Safeguards
              </h3>
              <div className="space-y-2 text-xs text-[#6B665F] dark:text-[#A8A298]">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#385648]" /><span>100% Certified Chemical-Free Guarantee</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#385648]" /><span>Portfolio Authenticity & Identity Verification</span></div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#385648]" /><span>Escrow Protection for 100% of Wedding Dates</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-[#F4EFEB] border border-[#E8E2D9]">
              <img
                src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=900&q=80"
                alt="Henna Leaves & Cones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Reach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#F4EFEB] dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] text-center space-y-6">
          <h2 className="font-serif-editorial text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Commission Your Artist Today
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] max-w-lg mx-auto leading-relaxed">
            Whether your ceremony is in Dubai, London, New York, or Lahore, our master artisans travel worldwide for bespoke commissions.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/artists" className="btn-primary">Explore Master Artisans</Link>
            <Link to="/contact" className="btn-secondary">Contact Concierge</Link>
          </div>
        </div>
      </section>

    </div>
  );
};
