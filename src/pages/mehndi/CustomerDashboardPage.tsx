import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Heart, 
  MessageSquare, 
  User, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Download, 
  Star, 
  Send, 
  Crown,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { ArtistCard } from '@/components/mehndi/ArtistCard';
import { Booking } from '@/types/mehndi';

export const CustomerDashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'bookings';
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'messages' | 'profile'>(initialTab);

  const { user } = useMehndiAuth();
  const [bookings, setBookings] = useState<Booking[]>(() => bookingStorage.getBookings());
  const [favorites, setFavorites] = useState<string[]>(() => bookingStorage.getFavorites());
  const [chats, setChats] = useState(() => bookingStorage.getChats());
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id || 'chat-1');
  const [messageInput, setMessageInput] = useState('');

  const savedArtistsList = MOCK_ARTISTS.filter(a => favorites.includes(a.id));
  const activeChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;

    const updated = bookingStorage.sendMessage(
      activeChat.id,
      messageInput,
      'customer',
      user?.name || 'Suhana Patel',
      user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    );
    setChats([...updated]);
    setMessageInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#7A1C2D] via-[#4A0E17] to-[#07100D] text-white border border-[#C59B27]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
            alt="Bride Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#C59B27]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{user?.name || 'Suhana Patel'}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF9EE] text-[#7A1C2D] text-[10px] font-extrabold uppercase">
                Bridal Portal
              </span>
            </div>
            <p className="text-xs text-gray-300">
              {user?.email || 'suhana.patel@luxuryweddings.com'} • {user?.phone || '+1 (555) 234-5678'}
            </p>
          </div>
        </div>

        <Link
          to="/artists"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md"
        >
          <span>Find New Artists</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-[#EFE7DA] dark:border-[#1F362E] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'bookings', label: `My Bookings (${bookings.length})`, icon: Calendar },
          { id: 'saved', label: `Saved Wishlist (${savedArtistsList.length})`, icon: Heart },
          { id: 'messages', label: 'Artist Messenger', icon: MessageSquare },
          { id: 'profile', label: 'Bridal Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                  <div className="flex items-center gap-3">
                    <img
                      src={b.artistAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={b.artistName}
                      className="w-12 h-12 rounded-full object-cover border border-[#C59B27]"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A2421] dark:text-[#F8F5EE]">
                        {b.artistName}
                      </h3>
                      <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                        {b.packageName} • {b.artistCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-400">ID: {b.bookingNumber}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      b.status === 'confirmed' ? 'bg-[#ECFDF5] text-[#064E3B]' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                  <div>
                    <span className="text-gray-400 block">Ceremony Date & Slot:</span>
                    <strong className="text-sm text-[#064E3B] dark:text-[#E5C07B]">📅 {b.eventDate} ({b.eventTime})</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Venue Location:</span>
                    <strong className="text-[#1A2421] dark:text-[#F8F5EE]">{b.venueAddress}, {b.venueCity}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Payment & Balance:</span>
                    <strong className="text-[#1A2421] dark:text-[#F8F5EE]">Total ${b.totalAmount} (Paid ${b.depositAmount})</strong>
                  </div>
                </div>

                {b.specialNotes && (
                  <div className="p-3.5 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    <strong>Design Request:</strong> "{b.specialNotes}"
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[#34D399] text-xs font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Certified Organic Henna Guaranteed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/artists/${b.artistId}`}
                      className="px-4 py-2 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE] hover:bg-black/5"
                    >
                      Artist Profile
                    </Link>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="px-4 py-2 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22]"
                    >
                      Message Artist
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAVED ARTISTS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {savedArtistsList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] space-y-4">
              <Heart className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                No Saved Artists Yet
              </h3>
              <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                Tap the heart icon on any master artist to save them to your bridal shortlist.
              </p>
              <Link
                to="/artists"
                className="inline-block px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-semibold"
              >
                Browse Master Artists
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArtistsList.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ARTIST MESSENGER */}
      {activeTab === 'messages' && (
        <div className="rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
          
          {/* Conversation List */}
          <div className="md:col-span-4 border-r border-[#EFE7DA] dark:border-[#1F362E] p-4 space-y-2">
            <h3 className="font-serif text-sm font-bold text-[#1A2421] dark:text-[#F8F5EE] px-2 py-1">
              Conversations
            </h3>
            {chats.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedChatId(c.id)}
                className={`p-3 rounded-2xl cursor-pointer flex items-center gap-3 transition-colors ${
                  selectedChatId === c.id
                    ? 'bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <img src={c.artistAvatar} alt={c.artistName} className="w-10 h-10 rounded-full object-cover border border-[#C59B27]" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{c.artistName}</p>
                  <p className="text-[11px] text-gray-500 truncate">{c.lastMessage}</p>
                </div>
                <span className="text-[9px] text-gray-400">{c.lastMessageTime}</span>
              </div>
            ))}
          </div>

          {/* Active Chat Thread */}
          <div className="md:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-[#FDFBF7] dark:bg-[#07100D]">
            
            {/* Chat Header */}
            {activeChat && (
              <div className="pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={activeChat.artistAvatar} alt={activeChat.artistName} className="w-10 h-10 rounded-full object-cover border border-[#C59B27]" />
                  <div>
                    <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{activeChat.artistName}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">Active & Vetted Artist</p>
                  </div>
                </div>
                <Link
                  to={`/book/${activeChat.artistId}`}
                  className="px-4 py-1.5 rounded-full bg-[#064E3B] text-white text-xs font-bold"
                >
                  Book Appointment
                </Link>
              </div>
            )}

            {/* Message History */}
            <div className="flex-1 py-4 space-y-3 overflow-y-auto">
              {activeChat?.messages.map((m) => {
                const isMe = m.senderRole === 'customer';
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3.5 rounded-2xl text-xs ${
                      isMe
                        ? 'bg-[#064E3B] text-white rounded-br-none'
                        : 'bg-white dark:bg-[#14241F] text-[#1A2421] dark:text-[#F8F5EE] border border-[#EFE7DA] dark:border-[#1F362E] rounded-bl-none'
                    }`}>
                      <p>{m.text}</p>
                      <span className={`text-[9px] mt-1 block text-right ${isMe ? 'text-emerald-200' : 'text-gray-400'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Send Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-[#EFE7DA] dark:border-[#1F362E]">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask about availability, custom quotes, or travel..."
                className="flex-1 p-3 rounded-full bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
              />
              <button
                type="submit"
                className="p-3 rounded-full bg-[#064E3B] text-white hover:bg-[#022C22]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* TAB 4: BRIDAL PROFILE */}
      {activeTab === 'profile' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-6 max-w-2xl">
          <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            Bridal Contact & Wedding Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Bride Name</label>
              <input
                type="text"
                defaultValue={user?.name || 'Suhana Patel'}
                className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email || 'suhana.patel@luxuryweddings.com'}
                className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Phone</label>
              <input
                type="tel"
                defaultValue={user?.phone || '+1 (555) 234-5678'}
                className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Home City</label>
              <input
                type="text"
                defaultValue="Dubai / London"
                className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
              />
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-bold">
            Update Profile
          </button>
        </div>
      )}

    </div>
  );
};
