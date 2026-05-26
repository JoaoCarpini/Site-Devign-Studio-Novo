import { ArrowRight, CheckCircle2, Database, GitBranch, Network, ServerCog, Workflow } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { ServiceCard } from '../components/cards/ServiceCard';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { services } from '../data/site';

const pillars = [
  'Arquitetura antes da execução visual.',
  'Sistemas e integrações para reduzir ruído operacional.',
  'APIs, automações e IA conectadas ao fluxo real da empresa.',
  'Dashboards para transformar dados em leitura executiva.',
];

const deliveryStandards = [
  {
    title: 'Contratos digitais',
    text: 'Rotas, payloads, validações e autenticação desenhados para integração segura.',
    icon: Network,
  },
  {
    title: 'Dados com direção',
    text: 'Modelagem e persistência para reduzir divergência e acelerar decisão.',
    icon: Database,
  },
  {
    title: 'Fluxos automatizados',
    text: 'Jobs, webhooks e gatilhos para padronizar execução sem ruído.',
    icon: Workflow,
  },
  {
    title: 'Base versionada',
    text: 'Deploy, documentação e ciclos de evolução para manter a base sustentável.',
    icon: GitBranch,
  },
];

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-28">
          <Reveal className="max-w-4xl">
            <span className="eyebrow mb-6">Serviços</span>
            <h1 className="heading-xl text-balance">Infraestrutura digital para operação, dados e escala.</h1>
            <p className="body-lead mt-7 max-w-3xl">
              Da interface à lógica operacional, a Devign estrutura sistemas, APIs, automações e IA aplicada com foco em performance, controle e evolução.
            </p>
            <ButtonLink to="/orcamento" className="mt-9">
              Mapear escopo
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.key} delay={index * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Padrão técnico"
            title="Cada serviço é uma camada de arquitetura."
            text="Dados, permissões, integrações e evolução entram no escopo desde o início."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deliveryStandards.map((standard, index) => {
              const Icon = standard.icon;

              return (
                <Reveal key={standard.title} delay={index * 0.04}>
                  <article className="h-full rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-6 shadow-premium backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:bg-white/[0.075]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ServerCog className="h-5 w-5 text-white/20" />
                    </div>
                    <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">0{index + 1}</span>
                    <h3 className="mt-2 text-xl font-semibold tracking-normal text-frost">{standard.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{standard.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band bg-frost text-ink" data-cursor-glow="off">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="inline-flex rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
              Direção estratégica
            </span>
            <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
              O projeto certo nasce de uma leitura precisa da operação.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4a4658]">
              Nem toda empresa precisa começar por um sistema completo. Às vezes o maior valor está em uma API crítica, um dashboard confiável ou uma automação bem posicionada.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div key={pillar} className="flex gap-4 rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-violet-700" />
                <p className="text-sm font-medium leading-7 text-[#343040]">{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
