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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 dark:bg-[#141312]/98 backdrop-blur-lg border-t border-[#E8E2D9] dark:border-[#2A2724] px-2 py-2 safe-area-bottom shadow-lg">
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        
        {/* 1. Explore */}
        <Link
          to="/artists"
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.pathname === '/artists'
              ? 'text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
              : 'text-[#6B665F] dark:text-[#A8A298]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" strokeWidth={location.pathname === '/artists' ? 2 : 1.5} />
          <span>Artisans</span>
        </Link>

        {/* 2. AI Style Matcher */}
        <button
          onClick={onOpenAIQuiz}
          className="flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase text-[#6B665F] dark:text-[#A8A298] hover:text-[#8E5A3C] active:scale-95 transition-transform"
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-[#8E5A3C] dark:text-[#D4A373]" strokeWidth={1.5} />
          <span>Advisor</span>
        </button>

        {/* 3. Wishlist */}
        <Link
          to="/customer-dashboard?tab=saved"
          className={`relative flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.search.includes('saved')
              ? 'text-[#8E5A3C] dark:text-[#D4A373] font-bold'
              : 'text-[#6B665F] dark:text-[#A8A298]'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" strokeWidth={location.search.includes('saved') ? 2 : 1.5} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#8E5A3C] text-white text-[9px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span>Saved</span>
        </Link>

        {/* 4. Appointments / Studio */}
        {isArtist ? (
          <Link
            to="/artist-dashboard"
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase transition-colors ${
              location.pathname.startsWith('/artist-dashboard')
                ? 'text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
                : 'text-[#6B665F] dark:text-[#A8A298]'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" strokeWidth={location.pathname.startsWith('/artist-dashboard') ? 2 : 1.5} />
            <span>Studio</span>
          </Link>
        ) : (
          <Link
            to="/customer-dashboard"
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase transition-colors ${
              location.pathname.startsWith('/customer-dashboard') && !location.search.includes('saved')
                ? 'text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
                : 'text-[#6B665F] dark:text-[#A8A298]'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" strokeWidth={location.pathname.startsWith('/customer-dashboard') && !location.search.includes('saved') ? 2 : 1.5} />
            <span>Bookings</span>
          </Link>
        )}

        {/* 5. Account */}
        <Link
          to={user ? (isArtist ? '/artist-dashboard?tab=calendar' : '/customer-dashboard?tab=profile') : '/login'}
          className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            location.pathname === '/login' || location.search.includes('profile')
              ? 'text-[#1C1A18] dark:text-[#F7F5F0] font-bold'
              : 'text-[#6B665F] dark:text-[#A8A298]'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" strokeWidth={location.pathname === '/login' || location.search.includes('profile') ? 2 : 1.5} />
          <span>{user ? 'Profile' : 'Sign In'}</span>
        </Link>

      </div>
    </nav>
  );
};
