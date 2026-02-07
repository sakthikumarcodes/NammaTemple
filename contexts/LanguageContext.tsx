'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ta');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang === 'ta' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

