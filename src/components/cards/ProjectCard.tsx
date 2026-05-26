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
    <article className="group overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] shadow-[0_12px_40px_rgba(5,5,9,0.25)] backdrop-blur-lg transition duration-300 hover:-translate-y-0.5 hover:border-white/18 sm:rounded-[1.75rem] sm:shadow-premium sm:hover:-translate-y-1 sm:hover:border-white/20 sm:backdrop-blur-2xl">
      <div className={cn('relative h-40 overflow-hidden bg-gradient-to-br sm:h-72', accentStyles[project.accent])}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_38%,rgba(255,255,255,0.05)_74%,transparent)] opacity-50 transition duration-500 group-hover:translate-x-3" />
        <div className="absolute inset-x-4 bottom-4 top-6 rounded-[1rem] border border-white/12 bg-ink/70 p-3 shadow-[0_10px_32px_rgba(5,5,9,0.32)] backdrop-blur-lg sm:inset-x-6 sm:bottom-6 sm:top-7 sm:rounded-[1.25rem] sm:p-4 sm:shadow-premium sm:backdrop-blur-xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 sm:gap-2 sm:pb-3">
            <span className="h-2 w-2 rounded-full bg-[#ff6b6b] sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-[#ffd166] sm:h-2.5 sm:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-[#4dd4c6] sm:h-2.5 sm:w-2.5" />
          </div>
          <div className="mt-3 hidden grid-cols-1 gap-2 sm:mt-5 sm:grid sm:grid-cols-[0.8fr_1.2fr] sm:gap-4">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="block h-2.5 rounded-full bg-white/30 sm:h-3" />
              <span className="block h-2.5 w-2/3 rounded-full bg-white/12 sm:h-3" />
              <span className="block h-12 rounded-2xl border border-white/10 bg-white/[0.07] sm:h-16" />
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              <span className="block h-16 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.35),rgba(77,212,198,0.14))] sm:h-24" />
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <span className="h-8 rounded-xl bg-white/[0.08] sm:h-10" />
                <span className="h-8 rounded-xl bg-white/[0.12] sm:h-10" />
                <span className="h-8 rounded-xl bg-white/[0.08] sm:h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3.5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400 sm:text-sm sm:tracking-[0.2em]">{project.category}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-normal text-frost sm:mt-3 sm:text-2xl">{project.title}</h3>
        <p className="mt-2 text-xs leading-5 text-muted sm:mt-3 sm:text-sm sm:leading-6">{project.context}</p>

        <div className="mt-4 grid gap-3 text-xs text-mist sm:mt-6 sm:gap-4 sm:text-sm md:grid-cols-3">
          <div>
            <span className="font-semibold text-frost">Problema</span>
            <p className="mt-1.5 leading-5 text-muted sm:mt-2 sm:leading-6">{project.problem}</p>
          </div>
          <div className="hidden sm:block">
            <span className="font-semibold text-frost">Solução</span>
            <p className="mt-1.5 leading-5 text-muted sm:mt-2 sm:leading-6">{project.solution}</p>
          </div>
          <div className="hidden md:block">
            <span className="font-semibold text-frost">Resultado</span>
            <p className="mt-1.5 leading-5 text-muted sm:mt-2 sm:leading-6">{project.result}</p>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.7rem] font-medium text-mist sm:px-3 sm:py-1.5 sm:text-xs">
              {item}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[0.7rem] font-medium text-mist sm:px-3 sm:py-1.5 sm:text-xs">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        <ButtonLink to="/orcamento" variant="secondary" className="mt-4 w-full sm:mt-7 sm:w-auto">
          Conversar
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
