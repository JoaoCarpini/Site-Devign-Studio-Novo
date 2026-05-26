import { ArrowRight, CheckCircle2, Code2, Layers3, Network, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { TeamSection } from '../components/sections/TeamSection';
import { TechCloud } from '../components/sections/TechCloud';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';

const visionPillars = [
  {
    title: 'Presença como ativo',
    text: 'Interfaces, narrativa e acabamento para marcas que precisam sustentar valor antes da primeira conversa.',
    icon: Sparkles,
  },
  {
    title: 'Engenharia aplicada',
    text: 'Sistemas, APIs, dados e automações pensados para rotina real e evolução.',
    icon: Code2,
  },
  {
    title: 'Operação conectada',
    text: 'Tecnologia integrada a processos comerciais, atendimento, gestão e indicadores.',
    icon: Network,
  },
];

const principles = [
  'Clareza antes de complexidade. Tecnologia precisa melhorar decisão.',
  'Design como ativo de posicionamento. Percepção também é infraestrutura comercial.',
  'Arquitetura como proteção de futuro. Software precisa evoluir sem perder controle.',
  'Processo com transparência. Prioridade, escopo e trade-offs precisam estar visíveis.',
];

const cultureSignals = [
  'Pensamento de produto',
  'Entrega orientada a valor',
  'Comunicação direta',
  'Qualidade visual e técnica',
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 sm:pt-40">
        <AuroraBackground />
        <div className="hero-fine-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute left-1/2 top-20 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/[0.12] blur-3xl" />

        <div className="container-premium relative grid gap-12 pb-20 pt-8 lg:grid-cols-[1fr_0.74fr] lg:items-end lg:pb-28">
          <Reveal>
            <span className="eyebrow mb-6">Sobre a Devign</span>
            <h1 className="heading-xl max-w-5xl text-balance">
              Uma software house premium para empresas que precisam sustentar presença, operação e escala.
            </h1>
            <p className="body-lead mt-7 max-w-3xl">
              A Devign Studio combina design, engenharia e automação para construir ativos digitais com precisão técnica e percepção premium.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-premium backdrop-blur-2xl">
              <div className="absolute inset-x-7 top-0 h-px bg-premium-line" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-400">Posicionamento</p>
              <p className="mt-5 text-2xl font-semibold leading-tight text-frost">
                Menos execução isolada. Mais estratégia, engenharia e presença digital operando como sistema.
              </p>
              <div className="mt-7 grid gap-3">
                {['Luxury tech', 'Software sob medida', 'Automação estratégica'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 text-sm font-semibold text-mist">
                    <CheckCircle2 className="h-4 w-4 text-violet-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-band relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionIntro
              eyebrow="Visão"
              title="Tecnologia com forma, método e impacto operacional."
              text="A Devign existe para substituir improviso digital por ativos que aumentam clareza comercial, eficiência interna ou capacidade de escala."
            />
            <div className="grid gap-4">
              {visionPillars.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 shadow-premium backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-violet-400/[0.35] hover:bg-white/[0.08]">
                      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                      <div className="flex gap-5">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/[0.12] text-violet-400">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h2 className="text-xl font-semibold text-frost">{item.title}</h2>
                          <p className="mt-3 text-sm leading-7 text-mist">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow="Tecnologias"
              title="Stack para interfaces, APIs, dados, automação e IA aplicada."
              text="A escolha tecnológica segue a função do projeto: presença premium, operação interna, dashboards, integrações ou inteligência aplicada."
            />
            <TechCloud />
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Processo"
            title="Um método claro para reduzir incerteza."
            text="Cada entrega avança por prioridade, direção visual, arquitetura, desenvolvimento e suporte."
            align="center"
          />
          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="section-band relative overflow-hidden border-y border-white/10 bg-white/[0.025]">
        <div className="soft-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="container-premium relative grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <SectionIntro
            eyebrow="Cultura"
            title="Uma operação compacta para decisões melhores."
            text="A cultura da Devign combina senso estético, visão de negócio e responsabilidade de engenharia para construir ativos digitais, não peças soltas."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {cultureSignals.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-violet-400/[0.35] hover:bg-white/[0.08]">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/[0.12] text-violet-400">
                    {index % 2 === 0 ? <Layers3 className="h-5 w-5" /> : <Workflow className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-frost">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    Decisões com contexto, acabamento consistente e foco no que melhora a experiência real.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <span className="eyebrow mb-5">Princípios</span>
              <h2 className="heading-lg text-balance">O padrão é pensar como parceiro técnico, não como fornecedor de tela.</h2>
            </Reveal>
            <div className="grid gap-4">
              {principles.map((principle, index) => (
                <Reveal key={principle} delay={index * 0.04}>
                  <div className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_16px_60px_rgba(5,5,9,0.22)] backdrop-blur-xl">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-violet-400" />
                    <p className="text-sm font-medium leading-7 text-mist">{principle}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-16">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.24),rgba(255,255,255,0.06)_42%,rgba(77,212,198,0.09))] p-8 shadow-premium sm:p-12">
              <div className="absolute inset-x-8 top-0 h-px bg-premium-line" />
              <h2 className="heading-lg max-w-4xl text-balance">Projetos sérios começam com contexto, método e direção técnica.</h2>
              <p className="body-lead mt-5 max-w-3xl">
                Conte onde sua empresa quer chegar. A Devign organiza a rota entre presença digital, software, automação e integração.
              </p>
              <ButtonLink to="/orcamento" className="mt-8">
                Iniciar diagnóstico
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
