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
  Sparkles,
  Trash2,
  Check,
  AlertCircle
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
  const { favorites, toggleFavorite } = useFavorites();
  const [bookings, setBookings] = useState<Booking[]>(bookingStorage.getBookings());
  const [selectedChatArtist, setSelectedChatArtist] = useState<{ id: string; name: string; avatar: string } | null>(null);
  
  // Profile update state
  const [profileName, setProfileName] = useState(user?.name || 'Suhana Patel');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'suhana.patel@gmail.com');
  const [profileLocation, setProfileLocation] = useState('Downtown Dubai, UAE');
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Cancel booking modal
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);

  const savedArtists = MOCK_ARTISTS.filter(a => favorites.includes(a.id));

  const handleTabChange = (tab: 'bookings' | 'saved' | 'messages' | 'profile') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleConfirmCancelBooking = (id: string) => {
    bookingStorage.updateBookingStatus(id, 'cancelled');
    setBookings(bookingStorage.getBookings());
    setCancelModalBookingId(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8 bg-[#f7f1e6] text-[#1b1815]">
      
      {/* Customer Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(27,24,21,0.12)]">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
            alt={profileName}
            className="w-14 h-14 rounded-full object-cover border border-[rgba(27,24,21,0.12)] shadow-xs"
          />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
              Bridal Client Portal
            </span>
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1b1815]">
              {profileName}
            </h1>
            <p className="text-xs text-[#2c2620]/75">{profileLocation} · 2026/2027 Wedding Season</p>
          </div>
        </div>

        <Link to="/artists" className="btn btn-primary min-h-[44px]">
          <span>Explore Master Artisans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-[rgba(27,24,21,0.12)] flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x">
        {[
          { id: 'bookings', label: `My Appointments (${bookings.length})` },
          { id: 'saved', label: `Saved Artisans (${savedArtists.length})` },
          { id: 'messages', label: 'Artisan Messages' },
          { id: 'profile', label: 'Bridal Profile' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`py-3.5 sm:py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap relative transition-colors snap-start min-h-[44px] cursor-pointer ${
              activeTab === tab.id
                ? 'text-[#1b1815] font-bold'
                : 'text-[#2c2620]/60 hover:text-[#1b1815]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#9c4221]" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] space-y-4">
              <p className="font-serif-editorial text-xl font-bold text-[#1b1815]">No active bridal appointments yet.</p>
              <p className="text-xs text-[#2c2620]/75">Discover certified master artisans and reserve your wedding date.</p>
              <Link to="/artists" className="btn btn-primary">Explore Master Artisans</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#9c4221] block">Voucher #{b.bookingNumber || b.id}</span>
                        <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
                          {b.artistName}
                        </h3>
                        <p className="text-xs text-[#2c2620]/70">{b.artistCity}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        b.status === 'confirmed' ? 'bg-[#efe6d4] text-[#6b7752] border border-[#6b7752]' : b.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.08)] text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[#2c2620]/70">Tier:</span>
                        <span className="font-bold text-[#1b1815]">{b.packageName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2c2620]/70">Date & Time:</span>
                        <span className="font-bold text-[#1b1815]">{b.eventDate} ({b.eventTime})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2c2620]/70">Venue:</span>
                        <span className="font-bold text-[#1b1815] truncate max-w-[200px]">{b.venueAddress}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-[rgba(27,24,21,0.1)]">
                        <span className="text-[#2c2620]/70">25% Deposit Paid:</span>
                        <span className="font-bold text-[#6b7752]">${b.depositAmount} USD</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[rgba(27,24,21,0.08)]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="text-xs font-semibold text-[#2c2620]/75 hover:text-[#1b1815] flex items-center gap-1.5 min-h-[36px]"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Voucher</span>
                      </button>

                      {b.status !== 'cancelled' && b.status !== 'completed' && (
                        <button
                          onClick={() => setCancelModalBookingId(b.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedChatArtist({ id: b.artistId, name: b.artistName, avatar: b.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
                      className="btn btn-ghost !py-1.5 !px-3.5 !text-xs min-h-[36px]"
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
            <div className="p-12 text-center rounded-2xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] space-y-4">
              <p className="font-serif-editorial text-xl font-bold text-[#1b1815]">Your wishlist is empty.</p>
              <p className="text-xs text-[#2c2620]/75">Click the heart icon on any artist profile to curate your shortlist.</p>
              <Link to="/artists" className="btn btn-primary">Browse Marketplace</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArtists.map((artist) => (
                <div key={artist.id} className="relative">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="card rounded-2xl p-6 sm:p-8 space-y-4 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
            Direct Artisan Conversations
          </h3>
          <p className="text-xs text-[#2c2620]/75">Connect directly with your booked or shortlisted mehndi artists.</p>
          
          <div className="p-4 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#f7f1e6] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Ayesha Noor Khan"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <p className="text-xs font-bold text-[#1b1815]">Ayesha Noor Khan</p>
                <p className="text-[11px] text-[#2c2620]/70 truncate max-w-xs">"I have received your booking and inspiration photos!"</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedChatArtist({ id: 'artist-ayesha-khan', name: 'Ayesha Noor Khan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
              className="btn btn-primary !py-2 !px-4 !text-xs min-h-[40px]"
            >
              Open Thread
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PROFILE */}
      {activeTab === 'profile' && (
        <div className="card rounded-2xl p-6 sm:p-8 max-w-xl space-y-6 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
            Bridal Preferences & Address
          </h3>

          {profileSavedToast && (
            <div className="p-3 rounded-xl bg-[#efe6d4] border border-[#6b7752] text-[#6b7752] text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Profile details updated successfully.</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Full Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Email Address</label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Wedding Destination</label>
              <input
                type="text"
                value={profileLocation}
                onChange={(e) => setProfileLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>
            <button type="submit" className="btn btn-primary !py-2.5 !px-6 min-h-[44px]">
              Save Profile Updates
            </button>
          </form>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBookingId && (
        <div className="fixed inset-0 z-50 bg-[#1b1815]/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-2xl p-6 text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <h4 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Cancel Bridal Appointment?</h4>
            <p className="text-xs text-[#2c2620]/75 leading-relaxed">
              Are you sure you want to cancel this booking? Escrow policy allows rescheduling up to 30 days prior.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setCancelModalBookingId(null)}
                className="btn btn-ghost !py-2 !px-4 text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleConfirmCancelBooking(cancelModalBookingId)}
                className="px-4 py-2 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800"
              >
                Confirm Cancel
              </button>
            </div>
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
