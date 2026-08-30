import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  Award,
  Leaf,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { MOCK_ARTISTS, MEHNDI_CATEGORIES } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { CategoryCard } from '@/components/mehndi/CategoryCard';
import { TestimonialCard } from '@/components/mehndi/TestimonialCard';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  const featuredArtists = MOCK_ARTISTS.slice(0, 3);
  const featuredTestimonials = [
    {
      id: 'test-1',
      author: 'Ananya & Kabir',
      location: 'Palace Downtown, Dubai',
      rating: 5,
      date: 'Autumn 2026',
      content: 'Ayesha created a bespoke bridal masterpiece with hidden skylines and elephant procession. The henna oxidized into an extraordinary rich mahogany by our wedding evening.',
      artistName: 'Ayesha Noor Khan',
      serviceType: 'Royal Heirloom Signature'
    },
    {
      id: 'test-2',
      author: 'Zainab & Tariq',
      location: 'The Dorchester, London',
      rating: 5,
      date: 'Summer 2026',
      content: 'The clarity of Fatima’s Khaleeji negative space and cuff work is unmatched. Not a single smudge, 100% natural organic aroma, and seamless escrow booking.',
      artistName: 'Fatima Al-Zahra',
      serviceType: 'Arabic Royal Bridal'
    },
    {
      id: 'test-3',
      author: 'Meera & Rohan',
      location: 'The Plaza, New York',
      rating: 5,
      date: 'Spring 2026',
      content: 'Priya’s intricate figurative storytelling captured our Radha-Krishna heritage vows. The stain reached its deepest depth exactly 48 hours post-ceremony.',
      artistName: 'Priya Sharma',
      serviceType: 'Bridal Heritage Package'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCity !== 'All') params.set('city', selectedCity);
    if (selectedStyle !== 'All') params.set('style', selectedStyle);
    navigate(`/artists?${params.toString()}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* 1. EDITORIAL SPLIT HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Restrained Editorial Typography & Search Form */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
                The Living Art of the Bridal Atelier
              </span>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#1b1815] leading-[1.08]">
                Bespoke Bridal Henna for the World’s Grandest Ceremonies.
              </h1>
              <p className="text-sm sm:text-base text-[#2c2620]/80 max-w-xl leading-relaxed">
                A curated collective of master artisans across Dubai, London, New York, Delhi, and Lahore. Pure botanicals, museum-level symmetry, and secure date protection.
              </p>
            </div>

            {/* Quiet, Single-Surface Filter Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="p-3 sm:p-4 rounded-2xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
            >
              <div className="flex-1 space-y-1 sm:space-y-0">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#2c2620]/70 block px-2">
                  Destination Hub
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-lg px-3 py-2 text-xs font-semibold text-[#1b1815] focus:outline-none focus:border-[#9c4221] cursor-pointer"
                >
                  <option value="All">All Global Hubs</option>
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="London">London, UK</option>
                  <option value="New York">New York, USA</option>
                  <option value="New Delhi">New Delhi, India</option>
                  <option value="Lahore">Lahore, Pakistan</option>
                </select>
              </div>

              <div className="flex-1 space-y-1 sm:space-y-0">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#2c2620]/70 block px-2">
                  Artistic Tradition
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-lg px-3 py-2 text-xs font-semibold text-[#1b1815] focus:outline-none focus:border-[#9c4221] cursor-pointer"
                >
                  <option value="All">All Traditional Styles</option>
                  <option value="Bridal">Royal Bridal Signature</option>
                  <option value="Arabic">Khaleeji & Gulf Floral</option>
                  <option value="Rajasthani & Traditional">Rajasthani Figurine Jaal</option>
                  <option value="Minimalist Mandala">Minimalist Contemporary</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto !py-3 !px-6 text-xs whitespace-nowrap mt-2 sm:mt-0"
              >
                <span>Explore Artisans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Credibility Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[rgba(27,24,21,0.1)]">
              <div>
                <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1b1815]">100%</p>
                <p className="text-[11px] text-[#2c2620]/70 uppercase tracking-wider">Natural Botanicals</p>
              </div>
              <div>
                <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1b1815]">48-Hour</p>
                <p className="text-[11px] text-[#2c2620]/70 uppercase tracking-wider">Deep Curing Tone</p>
              </div>
              <div>
                <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1b1815]">$0 Risk</p>
                <p className="text-[11px] text-[#2c2620]/70 uppercase tracking-wider">Escrow Protected</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[rgba(27,24,21,0.12)] shadow-xl bg-[#efe6d4]">
              <img
                src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1000&q=85"
                alt="Bridal Henna Masterpiece"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5 backdrop-blur-xs p-4 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[9px] uppercase tracking-widest text-[#c9a227] font-bold">Featured Commission</span>
                <p className="font-serif-editorial text-lg font-bold">Heirloom Royal Cuff & Mandala</p>
                <p className="text-xs text-white/80">Applied by Ayesha Noor Khan · Palace Downtown, Dubai</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CURATED MASTER ARTISANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[rgba(27,24,21,0.1)]">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c4221] block">
              Vetted Master Artisans
            </span>
            <h2 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-[#1b1815]">
              Featured Bridal Ateliers
            </h2>
          </div>
          <Link
            to="/artists"
            className="text-xs font-bold uppercase tracking-wider text-[#9c4221] hover:text-[#7a331a] flex items-center gap-1 transition-colors"
          >
            <span>View All Master Artisans</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* 3. REGIONAL TRADITIONS LOOKBOOK */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c4221] block">
            Aesthetic Heritage
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1b1815]">
            Regional Traditions & Motifs
          </h2>
          <p className="text-xs sm:text-sm text-[#2c2620]/75 leading-relaxed">
            From the structured geometrics of Rajasthan to the open negative space of the Gulf.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEHNDI_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 4. THE 3-STEP APPOINTMENT PROTOCOL */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] space-y-10">
          
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c4221] block">
              The Protocol
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1b1815]">
              Seamless Bridal Commissioning
            </h2>
            <p className="text-xs sm:text-sm text-[#2c2620]/75">
              How Zari & Henna protects your wedding calendar from inquiry to stain maturation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-serif-editorial text-4xl font-bold text-[#9c4221]">01</span>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Curate & Match</h3>
              <p className="text-xs text-[#2c2620]/75 leading-relaxed">
                Filter verified ateliers by regional specialty, destination availability, and bridal lookbooks. Or consult our AI advisor for gown-matched recommendations.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-editorial text-4xl font-bold text-[#9c4221]">02</span>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Escrow Date Lock</h3>
              <p className="text-xs text-[#2c2620]/75 leading-relaxed">
                Place a 25% deposit held safely in escrow. Your date is locked on the artist’s calendar, and funds are only disbursed once your session is completed.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-serif-editorial text-4xl font-bold text-[#9c4221]">03</span>
              <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Botanical Maturation</h3>
              <p className="text-xs text-[#2c2620]/75 leading-relaxed">
                Receive certified organic Rajasthani henna paste and guided 48-hour thermal oxidation protocols to achieve maximum rich burgundy staining.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. 48-HOUR OXIDATION VISUAL STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#1b1815] text-[#f7f1e6] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a227] block">
              The Botanical Science
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold leading-tight">
              The 48-Hour Natural Henna Curing Timeline.
            </h2>
            <p className="text-xs sm:text-sm text-[#f7f1e6]/80 leading-relaxed">
              Real organic henna does not stain black instantly. It deepens naturally as the lawsone molecules bond with your skin's keratin and oxidize in the air.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <span className="text-[#6b7752] font-bold text-xs">Hour 0–12</span>
                <p className="text-xs text-[#f7f1e6]/80"><strong>Fresh Paste & Bright Pumpkin:</strong> Paste dries and is sealed with lemon sugar. Once peeled, reveals bright golden orange.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <span className="text-[#9c4221] font-bold text-xs">Hour 24–48</span>
                <p className="text-xs text-[#f7f1e6]/80"><strong>Deep Oxidation:</strong> Exposure to body heat and air oxidizes the stain into deep, heirloom mahogany burgundy for your main ceremony.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-2 text-center">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=600&q=80"
                  alt="Hour 0 Fresh Paste"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-bold text-[#6b7752]">Hour 0 · Fresh Paste</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                  alt="Hour 48 Deep Stain"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-bold text-[#9c4221]">Hour 48 · Deep Heirloom Mahogany</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. VERIFIED BRIDAL REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c4221] block">
            Celebrated Unions
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1b1815]">
            Bridal Testimonials
          </h2>
          <p className="text-xs sm:text-sm text-[#2c2620]/75">
            Real feedback from brides across destination weddings in Dubai, London, and New York.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTestimonials.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 7. BOTANICAL CHARTER CALLOUT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] text-center space-y-6">
          <Leaf className="w-8 h-8 text-[#9c4221] mx-auto" />
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1b1815]">
            Our Zero-Chemical Botanical Charter
          </h2>
          <p className="text-xs sm:text-sm text-[#2c2620]/80 max-w-2xl mx-auto leading-relaxed">
            Every artist on Zari & Henna signs a binding covenant to utilize only 100% natural, freshly harvested Sojat Rajasthani henna infused with pure essential cajeput and tea tree oils. Absolutely zero toxic black PPD dyes or industrial chemical accelerators.
          </p>
          <div className="pt-2">
            <Link to="/about" className="btn btn-ink">
              <span>Read Our Purity Charter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
