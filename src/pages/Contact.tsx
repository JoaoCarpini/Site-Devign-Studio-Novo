import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { BudgetWizard } from '../components/forms/BudgetWizard';
import { Reveal } from '../components/animations/Reveal';

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative grid gap-12 pb-20 pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:pb-28">
          <Reveal>
            <span className="eyebrow mb-6">Contato / Orçamento</span>
            <h1 className="heading-xl text-balance">Vamos qualificar o projeto antes da proposta.</h1>
            <p className="body-lead mt-7">
              Preencha o briefing inicial para entendermos tipo de projeto, objetivo, investimento, prazo e funcionalidades. Isso permite uma conversa mais estratégica e uma proposta menos genérica.
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-400">Retorno</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Após o envio, a próxima etapa é uma conversa objetiva para validar escopo, prioridade e caminho técnico.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <BudgetWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
