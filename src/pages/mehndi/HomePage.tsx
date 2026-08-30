import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Star, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Heart, 
  Clock, 
  Award,
  ChevronRight,
  Flame,
  Search
} from 'lucide-react';
import { MOCK_ARTISTS, MEHNDI_CATEGORIES } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { CategoryCard } from '@/components/mehndi/CategoryCard';
import { TestimonialCard } from '@/components/mehndi/TestimonialCard';
import { LightboxModal } from '@/components/common/LightboxModal';
import { AIRecommendationModal } from '@/components/common/AIRecommendationModal';
import { PortfolioItem } from '@/types/mehndi';

export const HomePage: React.FC = () => {
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);
  const [aiQuizOpen, setAiQuizOpen] = useState(false);
  const [stainComparisonIndex, setStainComparisonIndex] = useState(0);
  const [searchCity, setSearchCity] = useState('');
  const [searchStyle, setSearchStyle] = useState('');
  const navigate = useNavigate();

  const featuredArtists = MOCK_ARTISTS.filter(a => a.featured);
  const allReviews = MOCK_ARTISTS.flatMap(a => a.reviews);

  const stainPairs = [
    {
      title: 'Udaipur Royal Symmetrical Jaal',
      style: 'Royal Bridal',
      freshImage: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80',
      stainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      artistName: 'Ayesha Noor Khan',
      city: 'Dubai',
      hours: '48h Dark Mahogany Stain'
    },
    {
      title: 'Khaleeji Shaded Floral Cascade',
      style: 'Modern Arabic',
      freshImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      stainImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      artistName: 'Fatima Al-Zahra',
      city: 'London',
      hours: '48h Deep Auburn Tone'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.set('city', searchCity);
    if (searchStyle) params.set('style', searchStyle);
    navigate(`/artists?${params.toString()}`);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      
      {/* =========================================================================
          1. LUXURY HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16">
        
        {/* Ambient Gradient Background Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#064E3B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#7A1C2D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Luxury Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>The Global Luxury Henna Marketplace</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A2421] dark:text-[#F8F5EE] leading-[1.12]">
                Find The Perfect <br />
                <span className="text-emerald-gradient dark:text-gold-gradient italic font-serif">
                  Mehndi Artist
                </span>{' '}
                For Your Special Moments.
              </h1>

              {/* Supporting Subtext */}
              <p className="text-base sm:text-lg text-[#5C6763] dark:text-[#B2C2BC] max-w-xl leading-relaxed">
                Book world-class certified mehndi artists for weddings, sangeet, and festive celebrations. Browse verified portfolios, check real-time availability, and secure organic chemical-free henna artistry.
              </p>

              {/* Interactive Quick Discovery Search Bar */}
              <form onSubmit={handleSearchSubmit} className="p-2 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xl flex flex-col sm:flex-row items-center gap-2 max-w-xl">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full">
                  <MapPin className="w-4 h-4 text-[#C59B27] shrink-0" />
                  <input
                    type="text"
                    placeholder="City (e.g. Dubai, London, Delhi)..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none placeholder-gray-400"
                  />
                </div>
                <div className="hidden sm:block w-[1px] h-6 bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full">
                  <Flame className="w-4 h-4 text-[#7A1C2D] shrink-0" />
                  <select
                    value={searchStyle}
                    onChange={(e) => setSearchStyle(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none cursor-pointer"
                  >
                    <option value="">All Bridal Styles</option>
                    <option value="Bridal">Royal Bridal</option>
                    <option value="Arabic">Modern Arabic</option>
                    <option value="Rajasthani & Traditional">Traditional Rajasthani</option>
                    <option value="Minimalist Mandala">Minimalist Mandala</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white text-xs font-bold hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Artists</span>
                </button>
              </form>

              {/* Action Buttons & Social Proof */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/artists"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#064E3B] to-[#022C22] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span>Explore Master Artists</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    ↗
                  </span>
                </Link>

                <button
                  onClick={() => setAiQuizOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27] text-[#9A7516] dark:text-[#E5C07B] text-xs sm:text-sm font-bold hover:bg-[#C59B27] hover:text-white transition-all flex items-center gap-2 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#C59B27]" />
                  <span>AI Henna Style Matcher</span>
                </button>
              </div>

              {/* Trust Metric Counters */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EFE7DA] dark:border-[#1F362E] max-w-lg">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] dark:text-[#E5C07B]">12,500+</p>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">Brides Adorned</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] dark:text-[#E5C07B]">650+</p>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">Verified Artisans</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] dark:text-[#E5C07B]">4.98 ★</p>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">Average Rating</p>
                </div>
              </div>

            </div>

            {/* Right Visual Area: Luxury Hero Imagery + Floating Booking Card */}
            <div className="lg:col-span-5 relative">
              
              {/* Outer Doppelrand / Double-Bezel Framing */}
              <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-b from-[#EFE7DA] via-[#FEF9EE] to-[#EFE7DA] dark:from-[#1F362E] dark:to-[#07100D] border border-[#C59B27]/40 shadow-2xl">
                <div className="rounded-[calc(2.5rem-0.5rem)] overflow-hidden relative aspect-[4/5] bg-gray-900">
                  <img
                    src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1000&q=80"
                    alt="Bridal Luxury Mehndi Art"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5C07B]" />
                      <span>Heirloom Bridal Jaal</span>
                    </span>
                  </div>

                  {/* Bottom Feature Pill */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Ayesha Noor Khan</p>
                      <p className="text-[11px] text-[#E5C07B]">Celebrity Henna Couturier</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#064E3B] text-white text-[11px] font-bold">
                      Book Slot
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Live Booking Card (Left Bottom) */}
              <div className="absolute -bottom-6 -left-6 sm:-left-10 z-20 p-4 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#C59B27]/40 shadow-2xl max-w-xs animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] flex items-center justify-center text-[#064E3B] dark:text-[#34D399]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                      Live Booking Confirmed!
                    </p>
                    <p className="text-[10px] text-[#5C6763] dark:text-[#B2C2BC]">
                      Bride booked for <strong>Dubai Wedding</strong> (Sep 2026)
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Organic Quality Stamp (Top Right) */}
              <div className="absolute -top-4 -right-4 z-20 p-3 rounded-2xl bg-[#064E3B] text-white border border-[#C59B27]/50 shadow-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E5C07B]" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#E5C07B]">100% Organic</p>
                  <p className="text-[9px] text-emerald-100">Zero Chemical Dyes</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MEHNDI CATEGORIES & STYLES
          ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Styles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            Curated Mehndi Collections
          </h2>
          <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC]">
            From opulent royal bridal storytelling to modern minimalist mandalas, discover certified artisans specializing in your aesthetic.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MEHNDI_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          3. FEATURED MEHNDI ARTISTS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] border border-[#10B981]/30 text-[#064E3B] dark:text-[#34D399] text-xs font-semibold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Master Artisans</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
              Featured Celebrity Mehndi Artists
            </h2>
            <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC]">
              Top-rated certified professionals with proven bridal excellence and verified reviews.
            </p>
          </div>

          <Link
            to="/artists"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#064E3B] dark:text-[#E5C07B] hover:underline"
          >
            <span>View All 650+ Artists</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Artist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          4. HOW IT WORKS (3-STEP BOOKING FLOW)
          ========================================================================= */}
      <section id="how-it-works" className="py-16 bg-[#F8F4EB] dark:bg-[#0E1A16] border-y border-[#EFE7DA] dark:border-[#1F362E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seamless Booking</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
              How Zari & Henna Works
            </h2>
            <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC]">
              We take the stress out of wedding planning with transparent pricing, certified organic safety, and guaranteed scheduling.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Discover & Match Artist',
                desc: 'Explore vetted portfolios, filter by city or style, or use our AI Quiz to find your exact match.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Select Package & Inclusions',
                desc: 'Choose from heirloom bridal suites, sangeet guest bundles, or add custom groom & foot accents.',
                icon: Crown,
              },
              {
                step: '03',
                title: 'Secure Date & Relax',
                desc: 'Lock in your wedding date with an escrow deposit. Receive your VIP organic aftercare box.',
                icon: Calendar,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-8 rounded-3xl bg-white dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] relative shadow-sm hover:shadow-lg transition-all"
                >
                  <span className="font-serif text-5xl font-bold text-[#C59B27]/20 absolute top-6 right-6 select-none">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] dark:bg-[#06281F] text-[#064E3B] dark:text-[#34D399] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BEFORE / AFTER STAIN SHOWCASE & PORTFOLIO SLIDER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F4] dark:bg-[#290910] border border-[#7A1C2D]/30 text-[#7A1C2D] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#7A1C2D]" />
            <span>The 48-Hour Transformation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            Natural Organic Henna Stain Gallery
          </h2>
          <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC]">
            Witness how 100% natural, triple-filtered Rajasthani henna oxidizes from bright orange into deep, rich royal mahogany over 48 hours.
          </p>
        </div>

        {/* Before / After Split Slider Card */}
        <div className="p-2 sm:p-4 rounded-[2.5rem] bg-gradient-to-b from-[#EFE7DA] via-[#FEF9EE] to-[#EFE7DA] dark:from-[#1F362E] dark:to-[#07100D] border border-[#C59B27]/40 shadow-2xl">
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-[#07100D] overflow-hidden p-6 sm:p-10 text-white">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-4 space-y-6">
                <span className="px-3 py-1 rounded-full bg-[#282010] border border-[#C59B27]/40 text-[#E5C07B] text-xs font-semibold">
                  {stainPairs[stainComparisonIndex].style}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {stainPairs[stainComparisonIndex].title}
                </h3>

                <p className="text-xs sm:text-sm text-[#B2C2BC] leading-relaxed">
                  Crafted by master artisan <strong>{stainPairs[stainComparisonIndex].artistName}</strong> ({stainPairs[stainComparisonIndex].city}). Notice the incredible contrast between fresh paste application and the fully cured oxidation result.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Pure Organic Sojat Henna Paste</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#34D399]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Clove Steam & Beeswax Sealant Used</span>
                  </div>
                </div>

                {/* Switcher Tabs */}
                <div className="flex items-center gap-2 pt-4">
                  {stainPairs.map((pair, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStainComparisonIndex(idx)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        stainComparisonIndex === idx
                          ? 'bg-[#C59B27] text-[#07100D]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Design #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Side-by-Side Images */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fresh Paste */}
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 border border-white/10">
                    <img
                      src={stainPairs[stainComparisonIndex].freshImage}
                      alt="Fresh Henna Application"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                      Day 1: Fresh Application
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-400">Initial green/black paste onto skin</p>
                </div>

                {/* Fully Cured 48h Stain */}
                <div className="space-y-2">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900 border border-[#C59B27]/40 shadow-lg">
                    <img
                      src={stainPairs[stainComparisonIndex].stainImage}
                      alt="48h Dark Mahogany Stain"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#7A1C2D] text-white text-[11px] font-bold">
                      Day 3: Deep Mahogany Peak
                    </div>
                  </div>
                  <p className="text-center text-xs text-[#E5C07B] font-medium">Rich mahogany color for wedding ceremonies</p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          6. VERIFIED BRIDAL TESTIMONIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Bridal Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            Loved by Discerning Brides Worldwide
          </h2>
          <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC]">
            Read verified reviews from brides across Dubai, London, New Delhi, and New York.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.slice(0, 3).map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          7. LUXURY CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-[3rem] overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#4A0E17] text-white border border-[#C59B27]/50 shadow-2xl">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59B27]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              <span>Wedding Season 2026/2027 Calendar Open</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Make Your Special Day <br />
              <span className="text-gold-gradient italic font-serif">
                Unforgettably Beautiful
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl">
              Lock in your favorite celebrity Mehndi artist before peak bridal season slots fill up. Guaranteed 100% natural organic henna formulas.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/artists"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center gap-2"
              >
                <span>Book a Master Artist</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/signup?role=artist"
                className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all"
              >
                Join as Mehndi Artist
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* Lightbox Modal */}
      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}

      {/* AI Recommendation Modal */}
      <AIRecommendationModal
        isOpen={aiQuizOpen}
        onClose={() => setAiQuizOpen(false)}
      />

    </div>
  );
};
