import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { ServicePackage, Artist } from '@/types/mehndi';
import { useBooking } from '@/context/BookingContext';

interface ServicePackageCardProps {
  pkg: ServicePackage;
  artist: Artist;
}

export const ServicePackageCard: React.FC<ServicePackageCardProps> = ({ pkg, artist }) => {
  const navigate = useNavigate();
  const { selectArtistAndPackage } = useBooking();

  const handleSelectPackage = () => {
    selectArtistAndPackage(artist, pkg);
    navigate(`/book/${artist.id}`);
  };

  const durationHours = Math.max(1, Math.round(pkg.durationMinutes / 60));

  return (
    <div
      className={`card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
        pkg.popular
          ? 'bg-[#efe6d4] border-[#9c4221] shadow-md ring-1 ring-[#9c4221]'
          : 'bg-[#f7f1e6] border-[rgba(27,24,21,0.12)]'
      }`}
    >
      {/* Popularity Badge */}
      {pkg.popular && (
        <div className="absolute -top-3 left-6">
          <span className="badge !bg-[#9c4221] !text-[#f7f1e6] !border-[#9c4221]">
            <Sparkles className="w-3 h-3 text-[#c9a227]" />
            <span>Most Requested Tier</span>
          </span>
        </div>
      )}

      <div className="space-y-4">
        {/* Tier Name & Price */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#9c4221] block">
            Bridal Tier
          </span>
          <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">
            {pkg.title}
          </h3>
          <p className="text-xs text-[#2c2620]/75 mt-1 leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* Big Price Display */}
        <div className="py-2 border-y border-[rgba(27,24,21,0.08)] flex items-baseline justify-between">
          <div>
            <span className="font-serif-editorial text-3xl font-bold text-[#1b1815]">
              ${pkg.price}
            </span>
            <span className="text-xs text-[#2c2620]/60 ml-1">USD total</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#2c2620]/70 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#9c4221]" />
            <span>{durationHours} Hours Session</span>
          </div>
        </div>

        {/* Hands Description */}
        <div className="text-xs space-y-1 bg-[#f7f1e6] p-3 rounded-xl border border-[rgba(27,24,21,0.08)]">
          <p><strong className="text-[#1b1815]">Coverage:</strong> {pkg.handsDescription}</p>
          <p><strong className="text-[#1b1815]">Organic Cones:</strong> {pkg.organicCones ? '100% Certified Sojat' : 'Pure Botanical'}</p>
        </div>

        {/* Inclusions List */}
        <div className="space-y-2 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#1b1815]">
            Package Inclusions
          </p>
          <ul className="space-y-2 text-xs text-[#2c2620]/80">
            {pkg.inclusions.map((inc, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#6b7752] shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Select Action Button */}
      <button
        onClick={handleSelectPackage}
        className={`btn w-full !py-3 ${
          pkg.popular ? 'btn-primary' : 'btn-ghost'
        }`}
      >
        <span>Reserve This Tier</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
