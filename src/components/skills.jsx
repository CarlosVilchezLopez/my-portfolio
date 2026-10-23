import React from 'react';
import { Database, Globe, MonitorSmartphone, Server } from 'lucide-react';
import { m } from 'motion/react';
import { reveal, trackPointer } from '../animations';
import { useLanguage } from '../i18n';
import { skillGroups } from '../data/skills';
import Section from './section';

const ICONS = {
  backend: Server,
  data: Database,
  web: Globe,
  apps: MonitorSmartphone,
};

const Skills = () => {
  const { t } = useLanguage();

  return (
    <Section id="skills" number="02" label={t.nav.skills} title={t.skills.title} subtitle={t.skills.subtitle}>
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map(({ id, items }, index) => {
          const Icon = ICONS[id];
          return (
            <m.article
              key={id}
              {...reveal((index % 2) * 0.08)}
              onPointerMove={trackPointer}
              className="card-glow rounded-2xl border border-line bg-card p-6 hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{t.skills.groups[id].title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.skills.groups[id].text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </m.article>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;
