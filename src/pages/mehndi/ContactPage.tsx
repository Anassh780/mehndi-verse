import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How far in advance should I book my bridal mehndi artist?',
      a: 'We strongly recommend reserving 4 to 8 months in advance, especially for autumn/winter peak wedding seasons in Dubai, London, and Delhi.'
    },
    {
      q: 'How do I ensure the darkest possible stain for wedding photos?',
      a: 'Our artisans recommend scheduling application 48 hours prior to your main reception. Keep paste on for 6-8 hours with lemon-sugar sealant, avoid water for the first 24 hours, and apply coconut oil before showering.'
    },
    {
      q: 'Are destination travel fees included in package prices?',
      a: 'Package prices cover regional travel within the artist’s home hub city. For international destination commissions, travel flights and lodging are coordinated directly upon booking confirmation.'
    },
    {
      q: 'Is the 25% date deposit refundable if my date shifts?',
      a: 'Escrow date deposits are transferable to new dates with 30+ days notice, subject to the artist’s calendar availability.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8E5A3C] block">
          Client Concierge & Inquiries
        </span>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
          Contact the Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#6B665F] dark:text-[#A8A298]">
          Have questions regarding destination bookings, bespoke bridal party sizing, or botanical standards? Our concierge team is at your service.
        </p>
      </div>

      {/* Grid: Form + Hubs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form (7 Cols) */}
        <div className="lg:col-span-7 editorial-card rounded-2xl p-6 sm:p-10 space-y-6">
          <h3 className="font-serif-editorial text-2xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
            Send an Atelier Inquiry
          </h3>

          {submitted ? (
            <div className="p-8 text-center rounded-xl bg-[#EEF4F0] border border-[#C8DBD0] space-y-3">
              <Check className="w-8 h-8 text-[#385648] mx-auto" />
              <h4 className="font-serif-editorial font-bold text-lg text-[#1C1A18]">Inquiry Transmitted</h4>
              <p className="text-xs text-[#6B665F]">Our bridal concierge team will respond within 4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider block text-[#1C1A18] dark:text-[#F7F5F0]">Your Name</label>
                  <input type="text" required placeholder="Suhana Patel" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider block text-[#1C1A18] dark:text-[#F7F5F0]">Email</label>
                  <input type="email" required placeholder="suhana@example.com" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1C1A18] dark:text-[#F7F5F0]">Wedding Destination City & Date</label>
                <input type="text" required placeholder="e.g. Dubai, UAE · November 2026" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider block text-[#1C1A18] dark:text-[#F7F5F0]">Inquiry Details</label>
                <textarea rows={4} required placeholder="Please describe your bridal needs, guest count, or questions..." className="w-full px-4 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] dark:bg-[#141312]" />
              </div>

              <button type="submit" className="btn-primary !py-3 !px-8">
                Transmit Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Global Hubs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="editorial-card rounded-2xl p-6 space-y-4">
            <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              Global Atelier Hubs
            </h3>
            <div className="space-y-3 text-xs text-[#6B665F] dark:text-[#A8A298]">
              <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9]">
                <p className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">Dubai Atelier</p>
                <p>Downtown Dubai & Palm Jumeirah Concierge</p>
                <p className="text-[11px] text-[#8E5A3C] mt-1">+971 4 800 HENNA</p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9]">
                <p className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">London Atelier</p>
                <p>Mayfair & Knightsbridge Concierge</p>
                <p className="text-[11px] text-[#8E5A3C] mt-1">+44 20 7946 0991</p>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9]">
                <p className="font-bold text-[#1C1A18] dark:text-[#F7F5F0]">New York Atelier</p>
                <p>Manhattan & Tri-State Concierge</p>
                <p className="text-[11px] text-[#8E5A3C] mt-1">+1 212 555 0198</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6 pt-12">
        <h3 className="font-serif-editorial text-2xl font-bold text-center text-[#1C1A18] dark:text-[#F7F5F0]">
          Frequently Addressed Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="editorial-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4 text-left text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0] flex justify-between items-center"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaqIndex === i && (
                <div className="p-4 pt-0 text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed border-t border-[#F0EAE1]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
