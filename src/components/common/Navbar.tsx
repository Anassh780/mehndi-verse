import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const { user, loginAsCustomer, loginAsArtist, logout } = useMehndiAuth();
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
      <div className="bg-[#efe6d4] text-[#1b1815] text-[11px] py-2 px-4 text-center font-medium border-b border-[rgba(27,24,21,0.08)] flex items-center justify-center gap-3">
        <span>A curated collective of master bridal henna artisans · 100% pure botanical formulas</span>
        <span className="hidden md:inline text-[rgba(27,24,21,0.25)]">|</span>
        <button
          onClick={onOpenAIQuiz}
          className="hidden md:inline text-[#9c4221] hover:underline font-semibold cursor-pointer"
        >
          Consult the AI Bridal Advisor →
        </button>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-[#f7f1e6]/95 backdrop-blur-md border-b border-[rgba(27,24,21,0.08)] shadow-xs'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Wordmark */}
            <Link to="/" className="flex items-baseline gap-2.5 group">
              <span className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#1b1815]">
                Zari & Henna
              </span>
              <span className="hidden sm:inline text-[9px] uppercase tracking-[0.25em] text-[#9c4221] font-medium border-l border-[rgba(27,24,21,0.2)] pl-2.5">
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
                        ? 'text-[#1b1815]'
                        : 'text-[#2c2620]/75 hover:text-[#1b1815]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#9c4221]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden sm:flex items-center gap-3.5">
              
              {/* AI Style Consultation Trigger */}
              <button
                onClick={onOpenAIQuiz}
                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-[#9c4221] hover:text-[#7a331a] transition-colors px-2 py-1"
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Style Advisor</span>
              </button>

              {/* Wishlist Favorites */}
              <Link
                to="/customer-dashboard?tab=saved"
                className="btn-icon relative"
                title="Saved Artisans"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#9c4221] text-white text-[9px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="btn-ghost !py-2 !px-3 !text-xs !rounded-full flex items-center gap-2"
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
                      <User className="w-3.5 h-3.5 text-[#2c2620]" strokeWidth={1.5} />
                      <span>Account</span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3 text-[#2c2620]/60" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-[rgba(27,24,21,0.08)]">
                          <p className="text-xs font-bold text-[#1b1815]">{user.name}</p>
                          <p className="text-[11px] text-[#2c2620]/70 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          {user.role === 'artist' ? (
                            <Link
                              to="/artist-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1b1815] hover:bg-[#efe6d4]"
                            >
                              <LayoutDashboard className="w-3.5 h-3.5" />
                              <span>Artist Studio</span>
                            </Link>
                          ) : (
                            <Link
                              to="/customer-dashboard"
                              className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#1b1815] hover:bg-[#efe6d4]"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>My Appointments</span>
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-[rgba(27,24,21,0.08)] pt-1">
                          <button
                            onClick={() => {
                              if (user.role === 'customer') {
                                loginAsArtist();
                              } else {
                                loginAsCustomer();
                              }
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-[#9c4221] font-semibold hover:bg-[#efe6d4]"
                          >
                            Switch to {user.role === 'customer' ? 'Artist Mode' : 'Bride Mode'}
                          </button>
                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-700 hover:bg-red-50"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-2 space-y-1.5">
                        <Link
                          to="/login"
                          className="btn btn-ink w-full text-center !py-2 !text-xs"
                        >
                          Sign In / Register
                        </Link>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => {
                              loginAsCustomer();
                              setUserDropdownOpen(false);
                            }}
                            className="btn btn-ghost !py-1.5 !px-2 !text-[11px]"
                          >
                            Demo Bride
                          </button>
                          <button
                            onClick={() => {
                              loginAsArtist();
                              setUserDropdownOpen(false);
                            }}
                            className="btn btn-primary !py-1.5 !px-2 !text-[11px]"
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
                <Link to="/artist-dashboard" className="btn btn-primary !text-xs !py-2.5 !px-5">
                  <span>Studio</span>
                </Link>
              ) : (
                <Link to="/artists" className="btn btn-primary !text-xs !py-2.5 !px-5">
                  <span>Reserve Artist</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn-icon"
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
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#f7f1e6] border-l border-[rgba(27,24,21,0.12)] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(27,24,21,0.1)]">
                <span className="font-serif-editorial font-bold text-xl text-[#1b1815]">Zari & Henna</span>
                <button onClick={() => setMobileMenuOpen(false)} className="btn-icon">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-semibold uppercase tracking-wider text-[#1b1815] py-2 px-3 rounded-lg hover:bg-[#efe6d4]"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAIQuiz) onOpenAIQuiz();
                  }}
                  className="w-full text-left text-xs font-semibold text-[#9c4221] py-2.5 px-3 rounded-lg bg-[rgba(156,66,33,0.1)] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Style Consultation</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(27,24,21,0.1)]">
              {user ? (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#1b1815]">{user.name}</p>
                  <Link
                    to={user.role === 'artist' ? '/artist-dashboard' : '/customer-dashboard'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary w-full text-center"
                  >
                    Go to {user.role === 'artist' ? 'Studio' : 'Appointments'}
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary w-full text-center"
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
