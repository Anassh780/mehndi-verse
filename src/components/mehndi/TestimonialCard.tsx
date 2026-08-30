import React from 'react';
import { Star } from 'lucide-react';
import { ArtistReview } from '@/types/mehndi';

interface TestimonialCardProps {
  review: ArtistReview;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  return (
    <div className="editorial-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
      
      <div className="space-y-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < review.rating
                  ? 'fill-[#1C1A18] dark:fill-[#F7F5F0] text-[#1C1A18] dark:text-[#F7F5F0]'
                  : 'text-[#D1C9BC]'
              }`}
            />
          ))}
        </div>

        {/* Quote Body */}
        <p className="font-serif-editorial text-base sm:text-lg text-[#1C1A18] dark:text-[#F7F5F0] leading-relaxed italic">
          "{review.comment}"
        </p>
      </div>

      {/* Author Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#F0EAE1] dark:border-[#2A2724]">
        <img
          src={review.customerAvatar}
          alt={review.customerName}
          className="w-9 h-9 rounded-full object-cover border border-[#E8E2D9] dark:border-[#2A2724]"
        />
        <div>
          <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            {review.customerName}
          </p>
          <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298]">
            {review.customerCity} · {review.eventType}
          </p>
        </div>
      </div>

    </div>
  );
};
