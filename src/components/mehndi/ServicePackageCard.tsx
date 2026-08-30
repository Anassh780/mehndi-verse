import React from 'react';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { ServicePackage, Artist } from '@/types/mehndi';
import { useBooking } from '@/context/BookingContext';
import { useNavigate } from 'react-router-dom';

interface ServicePackageCardProps {
  pkg: ServicePackage;
  artist: Artist;
}

export const ServicePackageCard: React.FC<ServicePackageCardProps> = ({ pkg, artist }) => {
  const { selectArtistAndPackage } = useBooking();
  const navigate = useNavigate();

  const handleSelectPackage = () => {
    selectArtistAndPackage(artist, pkg);
    navigate(`/book/${artist.id}`);
  };

  return (
    <div
      className={`editorial-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative transition-all duration-300 ${
        pkg.popular ? 'border-[#1C1A18] dark:border-[#F7F5F0]' : 'border-[#E8E2D9] dark:border-[#2A2724]'
      }`}
    >
      {/* Single Subtle Tag for Popular Tier */}
      {pkg.popular && (
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-0.5 rounded-full bg-[#1C1A18] dark:bg-[#F7F5F0] text-white dark:text-black text-[10px] font-bold uppercase tracking-widest">
            Signature Tier
          </span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8E5A3C] block mb-1">
              {pkg.tier.replace('_', ' ')}
            </span>
            <h4 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              {pkg.title}
            </h4>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-[#F4EFEB] dark:bg-[#23211E] text-xs font-semibold text-[#6B665F] dark:text-[#A8A298] flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>~{Math.round(pkg.durationMinutes / 60)} hrs</span>
          </span>
        </div>

        <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed mb-6">
          {pkg.description}
        </p>

        {/* Pricing */}
        <div className="pb-6 mb-6 border-b border-[#F0EAE1] dark:border-[#2A2724] flex items-baseline gap-2">
          <span className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            ${pkg.price}
          </span>
          <span className="text-xs text-[#6B665F] dark:text-[#A8A298]">
            USD · all inclusive
          </span>
        </div>

        {/* Key Inclusions List */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0]">
            Package Inclusions
          </p>
          {pkg.inclusions.map((inc, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#6B665F] dark:text-[#A8A298]">
              <Check className="w-3.5 h-3.5 text-[#385648] dark:text-[#5E8C75] shrink-0 mt-0.5" strokeWidth={2} />
              <span>{inc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSelectPackage}
        className={`w-full ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
      >
        <span>Reserve This Tier</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
