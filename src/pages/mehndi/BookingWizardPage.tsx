import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { MOCK_ARTISTS, STANDARD_ADDONS } from '@/services/mehndiData';
import confetti from 'canvas-confetti';

export const BookingWizardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
    calculateTotal, 
    submitBooking, 
    resetBookingFlow 
  } = useBooking();

  const artist = draft.artist || MOCK_ARTISTS.find((a) => a.id === id) || MOCK_ARTISTS[0];

  const [date, setDate] = useState(draft.eventDate || '2026-09-15');
  const [time, setTime] = useState(draft.eventTime || '10:00 AM');
  const [eventType, setEventType] = useState(draft.eventType || 'Wedding');
  const [venue, setVenue] = useState(draft.venueAddress || 'Palace Downtown, Suite 402, Dubai');
  const [name, setName] = useState(draft.customerName || 'Suhana Patel');
  const [email, setEmail] = useState(draft.customerEmail || 'suhana.patel@gmail.com');
  const [phone, setPhone] = useState(draft.customerPhone || '+1 (555) 234-5678');
  const [notes, setNotes] = useState(draft.specialNotes || 'Please incorporate groom initials into palm design.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { total, deposit } = calculateTotal();

  const handlePackagePick = (pkg: any) => {
    selectArtistAndPackage(artist, pkg);
    nextStep();
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDraft({ eventDate: date, eventTime: time, eventType });
    nextStep();
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDraft({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      venueAddress: venue,
      specialNotes: notes
    });
    nextStep();
  };

  const handleFinalAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitBooking();
      setIsSubmitting(false);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-32">
      
      {/* Editorial Header */}
      <div className="space-y-2 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
          Bridal Atelier Commission Protocol
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#1b1815]">
          Reserve Your Wedding Session
        </h1>
        <p className="text-xs text-[#2c2620]/75">
          Commissioning <strong>{artist.name}</strong> · 100% Escrow Protected Booking
        </p>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 pt-2">
        {[
          { num: 1, label: 'Tier & Add-Ons' },
          { num: 2, label: 'Date & Time' },
          { num: 3, label: 'Venue Specs' },
          { num: 4, label: 'Escrow Lock' },
        ].map((s) => (
          <div key={s.num} className="space-y-1.5 text-center">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                step >= s.num ? 'bg-[#9c4221]' : 'bg-[rgba(27,24,21,0.12)]'
              }`}
            />
            <span className={`text-[10px] uppercase font-bold tracking-wider hidden sm:block ${
              step >= s.num ? 'text-[#1b1815]' : 'text-[#2c2620]/50'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* CONFIRMATION SCREEN (STEP 5) */}
      {confirmedBooking && (
        <div className="card rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#efe6d4] text-[#6b7752] mx-auto flex items-center justify-center border border-[rgba(27,24,21,0.12)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="badge">
              <span>Escrow Deposit Confirmed</span>
            </span>
            <h2 className="font-serif-editorial text-3xl font-bold text-[#1b1815]">
              Your Bridal Date is Locked
            </h2>
            <p className="text-xs text-[#2c2620]/80 max-w-md mx-auto leading-relaxed">
              Voucher <strong>#{confirmedBooking.bookingNumber}</strong> has been issued. {artist.name} has been notified and will prepare custom sketches for your wedding date.
            </p>
          </div>

          <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#efe6d4] border border-[rgba(27,24,21,0.1)] text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-[#2c2620]/70">Package Tier:</span>
              <span className="font-bold text-[#1b1815]">{confirmedBooking.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2c2620]/70">Ceremony Date:</span>
              <span className="font-bold text-[#1b1815]">{confirmedBooking.eventDate} ({confirmedBooking.eventTime})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2c2620]/70">Venue:</span>
              <span className="font-bold text-[#1b1815] truncate max-w-[200px]">{confirmedBooking.venueAddress}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[rgba(27,24,21,0.1)]">
              <span className="text-[#2c2620]/70">Escrow Deposit Paid:</span>
              <span className="font-bold text-[#6b7752]">${confirmedBooking.depositAmount} USD</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="btn btn-ghost !py-2.5 !px-5 !text-xs flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Voucher</span>
            </button>
            <Link
              to="/customer-dashboard"
              className="btn btn-primary !py-2.5 !px-6 !text-xs"
            >
              <span>Go to Bridal Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* STEP 1: PACKAGE & ADD-ONS */}
      {!confirmedBooking && step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Select Bridal Package Tier</h3>
            <p className="text-xs text-[#2c2620]/75">Choose your desired level of skin coverage and figurative intricacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artist.packages.map((pkg) => {
              const isSelected = draft.selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => selectArtistAndPackage(artist, pkg)}
                  className={`card p-5 rounded-2xl cursor-pointer transition-all space-y-3 ${
                    isSelected
                      ? 'bg-[#efe6d4] border-[#9c4221] ring-1 ring-[#9c4221]'
                      : 'bg-[#f7f1e6] border-[rgba(27,24,21,0.12)]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif-editorial font-bold text-lg text-[#1b1815]">{pkg.title}</h4>
                    {isSelected && <Check className="w-4 h-4 text-[#9c4221]" />}
                  </div>
                  <p className="font-serif-editorial text-2xl font-bold text-[#1b1815]">${pkg.price}</p>
                  <p className="text-xs text-[#2c2620]/75">{pkg.description}</p>
                </div>
              );
            })}
          </div>

          {/* Add-Ons */}
          <div className="space-y-3 pt-4 border-t border-[rgba(27,24,21,0.1)]">
            <h4 className="font-serif-editorial text-lg font-bold text-[#1b1815]">Optional Botanical Add-Ons</h4>
            <div className="space-y-2">
              {STANDARD_ADDONS.map((addon) => {
                const isSelected = draft.selectedAddOns.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                      isSelected ? 'border-[#9c4221] bg-[#efe6d4]' : 'border-[rgba(27,24,21,0.12)] bg-[#f7f1e6]'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-[#1b1815]">{addon.title}</p>
                      <p className="text-[11px] text-[#2c2620]/70">{addon.description}</p>
                    </div>
                    <span className="font-bold text-[#9c4221]">+${addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button onClick={nextStep} className="btn btn-primary">
              <span>Continue to Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DATE & TIME */}
      {!confirmedBooking && step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Ceremony Schedule</h3>
            <p className="text-xs text-[#2c2620]/75">Select the ideal date for your bridal session.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Event Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Session Start Time</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              >
                <option value="09:00 AM">09:00 AM (Morning Session)</option>
                <option value="12:00 PM">12:00 PM (Midday Session)</option>
                <option value="03:00 PM">03:00 PM (Afternoon Session)</option>
                <option value="06:00 PM">06:00 PM (Evening Sangeet)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={prevStep} className="btn btn-ghost">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button type="submit" className="btn btn-primary">
              <span>Continue to Venue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: VENUE & CONTACT */}
      {!confirmedBooking && step === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Venue & Bridal Details</h3>
            <p className="text-xs text-[#2c2620]/75">Where will the artist travel for your session?</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Venue / Suite Address</label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Special Motif Notes / Initials</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815]"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={prevStep} className="btn btn-ghost">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button type="submit" className="btn btn-primary">
              <span>Review & Escrow Lock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: ESCROW AUTHORIZE */}
      {!confirmedBooking && step === 4 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Authorize Escrow Deposit</h3>
            <p className="text-xs text-[#2c2620]/75">Your 25% deposit is held in escrow until your bridal session completes.</p>
          </div>

          {/* Breakdown Card */}
          <div className="p-6 rounded-2xl bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[#2c2620]/70">Package ({draft.selectedPackage?.title}):</span>
              <span className="font-bold text-[#1b1815]">${draft.selectedPackage?.price} USD</span>
            </div>
            {draft.selectedAddOns.map(a => (
              <div key={a.id} className="flex justify-between">
                <span className="text-[#2c2620]/70">+ {a.title}:</span>
                <span className="font-bold text-[#1b1815]">${a.price} USD</span>
              </div>
            ))}
            <div className="pt-2 border-t border-[rgba(27,24,21,0.1)] flex justify-between text-sm">
              <span className="font-bold text-[#1b1815]">Total Commission:</span>
              <span className="font-serif-editorial font-bold text-lg text-[#1b1815]">${total} USD</span>
            </div>
            <div className="p-3 rounded-xl bg-[#f7f1e6] border border-[rgba(27,24,21,0.1)] flex justify-between font-bold">
              <span className="text-[#9c4221]">25% Escrow Deposit Due Now:</span>
              <span className="text-[#9c4221]">${deposit} USD</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" onClick={prevStep} className="btn btn-ghost">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleFinalAuthorize}
              disabled={isSubmitting}
              className="btn btn-primary !py-3 !px-8"
            >
              <span>{isSubmitting ? 'Locking Escrow...' : `Authorize $${deposit} Deposit`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
