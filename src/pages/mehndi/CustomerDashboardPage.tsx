import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Heart, 
  MessageSquare, 
  User, 
  MapPin, 
  ArrowRight, 
  Printer, 
  Sparkles
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { useFavorites } from '@/context/FavoritesContext';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { ChatModal } from '@/components/common/ChatModal';
import { Booking } from '@/types/mehndi';

export const CustomerDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'bookings';
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'messages' | 'profile'>(initialTab);

  const { user } = useMehndiAuth();
  const { favorites } = useFavorites();
  const [bookings, setBookings] = useState<Booking[]>(bookingStorage.getBookings());
  const [selectedChatArtist, setSelectedChatArtist] = useState<{ id: string; name: string; avatar: string } | null>(null);

  const savedArtists = MOCK_ARTISTS.filter(a => favorites.includes(a.id));

  const handleTabChange = (tab: 'bookings' | 'saved' | 'messages' | 'profile') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Customer Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9] dark:border-[#2A2724]">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
            alt={user?.name || 'Suhana Patel'}
            className="w-14 h-14 rounded-full object-cover border border-[#E8E2D9]"
          />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
              Bridal Portal
            </span>
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              {user?.name || 'Suhana Patel'}
            </h1>
            <p className="text-xs text-[#6B665F]">Autumn 2026 Dubai Wedding Commission</p>
          </div>
        </div>

        <Link to="/artists" className="btn-primary">
          <span>Explore Artisans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E2D9] dark:border-[#2A2724] flex items-center gap-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'bookings', label: `My Appointments (${bookings.length})` },
          { id: 'saved', label: `Saved Artisans (${savedArtists.length})` },
          { id: 'messages', label: 'Artisan Messages' },
          { id: 'profile', label: 'Bridal Profile' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap relative transition-colors ${
              activeTab === tab.id
                ? 'text-[#1C1A18] dark:text-[#F7F5F0]'
                : 'text-[#6B665F] dark:text-[#A8A298] hover:text-[#1C1A18]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1C1A18] dark:bg-[#F7F5F0]" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4">
              <p className="font-serif-editorial text-xl font-bold">No active bridal appointments yet.</p>
              <p className="text-xs text-[#6B665F]">Discover certified master artisans and reserve your wedding date.</p>
              <Link to="/artists" className="btn-primary">Explore Master Artisans</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="editorial-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E988F] block">Voucher #{b.bookingNumber || b.id}</span>
                        <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                          {b.artistName}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        b.status === 'confirmed' ? 'bg-[#EEF4F0] text-[#385648]' : b.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#6B665F]">Package:</span>
                        <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{b.packageName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B665F]">Date & Time:</span>
                        <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{b.eventDate} ({b.eventTime})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B665F]">Venue:</span>
                        <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{b.venueAddress}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-[#E8E2D9]">
                        <span className="text-[#6B665F]">Deposit Paid:</span>
                        <span className="font-bold text-[#385648]">${b.depositAmount} USD</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE1]">
                    <button
                      onClick={() => window.print()}
                      className="text-xs font-semibold text-[#6B665F] hover:text-[#1C1A18] flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Voucher</span>
                    </button>
                    <button
                      onClick={() => setSelectedChatArtist({ id: b.artistId, name: b.artistName, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
                      className="btn-secondary !py-1.5 !px-3.5 !text-xs"
                    >
                      Message Artist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED ARTISANS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedArtists.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-4">
              <p className="font-serif-editorial text-xl font-bold">Your wishlist is empty.</p>
              <p className="text-xs text-[#6B665F]">Click the heart icon on any artist profile to curate your shortlist.</p>
              <Link to="/artists" className="btn-primary">Browse Marketplace</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="editorial-card rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Direct Artisan Conversations
          </h3>
          <div className="p-4 rounded-xl border border-[#E8E2D9] dark:border-[#2A2724] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Ayesha Noor Khan"
                className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9]"
              />
              <div>
                <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">Ayesha Noor Khan</p>
                <p className="text-[11px] text-[#6B665F]">"I would be delighted to work with you on your bridal henna..."</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedChatArtist({ id: 'artist-ayesha-khan', name: 'Ayesha Noor Khan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
              className="btn-primary !py-1.5 !px-3.5 !text-xs"
            >
              Open Thread
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="editorial-card rounded-2xl p-6 sm:p-8 max-w-xl space-y-4">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Bridal Preferences & Address
          </h3>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block">Full Name</label>
              <input type="text" defaultValue={user?.name || 'Suhana Patel'} className="w-full px-4 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block">Email Address</label>
              <input type="email" defaultValue={user?.email || 'suhana.patel@example.com'} className="w-full px-4 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block">Wedding Destination</label>
              <input type="text" defaultValue="Dubai, UAE" className="w-full px-4 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
            </div>
            <button type="button" className="btn-primary !py-2 !px-6 pt-2">Save Profile Updates</button>
          </div>
        </div>
      )}

      {/* Direct Chat Modal */}
      {selectedChatArtist && (
        <ChatModal
          isOpen={!!selectedChatArtist}
          artistId={selectedChatArtist.id}
          artistName={selectedChatArtist.name}
          artistAvatar={selectedChatArtist.avatar}
          onClose={() => setSelectedChatArtist(null)}
        />
      )}

    </div>
  );
};
