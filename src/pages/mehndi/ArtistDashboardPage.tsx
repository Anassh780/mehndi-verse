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
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { Booking, PortfolioItem } from '@/types/mehndi';

export const ArtistDashboardPage: React.FC = () => {
  const { user } = useMehndiAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'portfolio' | 'calendar'>('overview');
  const [bookings, setBookings] = useState<Booking[]>(bookingStorage.getBookings());
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(MOCK_ARTISTS[0].portfolio);

  // New artwork upload state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Bridal');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pro boost state
  const [proModalOpen, setProModalOpen] = useState(false);
  const [isProActive, setIsProActive] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    bookingStorage.updateBookingStatus(bookingId, status);
    setBookings(bookingStorage.getBookings());
    showToast(`Booking status updated to ${status}.`);
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
    showToast('Artwork published to portfolio.');
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8 bg-[#f7f1e6] text-[#1b1815]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-xl bg-[#1b1815] text-[#f7f1e6] text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#6b7752]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Studio Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[rgba(27,24,21,0.12)]">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
            Artist Studio Command
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-[#1b1815]">
              Welcome back, {user?.name || 'Ayesha Noor Khan'}
            </h1>
            {isProActive && (
              <span className="badge">
                <Sparkles className="w-3 h-3 text-[#c9a227]" />
                <span>VIP Pro Active</span>
              </span>
            )}
          </div>
          <p className="text-xs text-[#2c2620]/75">
            Dubai Atelier · 100% Certified Botanical Partner
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => setProModalOpen(true)}
            className="btn btn-ghost !py-2 !px-4 !text-xs flex-1 sm:flex-initial justify-center min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c9a227]" />
            <span>VIP Pro</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="btn btn-primary !py-2 !px-4 !text-xs flex-1 sm:flex-initial justify-center min-h-[44px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Work</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[rgba(27,24,21,0.12)] flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none snap-x">
        {[
          { id: 'overview', label: 'Studio Overview' },
          { id: 'bookings', label: `Bookings (${bookings.length})` },
          { id: 'portfolio', label: `Portfolio Gallery (${portfolioItems.length})` },
          { id: 'calendar', label: 'Availability Calendar' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Total Commissions', value: `$${totalRevenue.toLocaleString()}`, sub: 'Escrow Protected' },
              { label: 'Pending Requests', value: pendingCount.toString(), sub: 'Requires Review' },
              { label: 'Confirmed Events', value: confirmedCount.toString(), sub: 'Upcoming Sessions' },
              { label: 'Bridal Satisfaction', value: '4.98 ★', sub: 'From 48 Reviews' },
            ].map((stat, i) => (
              <div key={i} className="card rounded-2xl p-5 sm:p-6 space-y-1 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9c4221] block">
                  {stat.label}
                </span>
                <p className="font-serif-editorial text-3xl font-bold text-[#1b1815]">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#2c2620]/70">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Recent Inquiries & Bookings */}
          <div className="card rounded-2xl p-5 sm:p-8 space-y-6 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
                Recent Bridal Inquiries
              </h3>
              <button onClick={() => setActiveTab('bookings')} className="text-xs font-semibold text-[#9c4221] hover:underline cursor-pointer">
                View All ({bookings.length}) →
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1b1815]">{b.customerName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#f7f1e6] text-[#2c2620]/75">
                        {b.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2c2620]/75 mt-0.5">
                      {b.eventType} · {b.eventDate} ({b.eventTime})
                    </p>
                    <p className="text-[11px] text-[#2c2620]/60">{b.venueAddress}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-bold text-[#1b1815]">${b.totalAmount}</span>
                    {b.status === 'pending' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-full bg-[#6b7752] text-white text-[11px] font-bold hover:bg-[#5a6543] cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-full border border-red-300 text-red-600 text-[11px] font-bold hover:bg-red-50 cursor-pointer"
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
        <div className="card rounded-2xl p-5 sm:p-8 space-y-6 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
              All Managed Bookings
            </h3>
            <span className="text-xs text-[#2c2620]/70">{bookings.length} Total</span>
          </div>

          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] space-y-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9c4221] block">Voucher #{b.bookingNumber || b.id}</span>
                    <p className="font-bold text-sm text-[#1b1815]">{b.customerName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    b.status === 'confirmed' ? 'bg-[#f7f1e6] text-[#6b7752] border border-[#6b7752]' : b.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#2c2620]/75 pt-2 border-t border-[rgba(27,24,21,0.1)]">
                  <div>Date: <strong className="text-[#1b1815]">{b.eventDate}</strong></div>
                  <div>Phone: <strong className="text-[#1b1815]">{b.customerPhone}</strong></div>
                  <div>Deposit: <strong className="text-[#6b7752]">${b.depositAmount} Paid</strong></div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {b.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                        className="btn btn-primary !py-1.5 !px-4 !text-xs"
                      >
                        Accept Date
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                        className="btn btn-ghost !py-1.5 !px-4 !text-xs"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                      className="btn btn-ghost !py-1.5 !px-4 !text-xs"
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
            <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
              Studio Portfolio
            </h3>
            <button onClick={() => setUploadModalOpen(true)} className="btn btn-primary !py-2 !px-4 !text-xs min-h-[44px]">
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Work</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="card rounded-xl overflow-hidden relative group bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
                <img src={item.imageUrl} alt={item.title} className="w-full aspect-[4/5] object-cover" />
                <div className="p-3">
                  <p className="font-bold text-xs text-[#1b1815] truncate">{item.title}</p>
                  <p className="text-[10px] text-[#2c2620]/60">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CALENDAR */}
      {activeTab === 'calendar' && (
        <div className="card rounded-2xl p-6 sm:p-8 space-y-4 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)]">
          <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">
            Ceremony Availability Blocker
          </h3>
          <p className="text-xs text-[#2c2620]/75">Manage open slots for upcoming destination wedding seasons.</p>
          <div className="p-6 rounded-xl bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] text-xs space-y-2">
            <p className="font-bold text-[#1b1815]">Next Available Bridal Window:</p>
            <p className="text-[#6b7752] font-semibold">2026/2027 Autumn & Winter Seasons Active</p>
          </div>
        </div>
      )}

      {/* Upload Artwork Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b1815]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[rgba(27,24,21,0.1)]">
              <h4 className="font-serif-editorial font-bold text-lg text-[#1b1815]">Add Portfolio Artwork</h4>
              <button onClick={() => setUploadModalOpen(false)} className="p-1 text-[#2c2620]"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleAddPortfolio} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Rajasthani Cuff"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
                >
                  <option value="Bridal">Bridal</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Rajasthani & Traditional">Rajasthani & Traditional</option>
                  <option value="Minimalist Mandala">Minimalist Mandala</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setUploadModalOpen(false)} className="btn btn-ghost !py-2 !px-4">Cancel</button>
                <button type="submit" className="btn btn-primary !py-2 !px-5">Publish Artwork</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pro Boost Modal */}
      {proModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b1815]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <Sparkles className="w-8 h-8 text-[#c9a227] mx-auto" />
            <h4 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Atelier VIP Pro Boost</h4>
            <p className="text-xs text-[#2c2620]/75 leading-relaxed">
              Gain 3x visibility in Dubai and London bride search results, certified gold atelier badge, and zero commission on repeat clientele.
            </p>
            <div className="p-4 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] text-xs font-bold text-[#1b1815]">
              $49 / Month · Active Membership
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setProModalOpen(false)} className="btn btn-ghost !py-2 !px-4">Close</button>
              <button
                onClick={() => {
                  setIsProActive(true);
                  setProModalOpen(false);
                  showToast('VIP Pro Boost is active.');
                }}
                className="btn btn-primary !py-2 !px-4"
              >
                Renew VIP Boost
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
