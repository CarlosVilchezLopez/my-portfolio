import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Globe, Monitor, Server, Smartphone, X } from 'lucide-react';
import { m, useReducedMotion, useSpring } from 'motion/react';
import { reveal, trackPointer } from '../animations';
import { useLanguage } from '../i18n';
import projectsData from '../data/projects.json';
import Section from './section';

const KIND_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  web: Globe,
  api: Server,
};

// Captura del proyecto o, si aún no hay (image: null), un marcador con el tipo de app
function ProjectImage({ project, className = '' }) {
  const { language, t } = useLanguage();

  if (!project.image) {
    const Icon = KIND_ICONS[project.kind];
    return (
      <div className={`flex aspect-video flex-col items-center justify-center gap-3 bg-surface text-muted ${className}`}>
        <Icon className="size-8" strokeWidth={1.5} aria-hidden="true" />
        <span className="font-mono text-xs">{t.projects.kinds[project.kind]}</span>
      </div>
    );
  }

  return (
    <div className={`aspect-video overflow-hidden bg-surface ${className}`}>
      <img
        src={import.meta.env.BASE_URL + project.image}
        alt={`${t.projects.screenshotOf} ${project[language].title}`}
        loading="lazy"
        className="size-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
      />
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function VisitLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
    >
      {children}
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}

// Inclina la tarjeta unos grados hacia el cursor (solo con ratón)
function useTilt() {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 250, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 250, damping: 20 });

  const onPointerMove = (event) => {
    trackPointer(event);
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
    rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 6);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { style: { rotateX, rotateY, transformPerspective: 900 }, onPointerMove, onPointerLeave };
}

function ProjectCard({ project, index, onOpen }) {
  const { language, t } = useLanguage();
  const tilt = useTilt();
  const text = project[language];

  return (
    <m.article
      {...reveal((index % 3) * 0.08)}
      {...tilt}
      className={`card-glow group flex flex-col overflow-hidden rounded-2xl border border-line bg-card hover:shadow-lg motion-safe:hover:-translate-y-1 ${
        project.featured ? 'sm:col-span-full md:flex-row' : ''
      }`}
    >
      <ProjectImage
        project={project}
        className={`border-b border-line ${project.featured ? 'md:w-3/5 md:shrink-0 md:border-r md:border-b-0' : ''}`}
      />
      <div className="flex flex-1 flex-col p-6">
        {project.featured && (
          <span className="mb-3 self-start rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-fg">
            {t.projects.featured}
          </span>
        )}
        <h3 className="text-lg font-semibold">{text.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{text.summary}</p>
        <div className="mt-4">
          <Tags tags={project.tags} />
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1 text-accent transition-colors hover:text-accent-hover"
          >
            {t.projects.details}
            <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
          {project.link && <VisitLink href={project.link}>{t.projects.visit}</VisitLink>}
        </div>
      </div>
    </m.article>
  );
}

// Ventana con la descripción completa. Usa <dialog>, que ya gestiona el foco y la tecla Esc.
function ProjectDialog({ project, onClose }) {
  const { language, t } = useLanguage();
  const dialogRef = useRef(null);
  // Mantiene el último proyecto mientras la ventana se desvanece al cerrarse
  const lastProject = useRef(project);
  if (project) lastProject.current = project;
  const shown = project ?? lastProject.current;

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onClose]);

  useEffect(() => {
    if (project) dialogRef.current.showModal();
  }, [project]);

  const close = () => dialogRef.current.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      // Un clic fuera del contenido (en el fondo oscuro) cierra la ventana
      onClick={(event) => event.target === dialogRef.current && close()}
      className="project-dialog m-auto max-h-[90vh] w-[min(44rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-line bg-card p-0 text-fg shadow-2xl"
    >
      {shown && (
        <div className="max-h-[90vh] overflow-y-auto">
          <ProjectImage project={shown} className="border-b border-line" />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h3 id="project-dialog-title" className="text-2xl font-semibold tracking-tight">
                {shown[language].title}
              </h3>
              <button
                type="button"
                onClick={close}
                aria-label={t.projects.close}
                className="-mt-1 -mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3">
              <Tags tags={shown.tags} />
            </div>
            <p className="mt-6 leading-relaxed text-muted text-pretty">{shown[language].description}</p>
            {shown.link && (
              <p className="mt-6 text-sm font-medium">
                <VisitLink href={shown.link}>{t.projects.visit}</VisitLink>
              </p>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

const Projects = () => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const closeDialog = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      number="03"
      label={t.nav.projects}
      title={t.projects.title}
      subtitle={t.projects.subtitle}
      className="border-y border-line bg-surface"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected} />
        ))}
      </div>
      <ProjectDialog project={selected} onClose={closeDialog} />
    </Section>
  );
};

export default Projects;
