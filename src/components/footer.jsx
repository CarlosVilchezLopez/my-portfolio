import React, { useState } from 'react';
import { useLanguage } from '../i18n';
import { profile } from '../data/profile';
import { getConsent } from '../analytics';
import { SocialLinks } from './social';
import CookieBanner from './cookie-banner';

const Footer = () => {
  const { t } = useLanguage();
  // El aviso de cookies sale solo la primera vez; luego se abre desde el enlace "Cookies"
  const [cookieBanner, setCookieBanner] = useState(() => ({ open: getConsent() === null, fromLink: false }));

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}{' '}
          <button
            type="button"
            onClick={() => setCookieBanner({ open: true, fromLink: true })}
            className="underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            {t.cookies.link}
          </button>
        </p>
        <SocialLinks />
      </div>
      <CookieBanner
        open={cookieBanner.open}
        focusOnOpen={cookieBanner.fromLink}
        onClose={() => setCookieBanner({ open: false, fromLink: false })}
      />
    </footer>
  );
};

export default Footer;
