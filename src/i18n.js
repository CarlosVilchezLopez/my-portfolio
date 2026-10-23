import { createContext, useContext } from 'react';

// Idioma actual, función para cambiarlo y textos traducidos (`t`). Lo rellena <LanguageProvider>.
export const LanguageContext = createContext(null);

export function useLanguage() {
  return useContext(LanguageContext);
}
