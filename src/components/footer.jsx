import React from 'react';
import { useLanguage } from '../i18n';
import { profile } from '../data/profile';
import { SocialLinks } from './social';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
};

export default Footer;
