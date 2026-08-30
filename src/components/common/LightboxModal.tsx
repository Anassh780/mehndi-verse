import React, { useState } from 'react';
import { X, Heart, ZoomIn, ZoomOut, Share2, Check, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-black/80 text-[#1C1A18] dark:text-white hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Viewer */}
        <div className="flex-1 bg-[#141312] relative flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[550px] select-none">
          <img
            src={currentImage}
            alt={item.title}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[80vh] w-auto object-contain transition-transform duration-300 cursor-zoom-in"
            onClick={() => setZoomLevel(prev => prev === 1 ? 1.5 : 1)}
          />

          {/* Stain Toggle */}
          {item.stainedImageUrl && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs">
              <button
                onClick={() => setShowStain(false)}
                className={`px-3 py-1 rounded-full transition-all ${
                  !showStain ? 'bg-white text-black font-bold' : 'text-gray-300'
                }`}
              >
                Fresh Henna
              </button>
              <button
                onClick={() => setShowStain(true)}
                className={`px-3 py-1 rounded-full transition-all ${
                  showStain ? 'bg-[#8E5A3C] text-white font-bold' : 'text-gray-300'
                }`}
              >
                48h Cured Stain
              </button>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 1))}
              className="p-1.5 text-white hover:text-gray-300"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-gray-300 px-1">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              className="p-1.5 text-white hover:text-gray-300"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Details & Action */}
        <div className="w-full lg:w-96 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E8E2D9] dark:border-[#2A2724] bg-[#FAF8F5] dark:bg-[#1C1A18] overflow-y-auto">
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E5A3C]">
              {item.category}
            </span>

            <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] leading-tight">
              {item.title}
            </h3>

            {artistName && (
              <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
                Master Craft by <strong className="text-[#1C1A18] dark:text-[#F7F5F0]">{artistName}</strong>
              </p>
            )}

            <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
              {item.description}
            </p>

            <div className="p-4 rounded-xl bg-[#F4EFEB] dark:bg-[#23211E] space-y-1.5 text-xs text-[#6B665F] dark:text-[#A8A298]">
              <div className="flex justify-between">
                <span>Botanical Oxidation:</span>
                <span className="font-medium text-[#1C1A18] dark:text-[#F7F5F0]">48 Hours to Peak</span>
              </div>
              <div className="flex justify-between">
                <span>PPD / Chemical Dyes:</span>
                <span className="font-medium text-[#385648] dark:text-[#5E8C75]">0% (Pure Essential Oils)</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-6 border-t border-[#E8E2D9] dark:border-[#2A2724]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex-1 py-2.5 rounded-full border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  liked ? 'bg-[#1C1A18] text-white border-[#1C1A18]' : 'border-[#D1C9BC] text-[#1C1A18] hover:bg-[#F4EFEB]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                <span>{item.likesCount + (liked ? 1 : 0)} Appreciations</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full border border-[#D1C9BC] text-[#1C1A18] hover:bg-[#F4EFEB]"
                title="Share link"
              >
                {copied ? <Check className="w-4 h-4 text-[#385648]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handleBookThisStyle}
              className="btn-primary w-full"
            >
              <span>Reserve Date for This Style</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
