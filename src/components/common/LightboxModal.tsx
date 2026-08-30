import React, { useState } from 'react';
import { X, Heart, Sparkles, Calendar, ZoomIn, ZoomOut, Share2, Check } from 'lucide-react';
import { PortfolioItem } from '@/types/mehndi';
import { useNavigate } from 'react-router-dom';

interface LightboxModalProps {
  item: PortfolioItem | null;
  artistId?: string;
  artistName?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, artistId, artistName, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showStain, setShowStain] = useState(false);
  const navigate = useNavigate();

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookThisStyle = () => {
    onClose();
    if (artistId) {
      navigate(`/book/${artistId}`);
    } else {
      navigate('/artists');
    }
  };

  const currentImage = (showStain && item.stainedImageUrl) ? item.stainedImageUrl : item.imageUrl;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-5xl bg-[#07100D] border border-[#1F362E] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Viewer with Zoom */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[550px] select-none">
          <img
            src={currentImage}
            alt={item.title}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[80vh] w-auto object-contain transition-transform duration-300 cursor-zoom-in"
            onClick={() => setZoomLevel(prev => prev === 1 ? 1.6 : 1)}
          />

          {/* Stain Toggle if Available */}
          {item.stainedImageUrl && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs">
              <button
                onClick={() => setShowStain(false)}
                className={`px-3 py-1 rounded-full transition-all ${
                  !showStain ? 'bg-[#C59B27] text-black font-bold' : 'text-gray-300'
                }`}
              >
                Fresh Henna
              </button>
              <button
                onClick={() => setShowStain(true)}
                className={`px-3 py-1 rounded-full transition-all ${
                  showStain ? 'bg-[#7A1C2D] text-white font-bold' : 'text-gray-300'
                }`}
              >
                48h Dark Stain
              </button>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 1))}
              className="p-1.5 text-white hover:text-[#E5C07B]"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-gray-300 px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 2.5))}
              className="p-1.5 text-white hover:text-[#E5C07B]"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Artwork Metadata & Instant Book Drawer */}
        <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#1F362E] bg-[#0E1A16] overflow-y-auto">
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#282010] border border-[#C59B27]/40 text-[#E5C07B] text-xs font-semibold">
                {item.category}
              </span>
              {item.handType && (
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-400 text-xs">
                  {item.handType}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl text-white font-bold mb-2">
              {item.title}
            </h3>

            {artistName && (
              <p className="text-xs text-[#E5C07B] mb-4">
                Master Craft by <span className="font-semibold">{artistName}</span>
              </p>
            )}

            <p className="text-sm text-[#B2C2BC] leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-[#07100D] border border-[#1F362E] space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Natural Henna Oxidation:</span>
                <span className="text-[#34D399] font-medium">48 hrs for deepest tone</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Chemicals / Dye additives:</span>
                <span className="text-[#34D399] font-medium">0% (Pure Essential Oils)</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-4 border-t border-[#1F362E]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 py-2.5 rounded-full border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                  liked
                    ? 'bg-[#7A1C2D] border-[#7A1C2D] text-white'
                    : 'border-[#1F362E] text-gray-300 hover:bg-white/5'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{item.likesCount + (liked ? 1 : 0)} Likes</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full border border-[#1F362E] text-gray-300 hover:bg-white/5"
                title="Share link"
              >
                {copied ? <Check className="w-4 h-4 text-[#34D399]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handleBookThisStyle}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for This Style</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
