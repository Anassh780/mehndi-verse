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
  LogOut, 
  LayoutDashboard
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { useFavorites } from '@/context/FavoritesContext';

interface NavbarProps {
  onOpenAIQuiz?: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIQuiz }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isArtist, loginAsCustomer, loginAsArtist, logout } = useMehndiAuth();
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Artisans', path: '/artists' },
    { name: 'Traditions', path: '/#categories' },
    { name: 'Process', path: '/#how-it-works' },
    { name: 'Editorial', path: '/blog' },
    { name: 'Atelier', path: '/about' },
    { name: 'Inquiries', path: '/contact' },
  ];

  return (
    <>
      {/* Top Editorial Announcement Bar */}
      <div className="bg-[#F4EFEB] dark:bg-[#1C1A18] text-[#1C1A18] dark:text-[#F7F5F0] text-[11px] py-2 px-4 text-center font-medium border-b border-[#E8E2D9] dark:border-[#2A2724] flex items-center justify-center gap-3">
        <span>A curated collective of master bridal henna artisans · 100% pure botanical formulas</span>
        <span className="hidden md:inline text-[#D1C9BC]">|</span>
        <button
          onClick={onOpenAIQuiz}
          className="hidden md:inline text-[#8E5A3C] dark:text-[#D4A373] hover:underline font-semibold cursor-pointer"
        >
          Consult the AI Bridal Advisor →
        </button>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#FAF8F5]/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-[#E8E2D9] dark:border-[#2A2724] shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Wordmark */}
            <Link to="/" className="flex items-baseline gap-2.5 group">
              <span className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A18] dark:text-[#F7F5F0]">
                ZARI & HENNA
              </span>
              <span className="hidden sm:inline text-[9px] uppercase tracking-[0.25em] text-[#8E5A3C] dark:text-[#D4A373] font-medium border-l border-[#D1C9BC] pl-2.5">
                Bridal Atelier
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
                        : 'text-[#6B665F] dark:text-[#A8A298] hover:text-[#1C1A18] dark:hover:text-[#F7F5F0]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1C1A18] dark:bg-[#F7F5F0]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden sm:flex items-center gap-4">
              
              {/* AI Style Consultation Trigger */}
              <button
                onClick={onOpenAIQuiz}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#8E5A3C] dark:text-[#D4A373] hover:text-[#1C1A18] dark:hover:text-white transition-colors px-2 py-1"
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Style Advisor</span>
              </button>

              {/* Wishlist Favorites */}
              <Link
                to="/customer-dashboard?tab=saved"
                className="relative p-2 text-[#6B665F] hover:text-[#1C1A18] dark:text-[#A8A298] dark:hover:text-white transition-colors"
                title="Saved Artisans"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                {favoritesCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#1C1A18] text-white dark:bg-white dark:text-black text-[9px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1 px-2.5 rounded-full border border-[#E8E2D9] dark:border-[#2A2724] bg-white dark:bg-[#1C1A18] text-xs font-medium text-[#1C1A18] dark:text-[#F7F5F0] hover:border-[#1C1A18] transition-colors"
                >
                  {user ? (
                    <>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3.5 h-3.5 text-[#6B665F]" strokeWidth={1.5} />
                      <span>Account</span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 text-[#9E988F]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#F0EAE1] dark:border-[#2A2724]">
                          <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{user.name}</p>
                          <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          {user.role === 'artist' ? (
                            <Link
                              to="/artist-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1C1A18] dark:text-[#F7F5F0] hover:bg-[#F4EFEB] dark:hover:bg-[#23211E]"
                            >
                              <LayoutDashboard className="w-3.5 h-3.5" />
                              <span>Artist Studio</span>
                            </Link>
                          ) : (
                            <Link
                              to="/customer-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1C1A18] dark:text-[#F7F5F0] hover:bg-[#F4EFEB] dark:hover:bg-[#23211E]"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>My Appointments</span>
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-[#F0EAE1] dark:border-[#2A2724] pt-1">
                          <button
                            onClick={() => {
                              if (user.role === 'customer') {
                                loginAsArtist();
                              } else {
                                loginAsCustomer();
                              }
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-[#8E5A3C] font-semibold hover:bg-[#F4EFEB] dark:hover:bg-[#23211E]"
                          >
                            Switch to {user.role === 'customer' ? 'Artist Mode' : 'Bride Mode'}
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
                          className="block w-full text-center py-2 rounded-lg bg-[#1C1A18] text-white text-xs font-semibold"
                        >
                          Sign In / Register
                        </Link>
                        <div className="grid grid-cols-2 gap-1 pt-1">
                          <button
                            onClick={() => {
                              loginAsCustomer();
                              setUserDropdownOpen(false);
                            }}
                            className="text-center py-1.5 rounded border border-[#E8E2D9] text-[11px] font-medium text-[#6B665F] hover:bg-[#F4EFEB]"
                          >
                            Demo Bride
                          </button>
                          <button
                            onClick={() => {
                              loginAsArtist();
                              setUserDropdownOpen(false);
                            }}
                            className="text-center py-1.5 rounded border border-[#8E5A3C] text-[11px] font-medium text-[#8E5A3C] hover:bg-[#F6EDE7]"
                          >
                            Demo Artist
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              {user?.role === 'artist' ? (
                <Link to="/artist-dashboard" className="btn-primary">
                  <span>Studio</span>
                </Link>
              ) : (
                <Link to="/artists" className="btn-primary">
                  <span>Reserve Artist</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-[#E8E2D9] dark:border-[#2A2724] text-[#1C1A18] dark:text-[#F7F5F0]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#FAF8F5] dark:bg-[#141312] border-l border-[#E8E2D9] dark:border-[#2A2724] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724]">
                <span className="font-serif-editorial font-bold text-lg text-[#1C1A18] dark:text-[#F7F5F0]">ZARI & HENNA</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#6B665F]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] py-1"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAIQuiz) onOpenAIQuiz();
                  }}
                  className="w-full text-left text-sm font-semibold text-[#8E5A3C] py-2 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Style Consultation</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D9] dark:border-[#2A2724]">
              {user ? (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{user.name}</p>
                  <Link
                    to={user.role === 'artist' ? '/artist-dashboard' : '/customer-dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full text-center"
                  >
                    Go to {user.role === 'artist' ? 'Studio' : 'Appointments'}
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
