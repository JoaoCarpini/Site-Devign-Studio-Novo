import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { BudgetWizard } from '../components/forms/BudgetWizard';
import { Reveal } from '../components/animations/Reveal';

export default function Contact() {
  return (
    <>
      <section className="relative max-w-full overflow-x-hidden pt-24 sm:pt-32 lg:pt-40">
        <AuroraBackground />
        <div className="container-premium relative grid min-w-0 max-w-full gap-4 overflow-x-hidden pb-10 pt-3 sm:gap-6 sm:pb-16 sm:pt-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-10 lg:overflow-visible lg:pb-28">
          <Reveal className="min-w-0 lg:sticky lg:top-32">
            <span className="eyebrow mb-4 max-w-full sm:mb-5 lg:mb-6">Contato / Orçamento</span>
            <h1 className="max-w-full text-balance text-[clamp(2rem,10vw,2.6rem)] font-semibold leading-[1.02] tracking-normal text-frost sm:max-w-xl sm:text-[2.85rem] lg:text-[3.45rem]">
              Vamos qualificar o projeto antes da proposta.
            </h1>
            <p className="mt-3 max-w-full text-sm leading-6 text-mist sm:mt-4 sm:max-w-xl sm:text-base sm:leading-8 lg:mt-5">
              Preencha o briefing inicial para entendermos tipo de projeto, objetivo, investimento, prazo e funcionalidades.
              Isso permite uma conversa mais precisa e uma proposta com direção real.
            </p>
            <div className="mt-8 hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-400">Retorno</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Após o envio, a próxima etapa é uma conversa objetiva para validar escopo, prioridade e caminho técnico.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0 max-w-full">
            <BudgetWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
