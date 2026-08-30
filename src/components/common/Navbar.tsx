import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Search, 
  Calendar, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkle, 
  Crown, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  MapPin,
  Flame
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { useFavorites } from '@/context/FavoritesContext';

interface NavbarProps {
  onOpenAIQuiz?: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIQuiz, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isArtist, isCustomer, loginAsCustomer, loginAsArtist, logout } = useMehndiAuth();
  const { favoritesCount } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Explore Artists', path: '/artists' },
    { name: 'Bridal Styles', path: '/#categories' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Inspiration Blog', path: '/blog' },
    { name: 'About Atelier', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#064E3B] text-[#E5C07B] text-xs py-2 px-4 text-center font-medium border-b border-[#0D6951] flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#E5C07B]" />
        <span>Wedding Season 2026: <strong>100% Certified Organic & Chemical-Free Henna Guarantee</strong> across all vetted artists.</span>
        <span className="hidden md:inline text-white/50">|</span>
        <span className="hidden md:inline text-[#FAF6F0] underline cursor-pointer hover:text-white" onClick={onOpenAIQuiz}>
          Take the 60-second AI Bridal Henna Quiz →
        </span>
      </div>

      {/* Floating Glass Pill Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#FDFBF7]/90 dark:bg-[#07100D]/90 backdrop-blur-xl border-b border-[#EFE7DA] dark:border-[#1F362E] shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#064E3B] to-[#7A1C2D] p-[1.5px] shadow-sm transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-[#FDFBF7] dark:bg-[#07100D] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#C59B27]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#064E3B] dark:text-[#E5C07B] flex items-center gap-1">
                  ZARI & HENNA
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C59B27] font-semibold">
                  Luxury Mehndi Atelier
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#064E3B] dark:text-[#E5C07B] font-semibold'
                        : 'text-[#5C6763] dark:text-[#B2C2BC] hover:text-[#064E3B] dark:hover:text-[#E5C07B]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C59B27] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* AI Recommendation Sparkle Trigger */}
              <button
                onClick={onOpenAIQuiz}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold hover:bg-[#C59B27] hover:text-white transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>AI Style Matcher</span>
              </button>

              {/* Wishlist Favorites */}
              <Link
                to="/customer-dashboard?tab=saved"
                className="relative p-2 rounded-full text-[#5C6763] hover:text-[#7A1C2D] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Saved Artists"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7A1C2D] text-white text-[10px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* User Account / Demo Switcher Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#0E1A16] hover:border-[#C59B27]/50 transition-all text-xs font-medium text-[#1A2421] dark:text-[#F8F5EE]"
                >
                  {user ? (
                    <>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full object-cover border border-[#C59B27]/40"
                      />
                      <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                      <span className="text-[10px] uppercase font-bold text-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010] px-1.5 py-0.5 rounded">
                        {user.role}
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 text-[#5C6763]" />
                      <span>Account</span>
                    </>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {user ? (
                      <>
                        <div className="px-4 py-2.5 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                          <p className="text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE]">{user.name}</p>
                          <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC] truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          {user.role === 'artist' ? (
                            <Link
                              to="/artist-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#064E3B] dark:text-[#E5C07B] hover:bg-[#ECFDF5] dark:hover:bg-[#06281F]"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>Artist SaaS Studio</span>
                            </Link>
                          ) : (
                            <Link
                              to="/customer-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#064E3B] dark:text-[#E5C07B] hover:bg-[#ECFDF5] dark:hover:bg-[#06281F]"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>My Bridal Bookings</span>
                            </Link>
                          )}
                          <Link
                            to="/customer-dashboard?tab=messages"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            <span>Artist Messenger</span>
                          </Link>
                        </div>
                        <div className="border-t border-[#EFE7DA] dark:border-[#1F362E] pt-1 mt-1">
                          <button
                            onClick={() => {
                              if (user.role === 'customer') {
                                loginAsArtist();
                              } else {
                                loginAsCustomer();
                              }
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left flex items-center justify-between px-4 py-2 text-xs text-[#C59B27] font-semibold hover:bg-[#FEF9EE] dark:hover:bg-[#282010]"
                          >
                            <span>Switch to {user.role === 'customer' ? 'Artist Mode' : 'Bride Mode'}</span>
                            <span className="text-[10px] bg-[#C59B27]/20 px-1.5 py-0.5 rounded">Demo</span>
                          </button>
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-2 space-y-1">
                        <Link
                          to="/login"
                          className="block w-full text-center px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22] transition-colors"
                        >
                          Sign In / Register
                        </Link>
                        <div className="grid grid-cols-2 gap-1 pt-1">
                          <button
                            onClick={() => {
                              loginAsCustomer();
                              setUserDropdownOpen(false);
                            }}
                            className="text-center px-2 py-1.5 rounded-lg border border-[#EFE7DA] dark:border-[#1F362E] text-[11px] font-medium text-[#5C6763] hover:bg-black/5"
                          >
                            Demo Bride
                          </button>
                          <button
                            onClick={() => {
                              loginAsArtist();
                              setUserDropdownOpen(false);
                            }}
                            className="text-center px-2 py-1.5 rounded-lg border border-[#C59B27]/40 text-[11px] font-medium text-[#C59B27] hover:bg-[#FEF9EE]"
                          >
                            Demo Artist
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Primary Call to Action Button */}
              {user?.role === 'artist' ? (
                <Link
                  to="/artist-dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Artist Studio</span>
                </Link>
              ) : (
                <Link
                  to="/artists"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#7A1C2D] to-[#4A0E17] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Book an Artist</span>
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    ↗
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenAIQuiz}
                className="p-2 rounded-full bg-[#FEF9EE] text-[#C59B27] border border-[#C59B27]/30"
                title="AI Henna Quiz"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] text-[#1A2421] dark:text-[#F8F5EE]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#FDFBF7] dark:bg-[#07100D] border-l border-[#EFE7DA] dark:border-[#1F362E] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Top Row */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#C59B27]" />
                  <span className="font-serif font-bold text-lg text-[#064E3B] dark:text-[#E5C07B]">ZARI & HENNA</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-medium text-[#1A2421] dark:text-[#F8F5EE] py-2 hover:text-[#064E3B] dark:hover:text-[#E5C07B]"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenAIQuiz) onOpenAIQuiz();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-sm font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Henna Style Quiz</span>
                    </span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Auth Switcher */}
            <div className="pt-6 border-t border-[#EFE7DA] dark:border-[#1F362E] space-y-3">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#C59B27]" />
                    <div>
                      <p className="text-sm font-bold text-[#1A2421] dark:text-[#F8F5EE]">{user.name}</p>
                      <p className="text-xs text-[#5C6763] capitalize">{user.role} Account</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {user.role === 'artist' ? (
                      <Link
                        to="/artist-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 rounded-xl bg-[#064E3B] text-white text-xs font-semibold"
                      >
                        Artist Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/customer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-center py-2 rounded-xl bg-[#064E3B] text-white text-xs font-semibold"
                      >
                        My Bookings
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 rounded-xl border border-red-200 text-red-600 text-xs font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 rounded-xl bg-[#064E3B] text-white text-sm font-semibold"
                  >
                    Login / Sign Up
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        loginAsCustomer();
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 rounded-lg border border-[#EFE7DA] text-xs font-medium text-[#5C6763]"
                    >
                      Demo Bride
                    </button>
                    <button
                      onClick={() => {
                        loginAsArtist();
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 rounded-lg border border-[#C59B27] text-xs font-medium text-[#C59B27]"
                    >
                      Demo Artist
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
