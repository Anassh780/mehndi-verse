import React from 'react';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';
import { ArtistReview } from '@/types/mehndi';

interface TestimonialCardProps {
  review: ArtistReview;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  return (
    <div className="p-1.5 rounded-[2rem] bg-gradient-to-b from-[#EFE7DA] to-[#F8F4EB] dark:from-[#1F362E] dark:to-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] h-full flex flex-col justify-between">
      
      {/* Inner Core */}
      <div className="rounded-[calc(2rem-0.375rem)] bg-white dark:bg-[#07100D] p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
        
        <div>
          {/* Top Bar: Stars & Verified Badge */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-1 text-[#C59B27]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            {review.verifiedBride && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] text-[#064E3B] dark:text-[#34D399] text-[10px] font-bold uppercase tracking-wider border border-[#10B981]/20">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Bride</span>
              </span>
            )}
          </div>

          {/* Comment */}
          <p className="text-xs sm:text-sm text-[#1A2421] dark:text-[#F8F5EE] leading-relaxed italic font-serif">
            "{review.comment}"
          </p>
        </div>

        {/* Bottom Author Section */}
        <div className="pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={review.customerAvatar}
              alt={review.customerName}
              className="w-10 h-10 rounded-full object-cover border border-[#C59B27]"
            />
            <div>
              <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                {review.customerName}
              </p>
              <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">
                {review.customerCity || 'Dubai & London'} • {review.eventType}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
        </div>

      </div>
    </div>
  );
};
