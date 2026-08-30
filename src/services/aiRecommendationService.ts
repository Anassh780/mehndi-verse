import { AIQuizPreferences, AIRecommendationResult, MehndiCategory } from '@/types/mehndi';
import { MOCK_ARTISTS } from './mehndiData';

export function getAIRecommendation(preferences: AIQuizPreferences): AIRecommendationResult {
  let recommendedStyle: MehndiCategory = 'Bridal';
  let styleDescription = '';
  let curatedPatternAdvice = '';
  let outfitHarmonyTip = '';
  let priceRange = '$350 - $650';

  if (preferences.eventType === 'Wedding' || preferences.handCoverage.includes('Full Bridal Set') || preferences.handCoverage.includes('Elbow High')) {
    if (preferences.intricacyLevel === 'Bold & Arabic Cut') {
      recommendedStyle = 'Arabic';
      styleDescription = 'Royal Arabic Bridal Fusion — characterized by high-contrast negative space, shaded petals, and bold flowing vines.';
      curatedPatternAdvice = 'Pair dramatic diagonal floral trails on your backhand with intricate Moroccan cuff details that accentuate your bridal wrist jewelry.';
      outfitHarmonyTip = `Your ${preferences.outfitColor} ensemble will look breathtaking against bold negative space cutouts and deep mahogany stained skin highlights.`;
      priceRange = '$420 - $680';
    } else if (preferences.designStyle === 'Rajasthani & Traditional' || preferences.intricacyLevel === 'Dense Traditional Jali & Figures') {
      recommendedStyle = 'Rajasthani & Traditional';
      styleDescription = 'Regal Marwari Storyline Heirloom — featuring micro-jaali mesh, palanquin & baraat processions, and custom bride-groom portraits.';
      curatedPatternAdvice = 'Incorporate personalized wedding vows and hidden groom initials inside the concentric palm mandalas.';
      outfitHarmonyTip = `Dense symmetrical henna pairs classically with the rich zari and zardozi embroidery of your ${preferences.outfitColor} attire.`;
      priceRange = '$480 - $750';
    } else {
      recommendedStyle = 'Bridal';
      styleDescription = 'Bespoke Royal Bridal Signature — an opulent blend of Mughal arches, lotus motifs, and full-arm symmetrical grandeur.';
      curatedPatternAdvice = 'Opt for full-sleeve coverage to the mid-elbow with delicate jali lattice on fingers and shaded lotus buds along the wrists.';
      outfitHarmonyTip = `The intricate geometry creates a regal canvas that elevates heavy bridal jewelry and complements ${preferences.outfitColor} tones.`;
      priceRange = '$450 - $700';
    }
  } else if (preferences.eventType === 'Engagement' || preferences.handCoverage === 'Palms Only') {
    if (preferences.intricacyLevel === 'Delicate & Fine lines') {
      recommendedStyle = 'Minimalist Mandala';
      styleDescription = 'Jewel-Drop Minimalist Mandala — crisp focal solar mandalas with delicate finger-ring chains.';
      curatedPatternAdvice = 'Keep the wrist open with subtle lace bracelets so your engagement ring takes center stage in photos.';
      outfitHarmonyTip = `Clean minimalist geometry gives a modern, elevated couture aesthetic alongside ${preferences.outfitColor} contemporary outfits.`;
      priceRange = '$180 - $320';
    } else {
      recommendedStyle = 'Indo-Western & Modern';
      styleDescription = 'Indo-Western Lace & Glove Motif — architectural modern cuffs and chic geometric lines.';
      curatedPatternAdvice = 'Focus on backhand glove motifs that contour your hands with delicate jewelry-like draping.';
      outfitHarmonyTip = `Chic modern lines flatter both western evening gowns and lightweight lehengas.`;
      priceRange = '$220 - $380';
    }
  } else {
    // Sangeet / Festive
    recommendedStyle = 'Festive & Eid';
    styleDescription = 'Express Festive Celebration Henna — quick-drying, radiant patterns made for dancing and celebrations.';
    curatedPatternAdvice = 'Choose flowing diagonal vines and quick-drying shaded florals that let you enjoy the party with zero smudges.';
    outfitHarmonyTip = `Vibrant floral flourishes create festive energy that pops against festive ${preferences.outfitColor} shades.`;
    priceRange = '$150 - $280';
  }

  // Filter matched artists
  let matches = MOCK_ARTISTS.filter(a => 
    a.specialties.includes(recommendedStyle) || a.specialties.includes('Bridal')
  );

  if (preferences.city && preferences.city !== 'All Cities') {
    const cityMatches = matches.filter(a => 
      a.city.toLowerCase().includes(preferences.city.toLowerCase()) ||
      a.country.toLowerCase().includes(preferences.city.toLowerCase())
    );
    if (cityMatches.length > 0) {
      matches = cityMatches;
    }
  }

  // Sample images
  const sampleImages = matches.flatMap(a => a.portfolio.map(p => p.imageUrl)).slice(0, 4);

  return {
    recommendedStyle,
    styleDescription,
    curatedPatternAdvice,
    outfitHarmonyTip,
    estimatedPriceRange: priceRange,
    matchedArtists: matches.slice(0, 3),
    sampleImages: sampleImages.length > 0 ? sampleImages : [
      'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
  };
}
