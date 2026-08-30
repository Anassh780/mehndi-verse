import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Image as ImageIcon, 
  Package, 
  Star, 
  User, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Sparkles, 
  Crown,
  Eye,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { Booking, ServicePackage, PortfolioItem, MehndiCategory } from '@/types/mehndi';

export const ArtistDashboardPage: React.FC = () => {
  const { user } = useMehndiAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'portfolio' | 'services' | 'calendar' | 'reviews' | 'profile'>('overview');
  
  const [bookings, setBookings] = useState<Booking[]>(() => bookingStorage.getBookings());
  const [artistData, setArtistData] = useState(MOCK_ARTISTS[0]); // Ayesha Noor Khan as default demo
  const [proModalOpen, setProModalOpen] = useState(false);

  // New Portfolio Form State
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState<MehndiCategory>('Bridal');
  const [newPortImage, setNewPortImage] = useState('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80');

  // New Service Package Form State
  const [newPkgTitle, setNewPkgTitle] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState<number>(350);
  const [newPkgDuration, setNewPkgDuration] = useState<number>(180);
  const [newPkgDesc, setNewPkgDesc] = useState('');

  // Status handlers
  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    bookingStorage.updateBookingStatus(bookingId, status);
    setBookings(bookingStorage.getBookings());
  };

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle) return;
    const newItem: PortfolioItem = {
      id: `port-new-${Date.now()}`,
      title: newPortTitle,
      category: newPortCategory,
      imageUrl: newPortImage,
      description: 'Handcrafted with 100% natural triple-sifted Sojat henna.',
      likesCount: 1,
    };
    setArtistData(prev => ({
      ...prev,
      portfolio: [newItem, ...prev.portfolio],
    }));
    setNewPortTitle('');
  };

  const handleDeletePortfolioItem = (id: string) => {
    setArtistData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(p => p.id !== id),
    }));
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgTitle) return;
    const newPkg: ServicePackage = {
      id: `pkg-new-${Date.now()}`,
      artistId: artistData.id,
      title: newPkgTitle,
      tier: 'bridal_silver',
      price: newPkgPrice,
      durationMinutes: newPkgDuration,
      handsDescription: 'Custom bridal hands and wrists.',
      feetIncluded: false,
      organicCones: true,
      touchupKit: true,
      description: newPkgDesc || 'Signature bridal mehndi tailored for your ceremony.',
      inclusions: ['Pre-wedding bridal consultation', '100% organic essential oil cones', 'Aftercare stain balm'],
    };
    setArtistData(prev => ({
      ...prev,
      packages: [...prev.packages, newPkg],
    }));
    setNewPkgTitle('');
    setNewPkgDesc('');
  };

  // Metrics
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalAmount : 0), 0);
  const confirmedUpcoming = bookings.filter(b => b.status === 'confirmed').length;

  const sidebarLinks = [
    { id: 'overview', label: 'Studio Overview', icon: LayoutDashboard },
    { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
    { id: 'portfolio', label: `Portfolio Manager (${artistData.portfolio.length})`, icon: ImageIcon },
    { id: 'services', label: `Packages & Pricing (${artistData.packages.length})`, icon: Package },
    { id: 'calendar', label: 'Availability Calendar', icon: Clock },
    { id: 'reviews', label: `Client Reviews (${artistData.reviews.length})`, icon: Star },
    { id: 'profile', label: 'Profile & Bio Settings', icon: User },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#033527] to-[#07100D] text-white border border-[#C59B27]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={artistData.avatar}
            alt={artistData.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#C59B27] shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-white">{artistData.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C59B27] text-black text-[10px] font-extrabold uppercase">
                Pro Artist Studio
              </span>
            </div>
            <p className="text-xs text-gray-300">
              {artistData.city} • Rating: <strong>{artistData.rating} ★</strong> ({artistData.reviewCount} reviews)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setProModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>VIP Search Boost</span>
          </button>
          <Link
            to={`/artists/${artistData.id}`}
            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Profile</span>
          </Link>
        </div>
      </div>

      {/* Main SaaS Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="p-3 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-[#5C6763] dark:text-[#B2C2BC] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: STUDIO OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#5C6763] dark:text-[#B2C2BC]">Total Bookings</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] dark:text-[#E5C07B]">{totalBookingsCount}</p>
                  <span className="text-[10px] text-emerald-600 font-medium">+14% this month</span>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#5C6763] dark:text-[#B2C2BC]">Total Revenue</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#064E3B] dark:text-[#E5C07B]">${totalRevenue}</p>
                  <span className="text-[10px] text-emerald-600 font-medium">Secured in Escrow</span>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#5C6763] dark:text-[#B2C2BC]">Confirmed Events</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#7A1C2D]">{confirmedUpcoming}</p>
                  <span className="text-[10px] text-gray-500">Upcoming calendar slots</span>
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase text-[#5C6763] dark:text-[#B2C2BC]">Client Satisfaction</span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#9A7516] dark:text-[#E5C07B]">4.98 ★</p>
                  <span className="text-[10px] text-emerald-600 font-medium">100% 5-Star Reviews</span>
                </div>
              </div>

              {/* Recent Bookings Feed */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                  <h3 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                    Recent Bridal Inquiries & Appointments
                  </h3>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs text-[#064E3B] dark:text-[#E5C07B] font-bold hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 3).map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#1A2421] dark:text-[#F8F5EE]">{b.customerName}</span>
                          <span className="text-[10px] bg-white dark:bg-[#14241F] px-2 py-0.5 rounded font-mono text-gray-500">{b.bookingNumber}</span>
                        </div>
                        <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                          {b.packageName} • 📅 <strong>{b.eventDate} ({b.eventTime})</strong>
                        </p>
                        <p className="text-[11px] text-gray-400">Venue: {b.venueAddress}, {b.venueCity}</p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-serif font-bold text-sm text-[#064E3B] dark:text-[#E5C07B]">
                          ${b.totalAmount}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          b.status === 'confirmed' ? 'bg-[#ECFDF5] text-[#064E3B]' : b.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BOOKINGS MANAGER */}
          {activeTab === 'bookings' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                    Bridal Bookings Command Hub
                  </h3>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Review client requests, approve schedules, and mark weddings as completed.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB]/50 dark:bg-[#07100D] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">{b.customerName}</h4>
                          <span className="text-[10px] text-gray-500 font-mono">#{b.bookingNumber}</span>
                        </div>
                        <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                          {b.customerEmail} • {b.customerPhone}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          b.status === 'confirmed' ? 'bg-[#ECFDF5] text-[#064E3B]' : b.status === 'completed' ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-600'
                        }`}>
                          Status: {b.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-gray-400">Package:</p>
                        <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">{b.packageName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Ceremony Date & Time:</p>
                        <p className="font-bold text-[#064E3B] dark:text-[#E5C07B]">📅 {b.eventDate} at {b.eventTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Venue Address:</p>
                        <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">{b.venueAddress}, {b.venueCity}</p>
                      </div>
                    </div>

                    {b.specialNotes && (
                      <div className="p-3 rounded-xl bg-white dark:bg-[#14241F] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                        <strong>Client Note:</strong> "{b.specialNotes}"
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-bold text-[#064E3B] dark:text-[#E5C07B]">
                        Total: ${b.totalAmount} (Deposit Paid: ${b.depositAmount})
                      </div>

                      <div className="flex items-center gap-2">
                        {b.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                              className="px-4 py-1.5 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22]"
                            >
                              Accept Booking
                            </button>
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                              className="px-4 py-1.5 rounded-full border border-red-200 text-red-600 text-xs font-semibold"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                            className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              
              {/* Add New Artwork Form */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                  Upload New Portfolio Artwork
                </h3>

                <form onSubmit={handleAddPortfolioItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div className="sm:col-span-1">
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Artwork Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Lotus Bridal Set"
                      value={newPortTitle}
                      onChange={(e) => setNewPortTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Category</label>
                    <select
                      value={newPortCategory}
                      onChange={(e) => setNewPortCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                    >
                      <option value="Bridal">Bridal</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Rajasthani & Traditional">Rajasthani & Traditional</option>
                      <option value="Minimalist Mandala">Minimalist Mandala</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#022C22] flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Gallery</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Existing Portfolio Gallery */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {artistData.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-900 border border-[#EFE7DA] dark:border-[#1F362E]"
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                      <span className="text-[10px] bg-black/60 px-2 py-0.5 rounded w-max">{item.category}</span>
                      <div>
                        <p className="text-xs font-bold">{item.title}</p>
                        <button
                          onClick={() => handleDeletePortfolioItem(item.id)}
                          className="mt-2 text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: SERVICES & PACKAGES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              {/* Add Package Form */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                  Create New Service Package
                </h3>

                <form onSubmit={handleAddPackage} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Package Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sangeet Family Special"
                      value={newPkgTitle}
                      onChange={(e) => setNewPkgTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Price (USD)</label>
                    <input
                      type="number"
                      value={newPkgPrice}
                      onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Duration (Mins)</label>
                    <input
                      type="number"
                      value={newPkgDuration}
                      onChange={(e) => setNewPkgDuration(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#EFE7DA] dark:border-[#1F362E] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#022C22] flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Save Package</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Package List */}
              <div className="space-y-4">
                {artistData.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-[#1A2421] dark:text-[#F8F5EE]">{pkg.title}</h4>
                        {pkg.popular && <span className="px-2 py-0.5 rounded bg-[#7A1C2D] text-white text-[10px] font-bold">Featured</span>}
                      </div>
                      <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">{pkg.description}</p>
                      <p className="text-[11px] text-gray-400">Duration: ~{Math.round(pkg.durationMinutes / 60)} hrs</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-serif text-2xl font-bold text-[#064E3B] dark:text-[#E5C07B]">${pkg.price}</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">Active for Bookings</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                Availability & Peak Bridal Season Controls
              </h3>
              <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                Block off personal days or open priority slots for destination wedding clients.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artistData.availability.map((day) => (
                  <div key={day.date} className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] space-y-3">
                    <p className="font-bold text-xs text-[#1A2421] dark:text-[#F8F5EE]">Date: {day.date}</p>
                    <div className="space-y-1.5">
                      {day.slots.map((s) => (
                        <div key={s.time} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white dark:bg-[#14241F]">
                          <span>{s.time}</span>
                          <span className={s.available ? 'text-emerald-600 font-bold' : 'text-gray-400'}>
                            {s.available ? 'Available' : 'Booked'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                Customer Reviews & Replies
              </h3>
              <div className="space-y-4">
                {artistData.reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={r.customerAvatar} alt={r.customerName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{r.customerName}</p>
                          <p className="text-[10px] text-gray-400">{r.eventType} • {r.date}</p>
                        </div>
                      </div>
                      <div className="flex text-[#C59B27] text-xs">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                    </div>
                    <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">Studio Profile Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Artist Name</label>
                  <input
                    type="text"
                    defaultValue={artistData.name}
                    className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">City Hub</label>
                  <input
                    type="text"
                    defaultValue={artistData.city}
                    className="w-full p-2.5 rounded-xl border border-[#EFE7DA] bg-[#F8F4EB] dark:bg-[#07100D] text-xs"
                  />
                </div>
              </div>
              <button className="px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-bold">
                Save Profile Changes
              </button>
            </div>
          )}

        </main>

      </div>

      {/* Pro Boost Modal */}
      {proModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#FDFBF7] dark:bg-[#07100D] border border-[#C59B27] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA]">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#C59B27]" />
                <h3 className="font-serif font-bold text-lg text-[#064E3B] dark:text-[#E5C07B]">VIP Artist Pro Tier</h3>
              </div>
              <button onClick={() => setProModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
              Gain 3x discovery priority on the homepage, a sparkling Gold Verified Crown on your profile, and 0% platform commission on direct bookings.
            </p>
            <div className="p-4 rounded-2xl bg-[#FEF9EE] border border-[#C59B27]/40 text-center space-y-1">
              <span className="text-xs font-bold uppercase text-[#9A7516]">Special Wedding Season Pass</span>
              <p className="font-serif text-3xl font-bold text-[#064E3B]">$49 <span className="text-xs font-normal">/ month</span></p>
            </div>
            <button
              onClick={() => setProModalOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] font-bold text-xs shadow-md"
            >
              Activate VIP Pro Tier
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
