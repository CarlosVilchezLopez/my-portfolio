import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import photo from '../assets/carlos-vilchez.jpg';
import { useLanguage } from '../i18n';
import { useTypewriter } from '../hooks';
import { profile } from '../data/profile';
import { SocialLinks } from './social';

const Hero = () => {
  const { t } = useLanguage();
  const typed = useTypewriter(t.hero.tagline);

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-1 text-sm text-muted sm:rounded-full">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-emerald-500" />
            {t.hero.badge}
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-muted sm:text-2xl">{t.hero.role}</p>

          {/* El texto completo reserva el espacio para que nada salte mientras se escribe */}
          <p className="mt-8 grid max-w-xl font-mono text-base leading-relaxed sm:text-lg">
            <span className="sr-only">{t.hero.tagline}</span>
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">
              {t.hero.tagline}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {typed}
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-blink bg-accent motion-reduce:animate-none" />
            </span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent-hover"
            >
              {t.hero.ctaProjects}
              <ArrowRight
                className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
            >
              {t.hero.ctaContact}
            </a>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                <Download className="size-4" aria-hidden="true" />
                {t.hero.cv}
              </a>
            )}
          </div>

          <SocialLinks className="mt-8 -ml-2" />
        </div>

        <div className="relative order-first mx-auto md:order-none">
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-full bg-accent-soft blur-2xl" />
          <img
            src={photo}
            alt={t.hero.photoAlt}
            width="640"
            height="640"
            className="size-36 rounded-full object-cover shadow-xl ring-4 ring-card sm:size-48 md:size-72"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
