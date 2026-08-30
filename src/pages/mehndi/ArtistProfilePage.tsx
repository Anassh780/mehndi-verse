import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Crown, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Sparkles, 
  Check, 
  Award,
  ChevronRight,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { PortfolioMasonry } from '@/components/mehndi/PortfolioMasonry';
import { ServicePackageCard } from '@/components/mehndi/ServicePackageCard';
import { TestimonialCard } from '@/components/mehndi/TestimonialCard';
import { LightboxModal } from '@/components/common/LightboxModal';
import { ChatModal } from '@/components/common/ChatModal';
import { PortfolioItem } from '@/types/mehndi';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooking } from '@/context/BookingContext';

export const ArtistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selectArtistAndPackage } = useBooking();

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'packages' | 'reviews' | 'availability'>('portfolio');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PortfolioItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const artist = MOCK_ARTISTS.find(a => a.id === id) || MOCK_ARTISTS[0];
  const favorited = isFavorite(artist.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookNow = () => {
    selectArtistAndPackage(artist);
    navigate(`/book/${artist.id}`);
  };

  const tabs = [
    { id: 'portfolio', label: `Portfolio (${artist.portfolio.length})` },
    { id: 'packages', label: `Service Packages (${artist.packages.length})` },
    { id: 'overview', label: 'Artisan Story & Bio' },
    { id: 'reviews', label: `Bridal Reviews (${artist.reviewCount})` },
    { id: 'availability', label: 'Live Calendar' },
  ];

  return (
    <div className="pb-24 space-y-12">
      
      {/* =========================================================================
          1. INSTAGRAM / EDITORIAL PROFILE HEADER
          ========================================================================= */}
      <section className="relative">
        
        {/* Cover Banner */}
        <div className="h-64 sm:h-80 md:h-96 w-full relative bg-gray-900 overflow-hidden">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Floating Profile Info Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 z-10">
          
          <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Avatar & Bio Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              
              <div className="relative">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#C59B27] shadow-xl bg-white"
                />
                <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#064E3B] text-[#E5C07B] flex items-center justify-center border-2 border-white">
                  <Crown className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                    {artist.name}
                  </h1>
                  {artist.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] text-[#064E3B] dark:text-[#34D399] text-[10px] font-bold uppercase tracking-wider border border-[#10B981]/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Pro</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#C59B27] font-semibold">
                  {artist.title} • {artist.handle}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C6763] dark:text-[#B2C2BC] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#064E3B] dark:text-[#E5C07B]" />
                    <span>{artist.city}, {artist.country}</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-[#9A7516] dark:text-[#E5C07B]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{artist.rating.toFixed(2)} ({artist.reviewCount} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{artist.experienceYears}+ Years Experience</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              <button
                onClick={() => toggleFavorite(artist.id)}
                className={`p-3 rounded-full border transition-all ${
                  favorited
                    ? 'bg-[#7A1C2D] border-[#7A1C2D] text-white'
                    : 'border-[#EFE7DA] dark:border-[#1F362E] text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5'
                }`}
                title={favorited ? 'Saved to Favorites' : 'Save to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5"
                title="Share Profile"
              >
                {copied ? <Check className="w-5 h-5 text-[#34D399]" /> : <Share2 className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="px-5 py-3 rounded-full border border-[#C59B27] text-[#9A7516] dark:text-[#E5C07B] hover:bg-[#FEF9EE] dark:hover:bg-[#282010] text-xs font-bold transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>

              <button
                onClick={handleBookNow}
                className="flex-1 md:flex-none px-7 py-3 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white text-xs font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. NAVIGATION TABS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#EFE7DA] dark:border-[#1F362E] flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap relative transition-colors ${
                  isActive
                    ? 'text-[#064E3B] dark:text-[#E5C07B] font-bold'
                    : 'text-[#5C6763] dark:text-[#B2C2BC] hover:text-[#064E3B]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C59B27] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. TAB CONTENTS
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <PortfolioMasonry
              items={artist.portfolio}
              onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            />
          </div>
        )}

        {/* TAB 2: SERVICE PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                Curated Service Packages
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6763] dark:text-[#B2C2BC]">
                Each package includes a pre-wedding bridal consultation, customized hidden initials, and 100% natural organic henna cones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artist.packages.map((pkg) => (
                <ServicePackageCard key={pkg.id} pkg={pkg} artist={artist} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ARTISAN STORY & OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Story & Background */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="p-8 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] space-y-4 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                  About {artist.name}
                </h3>
                <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                  {artist.bio}
                </p>
                {artist.story && (
                  <p className="text-sm text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                    {artist.story}
                  </p>
                )}

                <div className="pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] flex flex-wrap gap-2">
                  {artist.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold"
                    >
                      ✦ {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Organic Safety Pledge */}
              <div className="p-6 rounded-3xl bg-[#ECFDF5] dark:bg-[#06281F] border border-[#10B981]/30 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-[#064E3B] dark:text-[#34D399] shrink-0 mt-1" />
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#064E3B] dark:text-[#34D399]">
                    100% Chemical-Free Organic Guarantee
                  </h4>
                  <p className="text-xs text-[#064E3B]/80 dark:text-[#34D399]/80 leading-relaxed">
                    This artist prepares all henna paste using freshly sifted organic Sojat leaves, pure eucalyptus and tea tree essential oils. Zero PPD, zero chemical enhancers.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Sidebar Stats & Policies */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] space-y-4 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                  Performance Metrics
                </h4>

                <div className="space-y-3 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                  <div className="flex justify-between py-2 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                    <span>Completed Weddings:</span>
                    <strong className="text-[#1A2421] dark:text-[#F8F5EE]">{artist.stats.completedWeddings}+</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                    <span>Brides Adorned:</span>
                    <strong className="text-[#1A2421] dark:text-[#F8F5EE]">{artist.stats.bridesServed}+</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                    <span>Repeat / Referral Rate:</span>
                    <strong className="text-[#064E3B] dark:text-[#34D399]">{artist.stats.repeatClientsPercent}%</strong>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Response Time:</span>
                    <strong className="text-[#1A2421] dark:text-[#F8F5EE]">~{artist.responseTimeMinutes} mins</strong>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full py-3 rounded-full bg-[#064E3B] text-white text-xs font-bold hover:bg-[#022C22] transition-colors"
                >
                  Book Bridal Consultation
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            
            {/* Rating Summary Card */}
            <div className="p-8 rounded-3xl bg-[#FEF9EE] dark:bg-[#0E1A16] border border-[#C59B27]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-serif text-5xl font-bold text-[#064E3B] dark:text-[#E5C07B]">
                    {artist.rating.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 text-[#C59B27] mt-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC] mt-1">
                    Based on {artist.reviewCount} verified weddings
                  </p>
                </div>
              </div>

              <div className="flex-1 max-w-sm space-y-2 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                <div className="flex items-center gap-3">
                  <span>5 Star</span>
                  <div className="flex-1 h-2 bg-[#EFE7DA] dark:bg-[#1F362E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C59B27] w-[95%]" />
                  </div>
                  <span>95%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>4 Star</span>
                  <div className="flex-1 h-2 bg-[#EFE7DA] dark:bg-[#1F362E] rounded-full overflow-hidden">
                    <div className="h-full bg-[#C59B27] w-[5%]" />
                  </div>
                  <span>5%</span>
                </div>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.reviews.map((review) => (
                <TestimonialCard key={review.id} review={review} />
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: AVAILABILITY CALENDAR */}
        {activeTab === 'availability' && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] space-y-6 shadow-sm">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                Live Schedule & Open Slots
              </h3>
              <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                Select an open time slot to begin your booking wizard.
              </p>
            </div>

            <div className="space-y-4">
              {artist.availability.map((day) => (
                <div key={day.date} className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E]">
                  <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-3">
                    📅 Date: {day.date}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {day.slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={handleBookNow}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          slot.available
                            ? 'bg-white dark:bg-[#14241F] text-[#064E3B] dark:text-[#34D399] border border-[#10B981]/30 hover:bg-[#064E3B] hover:text-white'
                            : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed line-through'
                        }`}
                      >
                        <span>{slot.time}</span>
                        {slot.available ? <span>Open</span> : <span>Booked</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          artistId={artist.id}
          artistName={artist.name}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}

      {/* Live Messenger Modal */}
      <ChatModal
        isOpen={chatOpen}
        artistId={artist.id}
        artistName={artist.name}
        artistAvatar={artist.avatar}
        onClose={() => setChatOpen(false)}
      />

    </div>
  );
};
