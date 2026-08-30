import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, ArrowLeft, Check, Compass, Star, Calendar } from 'lucide-react';
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
      setStep(5); // Result screen
    }, 1000);
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#07100D] border border-[#C59B27]/40 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between bg-[#FEF9EE] dark:bg-[#0E1A16]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#064E3B] to-[#C59B27] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#064E3B] dark:text-[#E5C07B]">
                AI Bridal Mehndi Consultant
              </h3>
              <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">
                Personalized design recommendations tailored to your wedding lehenga & vibe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* Step Progress Bar */}
          {step <= 4 && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-[#5C6763] dark:text-[#B2C2BC] mb-2 font-medium">
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Ceremony Type' : step === 2 ? 'Hand Coverage' : step === 3 ? 'Outfit Palette' : 'Intricacy & Vibe'}</span>
              </div>
              <div className="w-full h-1.5 bg-[#EFE7DA] dark:bg-[#1F362E] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#064E3B] to-[#C59B27] transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Ceremony Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                What occasion are you preparing for?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Wedding', title: 'Main Wedding / Bridal Day', desc: 'Full regal storytelling coverage & portraits' },
                  { id: 'Sangeet / Mehendi Night', title: 'Sangeet & Mehendi Night', desc: 'Festive, quick-drying party elegance' },
                  { id: 'Engagement', title: 'Engagement / Roka', desc: 'Modern cuffs, minimal jewelry rings' },
                  { id: 'Eid / Festival', title: 'Eid / Diwali / Festival', desc: 'Graceful festive mandalas & vines' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, eventType: item.id })}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      preferences.eventType === item.id
                        ? 'border-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010] shadow-sm'
                        : 'border-[#EFE7DA] dark:border-[#1F362E] hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <p className="font-semibold text-sm text-[#1A2421] dark:text-[#F8F5EE]">{item.title}</p>
                    <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Hand Coverage */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                How much coverage do you desire?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Full Bridal Set (Hands + Feet)', title: 'Full Bridal Heirloom Set', desc: 'Hands past elbows + feet to mid-calf' },
                  { id: 'Elbow High', title: 'Elbow-Length Grandeur', desc: 'Both sides of hands up to the elbow' },
                  { id: 'Forearm', title: 'Forearm to Wrist', desc: 'Classic mid-coverage, highly versatile' },
                  { id: 'Palms Only', title: 'Palms & Delicate Cuffs', desc: 'Subtle jewel accents & finger rings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, handCoverage: item.id })}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      preferences.handCoverage === item.id
                        ? 'border-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010] shadow-sm'
                        : 'border-[#EFE7DA] dark:border-[#1F362E] hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <p className="font-semibold text-sm text-[#1A2421] dark:text-[#F8F5EE]">{item.title}</p>
                    <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Outfit Color */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                What is the dominant color of your wedding attire?
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Ruby Red / Maroon', color: '#7A1C2D' },
                  { id: 'Emerald Green', color: '#064E3B' },
                  { id: 'Champagne Gold / Ivory', color: '#D4AF37' },
                  { id: 'Pastel Pink / Peach', color: '#E8A598' },
                  { id: 'Royal Navy / Velvet Blue', color: '#1E3A8A' },
                  { id: 'Mustard / Yellow', color: '#D97706' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, outfitColor: item.id })}
                    className={`p-3.5 rounded-2xl text-center border flex flex-col items-center gap-2 transition-all ${
                      preferences.outfitColor === item.id
                        ? 'border-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010] shadow-sm'
                        : 'border-[#EFE7DA] dark:border-[#1F362E]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full shadow-inner border border-white/40"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-semibold text-[#1A2421] dark:text-[#F8F5EE]">{item.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Intricacy & Style */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1A2421] dark:text-[#F8F5EE]">
                What artistic intricacy do you prefer?
              </h4>
              <div className="space-y-3">
                {[
                  { id: 'Dense Traditional Jali & Figures', title: 'Dense Symmetrical Jaal & Portraits', desc: 'Ultra-fine mesh lattice, couple portraits, royal peacocks, and hidden dates' },
                  { id: 'Bold & Arabic Cut', title: 'Bold Arabic & Shaded Florals', desc: 'High-contrast negative skin space, flowing vines, and dramatic shaded petals' },
                  { id: 'Delicate & Fine lines', title: 'Contemporary Minimalist Lace', desc: 'Delicate jewelry draping, focal solar mandalas, and clean architectural lines' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPreferences({ ...preferences, intricacyLevel: item.id as any })}
                    className={`w-full p-4 rounded-2xl text-left border transition-all ${
                      preferences.intricacyLevel === item.id
                        ? 'border-[#C59B27] bg-[#FEF9EE] dark:bg-[#282010] shadow-sm'
                        : 'border-[#EFE7DA] dark:border-[#1F362E]'
                    }`}
                  >
                    <p className="font-semibold text-sm text-[#1A2421] dark:text-[#F8F5EE]">{item.title}</p>
                    <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: RESULTS SCREEN */}
          {step === 5 && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Recommended Style Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-white border border-[#C59B27]/40 shadow-lg">
                <div className="flex items-center gap-2 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Recommended Style Match</span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">
                  {result.recommendedStyle}
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  {result.styleDescription}
                </p>
              </div>

              {/* Consultation Insight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FEF9EE] dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-1.5">
                    Pattern Advice
                  </p>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                    {result.curatedPatternAdvice}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FEF9EE] dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7A1C2D] dark:text-[#E5C07B] mb-1.5">
                    Outfit Harmony Tip
                  </p>
                  <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC] leading-relaxed">
                    {result.outfitHarmonyTip}
                  </p>
                </div>
              </div>

              {/* Matched Artists */}
              <div>
                <h5 className="font-serif text-base font-bold text-[#1A2421] dark:text-[#F8F5EE] mb-3">
                  Top Certified Artists for This Style:
                </h5>
                <div className="space-y-3">
                  {result.matchedArtists.map((artist) => (
                    <div
                      key={artist.id}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#0E1A16] border border-[#EFE7DA] dark:border-[#1F362E] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="w-12 h-12 rounded-full object-cover border border-[#C59B27]"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#1A2421] dark:text-[#F8F5EE]">{artist.name}</p>
                          <p className="text-xs text-[#5C6763] dark:text-[#B2C2BC]">{artist.city} • {artist.rating} ★ ({artist.reviewCount} reviews)</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBookArtist(artist.id)}
                        className="px-4 py-2 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22] transition-colors whitespace-nowrap"
                      >
                        Book Artist
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 pt-4 border-t border-[#EFE7DA] dark:border-[#1F362E] bg-white dark:bg-[#07100D] flex items-center justify-between">
          {step <= 4 ? (
            <>
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-full border border-[#EFE7DA] text-xs font-semibold text-[#5C6763] hover:bg-black/5 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-full bg-[#064E3B] text-white text-xs font-semibold hover:bg-[#022C22] flex items-center gap-1.5 transition-all"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={isCalculating}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C59B27] to-[#9A7516] text-[#07100D] text-xs font-bold hover:scale-[1.02] flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isCalculating ? 'Generating Analysis...' : 'Generate My Style Guide'}</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs text-[#5C6763] hover:underline"
              >
                ← Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-[#064E3B] text-white text-xs font-semibold"
              >
                Close & Browse Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
