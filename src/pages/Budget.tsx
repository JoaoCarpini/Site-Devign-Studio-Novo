import { CheckCircle2, LockKeyhole, MessageCircle } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { Reveal } from '../components/animations/Reveal';
import { BudgetWizard } from '../components/forms/BudgetWizard';

const signals = [
  { label: 'Briefing estratégico', icon: CheckCircle2 },
  { label: 'Contato validado', icon: LockKeyhole },
  { label: 'Conversa com contexto', icon: MessageCircle },
];

export default function Budget() {
  return (
    <section className="relative max-w-full overflow-x-hidden pt-24 sm:pt-32 lg:pt-36">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-20 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-3xl sm:block" />

      <div className="container-premium relative mx-auto grid max-w-7xl gap-6 pb-12 pt-4 sm:gap-9 sm:pb-20 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-12 lg:pb-28">
        <Reveal className="min-w-0 lg:sticky lg:top-28">
          <span className="eyebrow mb-4">Diagnóstico inicial</span>
          <h1 className="max-w-3xl text-balance text-[clamp(2.2rem,11vw,3.2rem)] font-semibold leading-[0.98] tracking-normal text-frost lg:text-[4rem]">
            Contexto claro antes da proposta.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-mist sm:text-base sm:leading-8">
            Um fluxo curto para organizar objetivo, investimento, prazo e prioridades. A conversa começa com direção,
            não com suposições.
          </p>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:mt-8 lg:grid-cols-1">
            {signals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-3.5 py-3 text-sm font-semibold text-frost shadow-[0_14px_44px_rgba(5,5,9,0.2)] sm:backdrop-blur-lg"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-violet-300/20 bg-violet-500/[0.12] text-violet-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="min-w-0">
          <BudgetWizard />
        </Reveal>
      </div>
    </section>
  );
}
