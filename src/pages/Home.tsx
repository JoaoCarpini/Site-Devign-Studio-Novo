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
    title: 'Arquitetura técnica',
    text: 'Módulos, APIs, dados, integrações e permissões pensados antes da interface final.',
    icon: ShieldCheck,
  },
  {
    title: 'Produto operacional',
    text: 'Interfaces e fluxos desenhados para times que usam o sistema todos os dias.',
    icon: ServerCog,
  },
  {
    title: 'Ecossistema conectado',
    text: 'APIs, automações e dados integrados para reduzir ilhas de informação.',
    icon: Network,
  },
];

const institutionalRoutes = [
  {
    label: 'Serviços',
    to: '/servicos',
    text: 'Conheça as frentes de desenvolvimento web, sistemas, APIs, automação, IA e integrações.',
  },
  {
    label: 'Projetos',
    to: '/projetos',
    text: 'Veja cases com contexto, problema, solução, stack e resultado operacional.',
  },
  {
    label: 'Processo',
    to: '/processo',
    text: 'Entenda como a Devign conduz briefing, estratégia, design, desenvolvimento, entrega e suporte.',
  },
  {
    label: 'Sobre',
    to: '/sobre',
    text: 'Conheça a visão, os princípios e o padrão de colaboração da software house.',
  },
];

export default function Home() {
  return (
    <>
      <CinematicHero />

      <section className="section-band light-section">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <SectionIntro
              eyebrow="Institucional"
              title="Uma estrutura de software house, não uma página promocional."
              text="A Home apresenta a visão executiva. As páginas internas aprofundam serviços, processo, cases, diferenciais e orçamento para que a experiência pareça uma empresa real, organizada e preparada para projetos de maior valor."
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
            title="Produtos digitais, sistemas internos e automações com base técnica consistente."
            text="A Devign atua em frentes complementares para criar software com valor comercial, sustentação operacional e possibilidade real de evolução."
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
              Ver todas as frentes de serviço
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
              title="Stack moderna organizada por camada de produto."
              text="React, TypeScript, APIs, Python, PostgreSQL, IA, Automação, GitHub e Vercel aparecem como parte de uma arquitetura integrada, não como lista decorativa."
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
              <h2 className="heading-lg text-balance">Comece por um briefing, não por uma proposta genérica.</h2>
              <p className="body-lead mt-5 max-w-3xl">
                A Devign qualifica contexto, prioridade, escopo e investimento para indicar o melhor caminho técnico com segurança.
              </p>
              <ButtonLink to="/orcamento" className="mt-8">
                Solicitar Projeto
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
