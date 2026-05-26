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
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/[0.12] blur-3xl" />

      <div className="container-premium relative grid gap-8 pb-20 pt-8 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-10 lg:pb-28">
        <Reveal className="lg:sticky lg:top-32">
          <span className="eyebrow mb-6">Diagnóstico inicial</span>
          <h1 className="max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-frost sm:text-5xl lg:text-[3.45rem]">
            Contexto antes de escopo.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist">
            Antes da proposta, a Devign organiza objetivo, investimento, prazo e prioridades. Assim a conversa começa com direção, não com suposições.
          </p>

          <div className="mt-8 grid gap-3">
            {intakeSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition duration-500 hover:border-violet-400/25 hover:bg-white/[0.07] hover:shadow-[0_18px_60px_rgba(141,92,255,0.1)]"
                >
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-violet-400/20 bg-violet-500/[0.1] text-violet-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-frost">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <BudgetWizard />
        </Reveal>
      </div>
    </section>
  );
}
