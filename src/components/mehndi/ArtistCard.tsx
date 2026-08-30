import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, Heart, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { Artist } from '@/types/mehndi';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooking } from '@/context/BookingContext';

interface ArtistCardProps {
  artist: Artist;
  onOpenChat?: (artist: Artist) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onOpenChat }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selectArtistAndPackage } = useBooking();
  const navigate = useNavigate();
  const favorited = isFavorite(artist.id);

  const handleInstantBook = (e: React.MouseEvent) => {
    e.preventDefault();
    selectArtistAndPackage(artist);
    navigate(`/book/${artist.id}`);
  };

  return (
    <div className="group relative p-1.5 rounded-[2rem] bg-gradient-to-b from-[#EFE7DA] to-[#F8F4EB] dark:from-[#1F362E] dark:to-[#0E1A16] border border-[#EFE7DA]/80 dark:border-[#1F362E] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Inner Core Container */}
      <div className="rounded-[calc(2rem-0.375rem)] bg-white dark:bg-[#07100D] overflow-hidden flex flex-col h-full border border-white/60 dark:border-white/5">
        
        {/* Cover Image & Hover Gallery Preview */}
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-900">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Subtle Top Gradient for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges Strip (Top Left) */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {artist.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#064E3B]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-[#E5C07B]" />
                <span>Verified Artisan</span>
              </span>
            )}
            {artist.proMember && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#C59B27]/90 backdrop-blur-md text-[#07100D] text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>Pro Choice</span>
              </span>
            )}
          </div>

          {/* Favorite Button (Top Right) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(artist.id);
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#7A1C2D] transition-all"
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-[#7A1C2D] text-[#7A1C2D]' : ''}`} />
          </button>

          {/* Bottom Overlay Info (City & Experience) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
            <span className="flex items-center gap-1 font-medium bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3 text-[#E5C07B]" />
              <span>{artist.city}, {artist.country}</span>
            </span>
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px]">
              {artist.experienceYears}+ Yrs Exp
            </span>
          </div>

        </div>

        {/* Content Details */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          
          <div>
            {/* Header: Avatar, Name & Rating */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C59B27] shadow-sm -mt-8 relative z-20 bg-white"
                />
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1A2421] dark:text-[#F8F5EE] group-hover:text-[#064E3B] dark:group-hover:text-[#E5C07B] transition-colors leading-tight">
                    {artist.name}
                  </h3>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC] line-clamp-1">
                    {artist.title}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/30 px-2 py-0.5 rounded-lg text-xs font-bold text-[#9A7516] dark:text-[#E5C07B] shrink-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{artist.rating.toFixed(2)}</span>
                <span className="text-[10px] text-gray-400 font-normal">({artist.reviewCount})</span>
              </div>
            </div>

            {/* Specialties Badges */}
            <div className="flex flex-wrap gap-1.5 my-3">
              {artist.specialties.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-0.5 rounded-md bg-[#F8F4EB] dark:bg-[#14241F] text-[11px] font-medium text-[#5C6763] dark:text-[#B2C2BC] border border-[#EFE7DA] dark:border-[#1F362E]"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Bio snippet */}
            <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] line-clamp-2 leading-relaxed mb-4">
              {artist.bio}
            </p>
          </div>

          {/* Pricing & Actions Footer */}
          <div className="pt-3 border-t border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">
                Starting from
              </span>
              <span className="font-serif font-bold text-base text-[#064E3B] dark:text-[#E5C07B]">
                ${artist.startingPrice} <span className="text-xs font-sans text-gray-500 font-normal">/ bridal</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/artists/${artist.id}`}
                className="px-3 py-1.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Portfolio
              </Link>
              <button
                onClick={handleInstantBook}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white text-xs font-semibold hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1"
              >
                <span>Book</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
