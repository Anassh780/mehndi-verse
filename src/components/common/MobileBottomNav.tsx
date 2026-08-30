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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#141312]/95 backdrop-blur-md border-t border-[#E8E2D9] dark:border-[#2A2724] px-4 py-2.5">
      <div className="flex items-center justify-around">
        
        {/* 1. Explore */}
        <Link
          to="/artists"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.pathname === '/artists'
              ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
              : 'text-[#9E988F] dark:text-[#6E6860]'
          }`}
        >
          <Compass className="w-5 h-5" strokeWidth={1.5} />
          <span>Artisans</span>
        </Link>

        {/* 2. AI Style Matcher - Consistent with other icons */}
        <button
          onClick={onOpenAIQuiz}
          className="flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-[#9E988F] dark:text-[#6E6860] hover:text-[#8E5A3C]"
        >
          <Sparkles className="w-5 h-5" strokeWidth={1.5} />
          <span>Advisor</span>
        </button>

        {/* 3. Wishlist */}
        <Link
          to="/customer-dashboard?tab=saved"
          className={`relative flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.search.includes('saved')
              ? 'text-[#8E5A3C]'
              : 'text-[#9E988F] dark:text-[#6E6860]'
          }`}
        >
          <Heart className="w-5 h-5" strokeWidth={1.5} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#1C1A18] text-white text-[9px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
          <span>Saved</span>
        </Link>

        {/* 4. Appointments / Studio */}
        {isArtist ? (
          <Link
            to="/artist-dashboard"
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
              location.pathname.startsWith('/artist-dashboard')
                ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
                : 'text-[#9E988F] dark:text-[#6E6860]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
            <span>Studio</span>
          </Link>
        ) : (
          <Link
            to="/customer-dashboard"
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
              location.pathname.startsWith('/customer-dashboard')
                ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
                : 'text-[#9E988F] dark:text-[#6E6860]'
            }`}
          >
            <Calendar className="w-5 h-5" strokeWidth={1.5} />
            <span>Bookings</span>
          </Link>
        )}

        {/* 5. Account */}
        <Link
          to={user ? (isArtist ? '/artist-dashboard?tab=profile' : '/customer-dashboard?tab=profile') : '/login'}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.pathname === '/login' || location.search.includes('profile')
              ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
              : 'text-[#9E988F] dark:text-[#6E6860]'
          }`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
          <span>{user ? 'Profile' : 'Sign In'}</span>
        </Link>

      </div>
    </nav>
  );
};
