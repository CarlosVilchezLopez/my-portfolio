import React, { createContext, useContext, useEffect, useState } from 'react';
import translations from './data/translations.json';

const STORAGE_KEY = 'language';
const LanguageContext = createContext(null);

// Usa el idioma elegido antes o, la primera vez, el del navegador
function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && Object.hasOwn(translations, saved)) return saved;
  } catch {
    // localStorage puede no estar disponible (modo privado, cookies bloqueadas)
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
  }, [language]);

  const setLanguage = (next) => {
    setLanguageState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin localStorage el idioma solo dura hasta recargar
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
