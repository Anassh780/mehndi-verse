import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Artist, ServicePackage, AddOnOption, Booking } from '@/types/mehndi';
import { bookingStorage } from '@/services/bookingStorage';
import { MOCK_ARTISTS } from '@/services/mehndiData';

export interface BookingDraft {
  artist: Artist | null;
  selectedPackage: ServicePackage | null;
  selectedAddOns: AddOnOption[];
  eventDate: string;
  eventTime: string;
  eventType: 'Wedding' | 'Sangeet / Mehendi Night' | 'Engagement' | 'Eid / Festival' | 'Private Event';
  venueAddress: string;
  venueCity: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialNotes: string;
  paymentMethod: 'card' | 'upi' | 'cash';
}

interface BookingContextType {
  draft: BookingDraft;
  step: number;
  confirmedBooking: Booking | null;
  setDraft: React.Dispatch<React.SetStateAction<BookingDraft>>;
  selectArtistAndPackage: (artist: Artist, pkg?: ServicePackage) => void;
  toggleAddOn: (addOn: AddOnOption) => void;
  updateDraft: (updates: Partial<BookingDraft>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepNumber: number) => void;
  calculateTotal: () => { packagePrice: number; addOnsTotal: number; total: number; deposit: number };
  submitBooking: () => Promise<Booking>;
  resetBookingFlow: () => void;
}

const DEFAULT_DRAFT: BookingDraft = {
  artist: MOCK_ARTISTS[0],
  selectedPackage: MOCK_ARTISTS[0].packages[0],
  selectedAddOns: [],
  eventDate: '2026-09-20',
  eventTime: '11:00 AM',
  eventType: 'Wedding',
  venueAddress: 'Grand Hyatt Resort & Ballroom',
  venueCity: 'Dubai',
  customerName: 'Suhana Patel',
  customerEmail: 'suhana.patel@luxuryweddings.com',
  customerPhone: '+1 (555) 234-5678',
  specialNotes: 'Looking forward to intricate couple initials and peacocks in my bridal henna.',
  paymentMethod: 'card',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<BookingDraft>(DEFAULT_DRAFT);
  const [step, setStep] = useState<number>(1);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const selectArtistAndPackage = (artist: Artist, pkg?: ServicePackage) => {
    setDraft(prev => ({
      ...prev,
      artist,
      selectedPackage: pkg || artist.packages[0] || null,
    }));
  };

  const toggleAddOn = (addOn: AddOnOption) => {
    setDraft(prev => {
      const exists = prev.selectedAddOns.some(a => a.id === addOn.id);
      if (exists) {
        return {
          ...prev,
          selectedAddOns: prev.selectedAddOns.filter(a => a.id !== addOn.id),
        };
      } else {
        return {
          ...prev,
          selectedAddOns: [...prev.selectedAddOns, addOn],
        };
      }
    });
  };

  const updateDraft = (updates: Partial<BookingDraft>) => {
    setDraft(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const goToStep = (s: number) => setStep(s);

  const calculateTotal = () => {
    const packagePrice = draft.selectedPackage?.price || 0;
    const addOnsTotal = draft.selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const total = packagePrice + addOnsTotal;
    const deposit = Math.round(total * 0.25); // 25% deposit
    return { packagePrice, addOnsTotal, total, deposit };
  };

  const submitBooking = async (): Promise<Booking> => {
    const { packagePrice, total, deposit } = calculateTotal();
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingNumber: `HL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: 'cust-demo-1',
      customerName: draft.customerName || 'Suhana Patel',
      customerEmail: draft.customerEmail || 'suhana.patel@luxuryweddings.com',
      customerPhone: draft.customerPhone || '+1 (555) 234-5678',
      artistId: draft.artist?.id || 'artist-ayesha-khan',
      artistName: draft.artist?.name || 'Ayesha Noor Khan',
      artistAvatar: draft.artist?.avatar || '',
      artistCity: draft.artist?.city || 'Dubai',
      packageId: draft.selectedPackage?.id || 'ayesha-pkg-1',
      packageName: draft.selectedPackage?.title || 'Heirloom Royal Bridal Signature',
      packagePrice: packagePrice,
      selectedAddOns: draft.selectedAddOns,
      totalAmount: total,
      depositAmount: deposit,
      balanceAmount: total - deposit,
      eventDate: draft.eventDate,
      eventTime: draft.eventTime,
      eventType: draft.eventType,
      venueAddress: draft.venueAddress,
      venueCity: draft.venueCity,
      status: 'confirmed',
      paymentStatus: 'deposit_paid',
      paymentMethod: draft.paymentMethod,
      specialNotes: draft.specialNotes,
      createdAt: new Date().toISOString(),
    };

    bookingStorage.saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(5); // Step 5 is celebration / confirmation screen
    return newBooking;
  };

  const resetBookingFlow = () => {
    setDraft(DEFAULT_DRAFT);
    setStep(1);
    setConfirmedBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        draft,
        step,
        confirmedBooking,
        setDraft,
        selectArtistAndPackage,
        toggleAddOn,
        updateDraft,
        nextStep,
        prevStep,
        goToStep,
        calculateTotal,
        submitBooking,
        resetBookingFlow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
