import React from 'react';
import { Star, Quote, Check } from 'lucide-react';
import { ArtistReview } from '@/types/mehndi';

interface TestimonialCardProps {
  review: ArtistReview | {
    id: string;
    author?: string;
    customerName?: string;
    location?: string;
    customerCity?: string;
    rating: number;
    date: string;
    content?: string;
    comment?: string;
    artistName?: string;
    serviceType?: string;
    eventType?: string;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  const authorName = (review as any).author || (review as any).customerName || 'Verified Client';
  const rating = review.rating;
  const content = (review as any).content || (review as any).comment || 'Exquisite henna craftsmanship and natural dark stain.';
  const location = (review as any).location || (review as any).customerCity || 'Verified Destination Wedding';
  const serviceType = (review as any).serviceType || (review as any).eventType || 'Bridal Commission';

  return (
    <div className="card rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]">
      
      <div className="space-y-3">
        {/* Rating Stars & Verified Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating
                    ? 'fill-[#9c4221] text-[#9c4221]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="badge !py-0.5 !px-2 !text-[9px]">
            <Check className="w-2.5 h-2.5 text-[#c9a227]" />
            <span>Verified Commission</span>
          </span>
        </div>

        {/* Testimonial Quote */}
        <p className="font-serif-editorial text-sm sm:text-base text-[#1b1815] italic leading-relaxed pt-1">
          "{content}"
        </p>
      </div>

      {/* Author & Service Info */}
      <div className="pt-3 border-t border-[rgba(27,24,21,0.08)] flex items-end justify-between text-xs">
        <div>
          <p className="font-bold text-[#1b1815]">{authorName}</p>
          <p className="text-[11px] text-[#2c2620]/60">{location}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-[#9c4221]">{serviceType}</p>
          <p className="text-[10px] text-[#2c2620]/60">{review.date}</p>
        </div>
      </div>

    </div>
  );
};
