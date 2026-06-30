import { motion } from 'framer-motion';
import { ArrowRight, Activity, BrainCircuit, Gauge, Layers3, ScanLine, Workflow } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { Reveal } from '../animations/Reveal';
import { ButtonLink } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { ProjectShowcaseCard } from '../cards/ProjectShowcaseCard';
import { useReduceMotion } from '../../hooks/useMediaQuery';
import { useProjects, useRoutes } from '../../hooks/useContent';

export function ProjectShowcase({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation('home');
  const projects = useProjects();
  const routes = useRoutes();

  if (compact) return <ProjectTeaserShowcase />;

  return (
    <section className="section-band">
      <div className="container-premium">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow={t('showcase.eyebrow')}
            title={t('showcase.title')}
            text={t('showcase.description')}
          />
          <ButtonLink to={routes.projects} className="w-fit shadow-glow">
            {t('showcase.exploreButton')}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectShowcaseCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

const teaserIcons = [Workflow, Layers3, BrainCircuit, Gauge];

const previewBars = [
  [54, 72, 46, 84, 62],
  [38, 58, 76, 48, 88],
  [70, 52, 82, 64, 44],
  [46, 66, 54, 78, 92],
];

function ProjectTeaserShowcase() {
  const reduceMotion = useReduceMotion();
  const { t } = useTranslation('home');
  const projects = useProjects();
  const routes = useRoutes();
  const teaserCopy = t('showcase.teaser.items', { returnObjects: true }) as Array<{
    label: string;
    title: string;
    detail: string;
  }>;

  return (
    <section className="section-band relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-8 h-px bg-premium-line opacity-70" />
      <div aria-hidden="true" className="absolute -right-48 top-32 hidden h-[34rem] w-[34rem] rounded-full bg-violet-500/[0.1] blur-[130px] sm:block" />
      <div aria-hidden="true" className="absolute -left-44 bottom-10 hidden h-[28rem] w-[28rem] rounded-full bg-signal/[0.055] blur-[120px] sm:block" />

      <div className="container-premium relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow={t('showcase.teaser.eyebrow')}
            title={t('showcase.teaser.title')}
            text={t('showcase.teaser.description')}
          />
          <Reveal>
            <ButtonLink to={routes.projects} className="w-full sm:w-fit">
              {t('showcase.teaser.exploreButton')}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:mt-12 xl:grid-cols-4">
          {projects.slice(0, 4).map((project, index) => {
            const copy = teaserCopy[index];
            const Icon = teaserIcons[index];

            return (
              <Reveal key={project.slug} delay={index * 0.05} className="h-full">
                <article
                  className={cn(
                    'group relative flex h-full min-h-[22rem] min-w-0 flex-col overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.045] p-4 shadow-premium transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-violet-300/24 hover:bg-white/[0.062] sm:min-h-[25rem] sm:rounded-[1.75rem] sm:p-5 sm:backdrop-blur-2xl sm:will-change-transform',
                  )}
                >
                  <div className={cn('absolute inset-0 opacity-70', accentWash(project.accent))} />
                  <div className="absolute -right-20 top-24 hidden h-56 w-56 rounded-full bg-violet-400/[0.13] blur-[92px] transition duration-700 group-hover:bg-violet-300/[0.18] sm:block" />
                  <div className="absolute inset-x-5 top-0 h-px bg-premium-line opacity-60" />

                  <div className="relative z-10 flex min-h-9 min-w-0 items-center justify-between gap-3">
                    <span className="min-w-0 break-words rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted min-[390px]:text-[0.68rem] min-[390px]:tracking-[0.18em]">
                      {copy.label}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-violet-300">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-5 sm:mt-8">
                    <TeaserMockup index={index} projectTitle={project.title} accent={project.accent} reduceMotion={reduceMotion} />
                  </div>

                  <div className="relative z-10 mt-5 flex flex-1 flex-col sm:mt-7">
                    <p className="break-words text-xs font-semibold uppercase tracking-[0.14em] text-violet-300/80 sm:tracking-[0.2em]">{project.category}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-tight tracking-normal text-frost sm:text-2xl">{copy.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">{copy.detail}</p>
                  </div>

                  <div className="pointer-events-none absolute bottom-5 right-5 text-white/[0.045]">
                    <ScanLine className="h-16 w-16" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 sm:mt-14">
          <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p className="max-w-2xl text-sm leading-7 text-muted">{t('showcase.teaser.footerText')}</p>
            <ButtonLink to={routes.projects} variant="secondary" className="w-full sm:w-fit">
              {t('showcase.teaser.footerButton')}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeaserMockup({ index, projectTitle, accent, reduceMotion }: { index: number; projectTitle: string; accent: string; reduceMotion: boolean }) {
  const bars = previewBars[index] ?? previewBars[0];
  const content = (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/16" />
          <span className={cn('h-2 w-2 rounded-full', accentDot(accent))} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.65rem] text-muted">partial view</span>
      </div>

      <div className="grid h-auto gap-2.5 p-2.5 min-[390px]:h-[7.6rem] min-[390px]:grid-cols-[0.72fr_1.28fr] sm:h-[8.7rem] sm:grid-cols-[0.68fr_1.32fr] sm:gap-3 sm:p-3">
        <div className="space-y-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <span className="break-words text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-violet-300/80 min-[390px]:tracking-[0.18em]">{projectTitle}</span>
            <div className="mt-3 h-2 rounded-full bg-white/16" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          <div className="space-y-1.5 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            {[0, 1, 2].map((item) => (
              <span key={item} className="block h-1.5 rounded-full bg-white/[0.12]" style={{ width: `${92 - item * 18}%` }} />
            ))}
          </div>
        </div>

        <div className="relative min-h-28 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(141,92,255,0.12),rgba(77,212,198,0.035))] p-3 min-[390px]:min-h-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_56%)] opacity-60" />
          <div className="relative flex h-full items-end gap-2">
            {bars.map((height) => (
              <span
                key={height}
                className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,#f7f5ff,rgba(169,139,255,0.42))]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070711] via-[#070711]/72 to-transparent" />
      <Activity className="absolute bottom-4 right-4 h-5 w-5 text-white/20" />
    </>
  );

  if (reduceMotion) {
    return (
      <div className="relative h-auto min-h-36 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#070711]/90 shadow-[0_24px_80px_rgba(0,0,0,0.24)] min-[390px]:h-36 sm:h-44 sm:rounded-[1.35rem]">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className="relative h-auto min-h-36 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#070711]/90 shadow-[0_24px_80px_rgba(0,0,0,0.24)] min-[390px]:h-36 sm:h-44 sm:rounded-[1.35rem]"
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}

function accentWash(accent: string) {
  if (accent === 'signal') return 'bg-[radial-gradient(circle_at_50%_0%,rgba(77,212,198,0.12),transparent_58%)]';
  if (accent === 'amber') return 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,185,80,0.11),transparent_58%)]';
  return 'bg-[radial-gradient(circle_at_50%_0%,rgba(141,92,255,0.16),transparent_58%)]';
}

function accentDot(accent: string) {
  if (accent === 'signal') return 'bg-signal';
  if (accent === 'amber') return 'bg-amber';
  return 'bg-violet-300';
}
