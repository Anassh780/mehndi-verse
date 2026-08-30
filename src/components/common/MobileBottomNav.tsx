import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Calendar, Heart, User, LayoutDashboard } from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { useFavorites } from '@/context/FavoritesContext';

interface MobileBottomNavProps {
  onOpenAIQuiz: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAIQuiz }) => {
  const location = useLocation();
  const { user } = useMehndiAuth();
  const { favoritesCount } = useFavorites();

  const isArtist = user?.role === 'artist';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 dark:bg-[#07100D]/95 backdrop-blur-xl border-t border-[#EFE7DA] dark:border-[#1F362E] px-3 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        
        {/* Explore */}
        <Link
          to="/artists"
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            location.pathname === '/artists'
              ? 'text-[#064E3B] dark:text-[#E5C07B] font-bold'
              : 'text-[#5C6763] dark:text-[#B2C2BC]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Explore</span>
        </Link>

        {/* AI Quiz Button */}
        <button
          onClick={onOpenAIQuiz}
          className="flex flex-col items-center gap-1 text-[10px] font-medium text-[#C59B27] dark:text-[#E5C07B]"
        >
          <div className="w-8 h-8 -mt-3 rounded-full bg-gradient-to-tr from-[#064E3B] to-[#C59B27] p-0.5 shadow-md flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span>AI Match</span>
        </button>

        {/* Wishlist */}
        <Link
          to="/customer-dashboard?tab=saved"
          className={`relative flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            location.search.includes('saved')
              ? 'text-[#7A1C2D] font-bold'
              : 'text-[#5C6763] dark:text-[#B2C2BC]'
          }`}
        >
          <Heart className="w-5 h-5" />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#7A1C2D] text-white text-[9px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
          <span>Saved</span>
        </Link>

        {/* Dashboard / Bookings */}
        {isArtist ? (
          <Link
            to="/artist-dashboard"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              location.pathname.startsWith('/artist-dashboard')
                ? 'text-[#064E3B] dark:text-[#E5C07B] font-bold'
                : 'text-[#5C6763] dark:text-[#B2C2BC]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Studio</span>
          </Link>
        ) : (
          <Link
            to="/customer-dashboard"
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
              location.pathname.startsWith('/customer-dashboard')
                ? 'text-[#064E3B] dark:text-[#E5C07B] font-bold'
                : 'text-[#5C6763] dark:text-[#B2C2BC]'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Bookings</span>
          </Link>
        )}

        {/* Profile / Account */}
        <Link
          to={user ? (isArtist ? '/artist-dashboard?tab=profile' : '/customer-dashboard?tab=profile') : '/login'}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            location.pathname === '/login' || location.search.includes('profile')
              ? 'text-[#064E3B] dark:text-[#E5C07B] font-bold'
              : 'text-[#5C6763] dark:text-[#B2C2BC]'
          }`}
        >
          <User className="w-5 h-5" />
          <span>{user ? 'Account' : 'Sign In'}</span>
        </Link>

      </div>
    </div>
  );
};
