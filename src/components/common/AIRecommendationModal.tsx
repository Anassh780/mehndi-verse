import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, ArrowLeft, Check, Star } from 'lucide-react';
import { AIQuizPreferences, AIRecommendationResult } from '@/types/mehndi';
import { getAIRecommendation } from '@/services/aiRecommendationService';
import { useNavigate } from 'react-router-dom';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<AIQuizPreferences>({
    eventType: 'Wedding',
    handCoverage: 'Elbow High',
    designStyle: 'Undecided / Recommend for me',
    outfitColor: 'Ruby Red / Maroon',
    intricacyLevel: 'Dense Traditional Jali & Figures',
    budgetMax: 650,
    city: 'All Cities',
  });
  const [result, setResult] = useState<AIRecommendationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const rec = getAIRecommendation(preferences);
      setResult(rec);
      setIsCalculating(false);
      setStep(5);
    }, 800);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  const handleBookArtist = (artistId: string) => {
    onClose();
    navigate(`/book/${artistId}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8E2D9] dark:border-[#2A2724] rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#E8E2D9] dark:border-[#2A2724] flex items-center justify-between bg-white dark:bg-[#1C1A18]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8E5A3C] block mb-1">
              Atelier Consultation
            </span>
            <h3 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
              AI Bridal Style Advisor
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B665F] hover:text-[#1C1A18] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {step <= 4 && (
            <div className="mb-6 space-y-2">
              <div className="flex justify-between text-xs text-[#6B665F] dark:text-[#A8A298] font-medium">
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Occasion' : step === 2 ? 'Coverage' : step === 3 ? 'Gown Tone' : 'Intricacy'}</span>
              </div>
              <div className="w-full h-1 bg-[#E8E2D9] dark:bg-[#2A2724] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1C1A18] dark:bg-[#F7F5F0] transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Occasion */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                What ceremony are you commissioning for?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Wedding', title: 'Main Bridal Ceremony', desc: 'Full regal storytelling coverage & portraits' },
                  { id: 'Sangeet / Mehendi Night', title: 'Sangeet & Party Henna', desc: 'Festive, quick-drying party elegance' },
                  { id: 'Engagement', title: 'Engagement / Roka', desc: 'Modern cuffs, minimal jewelry rings' },
                  { id: 'Eid / Festival', title: 'Eid / Festival Celebrations', desc: 'Graceful festive mandalas & vines' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, eventType: item.id })}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      preferences.eventType === item.id
                        ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-white dark:bg-[#1C1A18]'
                        : 'border-[#E8E2D9] dark:border-[#2A2724] hover:border-gray-400'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#1C1A18] dark:text-[#F7F5F0]">{item.title}</p>
                    <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Coverage */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                What level of coverage do you envision?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Full Bridal Set (Hands + Feet)', title: 'Full Heirloom Suite', desc: 'Hands past elbows + feet to mid-calf' },
                  { id: 'Elbow High', title: 'Elbow-Length Grandeur', desc: 'Both sides of hands up to the elbow' },
                  { id: 'Forearm', title: 'Forearm to Wrist', desc: 'Classic mid-coverage, highly versatile' },
                  { id: 'Palms Only', title: 'Palms & Delicate Cuffs', desc: 'Subtle jewel accents & finger rings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, handCoverage: item.id })}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      preferences.handCoverage === item.id
                        ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-white dark:bg-[#1C1A18]'
                        : 'border-[#E8E2D9] dark:border-[#2A2724] hover:border-gray-400'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#1C1A18] dark:text-[#F7F5F0]">{item.title}</p>
                    <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Outfit Tone */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                What is the dominant tone of your wedding attire?
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Ruby Red / Maroon', color: '#7A1C2D' },
                  { id: 'Emerald Green', color: '#064E3B' },
                  { id: 'Champagne Gold / Ivory', color: '#C59B27' },
                  { id: 'Pastel Pink / Peach', color: '#E8A598' },
                  { id: 'Royal Navy / Velvet Blue', color: '#1E3A8A' },
                  { id: 'Mustard / Yellow', color: '#D97706' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, outfitColor: item.id })}
                    className={`p-3.5 rounded-xl text-center border flex flex-col items-center gap-2 transition-all ${
                      preferences.outfitColor === item.id
                        ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-white dark:bg-[#1C1A18]'
                        : 'border-[#E8E2D9] dark:border-[#2A2724]'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border border-black/20" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-semibold text-[#1C1A18] dark:text-[#F7F5F0]">{item.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Intricacy */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-serif-editorial text-xl font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                Select artistic intricacy
              </h4>
              <div className="space-y-3">
                {[
                  { id: 'Dense Traditional Jali & Figures', title: 'Dense Symmetrical Jaal & Storytelling', desc: 'Ultra-fine mesh lattice, couple portraits, royal peacocks, and hidden dates' },
                  { id: 'Bold & Arabic Cut', title: 'Bold Arabic & Negative Space', desc: 'High-contrast negative skin space, flowing vines, and dramatic shaded petals' },
                  { id: 'Delicate & Fine lines', title: 'Contemporary Minimalist Lace', desc: 'Delicate jewelry draping, focal solar mandalas, and clean architectural lines' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, intricacyLevel: item.id as any })}
                    className={`w-full p-4 rounded-xl text-left border transition-all ${
                      preferences.intricacyLevel === item.id
                        ? 'border-[#1C1A18] dark:border-[#F7F5F0] bg-white dark:bg-[#1C1A18]'
                        : 'border-[#E8E2D9] dark:border-[#2A2724]'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#1C1A18] dark:text-[#F7F5F0]">{item.title}</p>
                    <p className="text-[11px] text-[#6B665F] dark:text-[#A8A298] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {step === 5 && result && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl bg-[#1C1A18] text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">
                  Recommended Tradition
                </span>
                <h4 className="font-serif-editorial text-2xl font-bold">
                  {result.recommendedStyle}
                </h4>
                <p className="text-xs text-[#A8A298] leading-relaxed">
                  {result.styleDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E5A3C]">Pattern Advice</p>
                  <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">{result.curatedPatternAdvice}</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E5A3C]">Gown Harmony</p>
                  <p className="text-xs text-[#6B665F] dark:text-[#A8A298] leading-relaxed">{result.outfitHarmonyTip}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-serif-editorial text-base font-bold text-[#1C1A18] dark:text-[#F7F5F0]">
                  Matched Master Artisans:
                </p>
                {result.matchedArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#1C1A18] border border-[#E8E2D9] dark:border-[#2A2724] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img src={artist.avatar} alt={artist.name} className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9]" />
                      <div>
                        <p className="text-xs font-bold text-[#1C1A18] dark:text-[#F7F5F0]">{artist.name}</p>
                        <p className="text-[11px] text-[#6B665F]">{artist.city} · {artist.rating} ★</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookArtist(artist.id)}
                      className="btn-primary !py-1.5 !px-3.5 !text-[11px]"
                    >
                      Reserve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-[#E8E2D9] dark:border-[#2A2724] bg-white dark:bg-[#1C1A18] flex items-center justify-between">
          {step <= 4 ? (
            <>
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary !py-2 !px-4 !text-[11px]"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn-primary !py-2 !px-5 !text-[11px]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isCalculating}
                  className="btn-primary !py-2 !px-6 !text-[11px]"
                >
                  <span>{isCalculating ? 'Consulting...' : 'View Recommendations'}</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button onClick={handleReset} className="text-xs text-[#6B665F] hover:underline">
                ← Retake Consultation
              </button>
              <button onClick={onClose} className="btn-primary !py-2 !px-5 !text-[11px]">
                Browse Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
