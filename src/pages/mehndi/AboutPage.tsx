import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Leaf, HeartHandshake, ArrowRight, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 pb-28">
      
      {/* Editorial Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
          The Atelier Manifesto
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#1b1815] leading-tight">
          Purity, Heritage & Escrow Protection
        </h1>
        <p className="text-xs sm:text-sm text-[#2c2620]/75 leading-relaxed">
          Founded in Dubai to elevate bridal henna from informal booking chaos into a protected, world-class artistic commission.
        </p>
      </div>

      {/* Visual Narrative Block */}
      <div className="card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] shadow-xl">
        <div className="md:col-span-6 aspect-[4/3] md:aspect-auto overflow-hidden bg-[#efe6d4]">
          <img
            src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80"
            alt="Handcrafting pure henna"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="badge">
              <span>Origin Story</span>
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1b1815]">
              Honoring 5,000 Years of Botanical Ritual.
            </h2>
            <p className="text-xs text-[#2c2620]/80 leading-relaxed font-sans">
              Mehndi is not temporary ink—it is an ancient ceremonial rite of transition, joy, and bridal adornment. We created Zari & Henna to connect discerning global brides with master artisans who treat this craft with museum-grade precision.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[rgba(27,24,21,0.1)] text-xs text-[#2c2620]/80">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6b7752]" />
              <span>Certified 100% Organic Sojat Harvest Henna</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6b7752]" />
              <span>Escrow Protected Dates Across 5 Key Hubs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 rounded-2xl space-y-3 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
          <Leaf className="w-6 h-6 text-[#9c4221]" />
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">The Purity Covenant</h3>
          <p className="text-xs text-[#2c2620]/75 leading-relaxed font-sans">
            Every atelier on our platform guarantees zero synthetic chemical darkeners, zero toxic black PPD dyes, and strict use of therapeutic-grade essential oils.
          </p>
        </div>

        <div className="card p-6 rounded-2xl space-y-3 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
          <ShieldCheck className="w-6 h-6 text-[#9c4221]" />
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Escrow Calendar Lock</h3>
          <p className="text-xs text-[#2c2620]/75 leading-relaxed font-sans">
            Brides never risk unreturned deposits. Your 25% deposit is held in a protected escrow vault and only released once your session is triumphantly concluded.
          </p>
        </div>

        <div className="card p-6 rounded-2xl space-y-3 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
          <Award className="w-6 h-6 text-[#9c4221]" />
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Vetted Master Guild</h3>
          <p className="text-xs text-[#2c2620]/75 leading-relaxed font-sans">
            Only top-tier artists with 5+ years of verified luxury bridal portfolios and consistent 4.9+ star satisfaction ratings are invited into the Atelier.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#1b1815] text-[#f7f1e6] text-center space-y-6">
        <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold">Ready to Commission Your Bridal Masterpiece?</h2>
        <p className="text-xs sm:text-sm text-[#f7f1e6]/80 max-w-lg mx-auto">
          Explore master artisans in Dubai, London, New York, Delhi, and Lahore.
        </p>
        <Link to="/artists" className="btn btn-primary">
          <span>Explore Master Artisans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
