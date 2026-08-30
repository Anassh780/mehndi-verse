import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Sparkles, ShieldCheck, Heart, Award, Globe, Users, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      
      {/* 1. Hero Header */}
      <section className="relative pt-12 pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Our Heritage & Vision</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A2421] dark:text-[#F8F5EE] leading-tight">
          Adorning Special Days with <br />
          <span className="text-emerald-gradient dark:text-gold-gradient italic font-serif">
            Authentic Living Art
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed max-w-2xl mx-auto">
          Zari & Henna was founded to bridge sacred ancestral artistry with contemporary luxury marketplace standards — ensuring brides experience transparent pricing, punctual master artists, and 100% pure organic henna.
        </p>
      </section>

      {/* 2. Visual Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="p-2 rounded-[2.5rem] bg-gradient-to-b from-[#EFE7DA] to-[#F8F4EB] dark:from-[#1F362E] dark:to-[#07100D] border border-[#C59B27]/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
                alt="Heritage Rajasthani Henna"
                className="w-full h-[450px] object-cover rounded-[calc(2.5rem-0.5rem)]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59B27]">
                The Artisan Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                From Sojat’s Sunlit Fields to Global Wedding Ballrooms
              </h2>
              <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                For centuries, Mehndi has been the ceremonial heart of South Asian and Middle Eastern celebrations. Our platform directly supports generational artisans who grind sun-dried Lawsonia inermis leaves with pure lavender, cajeput, and eucalyptus essential oils.
              </p>
              <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                We eliminate the risk of synthetic "black henna" chemical burns by enforcing mandatory triple-filtered natural cone certifications on every artist listed in our atelier.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E]">
                <ShieldCheck className="w-6 h-6 text-[#10B981] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">Zero PPD Guarantee</h4>
                <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">Laboratory tested natural herbal pastes only.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E]">
                <Crown className="w-6 h-6 text-[#C59B27] mb-2" />
                <h4 className="font-serif font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">Escrow Date Protection</h4>
                <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">Deposits held securely until day of ceremony.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Global Impact Numbers */}
      <section className="bg-[#064E3B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">12,500+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Happy Brides</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">650+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Verified Artists</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">85+</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Global Cities</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">4.98 ★</p>
              <p className="text-xs uppercase tracking-widest text-emerald-200">Review Average</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
          Ready to Plan Your Bridal Mehndi?
        </h2>
        <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC] max-w-xl mx-auto">
          Explore top certified artists in your city or take our interactive style recommendation quiz.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/artists"
            className="px-8 py-3.5 rounded-full bg-[#064E3B] text-white text-xs font-bold hover:bg-[#022C22] shadow-md"
          >
            Explore Master Artists
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold"
          >
            Contact Bridal Concierge
          </Link>
        </div>
      </section>

    </div>
  );
};
