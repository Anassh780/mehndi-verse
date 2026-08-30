import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '@/types/mehndi';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooking } from '@/context/BookingContext';
import { MOCK_ARTISTS } from '@/services/mehndiData';

interface LightboxModalProps {
  item: PortfolioItem;
  artistId: string;
  artistName: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  artistId,
  artistName,
  onClose,
}) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { selectArtistAndPackage } = useBooking();
  
  const [showStainPreview, setShowStainPreview] = useState(false);
  const favorited = isFavorite(artistId);

  const artist = MOCK_ARTISTS.find((a) => a.id === artistId);

  const handleBookWithLook = () => {
    if (artist) {
      selectArtistAndPackage(artist);
      navigate(`/book/${artist.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1815]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#f7f1e6]/90 border border-[rgba(27,24,21,0.12)] flex items-center justify-center text-[#1b1815] hover:bg-[#efe6d4] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Artwork Visual with 48h Stain Toggle */}
        <div className="md:col-span-7 relative bg-[#1b1815] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[480px]">
          <img
            src={showStainPreview && item.stainedImageUrl ? item.stainedImageUrl : item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Stain Toggle Control */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs">
            <span className="text-[11px] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
              <span>{showStainPreview ? '48h Deep Mahogany Stain' : 'Fresh Botanical Application'}</span>
            </span>
            {item.stainedImageUrl && (
              <button
                onClick={() => setShowStainPreview(!showStainPreview)}
                className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 text-[10px] uppercase font-bold tracking-wider transition-colors"
              >
                {showStainPreview ? 'Show Fresh' : 'Preview 48h Stain'}
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Editorial Meta Details */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          
          <div className="space-y-4">
            <div>
              <span className="badge">
                <span>{item.category}</span>
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815] mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#9c4221] font-semibold">
                Applied by {artistName}
              </p>
            </div>

            <p className="text-xs text-[#2c2620]/80 leading-relaxed font-sans">
              {item.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.08)] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#2c2620]/70">Application Time:</span>
                <span className="font-semibold text-[#1b1815]">~3.5 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2c2620]/70">Botanical Paste:</span>
                <span className="font-semibold text-[#6b7752]">Organic Sojat Batch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2c2620]/70">Bridal Style:</span>
                <span className="font-semibold text-[#1b1815]">{item.category}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[rgba(27,24,21,0.08)]">
            <button
              onClick={handleBookWithLook}
              className="btn btn-primary w-full !py-3 !text-xs"
            >
              <span>Commission This Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => toggleFavorite(artistId)}
              className="btn btn-ghost w-full !py-2.5 !text-xs"
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-[#9c4221] text-[#9c4221]' : ''}`} />
              <span>{favorited ? 'Saved in Wishlist' : 'Save Design to Wishlist'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
