import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download, Volume2 } from 'lucide-react';
import { animate, m, useReducedMotion } from 'motion/react';
import photo from '../assets/carlos-vilchez.jpg';
import typingSound from '../assets/typing-loop.mp3';
import { useLanguage } from '../i18n';
import { useTypewriter } from '../hooks';
import { ease, fadeUp, stagger, trackPointer } from '../animations';
import { profile } from '../data/profile';
import { SocialLinks } from './social';

// Número que cuenta desde 0 al cargar la página
function CountUp({ to }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, to, {
      duration: 1.6,
      delay: 0.4,
      ease: 'easeOut',
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = Math.round(value);
      },
    });
    return () => controls.stop();
  }, [to, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? to : 0}
    </span>
  );
}

const Hero = () => {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  // Cada clic en "Repetir con sonido" suma 1 a `run`, lo que vuelve a escribir el texto
  const [run, setRun] = useState(0);
  const { typed, done } = useTypewriter(t.hero.tagline, { delay: run === 0 ? 500 : 0, run });
  const audioRef = useRef(null);

  // El sonido se para al terminar de escribir o si se sale de la página
  useEffect(() => {
    if (done) audioRef.current?.pause();
  }, [done]);

  useEffect(() => () => audioRef.current?.pause(), []);

  // El audio arranca dentro del clic: los navegadores bloquean el sonido que no inicia el usuario
  const replayWithSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(typingSound);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play()?.catch(() => {});
    setRun((count) => count + 1);
  };

  const [badgeBefore, badgeAfter] = t.hero.badge.split('{count}');

  return (
    <section id="home" onPointerMove={trackPointer} className="hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grid-glow pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 md:grid-cols-[1fr_auto] md:gap-16">
        <m.div variants={stagger} initial="hidden" animate="show">
          <m.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-1 text-sm text-muted sm:rounded-full"
          >
            <span aria-hidden="true" className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="sr-only">{badgeBefore + profile.erpCompanies + badgeAfter}</span>
            <span aria-hidden="true">
              {badgeBefore}
              <CountUp to={profile.erpCompanies} />
              {badgeAfter}
            </span>
          </m.p>

          <m.h1 variants={fadeUp} className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">
            {profile.name}
          </m.h1>
          <m.p variants={fadeUp} className="mt-3 text-xl text-muted sm:text-2xl">
            {t.hero.role}
          </m.p>

          {/* El texto completo reserva el espacio para que nada salte mientras se escribe */}
          <m.p variants={fadeUp} className="mt-8 grid max-w-xl font-mono text-base leading-relaxed sm:text-lg">
            <span className="sr-only">{t.hero.tagline}</span>
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">
              {t.hero.tagline}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {typed}
              <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-blink bg-accent motion-reduce:animate-none" />
            </span>
          </m.p>

          {/* Con movimiento reducido el texto aparece completo de una vez, así que no hay nada que repetir */}
          {!reduced && (
            <m.div variants={fadeUp} className="mt-3 h-8">
              <button
                type="button"
                onClick={replayWithSound}
                className={`-ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted transition-[color,opacity] duration-300 hover:text-fg ${
                  done ? '' : 'pointer-events-none opacity-0'
                }`}
              >
                <Volume2 className="size-4" aria-hidden="true" />
                {t.hero.replaySound}
              </button>
            </m.div>
          )}

          <m.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
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
          </m.div>

          <m.div variants={fadeUp}>
            <SocialLinks className="mt-8 -ml-2" />
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="relative order-first mx-auto md:order-none"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-full bg-accent-soft blur-2xl motion-safe:animate-halo"
          />
          <img
            src={photo}
            alt={t.hero.photoAlt}
            width="640"
            height="640"
            className="size-36 rounded-full object-cover shadow-xl ring-4 ring-card sm:size-48 md:size-72"
          />
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
