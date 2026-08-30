import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  Grid, 
  List, 
  ChevronDown, 
  Check, 
  Crown,
  Heart,
  Calendar,
  X
} from 'lucide-react';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { Artist, MehndiCategory } from '@/types/mehndi';
import { useFavorites } from '@/context/FavoritesContext';

export const ArtistsExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get('style') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [minExp, setMinExp] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'experience'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  const cities = ['All', 'Dubai', 'London', 'New York', 'New Delhi', 'Lahore', 'Mumbai'];
  const styles: (string | MehndiCategory)[] = [
    'All', 
    'Bridal', 
    'Arabic', 
    'Rajasthani & Traditional', 
    'Indo-Western & Modern', 
    'Minimalist Mandala', 
    'Festive & Eid'
  ];

  // Filter Logic
  const filteredArtists = useMemo(() => {
    return MOCK_ARTISTS.filter((artist) => {
      // Query filter (name, bio, city)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesBio = artist.bio.toLowerCase().includes(q);
        const matchesCity = artist.city.toLowerCase().includes(q);
        const matchesStyle = artist.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBio && !matchesCity && !matchesStyle) return false;
      }

      // City filter
      if (selectedCity !== 'All' && !artist.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Style filter
      if (selectedStyle !== 'All' && !artist.specialties.includes(selectedStyle as MehndiCategory)) {
        return false;
      }

      // Price filter
      if (artist.startingPrice > maxPrice) {
        return false;
      }

      // Rating filter
      if (artist.rating < minRating) {
        return false;
      }

      // Experience filter
      if (artist.experienceYears < minExp) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !artist.verified) {
        return false;
      }

      // Organic filter
      if (organicOnly && !artist.organicChemicalFreeGuarantee) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price_high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [searchQuery, selectedCity, selectedStyle, maxPrice, minRating, minExp, verifiedOnly, organicOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedStyle('All');
    setMaxPrice(800);
    setMinRating(4.5);
    setMinExp(0);
    setVerifiedOnly(false);
    setOrganicOnly(false);
    setSortBy('rating');
  };

  const activeFilterCount = (selectedCity !== 'All' ? 1 : 0) +
    (selectedStyle !== 'All' ? 1 : 0) +
    (maxPrice < 800 ? 1 : 0) +
    (minRating > 4.5 ? 1 : 0) +
    (minExp > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (organicOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Curated Global Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
          Discover Verified Mehndi Artisans
        </h1>
        <p className="text-sm sm:text-base text-[#5C6763] dark:text-[#B2C2BC] max-w-2xl">
          Browse vetted celebrity henna artists, examine before/after bridal stain portfolios, and hire directly with date-lock protection.
        </p>
      </div>

      {/* Main Search & Control Bar */}
      <div className="p-3 sm:p-4 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by artist name, style, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#F8F4EB] dark:bg-[#07100D] border border-transparent focus:border-[#C59B27] focus:outline-none text-xs text-[#1A2421] dark:text-[#F8F5EE]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort & Mobile Filter Trigger */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5C6763] dark:text-[#B2C2BC] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-full bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-full bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-[#1F362E] text-[#064E3B] dark:text-[#E5C07B] shadow-xs' : 'text-gray-400'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-[#1F362E] text-[#064E3B] dark:text-[#E5C07B] shadow-xs' : 'text-gray-400'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Main Body: Sidebar Filters + Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            DESKTOP FILTERS SIDEBAR
            ========================================================================= */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 space-y-6 sticky top-24">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C59B27]" />
                <span className="font-serif font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">
                  Refine Search
                </span>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#7A1C2D] dark:text-[#E5C07B] font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* City Hub Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE] block">
                Destination City
              </label>
              <div className="space-y-1">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      selectedCity === city
                        ? 'bg-[#FEF9EE] dark:bg-[#282010] text-[#9A7516] dark:text-[#E5C07B] font-bold border border-[#C59B27]/40'
                        : 'text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Specialty Filter */}
            <div className="space-y-2 pt-2 border-t border-[#EFE7DA] dark:border-[#1F362E]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE] block">
                Artistic Style
              </label>
              <div className="space-y-1">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      selectedStyle === style
                        ? 'bg-[#FEF9EE] dark:bg-[#282010] text-[#9A7516] dark:text-[#E5C07B] font-bold border border-[#C59B27]/40'
                        : 'text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{style}</span>
                    {selectedStyle === style && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Price Slider */}
            <div className="space-y-2 pt-2 border-t border-[#EFE7DA] dark:border-[#1F362E]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE]">
                  Max Starting Price
                </label>
                <span className="text-xs font-bold text-[#064E3B] dark:text-[#E5C07B]">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="800"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#064E3B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$200</span>
                <span>$800+</span>
              </div>
            </div>

            {/* Verification & Quality Checkboxes */}
            <div className="space-y-2.5 pt-2 border-t border-[#EFE7DA] dark:border-[#1F362E]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#1A2421] dark:text-[#F8F5EE]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                />
                <span>Verified Master Artisans Only</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#1A2421] dark:text-[#F8F5EE]">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={(e) => setOrganicOnly(e.target.checked)}
                  className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                />
                <span>100% Organic Henna Guarantee</span>
              </label>
            </div>

          </div>

          {/* AI Banner Callout in Sidebar */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white border border-[#C59B27]/40 space-y-3">
            <div className="flex items-center gap-1.5 text-[#E5C07B] text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unsure Which Style?</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              Take our 60-second bridal style quiz to match your lehenga with vetted artists.
            </p>
            <Link
              to="/#categories"
              className="block w-full text-center py-2 rounded-full bg-[#C59B27] text-black text-xs font-bold hover:bg-[#E5C07B] transition-colors"
            >
              Start AI Quiz
            </Link>
          </div>

        </aside>

        {/* =========================================================================
            RESULTS LIST / GRID
            ========================================================================= */}
        <main className="md:col-span-8 lg:col-span-9 space-y-6">
          
          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">Active Filters:</span>
              {selectedCity !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] text-[#9A7516] dark:text-[#E5C07B] text-xs font-medium border border-[#C59B27]/30">
                  City: {selectedCity}
                  <button onClick={() => setSelectedCity('All')}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              {selectedStyle !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] text-[#9A7516] dark:text-[#E5C07B] text-xs font-medium border border-[#C59B27]/30">
                  Style: {selectedStyle}
                  <button onClick={() => setSelectedStyle('All')}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
              {verifiedOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] text-[#064E3B] dark:text-[#34D399] text-xs font-medium border border-[#10B981]/30">
                  Verified Only
                  <button onClick={() => setVerifiedOnly(false)}><X className="w-3 h-3 ml-1" /></button>
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-[#5C6763] dark:text-[#B2C2BC]">
            <span>Showing <strong>{filteredArtists.length}</strong> master mehndi artists</span>
            <span>All artists backed by 100% Date Guarantee</span>
          </div>

          {/* Empty State */}
          {filteredArtists.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FEF9EE] dark:bg-[#282010] text-[#C59B27] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                No artists matched your exact filters
              </h3>
              <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] max-w-sm mx-auto">
                Try widening your price range or clearing some style filters to discover more master artisans.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Results Cards Grid */
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end md:hidden">
          <div className="w-4/5 max-w-sm h-full bg-[#FDFBF7] dark:bg-[#07100D] p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                <h3 className="font-serif font-bold text-lg text-[#1A2421] dark:text-[#F8F5EE]">Filter Artists</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              {/* City Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">Destination City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#0E1A16] text-xs"
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Style Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">Artistic Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#0E1A16] text-xs"
                >
                  {styles.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-[#064E3B] text-white font-bold text-xs"
              >
                Apply Filters ({filteredArtists.length} Artists)
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2.5 rounded-full border border-[#EFE7DA] text-xs font-medium"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
