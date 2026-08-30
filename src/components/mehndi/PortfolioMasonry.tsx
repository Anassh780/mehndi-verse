import React, { useState } from 'react';
import { Sparkles, Heart, ZoomIn, Eye } from 'lucide-react';
import { PortfolioItem, MehndiCategory } from '@/types/mehndi';

interface PortfolioMasonryProps {
  items: PortfolioItem[];
  onOpenLightbox: (item: PortfolioItem) => void;
}

export const PortfolioMasonry: React.FC<PortfolioMasonryProps> = ({ items, onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bridal', 'Arabic', 'Rajasthani & Traditional', 'Minimalist Mandala', 'Indo-Western & Modern'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-white dark:bg-[#0E1A16] text-[#5C6763] dark:text-[#B2C2BC] border border-[#EFE7DA] dark:border-[#1F362E] hover:border-[#C59B27]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group relative rounded-3xl overflow-hidden bg-gray-900 border border-[#EFE7DA] dark:border-[#1F362E] cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 aspect-[4/5]"
          >
            {/* Main Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                {item.category}
              </span>
              {item.stainedImageUrl && (
                <span className="px-2.5 py-1 rounded-full bg-[#7A1C2D]/90 backdrop-blur-md text-white text-[10px] font-bold">
                  Stain Preview
                </span>
              )}
            </div>

            {/* Center Quick Zoom Icon on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                <ZoomIn className="w-5 h-5 text-[#E5C07B]" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
              <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#E5C07B] transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-gray-300 line-clamp-1 opacity-90">
                {item.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#E5C07B]">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{item.likesCount}</span>
                </span>
                <span className="underline">View HD Details →</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
