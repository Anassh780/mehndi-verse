import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
      className="group editorial-card rounded-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* Visual Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFEB] dark:bg-[#1C1A18]">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
          {category.count} Artisans
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] group-hover:text-[#8E5A3C] transition-colors">
            {category.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[#9E988F] group-hover:text-[#1C1A18] dark:group-hover:text-white transition-colors" />
        </div>
        <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">
          {category.tagline}
        </p>
      </div>
    </Link>
  );
};
