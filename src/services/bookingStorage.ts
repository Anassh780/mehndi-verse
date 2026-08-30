import { Booking, ChatConversation, ArtistReview, ServicePackage, PortfolioItem } from '@/types/mehndi';
import { MOCK_ARTISTS } from './mehndiData';

const STORAGE_KEYS = {
  BOOKINGS: 'hennaluxe_bookings',
  FAVORITES: 'hennaluxe_favorites',
  CHATS: 'hennaluxe_chats',
  ARTISTS_OVERRIDE: 'hennaluxe_artists_data',
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    bookingNumber: 'HL-2026-8891',
    customerId: 'cust-demo-1',
    customerName: 'Suhana Patel',
    customerEmail: 'suhana.patel@gmail.com',
    customerPhone: '+1 (555) 234-5678',
    artistId: 'artist-ayesha-khan',
    artistName: 'Ayesha Noor Khan',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    artistCity: 'Dubai',
    packageId: 'ayesha-pkg-1',
    packageName: 'Heirloom Royal Bridal Signature',
    packagePrice: 650,
    selectedAddOns: [
      {
        id: 'organic_aftercare_kit',
        title: 'VIP Organic Henna Aftercare & Balm Kit',
        description: 'Pure essential clove oil infusion & natural beeswax balm.',
        price: 35,
        durationMinutes: 0,
      }
    ],
    totalAmount: 685,
    depositAmount: 150,
    balanceAmount: 535,
    eventDate: '2026-09-15',
    eventTime: '10:00 AM',
    eventType: 'Wedding',
    venueAddress: 'Palace Downtown, Suite 402',
    venueCity: 'Dubai',
    status: 'confirmed',
    paymentStatus: 'deposit_paid',
    paymentMethod: 'card',
    specialNotes: 'Please include hidden groom initials "AK" in palm and elephant procession on the forearm.',
    createdAt: '2026-08-25T14:30:00.000Z',
  },
  {
    id: 'book-102',
    bookingNumber: 'HL-2026-8892',
    customerId: 'cust-demo-1',
    customerName: 'Suhana Patel',
    customerEmail: 'suhana.patel@gmail.com',
    customerPhone: '+1 (555) 234-5678',
    artistId: 'artist-fatima-zahra',
    artistName: 'Fatima Al-Zahra',
    artistAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    artistCity: 'London',
    packageId: 'fatima-pkg-1',
    packageName: 'Khaleeji Royal Arabic Bridal',
    packagePrice: 580,
    selectedAddOns: [],
    totalAmount: 580,
    depositAmount: 580,
    balanceAmount: 0,
    eventDate: '2026-07-20',
    eventTime: '02:00 PM',
    eventType: 'Sangeet / Mehendi Night',
    venueAddress: 'The Dorchester Hotel',
    venueCity: 'London',
    status: 'completed',
    paymentStatus: 'fully_paid',
    paymentMethod: 'card',
    createdAt: '2026-07-01T10:00:00.000Z',
  }
];

const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 'chat-1',
    customerId: 'cust-demo-1',
    customerName: 'Suhana Patel',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    artistId: 'artist-ayesha-khan',
    artistName: 'Ayesha Noor Khan',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    lastMessage: 'I have received your booking and inspiration photos! The elephant jaal will look exquisite.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'cust-demo-1',
        senderName: 'Suhana Patel',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        senderRole: 'customer',
        text: 'Hello Ayesha! I just booked your Heirloom Royal Bridal package for September 15. Can we add groom initials inside the mandala?',
        timestamp: '10:30 AM',
        isRead: true,
      },
      {
        id: 'msg-2',
        senderId: 'artist-ayesha-khan',
        senderName: 'Ayesha Noor Khan',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        senderRole: 'artist',
        text: 'I have received your booking and inspiration photos! The elephant jaal will look exquisite.',
        timestamp: '10:45 AM',
        isRead: false,
      }
    ]
  }
];

export const bookingStorage = {
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  saveBooking(newBooking: Booking): void {
    const list = this.getBookings();
    list.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
  },

  updateBookingStatus(id: string, status: Booking['status']): void {
    const list = this.getBookings().map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : ['artist-ayesha-khan', 'artist-priya-sharma'];
    } catch {
      return ['artist-ayesha-khan', 'artist-priya-sharma'];
    }
  },

  toggleFavorite(artistId: string): string[] {
    let favs = this.getFavorites();
    if (favs.includes(artistId)) {
      favs = favs.filter(id => id !== artistId);
    } else {
      favs.push(artistId);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return favs;
  },

  getChats(): ChatConversation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHATS);
      return data ? JSON.parse(data) : INITIAL_CHATS;
    } catch {
      return INITIAL_CHATS;
    }
  },

  sendMessage(chatId: string, text: string, senderRole: 'customer' | 'artist', senderName: string, senderAvatar: string): ChatConversation[] {
    const chats = this.getChats();
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      chat.messages.push({
        id: `msg-${Date.now()}`,
        senderId: senderRole === 'customer' ? chat.customerId : chat.artistId,
        senderName,
        senderAvatar,
        senderRole,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      });
      chat.lastMessage = text;
      chat.lastMessageTime = 'Just now';
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    }
    return chats;
  }
};
