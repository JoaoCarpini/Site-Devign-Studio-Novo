import { ArrowRight } from 'lucide-react';
import type { Project } from '../../data/site';
import { ButtonLink } from '../ui/Button';
import { cn } from '../../utils/cn';

const accentStyles: Record<Project['accent'], string> = {
  violet: 'from-violet-500/28 via-violet-400/10 to-transparent text-violet-400',
  signal: 'from-signal/22 via-signal/10 to-transparent text-signal',
  amber: 'from-amber/24 via-amber/10 to-transparent text-amber',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] shadow-premium backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className={cn('relative h-72 overflow-hidden bg-gradient-to-br', accentStyles[project.accent])}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),transparent_38%,rgba(255,255,255,0.08)_74%,transparent)] opacity-70 transition duration-500 group-hover:translate-x-4" />
        <div className="absolute inset-x-6 bottom-6 top-7 rounded-[1.25rem] border border-white/14 bg-ink/72 p-4 shadow-premium backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4dd4c6]" />
          </div>
          <div className="mt-5 grid grid-cols-[0.8fr_1.2fr] gap-4">
            <div className="space-y-3">
              <span className="block h-3 rounded-full bg-white/30" />
              <span className="block h-3 w-2/3 rounded-full bg-white/12" />
              <span className="block h-16 rounded-2xl border border-white/10 bg-white/[0.07]" />
            </div>
            <div className="space-y-3">
              <span className="block h-24 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.35),rgba(77,212,198,0.14))]" />
              <div className="grid grid-cols-3 gap-2">
                <span className="h-10 rounded-xl bg-white/[0.08]" />
                <span className="h-10 rounded-xl bg-white/[0.12]" />
                <span className="h-10 rounded-xl bg-white/[0.08]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">{project.category}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-normal text-frost">{project.title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{project.context}</p>

        <div className="mt-6 grid gap-4 text-sm text-mist md:grid-cols-3">
          <div>
            <span className="font-semibold text-frost">Problema</span>
            <p className="mt-2 leading-6 text-muted">{project.problem}</p>
          </div>
          <div>
            <span className="font-semibold text-frost">Solução</span>
            <p className="mt-2 leading-6 text-muted">{project.solution}</p>
          </div>
          <div>
            <span className="font-semibold text-frost">Resultado</span>
            <p className="mt-2 leading-6 text-muted">{project.result}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-mist">
              {item}
            </span>
          ))}
        </div>

        <ButtonLink to="/orcamento" variant="secondary" className="mt-7">
          Conversar sobre projeto semelhante
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
