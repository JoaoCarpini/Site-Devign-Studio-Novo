import { motion } from 'framer-motion';
import { ArrowRight, Activity, BrainCircuit, Gauge, Layers3, ScanLine, Workflow } from 'lucide-react';
import { projects } from '../../data/site';
import { cn } from '../../utils/cn';
import { Reveal } from '../animations/Reveal';
import { ButtonLink } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { ProjectShowcaseCard } from '../cards/ProjectShowcaseCard';

export function ProjectShowcase({ compact = false }: { compact?: boolean }) {
  if (compact) return <ProjectTeaserShowcase />;

  return (
    <section className="section-band">
      <div className="container-premium">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Showcase"
            title="Cases com profundidade de produto."
            text="Projetos com contexto de negócio, arquitetura técnica, funcionalidades reais e visual de software premium."
          />
          <ButtonLink to="/projetos" className="w-fit shadow-glow">
            Explorar portfólio
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-8">
          {(compact ? projects.slice(0, 4) : projects).map((project, index) => (
            <ProjectShowcaseCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

const teaserCopy = [
  {
    label: 'Operação inteligente',
    title: 'Automação operacional inteligente.',
    detail: 'Fluxos conectados para reduzir ruído e revelar gargalos reais.',
    icon: Workflow,
  },
  {
    label: 'Produto escalável',
    title: 'Experiência digital preparada para escala.',
    detail: 'Interfaces, dados e jornadas desenhadas para uso recorrente.',
    icon: Layers3,
  },
  {
    label: 'IA aplicada',
    title: 'IA aplicada ao fluxo operacional.',
    detail: 'Triagem, leitura e suporte à decisão com contexto controlado.',
    icon: BrainCircuit,
  },
  {
    label: 'Infraestrutura',
    title: 'Infraestrutura estratégica para crescimento.',
    detail: 'APIs, permissões e bases preparadas para evolução modular.',
    icon: Gauge,
  },
];

const previewBars = [
  [54, 72, 46, 84, 62],
  [38, 58, 76, 48, 88],
  [70, 52, 82, 64, 44],
  [46, 66, 54, 78, 92],
];

function ProjectTeaserShowcase() {
  return (
    <section className="section-band relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-8 h-px bg-premium-line opacity-70" />
      <div aria-hidden="true" className="absolute -right-48 top-32 h-[34rem] w-[34rem] rounded-full bg-violet-500/[0.1] blur-[130px]" />
      <div aria-hidden="true" className="absolute -left-44 bottom-10 h-[28rem] w-[28rem] rounded-full bg-signal/[0.055] blur-[120px]" />

      <div className="container-premium relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
          <SectionIntro
            eyebrow="Experiências digitais"
            title="Fragmentos de sistemas em movimento."
            text="A Home mostra apenas sinais: interfaces parciais, indicadores e fluxos. Os detalhes completos vivem no portfólio."
          />
          <Reveal className="lg:justify-self-end">
            <ButtonLink to="/projetos" className="w-fit">
              Explorar cases
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projects.slice(0, 4).map((project, index) => {
            const copy = teaserCopy[index];
            const Icon = copy.icon;

            return (
              <Reveal key={project.slug} delay={index * 0.05}>
                <article
                  className={cn(
                    'group relative min-h-[25rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-premium backdrop-blur-2xl transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:border-violet-300/24 hover:bg-white/[0.062]',
                    index === 1 && 'md:translate-y-8',
                    index === 2 && 'xl:translate-y-14',
                  )}
                >
                  <div className={cn('absolute inset-0 opacity-70', accentWash(project.accent))} />
                  <div className="absolute -right-20 top-24 h-56 w-56 rounded-full bg-violet-400/[0.13] blur-[92px] transition duration-700 group-hover:bg-violet-300/[0.18]" />
                  <div className="absolute inset-x-5 top-0 h-px bg-premium-line opacity-60" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                      {copy.label}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-violet-300">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="relative z-10 mt-8">
                    <TeaserMockup index={index} projectTitle={project.title} accent={project.accent} />
                  </div>

                  <div className="relative z-10 mt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">{project.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-normal text-frost">{copy.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">{copy.detail}</p>
                  </div>

                  <div className="pointer-events-none absolute bottom-5 right-5 text-white/[0.045]">
                    <ScanLine className="h-16 w-16" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-muted">
              Cada preview é intencionalmente incompleto. O valor está no sistema por trás: arquitetura, operação, dados e experiência.
            </p>
            <ButtonLink to="/projetos" variant="secondary" className="w-fit">
              Ver soluções em operação
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeaserMockup({ index, projectTitle, accent }: { index: number; projectTitle: string; accent: string }) {
  const bars = previewBars[index] ?? previewBars[0];

  return (
    <motion.div
      className="relative h-44 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#070711]/90 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
      whileHover={{ scale: 1.025 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/16" />
          <span className={cn('h-2 w-2 rounded-full', accentDot(accent))} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.65rem] text-muted">partial view</span>
      </div>

      <div className="grid h-[8.7rem] grid-cols-[0.68fr_1.32fr] gap-3 p-3">
        <div className="space-y-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-violet-300/80">{projectTitle}</span>
            <div className="mt-3 h-2 rounded-full bg-white/16" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
          </div>
          <div className="space-y-1.5 rounded-2xl border border-white/10 bg-white/[0.045] p-3">
            {[0, 1, 2].map((item) => (
              <span key={item} className="block h-1.5 rounded-full bg-white/[0.12]" style={{ width: `${92 - item * 18}%` }} />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(141,92,255,0.12),rgba(77,212,198,0.035))] p-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_56%)] opacity-60" />
          <div className="relative flex h-full items-end gap-2">
            {bars.map((height, barIndex) => (
              <motion.span
                key={`${height}-${barIndex}`}
                className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,#f7f5ff,rgba(169,139,255,0.42))]"
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0.62, opacity: 0.55 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: barIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070711] via-[#070711]/72 to-transparent" />
      <Activity className="absolute bottom-4 right-4 h-5 w-5 text-white/20" />
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
