import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { m } from 'motion/react';
import { reveal, trackPointer } from '../animations';
import { useLanguage } from '../i18n';
import { profile } from '../data/profile';
import { SocialLinks } from './social';
import Section from './section';

const Contact = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Vuelve al icono de copiar unos segundos después
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  // mailto no funciona si el visitante no tiene un programa de correo configurado; copiar es la alternativa
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Sin acceso al portapapeles; el correo sigue visible en el botón
    }
  };

  return (
    <Section id="contact" number="04" label={t.nav.contact} title={t.contact.title}>
      <m.div {...reveal()} onPointerMove={trackPointer} className="card-glow rounded-2xl border border-line bg-card p-6 sm:p-12">
        <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">{t.contact.text}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent-hover sm:w-auto sm:px-5 sm:text-base"
          >
            <Mail className="size-5 shrink-0" aria-hidden="true" />
            <span className="break-all">{profile.email}</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-medium transition-colors hover:bg-surface sm:w-auto"
          >
            {copied ? (
              <Check className="size-4 text-emerald-600" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 text-sm text-muted">
          {t.contact.elsewhere}
          <SocialLinks />
        </div>
      </m.div>
    </Section>
  );
};

export default Contact;
