import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { MehndiCategory } from '@/types/mehndi';

interface CategoryCardProps {
  category: {
    id: MehndiCategory;
    name: string;
    tagline?: string;
    description: string;
    imageUrl: string;
    count?: number;
    origin?: string;
    artistCount?: number;
  };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/artists?style=${encodeURIComponent(category.id)}`}
      className="group card rounded-2xl overflow-hidden flex flex-col justify-between h-full bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]"
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#efe6d4]">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#f7f1e6]/90 backdrop-blur-sm border border-[rgba(27,24,21,0.12)] flex items-center justify-center text-[#1b1815] group-hover:bg-[#9c4221] group-hover:text-white transition-all shadow-xs">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#9c4221]">
              {category.origin || category.tagline || 'Artisan Heritage'}
            </span>
            <span className="text-[11px] text-[#2c2620]/60 font-medium">
              {category.count || category.artistCount || 100}+ Curated
            </span>
          </div>

          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815] group-hover:text-[#9c4221] transition-colors">
            {category.name}
          </h3>

          <p className="text-xs text-[#2c2620]/75 line-clamp-2 leading-relaxed font-sans">
            {category.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between text-xs text-[#9c4221] font-semibold">
        <span>Explore Motif Archive</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
};
