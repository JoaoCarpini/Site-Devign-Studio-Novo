import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, CircuitBoard, Layers3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../animations/Reveal';
import { buttonStyles } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { cn } from '../../utils/cn';

type TeamSectionProps = {
  compact?: boolean;
};

const teamMembers = [
  {
    name: 'Gabrielle Almeida',
    initials: 'GA',
    role: 'Head of Design & Branding',
    description: 'Direção visual, identidade e experiências digitais para marcas que precisam sustentar percepção premium.',
    signal: 'Design system',
  },
  {
    name: 'Isabely Perez',
    initials: 'IP',
    role: 'Customer Success & Strategy',
    description: 'Estratégia, relacionamento e alinhamento entre contexto de negócio, experiência e entrega.',
    signal: 'Client strategy',
  },
  {
    name: 'João Pedro Carpini',
    initials: 'JP',
    role: 'Lead Developer & Automation',
    description: 'Sistemas, automações e arquitetura tecnológica para eficiência, escala e performance.',
    signal: 'Software architecture',
  },
];

const particles = [
  'left-[8%] top-[18%]',
  'left-[22%] top-[76%]',
  'left-[48%] top-[16%]',
  'left-[68%] top-[72%]',
  'left-[86%] top-[28%]',
];

export function TeamSection({ compact = false }: TeamSectionProps) {
  return (
    <section className="section-band relative overflow-hidden border-y border-white/10 bg-ink">
      <div className="soft-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-500/[0.14] blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-10 h-80 w-80 rounded-full bg-signal/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-premium-line" />

      {particles.map((position, index) => (
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
            eyebrow="Equipe"
            title={compact ? 'Estratégia, design e engenharia no mesmo núcleo.' : 'Uma equipe enxuta para projetos digitais de alto valor.'}
            text={
              compact
                ? 'A Devign combina visão de marca, relacionamento consultivo e arquitetura de software para entregar experiências digitais de alto valor.'
                : 'A estrutura da Devign une clareza comercial, acabamento visual e execução técnica. Posicionamento, experiência, software e evolução trabalham como sistema.'
            }
          />

          <Reveal delay={0.08}>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-premium backdrop-blur-2xl sm:p-6">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Marca', icon: Layers3 },
                  { label: 'Entrega', icon: BadgeCheck },
                  { label: 'Engenharia', icon: CircuitBoard },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-[1.25rem] border border-white/10 bg-ink/50 p-4">
                      <Icon className="h-5 w-5 text-violet-400" />
                      <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.25rem] border border-violet-400/20 bg-violet-500/10 px-4 py-3">
                <span className="text-sm font-semibold text-frost">Estrutura compacta, decisão rápida e execução especializada.</span>
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
                <TeamCard member={member} index={index} />
              </Reveal>
            ))}
          </div>
        </div>

        {compact ? (
          <Reveal delay={0.12} className="mt-10 flex justify-center">
            <Link className={buttonStyles('secondary')} to="/sobre">
              Conhecer núcleo
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
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.052] p-6 shadow-[0_24px_90px_rgba(5,5,9,0.45)] backdrop-blur-2xl"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.35] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/0 blur-3xl transition duration-700 group-hover:bg-violet-500/[0.18]" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-violet-400/0 via-violet-400/40 to-violet-400/0 opacity-0 transition duration-700 group-hover:opacity-100" />

      <div className="relative flex min-h-[21rem] flex-col">
        <div className="flex items-start justify-between gap-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-violet-500/25 blur-xl transition duration-500 group-hover:bg-violet-400/40" />
            <div className="relative grid h-20 w-20 place-items-center rounded-full border border-violet-400/[0.35] bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.2),rgba(141,92,255,0.16)_42%,rgba(5,5,9,0.86)_100%)] text-xl font-semibold text-frost shadow-[0_0_60px_rgba(141,92,255,0.2)]">
              {member.initials}
            </div>
          </div>
          <span className="rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            0{index + 1}
          </span>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold leading-tight text-frost">{member.name}</h3>
          <p className="mt-2 text-sm font-semibold text-violet-400">{member.role}</p>
        </div>

        <p className="mt-5 flex-1 text-sm leading-7 text-mist">{member.description}</p>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{member.signal}</span>
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_24px_rgba(77,212,198,0.7)]" />
        </div>
      </div>
    </motion.article>
  );
}
