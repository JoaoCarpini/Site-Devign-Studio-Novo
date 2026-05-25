import { ArrowRight } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';

const guarantees = [
  'Escopo com entregáveis, prioridades e limites claros.',
  'Validações por etapa para reduzir surpresa no final.',
  'Decisões técnicas traduzidas com objetividade.',
  'Base preparada para manutenção, suporte e evolução.',
];

export default function Process() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative pb-20 pt-8 lg:pb-28">
          <Reveal className="max-w-4xl">
            <span className="eyebrow mb-6">Processo</span>
            <h1 className="heading-xl text-balance">Um método para transformar intenção em direção técnica.</h1>
            <p className="body-lead mt-7 max-w-3xl">
              Projetos digitais de alto valor exigem controle. A Devign organiza diagnóstico, estratégia, design, desenvolvimento e entrega para reduzir risco e manter foco no que importa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-band pt-0">
        <div className="container-premium">
          <ProcessTimeline />
        </div>
      </section>

      <section className="section-band bg-frost text-ink" data-cursor-glow="off">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="inline-flex rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
              Governança
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
              Clareza sobre o que será construído, por quê e em qual ordem.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {guarantees.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]">
                <p className="text-sm font-medium leading-7 text-[#343040]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 shadow-premium backdrop-blur-2xl sm:p-12">
          <SectionIntro
            eyebrow="Próximo passo"
            title="Comece com uma leitura bem estruturada."
            text="O briefing reúne contexto suficiente para transformar intenção em caminho técnico e comercial."
          />
          <ButtonLink to="/orcamento" className="mt-8">
            Iniciar diagnóstico
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
