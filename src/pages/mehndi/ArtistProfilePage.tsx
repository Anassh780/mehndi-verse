import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  Share2, 
  MessageSquare, 
  Calendar, 
  Clock, 
  Check, 
  Award,
  ChevronRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { PortfolioMasonry } from '@/components/mehndi/PortfolioMasonry';
import { ServicePackageCard } from '@/components/mehndi/ServicePackageCard';
import { TestimonialCard } from '@/components/mehndi/TestimonialCard';
import { LightboxModal } from '@/components/common/LightboxModal';
import { ChatModal } from '@/components/common/ChatModal';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooking } from '@/context/BookingContext';
import { PortfolioItem } from '@/types/mehndi';

export const ArtistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selectArtistAndPackage } = useBooking();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'about' | 'reviews' | 'calendar'>('portfolio');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const artist = MOCK_ARTISTS.find((a) => a.id === id) || MOCK_ARTISTS[0];
  const favorited = isFavorite(artist.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectBook = () => {
    selectArtistAndPackage(artist);
    navigate(`/book/${artist.id}`);
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* 1. Header Banner & Identity */}
      <div className="relative">
        <div className="h-64 sm:h-80 w-full overflow-hidden bg-[#F4EFEB] dark:bg-[#1C1A18] relative">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Profile Card Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
          <div className="editorial-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white dark:border-[#141312] shadow-md shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    {artist.name}
                  </h1>
                  {artist.verified && (
                    <span className="badge-status">
                      <Check className="w-3 h-3 text-[#385648] dark:text-[#5E8C75]" strokeWidth={2.5} />
                      <span>Verified Atelier</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
                  {artist.title} · {artist.city}, {artist.country}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1C1A18] dark:text-[#F7F5F0] pt-1">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#1C1A18] dark:fill-[#F7F5F0]" />
                    <span>{artist.rating.toFixed(2)}</span>
                    <span className="text-[#9E988F] font-normal">({artist.reviewCount} commissions)</span>
                  </span>
                  <span>·</span>
                  <span className="text-[#8E5A3C] font-semibold">{artist.experienceYears} Years Craft</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => toggleFavorite(artist.id)}
                className="p-3 rounded-full border border-[#D1C9BC] text-[#6B665F] hover:text-[#8E5A3C] hover:border-[#8E5A3C] transition-colors"
                title="Save"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-[#8E5A3C] text-[#8E5A3C]' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full border border-[#D1C9BC] text-[#6B665F] hover:text-[#1C1A18] transition-colors"
                title="Share"
              >
                {copied ? <Check className="w-4 h-4 text-[#385648]" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setChatOpen(true)}
                className="btn-secondary !py-2.5 !px-4 !text-xs flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire</span>
              </button>

              <button
                onClick={handleDirectBook}
                className="btn-primary !py-2.5 !px-6 !text-xs flex-1 sm:flex-initial"
              >
                <span>Reserve Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8E2D9] dark:border-[#2A2724] flex items-center gap-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'portfolio', label: `Portfolio (${artist.portfolio.length})` },
            { id: 'packages', label: `Service Packages (${artist.packages.length})` },
            { id: 'about', label: 'Artisan Story & Standards' },
            { id: 'reviews', label: `Bridal Reviews (${artist.reviewCount})` },
            { id: 'calendar', label: 'Live Availability' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap relative transition-colors ${
                activeTab === tab.id
                  ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
                  : 'text-[#6B665F] dark:text-[#A8A298] hover:text-[#1C1A18]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1C1A18] dark:bg-[#F7F5F0]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TAB 1: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <PortfolioMasonry
            items={artist.portfolio}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}

        {/* TAB 2: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-8">
            <div className="max-w-xl space-y-1">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Commission Packages & Tiers
              </h3>
              <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
                All options include natural Sojat organic henna paste, custom layout sketches, and post-application sealants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artist.packages.map((pkg) => (
                <ServicePackageCard key={pkg.id} pkg={pkg} artist={artist} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ARTISAN STORY */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Heritage & Artistic Philosophy
              </h3>
              <p className="text-sm text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
                {artist.bio}
              </p>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4">
                <h4 className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                  100% Pure Botanical Guarantee
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#6B665F] dark:text-[#A8A298]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#385648]" />
                    <span>Pure Organic Rajasthani Henna</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#385648]" />
                    <span>Zero PPD or Chemical Darkeners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#385648]" />
                    <span>Tea Tree & Eucalyptus Essential Oils</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#385648]" />
                    <span>Hypoallergenic Botanical Formula</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4">
              <h4 className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Studio Specs
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-[#F0EAE1]">
                  <span className="text-[#6B665F]">Base Hub</span>
                  <span className="font-semibold text-[#1C1A18]">{artist.city}, {artist.country}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F0EAE1]">
                  <span className="text-[#6B665F]">Average Response</span>
                  <span className="font-semibold text-[#1C1A18]">{artist.responseTimeMinutes} mins</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F0EAE1]">
                  <span className="text-[#6B665F]">Destination Travel</span>
                  <span className="font-semibold text-[#385648]">Available Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Bridal Reviews & Testimonials
              </h3>
              <span className="text-xs font-semibold text-[#8E5A3C]">
                {artist.rating} ★ Rating Across {artist.reviews.length} Verified Weddings
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artist.reviews.map((review) => (
                <TestimonialCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-6">
            <div className="space-y-1">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Live Availability Slots
              </h3>
              <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
                Select an open date to initiate your booking with {artist.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {artist.availability.map((slotGroup, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312] text-xs space-y-3"
                >
                  <p className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{slotGroup.date}</p>
                  <div className="space-y-1.5">
                    {slotGroup.slots.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between">
                        <span className="text-[11px] text-[#6B665F]">{s.time}</span>
                        {s.available ? (
                          <button
                            onClick={handleDirectBook}
                            className="btn-primary !py-1 !px-2.5 !text-[10px]"
                          >
                            Reserve
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-semibold">Reserved</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <LightboxModal
          item={lightboxItem}
          artistId={artist.id}
          artistName={artist.name}
          onClose={() => setLightboxItem(null)}
        />
      )}

      {/* Chat Inquiry Modal */}
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
