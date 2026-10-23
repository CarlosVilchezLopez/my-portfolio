import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useActiveSection, useTheme } from '../hooks';
import { profile } from '../data/profile';

// Secciones del menú, en el orden en que aparecen en la página
const SECTIONS = ['about', 'skills', 'projects', 'contact'];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [dark, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTIONS);

  const navLinks = SECTIONS.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
      aria-current={active === id ? 'true' : undefined}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-fg ${
        active === id ? 'text-fg' : 'text-muted'
      }`}
    >
      {t.nav[id]}
    </a>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only rounded-lg bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t.nav.skip}
      </a>
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <a href="#home" className="font-semibold tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">{navLinks}</div>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={t.nav.language} className="flex rounded-lg border border-line p-0.5">
            {LANGUAGES.map(({ code, name }) => (
              <button
                key={code}
                type="button"
                lang={code}
                aria-label={name}
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
                className={`rounded-md px-2 py-1 font-mono text-xs font-medium uppercase transition-colors ${
                  language === code ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? t.nav.toLight : t.nav.toDark}
            title={dark ? t.nav.toLight : t.nav.toDark}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {dark ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.menu}
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg md:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-3 py-2">{navLinks}</div>
        </div>
      )}
    </header>
  );
};

export default Header;
