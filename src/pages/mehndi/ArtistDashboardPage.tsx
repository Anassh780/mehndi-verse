import React, { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  Image as ImageIcon, 
  Star, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Upload, 
  Clock, 
  Eye
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { Booking, PortfolioItem } from '@/types/mehndi';

export const ArtistDashboardPage: React.FC = () => {
  const { user } = useMehndiAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'portfolio' | 'packages' | 'calendar'>('overview');
  const [bookings, setBookings] = useState<Booking[]>(bookingStorage.getBookings());
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(MOCK_ARTISTS[0].portfolio);

  // New artwork upload state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Bridal');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Pro boost modal
  const [proModalOpen, setProModalOpen] = useState(false);

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    bookingStorage.updateBookingStatus(bookingId, status);
    setBookings(bookingStorage.getBookings());
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newTitle,
      category: newCategory as any,
      imageUrl: newImageUrl,
      description: 'Handcrafted master bridal pattern with pure organic Sojat paste.',
      likesCount: 1
    };

    setPortfolioItems([newItem, ...portfolioItems]);
    setNewTitle('');
    setNewImageUrl('');
    setUploadModalOpen(false);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D9] dark:border-[#2A2724]">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
            Artist Studio Command
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Welcome back, {user?.name || 'Ayesha Noor Khan'}
          </h1>
          <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
            Dubai Atelier · 100% Certified Botanical Partner
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setProModalOpen(true)}
            className="btn-secondary !py-2 !px-4 !text-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8E5A3C]" />
            <span>VIP Pro Boost</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Portfolio Work</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E2D9] dark:border-[#2A2724] flex items-center gap-8 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Studio Overview' },
          { id: 'bookings', label: `Bookings (${bookings.length})` },
          { id: 'portfolio', label: `Portfolio Gallery (${portfolioItems.length})` },
          { id: 'calendar', label: 'Availability Calendar' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Commissions', value: `$${totalRevenue.toLocaleString()}`, sub: 'Escrow Protected' },
              { label: 'Pending Requests', value: pendingCount.toString(), sub: 'Requires Review' },
              { label: 'Confirmed Events', value: confirmedCount.toString(), sub: 'Upcoming Sessions' },
              { label: 'Bridal Satisfaction', value: '4.98 ★', sub: 'From 48 Reviews' },
            ].map((stat, i) => (
              <div key={i} className="editorial-card rounded-2xl p-6 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E988F] block">
                  {stat.label}
                </span>
                <p className="font-serif-editorial text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298]">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Recent Inquiries & Bookings */}
          <div className="editorial-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Recent Bridal Inquiries
              </h3>
              <button onClick={() => setActiveTab('bookings')} className="text-xs font-semibold text-[#8E5A3C] hover:underline">
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{b.customerName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#F4EFEB] text-[#6B665F]">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B665F] mt-0.5">
                      {b.eventType} · {b.eventDate} ({b.eventTime})
                    </p>
                    <p className="text-[11px] text-[#9E988F]">{b.venueAddress}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">${b.totalAmount}</span>
                    {b.status === 'pending' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-full bg-[#385648] text-white text-[11px] font-bold"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-full border border-red-300 text-red-600 text-[11px] font-bold"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BOOKINGS LIST */}
      {activeTab === 'bookings' && (
        <div className="editorial-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              All Managed Bookings
            </h3>
            <span className="text-xs text-[#6B665F]">{bookings.length} Total</span>
          </div>

          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl border border-[#E8E2D9] dark:border-[#2A2724] space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E988F] block">Voucher #{b.bookingNumber || b.id}</span>
                    <p className="font-bold text-sm text-[#1C1A18] dark:text-[#F7F5F0]">{b.customerName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    b.status === 'confirmed' ? 'bg-[#EEF4F0] text-[#385648]' : b.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#6B665F] pt-2 border-t border-[#F0EAE1]">
                  <div>Date: <strong className="text-[#1C1A18]">{b.eventDate}</strong></div>
                  <div>Phone: <strong className="text-[#1C1A18]">{b.customerPhone}</strong></div>
                  <div>Deposit: <strong className="text-[#385648]">${b.depositAmount} Paid</strong></div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                        className="btn-primary !py-1.5 !px-4 !text-xs"
                      >
                        Accept Date
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                        className="btn-secondary !py-1.5 !px-4 !text-xs"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                      className="btn-secondary !py-1.5 !px-4 !text-xs"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              Studio Portfolio
            </h3>
            <button onClick={() => setUploadModalOpen(true)} className="btn-primary !py-2 !px-4 !text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Work</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="editorial-card rounded-xl overflow-hidden relative group">
                <img src={item.imageUrl} alt={item.title} className="w-full aspect-[4/5] object-cover" />
                <div className="p-3">
                  <p className="font-bold text-xs text-[#1C1A18] dark:text-[#F7F5F0] truncate">{item.title}</p>
                  <p className="text-[10px] text-[#6B665F]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="editorial-card rounded-2xl p-8 space-y-4">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Ceremony Availability Blocker
          </h3>
          <p className="text-xs text-[#6B665F]">Manage open slots for upcoming destination wedding seasons.</p>
          <div className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] text-xs space-y-2">
            <p className="font-bold">Next Available Bridal Window:</p>
            <p className="text-[#385648] font-semibold">2026/2027 Autumn & Winter Seasons Active</p>
          </div>
        </div>
      )}

      {/* Upload Artwork Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
              <h4 className="font-serif-editorial font-bold text-lg">Add Portfolio Artwork</h4>
              <button onClick={() => setUploadModalOpen(false)}><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddPortfolio} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Rajasthani Cuff"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]"
                >
                  <option value="Bridal">Bridal</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Rajasthani & Traditional">Rajasthani & Traditional</option>
                  <option value="Minimalist Mandala">Minimalist Mandala</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setUploadModalOpen(false)} className="btn-secondary !py-2 !px-4">Cancel</button>
                <button type="submit" className="btn-primary !py-2 !px-4">Publish Artwork</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pro Boost Modal */}
      {proModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] rounded-2xl p-6 text-center space-y-4">
            <Sparkles className="w-8 h-8 text-[#8E5A3C] mx-auto" />
            <h4 className="font-serif-editorial text-2xl font-bold">Atelier VIP Pro Boost</h4>
            <p className="text-xs text-[#6B665F] leading-relaxed">
              Gain 3x visibility in Dubai and London bride search results, certified gold atelier badge, and zero commission on repeat clientele.
            </p>
            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border text-xs font-bold">
              $49 / Month · Cancel Anytime
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setProModalOpen(false)} className="btn-secondary !py-2 !px-4">Close</button>
              <button onClick={() => setProModalOpen(false)} className="btn-primary !py-2 !px-4">Activate VIP Boost</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
