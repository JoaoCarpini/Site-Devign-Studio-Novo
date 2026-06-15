import { Bot, BrainCircuit, Cloud, Code2, Database, Github, ServerCog, Workflow } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { cn } from '../../utils/cn';
import { useAndroidCompatibility, useIsMobile } from '../../hooks/useMediaQuery';

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
  const isMobile = useIsMobile();
  const androidCompatibility = useAndroidCompatibility();

  const cardClassName = cn(
    'min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-left transition duration-300',
    'shadow-[0_10px_30px_rgba(5,5,9,0.14)]',
    'hover:border-violet-400/35 hover:bg-white/[0.085]',
    androidCompatibility && 'android-safe android-no-motion',
  );

  return (
    <Reveal className={cn(
      'grid gap-3',
      isMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3',
    )}>
      {technologies.map((technology, index) => {
        const Icon = technology.icon;

        return (
          <div key={technology.name} className={cardClassName}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:tracking-[0.2em]">
                0{index + 1}
              </span>
            </div>
            <strong className="mt-5 block break-words text-base font-semibold tracking-normal text-frost sm:text-lg">
              {technology.name}
            </strong>
            <span className="mt-1 block text-sm leading-6 text-muted">
              {technology.layer}
            </span>
          </div>
        );
      })}
    </Reveal>
  );
}
