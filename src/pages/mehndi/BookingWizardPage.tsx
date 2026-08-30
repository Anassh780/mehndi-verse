import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOCK_ARTISTS, STANDARD_ADDONS } from '@/services/mehndiData';
import { useBooking } from '@/context/BookingContext';
import { useMehndiAuth } from '@/context/MehndiAuthContext';
import { ServicePackage, AddOnOption, Booking } from '@/types/mehndi';

export const BookingWizardPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();
  const { user } = useMehndiAuth();
  const { 
    draft,
    step,
    confirmedBooking,
    selectArtistAndPackage,
    toggleAddOn,
    updateDraft,
    nextStep,
    prevStep,
    calculateTotal,
    submitBooking,
    resetBookingFlow
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize artist if none selected or if URL parameter provided
  React.useEffect(() => {
    if (artistId && (!draft.artist || draft.artist.id !== artistId)) {
      const found = MOCK_ARTISTS.find(a => a.id === artistId);
      if (found) {
        selectArtistAndPackage(found, found.packages[1] || found.packages[0]);
      }
    } else if (!draft.artist) {
      selectArtistAndPackage(MOCK_ARTISTS[0], MOCK_ARTISTS[0].packages[1] || MOCK_ARTISTS[0].packages[0]);
    }
  }, [artistId, draft.artist]);

  const pricing = calculateTotal();

  if (!draft.artist) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xs text-[#6B665F]">Loading atelier booking session...</p>
      </div>
    );
  }

  const handleFinalPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBooking();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Wizard Header */}
      {!confirmedBooking && (
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
            Date & Commission Reservation
          </span>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Reserve Your Bridal Session
          </h1>
          <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
            Master Artisan: <strong className="text-[#1C1A18] dark:text-[#F7F5F0]">{draft.artist.name}</strong> · {draft.artist.city}
          </p>

          {/* Clean Stepper */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {[
              { num: 1, label: 'Package' },
              { num: 2, label: 'Schedule' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Deposit' },
            ].map((st) => (
              <React.Fragment key={st.num}>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors ${
                      step === st.num
                        ? 'bg-[#1C1A18] text-white dark:bg-white dark:text-black'
                        : step > st.num
                        ? 'bg-[#385648] text-white'
                        : 'border border-[#E8E2D9] text-[#9E988F]'
                    }`}
                  >
                    {step > st.num ? <Check className="w-3.5 h-3.5" /> : st.num}
                  </div>
                  <span className="text-xs font-medium text-[#6B665F] hidden sm:inline">{st.label}</span>
                </div>
                {st.num < 4 && <div className="w-8 h-[1px] bg-[#E8E2D9] dark:bg-[#2A2724]" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Screen */}
      {confirmedBooking ? (
        <div className="max-w-2xl mx-auto editorial-card rounded-2xl p-8 sm:p-12 text-center space-y-6 animate-in fade-in duration-200">
          
          <div className="w-16 h-16 rounded-full bg-[#EEF4F0] text-[#385648] flex items-center justify-center mx-auto border border-[#C8DBD0]">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E5A3C]">
              Booking Confirmed & Escrow Protected
            </span>
            <h2 className="font-serif-editorial text-3xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              Your Bridal Date is Secured
            </h2>
            <p className="text-xs text-[#6B665F] dark:text-[#A8A298]">
              Confirmation voucher <strong>{confirmedBooking.bookingNumber || confirmedBooking.id}</strong> has been issued to {confirmedBooking.customerEmail || 'your email'}.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] text-left text-xs space-y-3">
            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#6B665F]">Master Artisan:</span>
              <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{confirmedBooking.artistName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#6B665F]">Ceremony Date:</span>
              <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{confirmedBooking.eventDate} ({confirmedBooking.eventTime})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#6B665F]">Selected Tier:</span>
              <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{confirmedBooking.packageName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EAE1]">
              <span className="text-[#6B665F]">Venue Location:</span>
              <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{confirmedBooking.venueAddress}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-[#6B665F]">25% Escrow Deposit Paid:</span>
              <span className="font-bold text-[#385648] dark:text-[#5E8C75]">${confirmedBooking.depositAmount} USD</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="btn-secondary w-full sm:w-auto"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice Voucher</span>
            </button>
            <Link
              to="/customer-dashboard"
              className="btn-primary w-full sm:w-auto"
            >
              <span>View in My Appointments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      ) : (
        /* Wizard Steps Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Step Form (Left 8 Cols) */}
          <div className="lg:col-span-8 editorial-card rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* STEP 1: SELECT PACKAGE & ADD-ONS */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    Select Commission Package
                  </h3>
                  <p className="text-xs text-[#6B665F]">Choose the baseline coverage for your ceremony.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {draft.artist.packages.map((pkg: ServicePackage) => (
                    <div
                      key={pkg.id}
                      onClick={() => selectArtistAndPackage(draft.artist!, pkg)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        draft.selectedPackage?.id === pkg.id
                          ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-[#FAF8F5] dark:bg-[#1C1A18] shadow-xs'
                          : 'border-[#E8E2D9] dark:border-[#2A2724] hover:border-gray-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E5A3C] block mb-1">
                        {pkg.tier}
                      </span>
                      <p className="font-serif-editorial text-base font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                        {pkg.title}
                      </p>
                      <p className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0] my-2">
                        ${pkg.price}
                      </p>
                      <p className="text-[11px] text-[#6B665F] line-clamp-2">{pkg.description}</p>
                    </div>
                  ))}
                </div>

                {/* Add-ons */}
                <div className="space-y-3 pt-6 border-t border-[#F0EAE1] dark:border-[#2A2724]">
                  <h4 className="font-serif-editorial text-lg font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    Optional Bridal Add-ons
                  </h4>
                  <div className="space-y-2">
                    {STANDARD_ADDONS.map((addon: AddOnOption) => {
                      const isSelected = draft.selectedAddOns.some((a: AddOnOption) => a.id === addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-[#FAF8F5] dark:bg-[#1C1A18]'
                              : 'border-[#E8E2D9] dark:border-[#2A2724]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#1C1A18] text-white' : 'border-[#D1C9BC]'}`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{addon.title}</p>
                              <p className="text-[11px] text-[#6B665F]">{addon.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">+${addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={nextStep} className="btn-primary">
                    <span>Continue to Schedule</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    Select Ceremony Date & Time
                  </h3>
                  <p className="text-xs text-[#6B665F]">Choose the date for your bridal application session.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Ceremony Date
                    </label>
                    <input
                      type="date"
                      required
                      value={draft.eventDate}
                      onChange={(e) => updateDraft({ eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Preferred Start Time
                    </label>
                    <select
                      value={draft.eventTime}
                      onChange={(e) => updateDraft({ eventTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    >
                      <option value="10:00 AM">10:00 AM (Morning Session)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon Session)</option>
                      <option value="06:00 PM">06:00 PM (Evening Sangeet Session)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#EEF4F0] border border-[#C8DBD0] text-xs text-[#385648] flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Pro Tip: Schedule application 48 hours before your main reception for peak mahogany color.</span>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={prevStep} className="btn-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button onClick={nextStep} className="btn-primary">
                    <span>Continue to Venue Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: VENUE & CONTACT */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    Venue & Contact Details
                  </h3>
                  <p className="text-xs text-[#6B665F]">Where will the artist travel to for the commission?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Venue / Hotel Suite Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Burj Al Arab Suite 402, Jumeirah, Dubai"
                      value={draft.venueAddress}
                      onChange={(e) => updateDraft({ venueAddress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bride or Planner Name"
                      value={draft.customerName || user?.name || ''}
                      onChange={(e) => updateDraft({ customerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={draft.customerPhone}
                      onChange={(e) => updateDraft({ customerPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                      Special Requests / Hidden Initials
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific motifs, couple initials, portrait requests, or skin sensitivities..."
                      value={draft.specialNotes}
                      onChange={(e) => updateDraft({ specialNotes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-xs text-[#1C1A18] dark:text-[#F7F5F0] bg-white dark:bg-[#141312] focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={prevStep} className="btn-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button onClick={nextStep} className="btn-primary">
                    <span>Continue to Escrow Deposit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT & DEPOSIT */}
            {step === 4 && (
              <form onSubmit={handleFinalPayment} className="space-y-6">
                <div>
                  <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                    25% Escrow Date Deposit
                  </h3>
                  <p className="text-xs text-[#6B665F]">Your date is reserved immediately. Balance due on ceremony day.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B665F]">Package Baseline:</span>
                    <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">${pricing.packagePrice} USD</span>
                  </div>
                  {pricing.addOnsTotal > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6B665F]">Add-ons Total:</span>
                      <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">+${pricing.addOnsTotal} USD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs pt-2 border-t border-[#E8E2D9]">
                    <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">Total Commission:</span>
                    <span className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">${pricing.total} USD</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#385648] dark:text-[#5E8C75] pt-2 border-t border-[#E8E2D9]">
                    <span>25% Escrow Deposit Due Now:</span>
                    <span>${pricing.deposit} USD</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1A18] dark:text-[#F7F5F0] block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateDraft({ paymentMethod: 'card' })}
                      className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        draft.paymentMethod === 'card' ? 'border-[#1C1A18] bg-white dark:bg-[#1C1A18]' : 'border-[#E8E2D9]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateDraft({ paymentMethod: 'upi' })}
                      className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        draft.paymentMethod === 'upi' ? 'border-[#1C1A18] bg-white dark:bg-[#1C1A18]' : 'border-[#E8E2D9]'
                      }`}
                    >
                      <span>UPI / Wire / Cash</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={prevStep} className="btn-secondary">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary !py-3 !px-8"
                  >
                    <span>{isSubmitting ? 'Securing Slot...' : `Authorize $${pricing.deposit} Deposit`}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Sidebar Summary (Right 4 Cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center gap-3 pb-4 border-b border-[#F0EAE1] dark:border-[#2A2724]">
              <img
                src={draft.artist.avatar}
                alt={draft.artist.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E8E2D9]"
              />
              <div>
                <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{draft.artist.name}</p>
                <p className="text-[11px] text-[#6B665F]">{draft.artist.city} · {draft.artist.rating} ★</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B665F]">Tier:</span>
                <span className="font-semibold text-[#1C1A18] dark:text-[#F7F5F0]">{draft.selectedPackage?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B665F]">Date:</span>
                <span className="font-semibold text-[#1C1A18] dark:text-[#F7F5F0]">{draft.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B665F]">Duration:</span>
                <span className="font-semibold text-[#1C1A18] dark:text-[#F7F5F0]">~{Math.round((draft.selectedPackage?.durationMinutes || 240) / 60)} hrs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#385648] dark:text-[#5E8C75] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Escrow Date Guarantee</span>
              </div>
              <p className="text-[11px] text-[#6B665F] leading-relaxed">
                Deposit remains protected until artist arrives on ceremony day. 100% natural organic henna cones included.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
