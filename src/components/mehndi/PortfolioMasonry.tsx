import React, { useState } from 'react';
import { ZoomIn, Heart } from 'lucide-react';
import { PortfolioItem } from '@/types/mehndi';

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
      
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#1C1A18] text-white dark:bg-[#F7F5F0] dark:text-[#141312]'
                  : 'bg-white dark:bg-[#1C1A18] text-[#6B665F] dark:text-[#A8A298] border border-[#E8E2D9] dark:border-[#2A2724] hover:border-[#1C1A18]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item)}
            className="group editorial-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4EFEB] dark:bg-[#1C1A18]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag Overlays */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                {item.stainedImageUrl && (
                  <span className="px-2.5 py-1 rounded-md bg-[#8E5A3C] text-white text-[10px] font-semibold uppercase tracking-wider">
                    48h Stain
                  </span>
                )}
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <div className="w-10 h-10 rounded-full bg-white text-[#1C1A18] flex items-center justify-center shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-5 space-y-1">
              <h4 className="font-serif-editorial text-base font-bold text-[#1C1A18] dark:text-[#F7F5F0] group-hover:text-[#8E5A3C] transition-colors leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-[#6B665F] dark:text-[#A8A298] line-clamp-1">
                {item.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#9E988F]">
                <span>{item.likesCount} appreciations</span>
                <span className="font-semibold text-[#1C1A18] dark:text-[#F7F5F0] group-hover:underline">View Details →</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
