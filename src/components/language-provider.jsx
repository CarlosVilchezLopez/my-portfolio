import React, { useEffect, useState } from 'react';
import translations from '../data/translations.json';
import { LanguageContext } from '../i18n';
import { withViewTransition } from '../hooks';

const STORAGE_KEY = 'language';

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

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
  }, [language]);

  // El cambio de idioma hace un fundido suave entre los dos textos
  const setLanguage = (next) => {
    if (next === language) return;
    withViewTransition(() => setLanguageState(next));
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
