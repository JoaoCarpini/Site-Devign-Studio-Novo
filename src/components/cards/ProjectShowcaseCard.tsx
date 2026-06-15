import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Project } from '../../data/site';
import { cn } from '../../utils/cn';
import { Reveal } from '../animations/Reveal';
import { ButtonLink } from '../ui/Button';
import { useAndroidCompatibility } from '../../hooks/useMediaQuery';

const accentStyles: Record<
  Project['accent'],
  {
    border: string;
    chip: string;
    glow: string;
  }
> = {
  violet: {
    border: 'border-violet-500/20',
    chip: 'bg-violet-500/10 text-violet-200 border-violet-500/20',
    glow: 'bg-violet-500/10',
  },
  signal: {
    border: 'border-emerald-500/20',
    chip: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20',
    glow: 'bg-emerald-500/10',
  },
  amber: {
    border: 'border-amber-500/20',
    chip: 'bg-amber-500/10 text-amber-200 border-amber-500/20',
    glow: 'bg-amber-500/10',
  },
};

export function ProjectShowcaseCard({
  project,
}: {
  project: Project;
  featured?: boolean;
}) {
  const accent = accentStyles[project.accent];
  const androidCompatibility = useAndroidCompatibility();

  return (
    <Reveal>
      <article
        className={cn(
          'relative overflow-hidden rounded-3xl border bg-[#0B0B12] p-5 sm:p-8',
          accent.border,
          androidCompatibility && 'android-safe android-no-motion',
        )}
      >
        <div
          className={cn(
            'absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl',
            accent.glow,
          )}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
                accent.chip,
              )}
            >
              {project.category}
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              {project.slug}
            </span>
          </div>

          <h3 className="mt-5 text-3xl font-semibold text-white">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-zinc-300">
            {project.summary}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <strong className="block text-xl text-white">
                  {metric.value}
                </strong>

                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-zinc-400">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Problema
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                Solução
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Funcionalidades
            </p>

            <div className="mt-4 grid gap-2">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-violet-300" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink to="/orcamento">
              Conversar sobre projeto
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </article>
    </Reveal>
  );
}