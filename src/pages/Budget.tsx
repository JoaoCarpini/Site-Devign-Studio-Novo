import { DatabaseZap, ShieldCheck, Workflow } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { BudgetWizard } from '../components/forms/BudgetWizard';
import { Reveal } from '../components/animations/Reveal';

const intakeSignals = [
  {
    title: 'Entrada qualificada',
    description: 'Contato validado para manter a conversa objetiva.',
    icon: ShieldCheck,
  },
  {
    title: 'Briefing estratégico',
    description: 'Objetivo, investimento e escopo chegam com direção.',
    icon: Workflow,
  },
  {
    title: 'Atendimento com contexto',
    description: 'O próximo contato já começa com contexto real.',
    icon: DatabaseZap,
  },
];

export default function Budget() {
  return (
    <section className="relative max-w-full overflow-x-hidden pt-24 sm:pt-32 lg:pt-40">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-violet-500/[0.1] blur-3xl sm:top-28 sm:h-[28rem] sm:w-[28rem] sm:bg-violet-500/[0.12]" />

      <div className="container-premium relative grid min-w-0 max-w-full gap-4 overflow-x-hidden pb-10 pt-3 sm:gap-6 sm:pb-16 sm:pt-6 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-10 lg:overflow-visible lg:pb-28">
        <Reveal className="min-w-0 lg:sticky lg:top-32">
          <span className="eyebrow mb-4 max-w-full sm:mb-5 lg:mb-6">Diagnóstico inicial</span>
          <h1 className="max-w-full text-balance text-[clamp(2rem,10.5vw,2.65rem)] font-semibold leading-[1.02] tracking-normal text-frost sm:max-w-xl sm:text-[2.85rem] lg:text-[3.45rem]">
            Contexto antes de escopo.
          </h1>
          <p className="mt-3 max-w-full text-sm leading-6 text-mist sm:mt-4 sm:max-w-xl sm:text-base sm:leading-8 lg:mt-5">
            Antes da proposta, a Devign organiza objetivo, investimento, prazo e prioridades. Assim a conversa começa com
            direção, não com suposições.
          </p>

          <div className="mt-8 hidden gap-3 lg:grid">
            {intakeSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative min-w-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition duration-500 hover:border-violet-400/25 hover:bg-white/[0.07] hover:shadow-[0_18px_60px_rgba(141,92,255,0.1)]"
                >
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex min-w-0 gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/[0.1] text-violet-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-frost">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0 max-w-full">
          <BudgetWizard />
        </Reveal>
      </div>
    </section>
  );
}
