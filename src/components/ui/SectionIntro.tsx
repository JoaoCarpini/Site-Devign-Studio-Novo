import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Reveal } from '../animations/Reveal';

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
};

export function SectionIntro({ eyebrow, title, text, align = 'left', tone = 'dark', className }: SectionIntroProps) {
  const isLight = tone === 'light';

  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <span
          className={cn(
            'mb-5 inline-flex max-w-full items-center gap-2 rounded-full border px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]',
            isLight ? 'border-ink/10 bg-ink/[0.04] text-violet-700' : 'border-white/10 bg-white/[0.06] text-violet-400',
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className={cn('heading-lg text-balance', isLight && 'text-ink')}>{title}</h2>
      {text ? <p className={cn('mt-5 text-base leading-8 sm:text-lg', isLight ? 'text-[#5a5468]' : 'text-mist')}>{text}</p> : null}
    </Reveal>
  );
}
