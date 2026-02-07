'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ta' ? 'en' : 'ta');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 hover:bg-white text-amber-700 rounded-lg font-semibold transition-colors shadow-sm border border-amber-200 text-xs sm:text-sm flex items-center gap-2"
      title={language === 'ta' ? 'Switch to English' : 'தமிழுக்கு மாற்ற'}
    >
      <span className="text-base">{language === 'ta' ? '🇮🇳' : '🇮🇳'}</span>
      <span>{language === 'ta' ? 'தமிழ்' : 'English'}</span>
      <span className="text-xs">⇄</span>
    </button>
  );
}

