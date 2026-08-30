import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, Check, Sparkles, Crown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How far in advance should I book my bridal Mehndi artist?',
      a: 'We strongly recommend booking 3 to 6 months in advance for peak wedding months (October through April). For destination weddings in Dubai, London, or Udaipur, 6 to 9 months advance notice is recommended.',
    },
    {
      q: 'How does the deposit and payment guarantee work?',
      a: 'When you book an artist through Zari & Henna, you pay a 25% deposit that is held securely in escrow. The remaining 75% balance is payable directly to the artist on your ceremony day.',
    },
    {
      q: 'Are all artists verified to use 100% natural, chemical-free henna?',
      a: 'Yes. Every artist listed on our platform signs our Strict Organic Guarantee. They use triple-sifted natural henna leaves infused with pure essential oils (eucalyptus, lavender, tea tree). Chemical black dyes and PPD additives are strictly banned.',
    },
    {
      q: 'Can artists travel to international destination wedding venues?',
      a: 'Yes! Most of our master artists travel internationally for destination weddings across Dubai, Italy, France, Mexico, Bali, and the Caribbean. Travel and accommodation packages can be coordinated via our VIP Concierge.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF9EE] dark:bg-[#282010] border border-[#C59B27]/40 text-[#9A7516] dark:text-[#E5C07B] text-xs font-semibold uppercase tracking-widest">
          <Crown className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>VIP Concierge Support</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
          Connect with Our Bridal Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6763] dark:text-[#B2C2BC]">
          Have questions regarding destination wedding packages, artist availability, or bespoke bridal consultations? Our team is available 7 days a week.
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Card */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
            Send an Inquiry
          </h2>

          {formSent ? (
            <div className="p-8 rounded-2xl bg-[#ECFDF5] text-[#064E3B] border border-[#10B981]/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="font-serif text-xl font-bold">Inquiry Received!</h3>
              <p className="text-xs text-[#064E3B]/80 max-w-sm mx-auto">
                Our VIP Bridal Concierge will review your event details and respond within 2-4 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Bride / Planner Name"
                    className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="bride@example.com"
                    className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+971 50 000 0000"
                    className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Wedding City / Country</label>
                  <input
                    type="text"
                    placeholder="Dubai, London, Jaipur, etc."
                    className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A2421] dark:text-[#F8F5EE] block mb-1">Message / Consultation Needs</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your wedding date, desired style, or questions..."
                  className="w-full p-3 rounded-2xl bg-[#F8F4EB] dark:bg-[#07100D] border border-[#EFE7DA] dark:border-[#1F362E] text-xs text-[#1A2421] dark:text-[#F8F5EE] focus:outline-none focus:border-[#C59B27]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#064E3B] text-white font-bold text-xs hover:bg-[#022C22] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Submit Inquiry to Concierge</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct WhatsApp Concierge Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white border border-[#C59B27]/40 shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base">Direct WhatsApp Line</h3>
                <p className="text-[11px] text-emerald-200">Instant Bridal Support & Scheduling</p>
              </div>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              Prefer instant messaging? Chat directly with our bridal concierge team on WhatsApp for real-time artist availability checks.
            </p>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors"
            >
              Open WhatsApp Concierge →
            </a>
          </div>

          {/* Global Atelier Hubs */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A2421] dark:text-[#F8F5EE]">
              Global Headquarters & Studios
            </h3>
            <div className="space-y-3 text-xs text-[#5C6763] dark:text-[#B2C2BC]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">Dubai Hub</p>
                  <p>Boulevard Plaza Tower 1, Downtown Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">London Studio</p>
                  <p>Berkeley Square House, Mayfair, London W1J 6BD, UK</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1A2421] dark:text-[#F8F5EE]">Delhi NCR Office</p>
                  <p>Aerocity Worldmark, New Delhi 110037, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto space-y-6 pt-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[#1A2421] dark:text-[#F8F5EE]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] cursor-pointer"
                onClick={() => setOpenFaqIndex(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif font-bold text-sm text-[#1A2421] dark:text-[#F8F5EE]">{faq.q}</h3>
                  <ChevronDown className={`w-4 h-4 text-[#C59B27] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] pt-3 leading-relaxed border-t border-[#EFE7DA] dark:border-[#1F362E] mt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
