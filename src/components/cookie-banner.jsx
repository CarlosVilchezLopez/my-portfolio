import React, { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useLanguage } from '../i18n';
import { ease } from '../animations';
import { setConsent } from '../analytics';

// Aviso para aceptar o rechazar Google Analytics. Aparece mientras el visitante no haya elegido
// y cuando lo vuelve a abrir desde el enlace "Cookies" del pie de página (`focusOnOpen`).
const CookieBanner = ({ open, focusOnOpen, onClose }) => {
  const { t } = useLanguage();
  const acceptRef = useRef(null);

  useEffect(() => {
    if (open && focusOnOpen) acceptRef.current?.focus();
  }, [open, focusOnOpen]);

  const choose = (consent) => {
    setConsent(consent);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <m.section
          aria-labelledby="cookie-banner-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-line bg-card p-5 text-sm shadow-xl sm:right-auto sm:left-6 sm:max-w-sm"
        >
          <h2 id="cookie-banner-title" className="font-semibold">
            {t.cookies.title}
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{t.cookies.text}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="rounded-lg border border-line px-4 py-2 font-medium transition-colors hover:bg-surface"
            >
              {t.cookies.decline}
            </button>
            <button
              ref={acceptRef}
              type="button"
              onClick={() => choose('granted')}
              className="rounded-lg bg-accent px-4 py-2 font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              {t.cookies.accept}
            </button>
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
