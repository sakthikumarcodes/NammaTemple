'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof import('@/lib/translations').translations.ta): string => {
    return getTranslation(language, key);
  };
  
  return { t, language };
}

