
export type Language = 'es' | 'en' | 'zh';

export const languages: Language[] = ['es', 'en', 'zh'];

export const languageNames = {
  es: 'Español',
  en: 'English',
  zh: '中文'
} as const;

export const defaultLanguage: Language = 'es';

export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLang = segments[0] as Language;
  return languages.includes(possibleLang) ? possibleLang : defaultLanguage;
}

export function removeLanguageFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLang = segments[0] as Language;
  
  if (languages.includes(possibleLang)) {
    return '/' + segments.slice(1).join('/');
  }
  
  return pathname;
}

export function addLanguageToPath(pathname: string, language: Language): string {
  const cleanPath = removeLanguageFromPath(pathname);
  
  if (language === defaultLanguage) {
    return cleanPath || '/';
  }
  
  return `/${language}${cleanPath === '/' ? '' : cleanPath}`;
}
