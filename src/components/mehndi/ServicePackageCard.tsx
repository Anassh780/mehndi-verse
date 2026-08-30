import React from 'react';
import { Check, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
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
      className={`relative rounded-3xl p-1.5 transition-all duration-300 ${
        pkg.popular
          ? 'bg-gradient-to-b from-[#C59B27] via-[#9A7516] to-[#064E3B] shadow-xl scale-[1.02]'
          : 'bg-[#EFE7DA] dark:bg-[#1F362E] hover:shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 rounded-full bg-[#7A1C2D] text-white text-[11px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#E5C07B]" />
            <span>Most Requested by Brides</span>
          </span>
        </div>
      )}

      {/* Inner Card Container */}
      <div className="rounded-[calc(1.5rem-0.375rem)] bg-white dark:bg-[#0E1A16] p-6 sm:p-7 flex flex-col justify-between h-full">
        
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B27] block mb-1">
                {pkg.tier.replace('_', ' ')}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                {pkg.title}
              </h4>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/30 text-xs font-semibold text-[#9A7516] dark:text-[#E5C07B] shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.round(pkg.durationMinutes / 60)} hrs</span>
            </div>
          </div>

          <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed mb-6">
            {pkg.description}
          </p>

          {/* Pricing */}
          <div className="pb-6 mb-6 border-b border-[#EFE7DA] dark:border-[#1F362E] flex items-baseline gap-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#064E3B] dark:text-[#E5C07B]">
              ${pkg.price}
            </span>
            {pkg.originalPrice && (
              <span className="text-sm line-through text-gray-400">
                ${pkg.originalPrice}
              </span>
            )}
            <span className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
              (Includes Bridal Consultation)
            </span>
          </div>

          {/* Key Inclusions List */}
          <div className="space-y-3 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE]">
              Package Inclusions:
            </p>
            {pkg.inclusions.map((inc, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                <div className="w-4 h-4 rounded-full bg-[#ECFDF5] dark:bg-[#06281F] text-[#064E3B] dark:text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSelectPackage}
          className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            pkg.popular
              ? 'bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-[#F8F4EB] dark:bg-[#14241F] text-[#1A2421] dark:text-[#F8F5EE] border border-[#EFE7DA] dark:border-[#1F362E] hover:bg-[#064E3B] hover:text-white dark:hover:bg-[#064E3B]'
          }`}
        >
          <span>Select Package & Pick Date</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
