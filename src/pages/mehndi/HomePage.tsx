import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronRight
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
      hours: '48h Natural Mahogany Oxidation'
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
    <div className="space-y-24 sm:space-y-36 pb-24">
      
      {/* =========================================================================
          1. EDITORIAL HERO SECTION
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typographic Confidence */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
                  The Bridal Henna Marketplace
                </span>

                <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C1A18] dark:text-[#F7F5F0] leading-[1.08]">
                  The Living Art of the Bridal Atelier.
                </h1>

                <p className="text-base sm:text-lg text-[#6B665F] dark:text-[#A8A298] max-w-xl leading-relaxed">
                  Connecting discerning brides with the world’s most accomplished henna artists across Dubai, London, New York, and Lahore. Pure botanicals. Masterful symmetry.
                </p>
              </div>

              {/* Refined Search Form */}
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-xs flex flex-col sm:flex-row items-center gap-2 max-w-xl"
              >
                <div className="flex-1 flex items-center gap-2.5 px-4 py-2 w-full">
                  <MapPin className="w-4 h-4 text-[#8E5A3C] shrink-0" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Destination (Dubai, London, Delhi)..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#1C1A18] dark:text-[#F7F5F0] focus:outline-none placeholder-[#9E988F]"
                  />
                </div>

                <div className="hidden sm:block w-[1px] h-6 bg-[#E8E2D9] dark:bg-[#2A2724]" />

                <div className="flex-1 flex items-center gap-2 px-4 py-2 w-full">
                  <select
                    value={searchStyle}
                    onChange={(e) => setSearchStyle(e.target.value)}
                    className="w-full bg-transparent text-xs font-medium text-[#1C1A18] dark:text-[#F7F5F0] focus:outline-none cursor-pointer"
                  >
                    <option value="">All Traditions</option>
                    <option value="Bridal">Royal Bridal Heirloom</option>
                    <option value="Arabic">Contemporary Arabic</option>
                    <option value="Rajasthani & Traditional">Traditional Rajasthani</option>
                    <option value="Minimalist Mandala">Minimalist Mandala</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto !py-2.5 !px-6 shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Discover</span>
                </button>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/artists" className="btn-primary">
                  <span>Explore Master Artisans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setAiQuizOpen(true)}
                  className="btn-secondary"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8E5A3C]" />
                  <span>AI Style Consultation</span>
                </button>
              </div>

              {/* Quiet Metric Strip */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E8E2D9] dark:border-[#2A2724] max-w-lg text-left">
                <div>
                  <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">12,500+</p>
                  <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] uppercase tracking-wider mt-0.5">Commissions</p>
                </div>
                <div>
                  <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">650+</p>
                  <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] uppercase tracking-wider mt-0.5">Vetted Artisans</p>
                </div>
                <div>
                  <p className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">4.98 ★</p>
                  <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] uppercase tracking-wider mt-0.5">Client Rating</p>
                </div>
              </div>

            </div>

            {/* Right Column: Framed Editorial Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden bg-[#F4EFEB] dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-md aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1000&q=80"
                  alt="Fine Bridal Henna Artistry"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Quiet Caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4A373] font-semibold">
                    Royal Bridal Sleeve
                  </span>
                  <p className="font-serif-editorial text-xl font-bold">
                    Ayesha Noor Khan · Dubai Atelier
                  </p>
                </div>
              </div>

              {/* Single Botanical Guarantee Tag */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-md flex items-center gap-2.5 max-w-xs">
                <ShieldCheck className="w-5 h-5 text-[#385648] dark:text-[#5E8C75] shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#1C1A18] dark:text-[#F7F5F0]">100% Pure Botanical Formula</p>
                  <p className="text-[10px] text-[#6B665F] dark:text-[#A8A298]">Zero chemical dyes or PPD additives.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FEATURED MASTER ARTISANS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724]">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
              Curated Selection
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              Featured Master Artisans
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
              Vetted professionals with proven bridal excellence and certified botanical formulas.
            </p>
          </div>

          <Link
            to="/artists"
            className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] hover:text-[#8E5A3C] transition-colors flex items-center gap-1.5"
          >
            <span>View All 650+ Artisans</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Redesigned Artist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.slice(0, 3).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          3. ARTISTIC TRADITIONS (CATEGORIES)
          ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-1.5 mb-10 pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
            Tradition & Geography
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Bridal Mehndi Traditions
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
            Explore curated design styles rooted in distinct regional heritages and modern interpretations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MEHNDI_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          4. THE ATELIER PROCESS (HOW IT WORKS)
          ========================================================================= */}
      <section id="how-it-works" className="py-20 bg-[#F4EFEB] dark:bg-[#1C1A18] border-y border-[#E8E2D9] dark:border-[#2A2724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
              The Experience
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              How the Atelier Works
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
              A seamless, transparent booking process designed for peace of mind leading to your wedding day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discover & Align',
                desc: 'Browse portfolios by region, style, and city hub, or use our AI advisor to match your bridal gown.'
              },
              {
                step: '02',
                title: 'Bespoke Consultation',
                desc: 'Select your coverage tier and coordinate custom elements like hidden initials, portraits, or bridesmaid bundles.'
              },
              {
                step: '03',
                title: 'Escrow Date Lock',
                desc: 'Reserve your date with an escrow deposit. Receive your organic botanical aftercare kit prior to the event.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-2xl bg-white dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4"
              >
                <span className="font-serif-editorial text-3xl font-bold text-[#8E5A3C] dark:text-[#D4A373] block">
                  {item.step}
                </span>
                <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. 48-HOUR BOTANICAL CURING (BEFORE / AFTER)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl space-y-2 mb-10 pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
            Pure Botanical Science
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            The 48-Hour Natural Curing Process
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
            Pure organic henna oxidizes naturally into rich mahogany without synthetic chemical accelerants.
          </p>
        </div>

        <div className="editorial-card rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8E5A3C]">
                  {stainPairs[stainComparisonIndex].style}
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                  {stainPairs[stainComparisonIndex].title}
                </h3>
                <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
                  Composed by master artisan <strong>{stainPairs[stainComparisonIndex].artistName}</strong> ({stainPairs[stainComparisonIndex].city}). Pure triple-sifted Sojat paste yields a deep, lasting stain that peaks on your main wedding morning.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {stainPairs.map((pair, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStainComparisonIndex(idx)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                      stainComparisonIndex === idx
                        ? 'bg-[#1C1A18] text-white dark:bg-white dark:text-black'
                        : 'border border-[#E8E2D9] text-[#6B665F] hover:bg-[#F4EFEB]'
                    }`}
                  >
                    Exhibit 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Images Comparison */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8E2D9] dark:border-[#2A2724]">
                  <img
                    src={stainPairs[stainComparisonIndex].freshImage}
                    alt="Day 1 Application"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                    Day 1: Fresh Application
                  </span>
                </div>
                <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298]">Fresh paste applied 48h before ceremony</p>
              </div>

              <div className="space-y-2">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#F4EFEB] border border-[#E8E2D9] dark:border-[#2A2724]">
                  <img
                    src={stainPairs[stainComparisonIndex].stainImage}
                    alt="Day 3 Peak Stain"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#1C1A18] text-white text-[11px] font-medium">
                    Day 3: Cured Mahogany Peak
                  </span>
                </div>
                <p className="text-[11px] text-[#1C1A18] dark:text-[#F7F5F0] font-semibold">Rich oxidation peak for wedding photos</p>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          6. VERIFIED BRIDAL TESTIMONIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-1.5 mb-10 pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
            Client Words
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Bridal Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
            Verified reviews from recent weddings across Dubai, London, New Delhi, and New York.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allReviews.slice(0, 3).map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>

      </section>

      {/* =========================================================================
          7. EDITORIAL CALL TO ACTION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#F4EFEB] dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] text-center space-y-6">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
              2026/2027 Wedding Calendar Open
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              Secure Your Bridal Henna Artist
            </h2>
            <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] leading-relaxed max-w-lg mx-auto">
              Reserve with master artisans before peak wedding season dates fill up. Complete with escrow date protection and pure botanicals.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/artists" className="btn-primary">
              <span>Explore Master Artisans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>Contact Concierge</span>
            </Link>
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
