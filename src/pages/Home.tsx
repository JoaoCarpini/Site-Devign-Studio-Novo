import { ArrowRight, Building2, MoveRight, Network, ServerCog, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ArchitectureBlueprint } from '../components/sections/ArchitectureBlueprint';
import { CinematicHero } from '../components/sections/CinematicHero';
import { DevelopmentSystem } from '../components/sections/DevelopmentSystem';
import { EngineeringCapabilities } from '../components/sections/EngineeringCapabilities';
import { ProjectShowcase } from '../components/sections/ProjectShowcase';
import { TechCloud } from '../components/sections/TechCloud';
import { TeamSection } from '../components/sections/TeamSection';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { services } from '../data/site';

const companySignals = [
  {
    title: 'Arquitetura antes da interface',
    text: 'Módulos, dados, permissões e integrações definidos antes do acabamento visual.',
    icon: ShieldCheck,
  },
  {
    title: 'Produto em operação',
    text: 'Interfaces desenhadas para rotina real, decisão rápida e uso recorrente.',
    icon: ServerCog,
  },
  {
    title: 'Ecossistema conectado',
    text: 'APIs, automações e dados integrados para eliminar fricção operacional.',
    icon: Network,
  },
];

const institutionalRoutes = [
  {
    label: 'Serviços',
    to: '/servicos',
    text: 'Conheça as camadas de tecnologia que estruturam presença, operação e escala.',
  },
  {
    label: 'Projetos',
    to: '/projetos',
    text: 'Explore fragmentos de produtos digitais, sistemas e soluções em operação.',
  },
  {
    label: 'Processo',
    to: '/processo',
    text: 'Entenda como estratégia, design e engenharia avançam com controle.',
  },
  {
    label: 'Sobre',
    to: '/sobre',
    text: 'Conheça a visão, os princípios e o padrão de exigência da Devign.',
  },
];

export default function Home() {
  return (
    <>
      <CinematicHero />

      <section className="section-band light-section" data-cursor-glow="off">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <SectionIntro
              eyebrow="Institucional"
              title="Uma estrutura digital para empresas que precisam parecer maiores."
              text="A Home apresenta a visão executiva. As páginas internas aprofundam tecnologia, processo e direção estratégica para projetos de maior valor."
              tone="light"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {institutionalRoutes.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.05}>
                  <Link
                    to={item.to}
                    className="light-card group block h-full p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">{item.label}</span>
                      <MoveRight className="h-4 w-4 text-[#7a728b] transition duration-500 group-hover:translate-x-1 group-hover:text-violet-700" />
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[#5a5468]">{item.text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ArchitectureBlueprint />
      <EngineeringCapabilities />

      <section className="section-band">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Frentes de entrega"
            title="Software, automação e presença digital com a mesma direção estratégica."
            text="A Devign combina interface, dados e engenharia para construir ativos digitais com valor comercial e sustentação operacional."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 4).map((service, index) => (
              <Reveal key={service.key} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/servicos" variant="secondary">
              Explorar serviços
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <DevelopmentSystem />

      <ProjectShowcase compact />

      <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow="Tecnologia"
              title="Stack moderna, escolhida por função."
              text="React, TypeScript, APIs, Python, PostgreSQL, IA e automação entram quando sustentam performance, integração e evolução."
            />
            <TechCloud />
          </div>
        </div>
      </section>

      <TeamSection compact />

      <section className="section-band">
        <div className="container-premium">
          <div className="grid gap-4 lg:grid-cols-3">
            {companySignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05} className="premium-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-normal text-frost">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.26),rgba(255,255,255,0.06)_42%,rgba(77,212,198,0.1))] p-8 shadow-premium sm:p-12 lg:p-14">
            <div className="absolute inset-x-8 top-0 h-px bg-premium-line" />
            <Reveal className="max-w-4xl">
              <span className="eyebrow mb-5">Orçamento</span>
              <h2 className="heading-lg text-balance">Comece por uma leitura estratégica, não por uma estimativa rasa.</h2>
              <p className="body-lead mt-5 max-w-3xl">
                A Devign qualifica contexto, prioridade, escopo e investimento antes de sugerir o caminho técnico.
              </p>
              <ButtonLink to="/orcamento" className="mt-8">
                Iniciar diagnóstico
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
            <Building2 className="absolute bottom-8 right-8 hidden h-24 w-24 text-white/10 lg:block" />
          </div>
        </div>
      </section>
    </>
  );
}
