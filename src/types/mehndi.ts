export type UserRole = 'customer' | 'artist' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  location?: string;
  artistProfileId?: string;
  savedArtistIds?: string[];
  createdAt: string;
}

export type MehndiCategory = 
  | 'Bridal' 
  | 'Arabic' 
  | 'Rajasthani & Traditional' 
  | 'Indo-Western & Modern' 
  | 'Minimalist Mandala' 
  | 'Festive & Eid';

export interface PortfolioItem {
  id: string;
  title: string;
  category: MehndiCategory;
  imageUrl: string;
  stainedImageUrl?: string; // Before/After stain preview
  description: string;
  likesCount: number;
  featured?: boolean;
  handType?: 'Palm' | 'Backhand' | 'Full Arm' | 'Feet' | 'Bridal Full Set';
}

export interface ServicePackage {
  id: string;
  artistId: string;
  title: string;
  tier: 'basic' | 'bridal_silver' | 'bridal_royal' | 'guest_party' | 'engagement';
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  handsDescription: string;
  feetIncluded: boolean;
  organicCones: boolean;
  touchupKit: boolean;
  description: string;
  inclusions: string[];
  popular?: boolean;
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD
  slots: {
    time: string; // e.g. "10:00 AM", "02:00 PM", "06:00 PM"
    available: boolean;
    bookedBy?: string;
  }[];
  isBlocked?: boolean;
}

export interface ArtistReview {
  id: string;
  artistId: string;
  customerName: string;
  customerAvatar: string;
  customerCity?: string;
  rating: number;
  date: string;
  eventType: 'Wedding / Bridal' | 'Sangeet' | 'Engagement' | 'Eid / Festival' | 'Party';
  comment: string;
  photos?: string[];
  verifiedBride: boolean;
  artistReply?: {
    comment: string;
    date: string;
  };
}

export interface Artist {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  title: string;
  bio: string;
  story?: string;
  city: string;
  state: string;
  country: string;
  address?: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  startingPrice: number;
  currency: string;
  verified: boolean;
  featured: boolean;
  proMember: boolean;
  responseTimeMinutes: number;
  minAdvanceBookingDays: number;
  travelsToVenue: boolean;
  organicChemicalFreeGuarantee: boolean;
  badges: string[];
  specialties: MehndiCategory[];
  portfolio: PortfolioItem[];
  packages: ServicePackage[];
  reviews: ArtistReview[];
  availability: AvailabilitySlot[];
  socialLinks: {
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    website?: string;
  };
  stats: {
    completedWeddings: number;
    bridesServed: number;
    repeatClientsPercent: number;
  };
}

export interface AddOnOption {
  id: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'deposit_paid' | 'fully_paid' | 'pay_on_event';

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCity: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedAddOns: AddOnOption[];
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  eventDate: string; // YYYY-MM-DD
  eventTime: string; // e.g. "11:00 AM"
  eventType: 'Wedding' | 'Sangeet / Mehendi Night' | 'Engagement' | 'Eid / Festival' | 'Private Event';
  venueAddress: string;
  venueCity: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'card' | 'upi' | 'cash';
  specialNotes?: string;
  inspirationImages?: string[];
  createdAt: string;
  invoiceUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachmentUrl?: string;
}

export interface ChatConversation {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedDate: string;
  readTimeMinutes: number;
  category: 'Bridal Trends' | 'Care & Staining' | 'Styles & Culture' | 'Artist Tips';
  tags: string[];
}

export interface AIQuizPreferences {
  eventType: string;
  handCoverage: string; // 'Palms Only' | 'Forearm' | 'Elbow High' | 'Full Bridal Set (Hands + Feet)'
  designStyle: MehndiCategory | 'Undecided / Recommend for me';
  outfitColor: string; // 'Ruby Red / Maroon' | 'Emerald Green' | 'Champagne Gold' | 'Pastel Pink / Peach' | 'Royal Navy / Blue'
  intricacyLevel: 'Delicate & Fine lines' | 'Bold & Arabic Cut' | 'Dense Traditional Jali & Figures';
  budgetMax: number;
  city: string;
}

export interface AIRecommendationResult {
  recommendedStyle: MehndiCategory;
  styleDescription: string;
  curatedPatternAdvice: string;
  outfitHarmonyTip: string;
  estimatedPriceRange: string;
  matchedArtists: Artist[];
  sampleImages: string[];
}
