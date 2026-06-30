import { Bot, BrainCircuit, Cloud, Code2, Database, Github, ServerCog, Workflow } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../animations/Reveal';
import { cn } from '../../utils/cn';
import { useAndroidCompatibility, useIsMobile } from '../../hooks/useMediaQuery';

const icons = [Code2, ServerCog, Workflow, Bot, Database, BrainCircuit, Workflow, Github, Cloud];

export function TechCloud() {
  const isMobile = useIsMobile();
  const androidCompatibility = useAndroidCompatibility();
  const { t } = useTranslation('home');
  const technologies = t('mobile.stack', { returnObjects: true }) as Array<{ name: string; layer: string }>;

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
        const Icon = icons[index];

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
