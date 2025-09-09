
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, defaultLanguage, getLanguageFromPath } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const pathname = usePathname();
  const router = useRouter();

  // Initialize language from URL
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(pathname);
    setLanguageState(urlLanguage);
  }, [pathname]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    // Update URL with new language
    const currentLang = getLanguageFromPath(pathname);
    if (currentLang !== newLanguage) {
      let newPath = pathname;
      
      // Remove current language from path
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0 && ['es', 'en', 'zh'].includes(segments[0])) {
        newPath = '/' + segments.slice(1).join('/');
      }
      
      // Add new language prefix (except for default language 'es')
      if (newLanguage !== defaultLanguage) {
        newPath = `/${newLanguage}${newPath === '/' ? '' : newPath}`;
      }
      
      router.push(newPath || '/');
    }
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
