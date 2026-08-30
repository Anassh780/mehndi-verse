import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MehndiCategory } from '@/types/mehndi';

interface CategoryCardProps {
  category: {
    id: MehndiCategory;
    name: string;
    tagline: string;
    description: string;
    imageUrl: string;
    count: number;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/artists?style=${encodeURIComponent(category.id)}`}
      className="group relative h-80 sm:h-96 rounded-[2rem] overflow-hidden p-1.5 border border-[#EFE7DA] dark:border-[#1F362E] bg-gradient-to-b from-[#F8F4EB] to-[#EFE7DA] dark:from-[#1F362E] dark:to-[#07100D] shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-end"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-[calc(2rem-0.375rem)]">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Layered Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      </div>

      {/* Top Badge (Count) */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
          {category.count}+ Artists
        </span>
      </div>

      {/* Content Info (Bottom) */}
      <div className="relative z-10 p-5 sm:p-6 text-white space-y-2">
        <div className="flex items-center gap-1.5 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Collection</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#E5C07B] transition-colors leading-tight">
          {category.name}
        </h3>

        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-90">
          {category.tagline}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#E5C07B] group-hover:translate-x-1 transition-transform">
          <span>Explore Artists</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
