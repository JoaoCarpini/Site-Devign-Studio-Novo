import { Bot, BrainCircuit, Cloud, Code2, Database, Github, ServerCog, Workflow } from 'lucide-react';
import { Reveal } from '../animations/Reveal';

const technologies = [
  { name: 'React', layer: 'Interfaces', icon: Code2 },
  { name: 'TypeScript', layer: 'Contratos', icon: ServerCog },
  { name: 'APIs', layer: 'Integração', icon: Workflow },
  { name: 'Python', layer: 'Automação', icon: Bot },
  { name: 'PostgreSQL', layer: 'Dados', icon: Database },
  { name: 'IA', layer: 'Inteligência', icon: BrainCircuit },
  { name: 'Automação', layer: 'Operação', icon: Workflow },
  { name: 'GitHub', layer: 'Versionamento', icon: Github },
  { name: 'Vercel', layer: 'Deploy', icon: Cloud },
];

export function TechCloud() {
  return (
    <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {technologies.map((technology, index) => {
        const Icon = technology.icon;

        return (
          <div
            key={technology.name}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:bg-white/[0.085] sm:p-5 sm:backdrop-blur-xl"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-premium-line opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:tracking-[0.2em]">0{index + 1}</span>
            </div>
            <strong className="mt-5 block break-words text-base font-semibold tracking-normal text-frost sm:text-lg">{technology.name}</strong>
            <span className="mt-1 block text-sm text-muted">{technology.layer}</span>
          </div>
        );
      })}
    </Reveal>
  );
}
