import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Printer, 
  Download, 
  Crown,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_ARTISTS, STANDARD_ADDONS } from '@/services/mehndiData';
import { useBooking } from '@/context/BookingContext';
import { ServicePackage, AddOnOption } from '@/types/mehndi';

export const BookingWizardPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();
  const {
    draft,
    step,
    confirmedBooking,
    selectArtistAndPackage,
    toggleAddOn,
    updateDraft,
    nextStep,
    prevStep,
    goToStep,
    calculateTotal,
    submitBooking,
    resetBookingFlow,
  } = useBooking();

  const [isProcessing, setIsProcessing] = useState(false);

  // Sync artist from URL if provided
  useEffect(() => {
    if (artistId) {
      const found = MOCK_ARTISTS.find(a => a.id === artistId);
      if (found && draft.artist?.id !== found.id) {
        selectArtistAndPackage(found);
      }
    }
  }, [artistId]);

  // Trigger confetti celebration on step 5 (Confirmation)
  useEffect(() => {
    if (step === 5) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#D4AF37', '#7A1C2D', '#F3E5AB'],
      });
    }
  }, [step]);

  const { packagePrice, addOnsTotal, total, deposit } = calculateTotal();
  const artist = draft.artist || MOCK_ARTISTS[0];

  const handleFinalSubmit = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      await submitBooking();
      setIsProcessing(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>VIP Bridal Appointment</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
          Reserve Your Mehndi Experience
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6763] dark:text-[#B2C2BC]">
          Securing booking with <strong className="text-[#064E3B] dark:text-[#E5C07B]">{artist.name}</strong> • 100% Organic Henna Guarantee
        </p>
      </div>

      {/* Step Progress Visualizer */}
      {step <= 4 && (
        <div className="p-4 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm no-print">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Package & Add-ons' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Event Details' },
              { num: 4, label: 'Payment' },
            ].map((s, idx) => (
              <div key={s.num} className="flex-1 flex items-center">
                <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num
                        ? 'bg-[#064E3B] text-white ring-4 ring-[#ECFDF5] dark:ring-[#06281F]'
                        : step > s.num
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#F8F4EB] dark:bg-[#1F362E] text-gray-400'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:inline ${step === s.num ? 'text-[#064E3B] dark:text-[#E5C07B]' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${step > s.num ? 'bg-[#10B981]' : 'bg-[#EFE7DA] dark:bg-[#1F362E]'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Wizard Form Body */}
        <div className={step === 5 ? 'col-span-12' : 'lg:col-span-8'}>
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-8">
            
            {/* =========================================================================
                STEP 1: SELECT PACKAGE & ADD-ONS
                ========================================================================= */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-1">
                    1. Choose Your Service Package
                  </h3>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Select the ideal tier for your wedding day hands and feet coverage.
                  </p>
                </div>

                <div className="space-y-3">
                  {artist.packages.map((pkg) => {
                    const isSelected = draft.selectedPackage?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => updateDraft({ selectedPackage: pkg })}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#064E3B] dark:border-[#E5C07B] bg-[#ECFDF5]/50 dark:bg-[#06281F]/40 shadow-sm'
                            : 'border-[#EFE7DA] dark:border-[#1F362E] hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#064E3B] bg-[#064E3B]' : 'border-gray-300'}`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </span>
                              <h4 className="font-serif text-base font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                                {pkg.title}
                              </h4>
                            </div>
                            <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] pl-6">
                              {pkg.handsDescription}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-serif text-xl font-bold text-[#064E3B] dark:text-[#E5C07B]">
                              ${pkg.price}
                            </span>
                            <span className="text-[10px] text-gray-400 block">~{Math.round(pkg.durationMinutes / 60)} hrs</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add-ons Selection */}
                <div className="pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                      Enhance with Luxury Add-ons
                    </h4>
                    <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                      Optional bridal add-ons to complete your look.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {STANDARD_ADDONS.map((addOn) => {
                      const isAdded = draft.selectedAddOns.some(a => a.id === addOn.id);
                      return (
                        <div
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn)}
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between gap-4 transition-all ${
                            isAdded
                              ? 'border-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010]'
                              : 'border-[#EFE7DA] dark:border-[#1F362E] hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center ${isAdded ? 'bg-[#C59B27] border-[#C59B27]' : 'border-gray-300'}`}>
                              {isAdded && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{addOn.title}</p>
                              <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">{addOn.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#064E3B] dark:text-[#E5C07B] whitespace-nowrap">
                            +${addOn.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 2: DATE & TIME SLOT PICKER
                ========================================================================= */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-1">
                    2. Select Wedding Date & Time
                  </h3>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Artists are booked on a first-deposit basis to ensure undivided focus on your ceremony.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE] block mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={draft.eventDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => updateDraft({ eventDate: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-medium text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A2421] dark:text-[#F8F5EE] block mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      value={draft.eventTime}
                      onChange={(e) => updateDraft({ eventTime: e.target.value })}
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-medium text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="10:00 AM">10:00 AM (Morning Bridal Session)</option>
                      <option value="01:30 PM">01:30 PM (Afternoon Session)</option>
                      <option value="04:30 PM">04:30 PM (Evening Sangeet Prep)</option>
                      <option value="07:00 PM">07:00 PM (Night Mehndi Party)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#9A7516] dark:text-[#E5C07B] leading-relaxed">
                    <strong>Recommended Bridal Timing:</strong> We suggest booking 48 hours prior to your reception so the natural organic paste has adequate time to oxidize into a deep mahogany tone.
                  </p>
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 3: EVENT & LOCATION DETAILS
                ========================================================================= */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-1">
                    3. Event Venue & Bride Details
                  </h3>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Where should the artist travel to on your celebration day?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={draft.customerName}
                      onChange={(e) => updateDraft({ customerName: e.target.value })}
                      placeholder="Bride or Organizer Name"
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={draft.customerPhone}
                      onChange={(e) => updateDraft({ customerPhone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={draft.customerEmail}
                      onChange={(e) => updateDraft({ customerEmail: e.target.value })}
                      placeholder="bride@example.com"
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      Ceremony / Event Type
                    </label>
                    <select
                      value={draft.eventType}
                      onChange={(e) => updateDraft({ eventType: e.target.value as any })}
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    >
                      <option value="Wedding">Wedding / Bridal Day</option>
                      <option value="Sangeet / Mehendi Night">Sangeet / Mehendi Night</option>
                      <option value="Engagement">Engagement / Roka</option>
                      <option value="Eid / Festival">Eid / Festival</option>
                      <option value="Private Event">Private Party</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      Venue Address / Hotel Suite
                    </label>
                    <input
                      type="text"
                      value={draft.venueAddress}
                      onChange={(e) => updateDraft({ venueAddress: e.target.value })}
                      placeholder="e.g. Palace Downtown, Suite 402"
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={draft.venueCity}
                      onChange={(e) => updateDraft({ venueCity: e.target.value })}
                      placeholder="Dubai, London, etc."
                      className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">
                    Special Requests (e.g. Groom Initials, Pet Sketches, Lotus Motif)
                  </label>
                  <textarea
                    rows={3}
                    value={draft.specialNotes}
                    onChange={(e) => updateDraft({ specialNotes: e.target.value })}
                    placeholder="Tell the artist your story or specific elements you want included..."
                    className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>
            )}

            {/* =========================================================================
                STEP 4: PAYMENT & DEPOSIT
                ========================================================================= */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-1">
                    4. Secure Your Date with Deposit
                  </h3>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Pay a 25% escrow deposit (${deposit}) to lock in the artist. The remainder (${total - deposit}) is payable on the event day.
                  </p>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  {[
                    { id: 'card', title: 'Credit / Debit Card (Stripe Secured)', desc: 'Instant confirmation & digital invoice', icon: CreditCard },
                    { id: 'upi', title: 'Direct UPI / Bank Wire Transfer', desc: 'Popular for India & UAE bank apps', icon: Sparkles },
                    { id: 'cash', title: 'Cash on Event (Deposit Only)', desc: 'Pay 25% online now, rest in cash', icon: ShieldCheck },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => updateDraft({ paymentMethod: m.id as any })}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        draft.paymentMethod === m.id
                          ? 'border-[#064E3B] bg-[#ECFDF5]/60 dark:bg-[#06281F]/40 shadow-xs'
                          : 'border-[#EFE7DA] dark:border-[#1F362E]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${draft.paymentMethod === m.id ? 'border-[#064E3B] bg-[#064E3B]' : 'border-gray-300'}`}>
                          {draft.paymentMethod === m.id && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE]">{m.title}</p>
                          <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">{m.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock Card Input */}
                {draft.paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 block mb-1">Card Number</label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14241F] border border-[#EFE7DA] text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-1">Expiry</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14241F] border border-[#EFE7DA] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 block mb-1">CVC</label>
                        <input
                          type="text"
                          defaultValue="889"
                          className="w-full p-2.5 rounded-xl bg-white dark:bg-[#14241F] border border-[#EFE7DA] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =========================================================================
                STEP 5: CONFIRMATION & CELEBRATION
                ========================================================================= */}
            {step === 5 && confirmedBooking && (
              <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in-95 duration-300">
                
                <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#064E3B] dark:bg-[#06281F] dark:text-[#34D399] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-[#FEF9EE] text-[#9A7516] border border-[#C59B27]/40 text-xs font-bold uppercase tracking-wider">
                    🎉 Booking Confirmed & Guaranteed
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                    Your Bridal Appointment is Locked!
                  </h2>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                    Booking Reference ID: <strong className="font-mono text-[#064E3B] dark:text-[#E5C07B]">{confirmedBooking.bookingNumber}</strong>
                  </p>
                </div>

                {/* Printable Booking Voucher Receipt */}
                <div className="p-6 rounded-3xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-left space-y-4 max-w-lg mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-[#C59B27]" />
                      <span className="font-serif font-bold text-xs">ZARI & HENNA ATELIER</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">{new Date().toLocaleDateString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-gray-400">Master Artist:</p>
                      <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">{confirmedBooking.artistName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date & Slot:</p>
                      <p className="font-bold text-[#064E3B] dark:text-[#E5C07B]">{confirmedBooking.eventDate} ({confirmedBooking.eventTime})</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Package:</p>
                      <p className="font-bold">{confirmedBooking.packageName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Deposit Paid:</p>
                      <p className="font-bold text-[#10B981]">${confirmedBooking.depositAmount} USD</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EFE7DA] dark:border-[#1F362E] flex justify-between items-center text-xs">
                    <span className="text-gray-500">Balance Due on Event:</span>
                    <strong className="text-sm font-bold text-[#7A1C2D]">${confirmedBooking.balanceAmount} USD</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4 no-print">
                  <button
                    onClick={handlePrint}
                    className="px-5 py-2.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold flex items-center gap-1.5 hover:bg-black/5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Invoice</span>
                  </button>

                  <Link
                    to="/customer-dashboard"
                    className="px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22] transition-colors"
                  >
                    View in My Bookings →
                  </Link>
                </div>

              </div>
            )}

            {/* Bottom Wizard Controls */}
            {step <= 4 && (
              <div className="pt-6 border-t border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between no-print">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-full border border-[#EFE7DA] dark:border-[#1F362E] text-xs font-semibold text-[#5C6763] hover:bg-black/5 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#064E3B] to-[#0D6951] text-white text-xs font-bold hover:scale-[1.02] flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Proceed to {step === 1 ? 'Date & Time' : step === 2 ? 'Event Details' : 'Payment'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isProcessing}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] text-xs font-bold hover:scale-[1.02] flex items-center gap-2 shadow-xl transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isProcessing ? 'Confirming with Escrow...' : `Pay Deposit & Confirm ($${deposit})`}</span>
                  </button>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Right Sticky Order Summary Card */}
        {step <= 4 && (
          <aside className="lg:col-span-4 sticky top-24 no-print space-y-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-[#EFE7DA] dark:border-[#1F362E]">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C59B27]"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                    {artist.name}
                  </h4>
                  <p className="text-[11px] text-[#5C6763] dark:text-[#B2C2BC]">
                    {artist.city} • {artist.rating} ★
                  </p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2.5 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                <div className="flex justify-between">
                  <span>{draft.selectedPackage?.title || 'Package'}:</span>
                  <strong className="text-[#1A2421] dark:text-[#F8F5EE]">${packagePrice}</strong>
                </div>

                {draft.selectedAddOns.map(a => (
                  <div key={a.id} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[180px]">+ {a.title}</span>
                    <span>${a.price}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-[#EFE7DA] dark:border-[#1F362E] flex justify-between font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-base text-[#064E3B] dark:text-[#E5C07B]">${total}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/30 flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#9A7516] dark:text-[#E5C07B]">25% Deposit Due Today:</span>
                  <span className="font-bold text-[#064E3B] dark:text-[#E5C07B]">${deposit}</span>
                </div>
              </div>

              {/* Safety Badges */}
              <div className="pt-2 space-y-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-2 text-[#34D399]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Refundable up to 14 days before</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C59B27]" />
                  <span>Free VIP Bridal Aftercare Kit Included</span>
                </div>
              </div>

            </div>

          </aside>
        )}

      </div>

    </div>
  );
};
