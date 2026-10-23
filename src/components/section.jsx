import React from 'react';
import { m } from 'motion/react';
import { reveal } from '../animations';

// Estructura común de las secciones: número, etiqueta, título y subtítulo opcional
const Section = ({ id, number, label, title, subtitle, className = '', children }) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <m.div {...reveal()}>
          <p className="font-mono text-sm text-accent">
            {number} <span className="text-muted">/</span> {label.toLowerCase()}
          </p>
          <h2 id={`${id}-title`} className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted text-pretty">{subtitle}</p>}
        </m.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
};

export default Section;
