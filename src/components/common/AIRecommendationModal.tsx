import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { MOCK_ARTISTS } from '@/services/mehndiData';
import { useBooking } from '@/context/BookingContext';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { selectArtistAndPackage } = useBooking();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    occasion: '',
    gownColor: '',
    coverage: '',
    intricacy: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  if (!isOpen) return null;

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setRecommendation({
          styleName: 'Royal Rajasthani Figurine Jaal with Khaleeji Cuffs',
          description: 'A bespoke fusion incorporating intricate elephant & bride-groom portraits on the palms, paired with modern floral negative-space cuffs that complement your wedding gown palette.',
          curingAdvice: 'Book application 48 hours before the Sangeet/Main Reception. Apply natural clove oil steam 24 hours post-peel for maximum deep burgundy oxidation.',
          matchedArtist: MOCK_ARTISTS[0],
        });
      }, 1000);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ occasion: '', gownColor: '', coverage: '', intricacy: '' });
    setRecommendation(null);
  };

  const handleBookRecommended = () => {
    if (recommendation?.matchedArtist) {
      selectArtistAndPackage(recommendation.matchedArtist);
      onClose();
      navigate(`/book/${recommendation.matchedArtist.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1815]/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-xl bg-[#f7f1e6] border border-[rgba(27,24,21,0.12)] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(27,24,21,0.1)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9c4221]" />
            <span className="font-serif-editorial text-xl font-bold text-[#1b1815]">
              AI Bridal Style Advisor
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efe6d4] flex items-center justify-center text-[#1b1815] hover:bg-[rgba(27,24,21,0.15)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6">
          
          {/* Loading Animation */}
          {isCalculating && (
            <div className="py-16 text-center space-y-4">
              <div className="spinner mx-auto" />
              <p className="font-serif-editorial text-lg font-bold text-[#1b1815]">
                Curating bespoke motif traditions...
              </p>
              <p className="text-xs text-[#2c2620]/70">Analyzing regional henna styles against your bridal ceremony palette.</p>
            </div>
          )}

          {/* Result Card */}
          {!isCalculating && recommendation && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <span className="badge">
                  <span>Curated Bridal Recommendation</span>
                </span>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#1b1815]">
                  {recommendation.styleName}
                </h3>
                <p className="text-xs text-[#2c2620]/80 leading-relaxed font-sans">
                  {recommendation.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#efe6d4] border border-[rgba(27,24,21,0.08)] space-y-1.5 text-xs">
                <p className="font-bold text-[#9c4221]">48-Hour Staining Protocol:</p>
                <p className="text-[#2c2620]/80">{recommendation.curingAdvice}</p>
              </div>

              {/* Matched Artist Preview */}
              <div className="p-4 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#f7f1e6] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={recommendation.matchedArtist.avatar}
                    alt={recommendation.matchedArtist.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#1b1815]">{recommendation.matchedArtist.name}</p>
                    <p className="text-[11px] text-[#2c2620]/70">{recommendation.matchedArtist.city} · {recommendation.matchedArtist.rating} ★</p>
                  </div>
                </div>
                <button
                  onClick={handleBookRecommended}
                  className="btn btn-primary !py-2 !px-4 !text-xs whitespace-nowrap"
                >
                  <span>Book Artist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#2c2620]/70 hover:text-[#9c4221] flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Start Consultation Over</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive 4-Step Questionnaire */}
          {!isCalculating && !recommendation && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between text-xs text-[#2c2620]/70">
                <span>Step {step} of 4</span>
                <span>{step === 1 ? 'Occasion' : step === 2 ? 'Gown Tone' : step === 3 ? 'Coverage' : 'Intricacy'}</span>
              </div>

              {/* Step 1: Occasion */}
              {step === 1 && (
                <div className="space-y-3">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#1b1815]">What is the primary occasion?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Main Wedding Ceremony', 'Sangeet & Mehendi Night', 'Destination Elopement', 'Eid & Festive Celebration'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption('occasion', opt)}
                        className="p-3.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] hover:border-[#9c4221] text-xs font-semibold text-[#1b1815] text-left transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Gown Tone */}
              {step === 2 && (
                <div className="space-y-3">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#1b1815]">What tone is your bridal ensemble?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Classic Deep Crimson / Maroon', 'Pastel Blush / Champagne Gold', 'Emerald / Royal Jewel Tones', 'Ivory / Modern Monochrome'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption('gownColor', opt)}
                        className="p-3.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] hover:border-[#9c4221] text-xs font-semibold text-[#1b1815] text-left transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Coverage */}
              {step === 3 && (
                <div className="space-y-3">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#1b1815]">What level of skin coverage do you desire?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Full Elbows & Mid-Calf Legs', 'Palms to Forearms + Feet Ankle', 'Delicate Palm Cuffs & Back of Hands', 'Minimalist Ring & Finger Accents'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption('coverage', opt)}
                        className="p-3.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] hover:border-[#9c4221] text-xs font-semibold text-[#1b1815] text-left transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Intricacy */}
              {step === 4 && (
                <div className="space-y-3">
                  <h4 className="font-serif-editorial text-xl font-bold text-[#1b1815]">What density of motifs do you favor?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Dense Heirloom Figurine Symmetry', 'Open Khaleeji Negative-Space Florals', 'Geometric Mughal Jaal Architecture', 'Micro-Mandala Minimalist Dotwork'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption('intricacy', opt)}
                        className="p-3.5 rounded-xl border border-[rgba(27,24,21,0.12)] bg-[#efe6d4] hover:border-[#9c4221] text-xs font-semibold text-[#1b1815] text-left transition-all cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
