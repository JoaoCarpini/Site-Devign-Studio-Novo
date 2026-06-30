import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CircuitBoard, Layers3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../ui/LocaleLink';
import { Reveal } from '../animations/Reveal';
import { buttonStyles } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { cn } from '../../utils/cn';
import { useReduceMotion } from '../../hooks/useMediaQuery';
import { useRoutes } from '../../hooks/useContent';

type TeamSectionProps = {
  compact?: boolean;
};

type TeamMember = {
  name: string;
  initials: string;
  role: string;
  description: string;
  signal: string;
};

const particles = [
  'left-[8%] top-[18%]',
  'left-[22%] top-[76%]',
  'left-[48%] top-[16%]',
  'left-[68%] top-[72%]',
  'left-[86%] top-[28%]',
];

export function TeamSection({ compact = false }: TeamSectionProps) {
  const reduceMotion = useReduceMotion();
  const { t } = useTranslation('common');
  const routes = useRoutes();
  const teamMembers = t('team.members', { returnObjects: true }) as TeamMember[];
  const cardLabels = t('team.cardLabels', { returnObjects: true }) as string[];
  const cardIcons = [Layers3, BadgeCheck, CircuitBoard];

  return (
    <section className="section-band relative overflow-hidden border-y border-white/10 bg-ink">
      <div className="soft-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-violet-500/[0.09] blur-3xl sm:block sm:h-[34rem] sm:w-[34rem] sm:bg-violet-500/[0.14]" />
      <div className="pointer-events-none absolute -right-36 bottom-10 hidden h-80 w-80 rounded-full bg-signal/[0.08] blur-3xl sm:block" />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-premium-line" />

      {!reduceMotion && particles.map((position, index) => (
        <motion.span
          key={position}
          className={cn('pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-violet-400/[0.45] shadow-[0_0_28px_rgba(169,139,255,0.7)]', position)}
          animate={{ opacity: [0.25, 0.85, 0.25], scale: [1, 1.35, 1] }}
          transition={{ duration: 4.5 + index * 0.45, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="container-premium relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionIntro
            eyebrow={t('team.eyebrow')}
            title={compact ? t('team.compactTitle') : t('team.fullTitle')}
            text={compact ? t('team.compactText') : t('team.fullText')}
          />

          <Reveal delay={0.08}>
            <div className="relative min-w-0 rounded-[1.45rem] border border-white/10 bg-white/[0.045] p-4 shadow-premium sm:rounded-[2rem] sm:p-6 sm:backdrop-blur-2xl">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
              <div className="grid gap-3 sm:grid-cols-3">
                {cardLabels.map((label, index) => {
                  const Icon = cardIcons[index];

                  return (
                    <div key={label} className="min-w-0 rounded-[1.25rem] border border-white/10 bg-ink/50 p-4">
                      <Icon className="h-5 w-5 text-violet-400" />
                      <span className="mt-4 block break-words text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:tracking-[0.18em]">{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex min-w-0 items-center justify-between gap-4 rounded-[1.25rem] border border-violet-400/20 bg-violet-500/10 px-4 py-3">
                <span className="text-sm font-semibold text-frost">{t('team.structureText')}</span>
                <span className="hidden h-px flex-1 bg-premium-line sm:block" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-12">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-16 hidden h-px bg-gradient-to-r from-transparent via-violet-400/[0.35] to-transparent lg:block" />
          <div className="grid gap-4 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07}>
                <TeamCard member={member} index={index} reduceMotion={reduceMotion} />
              </Reveal>
            ))}
          </div>
        </div>

        {compact ? (
          <Reveal delay={0.12} className="mt-10 flex justify-center">
            <Link className={buttonStyles('secondary')} to={routes.about}>
              {t('team.compactButton')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
  reduceMotion,
}: {
  member: TeamMember;
  index: number;
  reduceMotion: boolean;
}) {
  const content = (
    <>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.35] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/0 blur-3xl transition duration-700 group-hover:bg-violet-500/[0.18]" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-violet-400/0 via-violet-400/40 to-violet-400/0 opacity-0 transition duration-700 group-hover:opacity-100" />

      <div className="relative flex min-h-[17rem] flex-col sm:min-h-[21rem]">
        <div className="flex items-start justify-between gap-5">
          <div className="relative">
            <div className="absolute inset-0 hidden rounded-full bg-violet-500/25 blur-xl transition duration-500 group-hover:bg-violet-400/40 sm:block" />
            <div className="relative grid h-16 w-16 place-items-center rounded-full border border-violet-400/[0.35] bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.2),rgba(141,92,255,0.16)_42%,rgba(5,5,9,0.86)_100%)] text-lg font-semibold text-frost shadow-[0_0_60px_rgba(141,92,255,0.2)] sm:h-20 sm:w-20 sm:text-xl">
              {member.initials}
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            0{index + 1}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="break-words text-2xl font-semibold leading-tight text-frost">{member.name}</h3>
          <p className="mt-2 text-sm font-semibold text-violet-400">{member.role}</p>
        </div>

        <p className="mt-5 flex-1 text-sm leading-7 text-mist">{member.description}</p>

        <div className="mt-8 flex min-w-0 items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="break-words text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:tracking-[0.18em]">{member.signal}</span>
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_24px_rgba(77,212,198,0.7)]" />
        </div>
      </div>
    </>
  );

  const className = 'group relative h-full min-w-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.052] p-5 shadow-[0_20px_70px_rgba(5,5,9,0.34)] sm:rounded-[1.65rem] sm:p-6 sm:shadow-[0_24px_90px_rgba(5,5,9,0.45)] sm:backdrop-blur-2xl';

  if (reduceMotion) {
    return <article className={className}>{content}</article>;
  }

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {content}
    </motion.article>
  );
}
