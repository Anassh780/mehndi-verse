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
    <div className="group card flex flex-col justify-between h-full bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-[14px] overflow-hidden">
      
      <div>
        {/* Cover Photo with Image Zoom & Single Status Badge */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#efe6d4]">
          <img
            src={artist.coverImage}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Single Status Badge (Top Left) */}
          <div className="absolute top-3.5 left-3.5 z-10">
            {artist.verified ? (
              <span className="badge">
                <Check className="w-3 h-3 text-[#c9a227]" strokeWidth={2.5} />
                <span>Verified Atelier</span>
              </span>
            ) : (
              <span className="badge">
                <span>{artist.city}</span>
              </span>
            )}
          </div>

          {/* Discreet Favorite Button (Top Right) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(artist.id);
            }}
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#f7f1e6]/90 backdrop-blur-sm border border-[rgba(27,24,21,0.12)] flex items-center justify-center text-[#2c2620] hover:text-[#9c4221] transition-colors shadow-xs active:scale-95"
            aria-label={favorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${favorited ? 'fill-[#9c4221] text-[#9c4221]' : ''}`}
              strokeWidth={1.5}
            />
          </button>

          {/* Discreet Location & Experience Tag (Bottom Overlay) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#f7f1e6] z-10 font-medium">
            <span className="px-2.5 py-1 rounded-md bg-[#1b1815]/75 backdrop-blur-sm text-[11px] flex items-center gap-1">
              <MapPin className="w-3 h-3" strokeWidth={1.5} />
              <span>{artist.city}, {artist.country}</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#1b1815]/75 backdrop-blur-sm text-[11px]">
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
                className="w-10 h-10 rounded-full object-cover border border-[rgba(27,24,21,0.12)] shrink-0"
              />
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-[#1b1815] group-hover:text-[#9c4221] transition-colors leading-tight">
                  <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
                </h3>
                <p className="text-xs text-[#2c2620]/75">
                  {artist.title}
                </p>
              </div>
            </div>

            {/* Clean Rating */}
            <div className="flex items-center gap-1 text-xs font-semibold text-[#1b1815] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#1b1815] text-[#1b1815]" />
              <span>{artist.rating.toFixed(2)}</span>
              <span className="text-[11px] text-[#2c2620]/60 font-normal">({artist.reviewCount})</span>
            </div>
          </div>

          {/* Specialties Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {artist.specialties.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#efe6d4] text-[#2c2620]"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Short Narrative Bio */}
          <p className="text-xs text-[#2c2620]/75 line-clamp-2 leading-relaxed pt-1 font-sans">
            {artist.bio}
          </p>
        </div>
      </div>

      {/* Pricing & Actions Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#2c2620]/60 block font-semibold">
            Bridal Commission
          </span>
          <span className="font-serif-editorial text-lg font-bold text-[#1b1815]">
            ${artist.startingPrice} <span className="font-sans text-[11px] font-normal text-[#2c2620]/75">starting</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/artists/${artist.id}`}
            className="text-xs font-semibold text-[#1b1815] hover:text-[#9c4221] transition-colors py-2 px-2.5 min-h-[40px] flex items-center"
          >
            Portfolio
          </Link>
          <button
            onClick={handleInstantBook}
            className="btn btn-primary !py-2 !px-4 !text-[11px] min-h-[40px]"
          >
            <span>Reserve</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
