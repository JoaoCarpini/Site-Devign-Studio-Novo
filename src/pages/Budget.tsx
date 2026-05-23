import { ArrowRight, CheckCircle2, DatabaseZap, LockKeyhole, MessagesSquare, ShieldCheck, Workflow } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { BudgetWizard } from '../components/forms/BudgetWizard';
import { Reveal } from '../components/animations/Reveal';

const intakeSignals = [
  {
    title: 'Validação real de email',
    description: 'O envio passa por API server-side com verificação de formato, domínio, MX, entregabilidade e risco.',
    icon: ShieldCheck,
  },
  {
    title: 'Briefing estruturado',
    description: 'Projeto, objetivo, investimento, prazo, funcionalidades e integrações chegam organizados como pré-diagnóstico.',
    icon: Workflow,
  },
  {
    title: 'Entrega para atendimento',
    description: 'Após aprovação, o briefing é enviado por email e o WhatsApp abre com o resumo pronto para continuidade.',
    icon: DatabaseZap,
  },
];

const nextSteps = ['Validação anti-spam e email', 'Envio estruturado para a Devign', 'Continuidade automática no WhatsApp'];

export default function Budget() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-violet-500/[0.12] blur-3xl" />

      <div className="container-premium relative grid gap-12 pb-20 pt-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:pb-28">
        <Reveal>
          <span className="eyebrow mb-6">Onboarding de projeto</span>
          <h1 className="heading-xl max-w-4xl text-balance">
            Um fluxo premium de briefing, validação e atendimento.
          </h1>
          <p className="body-lead mt-7 max-w-2xl">
            Antes da proposta, a Devign organiza contexto, objetivo, investimento e escopo. O sistema valida o email,
            protege contra spam, envia o briefing estruturado e prepara a conversa no WhatsApp.
          </p>

          <div className="mt-10 grid gap-4">
            {intakeSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-500 hover:border-violet-400/30 hover:bg-white/[0.085] hover:shadow-[0_22px_80px_rgba(141,92,255,0.14)]"
                >
                  <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/[0.12] text-violet-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-frost">{item.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-mist">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-ink/45 p-5 shadow-premium backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-signal/25 bg-signal/[0.1] text-signal">
                <MessagesSquare className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Após o envio</span>
                <h2 className="mt-1 text-lg font-semibold text-frost">A conversa continua com contexto real.</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {nextSteps.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-mist">
                  <CheckCircle2 className="h-4 w-4 text-violet-400" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-400">
              <LockKeyhole className="h-4 w-4" />
              Proteção server-side com CRM/API/email-ready
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <BudgetWizard />
        </Reveal>
      </div>
    </section>
  );
}
