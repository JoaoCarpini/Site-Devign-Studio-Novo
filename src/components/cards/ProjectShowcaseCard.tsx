import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cpu, Layers3, Maximize2, Sparkles } from 'lucide-react';
import type { Project } from '../../data/site';
import { cn } from '../../utils/cn';
import { Reveal } from '../animations/Reveal';
import { ButtonLink } from '../ui/Button';

const accentStyles: Record<Project['accent'], { gradient: string; text: string; chip: string; glow: string }> = {
  violet: {
    gradient: 'from-violet-500/34 via-violet-400/12 to-transparent',
    text: 'text-violet-300',
    chip: 'border-violet-400/25 bg-violet-500/12 text-violet-200',
    glow: 'bg-violet-500/18',
  },
  signal: {
    gradient: 'from-signal/28 via-signal/10 to-transparent',
    text: 'text-signal',
    chip: 'border-signal/25 bg-signal/10 text-signal',
    glow: 'bg-signal/14',
  },
  amber: {
    gradient: 'from-amber/30 via-amber/10 to-transparent',
    text: 'text-amber',
    chip: 'border-amber/25 bg-amber/10 text-amber',
    glow: 'bg-amber/14',
  },
};

export function ProjectShowcaseCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const accent = accentStyles[project.accent];

  return (
    <Reveal>
      <article
        id={project.slug}
        className={cn(
          'group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.052] shadow-premium backdrop-blur-2xl transition duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_32px_110px_rgba(141,92,255,0.16)]',
          featured ? 'lg:grid lg:grid-cols-[1.12fr_0.88fr]' : 'h-full',
        )}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80', accent.gradient)} />
        <div className={cn('absolute -right-24 top-16 h-72 w-72 rounded-full blur-[110px]', accent.glow)} />
        <div className="absolute inset-x-8 top-0 h-px bg-premium-line opacity-80" />

        <ProjectMockup project={project} featured={featured} />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn('rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]', accent.chip)}>
              {project.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-muted">
              Case #{project.slug}
            </span>
          </div>

          <h3 className="mt-6 text-3xl font-semibold tracking-normal text-frost sm:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-mist">{project.summary}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-ink/35 p-4 backdrop-blur-xl">
                <strong className="block text-xl font-semibold tracking-normal text-frost">{metric.value}</strong>
                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-muted">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            <CaseBlock title="Problema" text={project.problem} />
            <CaseBlock title="Solução" text={project.solution} />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-frost">Funcionalidades</p>
              <div className="mt-4 grid gap-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-mist">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-frost">Diferenciais</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.differentials.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-mist">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-7 text-muted">
                <span className="font-semibold text-frost">Resultado esperado: </span>
                {project.result}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-ink/45 px-3 py-1.5 text-xs font-semibold text-mist backdrop-blur-xl">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/orcamento">
              Conversar sobre projeto semelhante
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="https://gabriellefernandesnutricionista.my.canva.site/portf-lio-devign-site"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Ver case no portfólio
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CaseBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">{title}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
    </div>
  );
}

function ProjectMockup({ project, featured }: { project: Project; featured: boolean }) {
  const accent = accentStyles[project.accent];

  return (
    <div className={cn('relative z-10 overflow-hidden p-5 sm:p-8', featured ? 'lg:p-10' : 'pb-0')}>
      <motion.div
        className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080811]/92 shadow-premium"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4dd4c6]" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-muted">Live Preview</span>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-[0.76fr_1.24fr] lg:p-5">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <span className={cn('text-xs font-semibold uppercase tracking-[0.2em]', accent.text)}>{project.title}</span>
              <strong className="mt-4 block text-3xl font-semibold tracking-normal text-frost">{project.metrics[0]?.value}</strong>
              <span className="mt-1 block text-xs text-muted">{project.metrics[0]?.label}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <div className="space-y-2">
                {project.features.slice(0, 4).map((feature, index) => (
                  <span key={feature} className="flex items-center gap-2 text-xs text-muted">
                    <span className={cn('h-1.5 w-1.5 rounded-full', index % 2 === 0 ? 'bg-violet-300' : 'bg-signal')} />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(141,92,255,0.16),rgba(77,212,198,0.06))] p-4">
            <div className="grid h-48 grid-cols-6 items-end gap-2 sm:h-60">
              {[46, 68, 54, 78, 64, 92].map((height, index) => (
                <motion.span
                  key={`${project.slug}-${height}`}
                  className="rounded-t-xl bg-[linear-gradient(180deg,#f7f5ff,rgba(169,139,255,0.56))]"
                  style={{ height: `${height}%` }}
                  initial={{ scaleY: 0.45, opacity: 0.45 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {project.stack.slice(0, 3).map((item) => (
                <span key={item} className="rounded-xl border border-white/10 bg-ink/45 px-3 py-3 text-center text-xs font-semibold text-mist">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute right-5 top-20 hidden rounded-2xl border border-white/10 bg-ink/82 p-4 shadow-premium backdrop-blur-2xl sm:block"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Maximize2 className="h-4 w-4 text-violet-300" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Preview</p>
          <p className="mt-1 text-sm font-semibold text-frost">Produto escalável</p>
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-5 hidden rounded-2xl border border-white/10 bg-frost p-4 text-ink shadow-[0_24px_70px_rgba(5,5,9,0.32)] sm:block"
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-violet-700" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">Stack</span>
          </div>
          <p className="mt-1 text-sm font-semibold">{project.stack.slice(0, 3).join(' · ')}</p>
        </motion.div>

        <Sparkles aria-hidden="true" className="absolute bottom-8 right-10 h-16 w-16 text-white/[0.035]" />
        <Layers3 aria-hidden="true" className="absolute left-10 top-28 h-14 w-14 text-white/[0.04]" />
      </motion.div>
    </div>
  );
}
