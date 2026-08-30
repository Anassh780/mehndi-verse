import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Bridal Commission Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 5000);
  };

  const faqs = [
    {
      q: 'How does Zari & Henna protect my booking deposit?',
      a: 'All booking deposits (25%) are held in our secure escrow vault. Funds are only disbursed to the artist after your wedding appointment is successfully completed.'
    },
    {
      q: 'When should I schedule my bridal henna application?',
      a: 'We recommend applying your bridal henna 48 hours prior to your primary ceremony. Natural organic henna takes 24 to 48 hours to oxidize into its deepest, richest mahogany-burgundy tone.'
    },
    {
      q: 'Are all artists guaranteed to use organic chemical-free henna?',
      a: 'Yes. Every verified atelier on Zari & Henna is legally bound to our Zero-Chemical Botanical Covenant, using only certified organic Rajasthani Sojat paste with 0% PPD dyes.'
    },
    {
      q: 'Can artists travel for destination weddings?',
      a: 'Absolutely. Most master ateliers on our marketplace are available for destination travel worldwide across Europe, the Middle East, North America, and South Asia.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-28">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c4221] block">
          Concierge & Inquiries
        </span>
        <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#1b1815]">
          Connect with the Atelier
        </h1>
        <p className="text-xs sm:text-sm text-[#2c2620]/75">
          Dedicated concierge assistance for brides, planners, and prospective atelier artists.
        </p>
      </div>

      {/* Grid: Form + Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 card rounded-3xl p-6 sm:p-10 bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">Send a Direct Inquiry</h2>
            <p className="text-xs text-[#2c2620]/75">Our bridal concierge responds within 4 business hours.</p>
          </div>

          {sent && (
            <div className="p-4 rounded-xl bg-[#efe6d4] border border-[#6b7752] text-[#6b7752] text-xs flex items-center gap-2 font-semibold animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Your inquiry has been received. Our concierge will be in touch shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Suhana Patel"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="bride@luxurywedding.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              >
                <option value="Bridal Commission Inquiry">Bridal Commission Inquiry</option>
                <option value="Destination Wedding Booking">Destination Wedding Booking</option>
                <option value="Artist Atelier Application">Artist Atelier Application</option>
                <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider block text-[#1b1815]">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide event dates, destination venue, or custom requirements..."
                className="w-full px-4 py-2.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] text-[#1b1815] focus:outline-none focus:border-[#9c4221]"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full !py-3">
              <span>Send Message to Concierge</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right: Studio Hubs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card rounded-3xl p-6 sm:p-8 bg-[#efe6d4] border border-[rgba(27,24,21,0.12)] space-y-6">
            <h3 className="font-serif-editorial text-xl font-bold text-[#1b1815]">Global Atelier Hubs</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9c4221] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1b1815]">Dubai Headquarters</p>
                  <p className="text-[#2c2620]/70">DIFC Gate Precinct, Building 4, Dubai, UAE</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#9c4221] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1b1815]">London Office</p>
                  <p className="text-[#2c2620]/70">Berkeley Square, Mayfair, London W1J, UK</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#9c4221] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1b1815]">Direct Concierge</p>
                  <p className="text-[#2c2620]/70">concierge@zarihenna.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="space-y-6 max-w-3xl mx-auto pt-8">
        <h2 className="font-serif-editorial text-3xl font-bold text-center text-[#1b1815]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="card rounded-2xl overflow-hidden bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left text-xs font-bold text-[#1b1815] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#9c4221] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#2c2620]/80 font-sans leading-relaxed border-t border-[rgba(27,24,21,0.08)] pt-3">
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
