import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Grid, 
  List, 
  Check, 
  X,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { MehndiCategory } from '@/types/mehndi';

export const ArtistsExplorePage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get('style') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'experience'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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

  const filteredArtists = useMemo(() => {
    return MOCK_ARTISTS.filter((artist) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(q);
        const matchesBio = artist.bio.toLowerCase().includes(q);
        const matchesCity = artist.city.toLowerCase().includes(q);
        const matchesStyle = artist.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBio && !matchesCity && !matchesStyle) return false;
      }
      if (selectedCity !== 'All' && !artist.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      if (selectedStyle !== 'All' && !artist.specialties.includes(selectedStyle as MehndiCategory)) return false;
      if (artist.startingPrice > maxPrice) return false;
      if (verifiedOnly && !artist.verified) return false;
      if (organicOnly && !artist.organicChemicalFreeGuarantee) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price_high') return b.startingPrice - a.startingPrice;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [searchQuery, selectedCity, selectedStyle, maxPrice, verifiedOnly, organicOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedStyle('All');
    setMaxPrice(800);
    setVerifiedOnly(false);
    setOrganicOnly(false);
    setSortBy('rating');
  };

  const activeFilterCount = (selectedCity !== 'All' ? 1 : 0) +
    (selectedStyle !== 'All' ? 1 : 0) +
    (maxPrice < 800 ? 1 : 0) +
    (verifiedOnly ? 1 : 0) +
    (organicOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Editorial Page Header */}
      <div className="space-y-2 pb-6 border-b border-[#E8E2D9] dark:border-[#2A2724]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] dark:text-[#D4A373] block">
          Directory of Master Artisans
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
          Commission a Master Henna Artist
        </h1>
        <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298] max-w-2xl leading-relaxed">
          Explore vetted master artisans across key wedding hubs. Filter by regional tradition, experience, and budget.
        </p>
      </div>

      {/* Control Bar */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E988F]" />
          <input
            type="text"
            placeholder="Search by artist name, tradition, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] focus:outline-none focus:border-[#1C1A18]"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D9] text-xs font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6B665F] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] text-xs font-medium text-[#1C1A18] dark:text-[#F7F5F0] focus:outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="experience">Years of Craft</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center p-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-white dark:bg-[#1C1A18] text-[#1C1A18] shadow-xs' : 'text-[#9E988F]'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-full ${viewMode === 'list' ? 'bg-white dark:bg-[#1C1A18] text-[#1C1A18] shadow-xs' : 'text-[#9E988F]'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Grid: Sidebar Filters + Main List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 space-y-6 sticky top-24">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-xs space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] dark:border-[#2A2724]">
              <span className="font-serif-editorial font-bold text-sm text-[#1C1A18] dark:text-[#F7F5F0]">
                Refine Selection
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#8E5A3C] font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* City Hub Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                Destination Hub
              </label>
              <div className="space-y-1">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedCity === city
                        ? 'bg-[#F4EFEB] dark:bg-[#23211E] text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
                        : 'text-[#6B665F] dark:text-[#A8A298] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check className="w-3 h-3 text-[#1C1A18] dark:text-[#F7F5F0]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Tradition Filter */}
            <div className="space-y-2 pt-3 border-t border-[#F0EAE1] dark:border-[#2A2724]">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                Artistic Tradition
              </label>
              <div className="space-y-1">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedStyle === style
                        ? 'bg-[#F4EFEB] dark:bg-[#23211E] text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
                        : 'text-[#6B665F] dark:text-[#A8A298] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span>{style}</span>
                    {selectedStyle === style && <Check className="w-3 h-3 text-[#1C1A18] dark:text-[#F7F5F0]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 pt-3 border-t border-[#F0EAE1] dark:border-[#2A2724]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0]">
                  Max Bridal Price
                </label>
                <span className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
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
                className="w-full accent-[#1C1A18] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E988F]">
                <span>$200</span>
                <span>$800+</span>
              </div>
            </div>

            {/* Verified Only Checkbox */}
            <div className="space-y-2 pt-3 border-t border-[#F0EAE1] dark:border-[#2A2724]">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1C1A18] dark:text-[#F7F5F0]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#1C1A18] focus:ring-[#1C1A18]"
                />
                <span>Verified Ateliers Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Results Main Section */}
        <main className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-[#6B665F] dark:text-[#A8A298]">
            <span>Showing <strong>{filteredArtists.length}</strong> master artisans</span>
            <span>All commissions backed by Escrow Protection</span>
          </div>

          {filteredArtists.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4">
              <p className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                No artisans match your current filter parameters
              </p>
              <p className="text-xs text-[#6B665F]">Try widening your destination or price filters.</p>
              <button onClick={handleResetFilters} className="btn-secondary">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};
