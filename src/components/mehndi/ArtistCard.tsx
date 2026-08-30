import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, ArrowUpRight, Check } from 'lucide-react';
import { Artist } from '@/types/mehndi';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooking } from '@/context/BookingContext';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selectArtistAndPackage } = useBooking();
  const navigate = useNavigate();
  const favorited = isFavorite(artist.id);

  const handleInstantBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectArtistAndPackage(artist);
    navigate(`/book/${artist.id}`);
  };

  return (
    <div className="group editorial-card rounded-2xl overflow-hidden flex flex-col justify-between h-full">
      
      <div>
        {/* Cover Photo with Image Zoom & Single Status Badge */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFEB] dark:bg-[#1C1A18]">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Single Status Badge (Top Left) - Single indicator rule */}
          <div className="absolute top-3.5 left-3.5 z-10">
            {artist.verified ? (
              <span className="badge-status">
                <Check className="w-3 h-3 text-[#385648] dark:text-[#5E8C75]" strokeWidth={2.5} />
                <span>Verified Atelier</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-black/80 text-[#1C1A18] dark:text-white backdrop-blur-sm border border-[#E8E2D9] dark:border-white/10">
                {artist.city}
              </span>
            )}
          </div>

          {/* Discreet Favorite Button (Top Right, touch-friendly 44x44) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(artist.id);
            }}
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-[#E8E2D9] dark:border-white/10 flex items-center justify-center text-[#6B665F] hover:text-[#8E5A3C] transition-colors shadow-xs active:scale-95"
            aria-label={favorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${favorited ? 'fill-[#8E5A3C] text-[#8E5A3C]' : ''}`}
              strokeWidth={1.5}
            />
          </button>

          {/* Discreet Location & Experience Tag (Bottom Overlay) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 font-medium">
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3" strokeWidth={1.5} />
              <span>{artist.city}, {artist.country}</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[11px]">
              {artist.experienceYears} yrs craft
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3">
          
          {/* Header Row: Avatar, Name, Rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9] dark:border-[#2A2724] shrink-0"
              />
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0] group-hover:text-[#8E5A3C] transition-colors leading-tight">
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </h3>
                <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
                  {artist.title}
                </p>
              </div>
            </div>

            {/* Clean Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#1C1A18] dark:text-[#F7F5F0] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#1C1A18] dark:fill-[#F7F5F0] text-[#1C1A18] dark:text-[#F7F5F0]" />
              <span>{artist.rating.toFixed(2)}</span>
              <span className="text-[11px] text-[#6B665F] dark:text-[#A8A298] font-normal">({artist.reviewCount})</span>
            </div>
          </div>

          {/* Specialties Tags - Clean restrained pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {artist.specialties.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#F4EFEB] dark:bg-[#23211E] text-[#6B665F] dark:text-[#A8A298]"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Short Narrative Bio */}
          <p className="text-xs text-[#6B665F] dark:text-[#A8A298] line-clamp-2 leading-relaxed pt-1">
            {artist.bio}
          </p>
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F0EAE1] dark:border-[#23211E] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#6B665F] dark:text-[#A8A298] block font-semibold">
            Bridal Session
          </span>
          <span className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            ${artist.startingPrice} <span className="font-sans text-[11px] font-normal text-[#6B665F] dark:text-[#A8A298]">starting</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/artists/${artist.id}`}
            className="text-xs font-semibold text-[#1C1A18] dark:text-[#F7F5F0] hover:text-[#8E5A3C] transition-colors py-2 px-2.5 min-h-[40px] flex items-center"
          >
            Portfolio
          </Link>
          <button
            onClick={handleInstantBook}
            className="btn-primary !py-2 !px-4 !text-[11px] min-h-[40px]"
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
