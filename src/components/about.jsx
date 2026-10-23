import React from 'react';
import { Monitor, Server, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n';
import Section from './section';

const HIGHLIGHTS = [
  { id: 'desktop', Icon: Monitor },
  { id: 'web', Icon: Server },
  { id: 'mobile', Icon: Smartphone },
];

const About = () => {
  const { t } = useLanguage();

  return (
    <Section id="about" number="01" label={t.nav.about} title={t.about.title} className="border-y border-line bg-surface">
      <div className="grid gap-12 md:grid-cols-5">
        <p className="text-lg leading-relaxed text-muted text-pretty md:col-span-3">{t.about.paragraph}</p>
        <ul className="space-y-6 md:col-span-2">
          {HIGHLIGHTS.map(({ id, Icon }) => (
            <li key={id} className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{t.about.highlights[id].title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t.about.highlights[id].text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default About;
