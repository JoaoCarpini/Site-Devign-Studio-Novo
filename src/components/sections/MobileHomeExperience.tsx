import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Github,
  LayoutDashboard,
  Layers3,
  PanelsTopLeft,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/site';

const mobileServices = [
  {
    title: 'Landing Pages',
    text: 'Páginas rápidas, modernas e focadas em conversão qualificada.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Sistemas Web',
    text: 'Soluções personalizadas para empresas, equipes e operações.',
    icon: LayoutDashboard,
  },
  {
    title: 'Automações',
    text: 'Fluxos inteligentes para reduzir trabalho manual e ruído operacional.',
    icon: Workflow,
  },
  {
    title: 'IA Aplicada',
    text: 'Assistentes, triagem e inteligência conectadas ao contexto do negócio.',
    icon: BrainCircuit,
  },
  {
    title: 'APIs',
    text: 'Contratos digitais para integrar dados, produtos e plataformas.',
    icon: Cable,
  },
  {
    title: 'Dashboards',
    text: 'Indicadores e visualização de dados para leitura executiva.',
    icon: Gauge,
  },
  {
    title: 'Branding Digital',
    text: 'Identidade, presença e percepção premium em interfaces digitais.',
    icon: PenTool,
  },
];

const authorityCards = [
  {
    title: 'Design com direção',
    text: 'Hierarquia visual, identidade e clareza para marcas que precisam sustentar valor.',
    icon: Layers3,
  },
  {
    title: 'Estratégia antes da tela',
    text: 'Contexto, prioridade e arquitetura definidos antes da execução visual.',
    icon: ShieldCheck,
  },
  {
    title: 'Engenharia para operar',
    text: 'Interfaces, dados e integrações pensados para uso real e evolução contínua.',
    icon: Code2,
  },
];

const processSteps = [
  {
    title: 'Diagnóstico',
    text: 'Entendemos negócio, operação, público, restrições e impacto esperado.',
    icon: Search,
  },
  {
    title: 'Planejamento',
    text: 'Definimos escopo, arquitetura, prioridades e critérios de sucesso.',
    icon: CheckCircle2,
  },
  {
    title: 'Desenvolvimento',
    text: 'Construímos interfaces, sistemas, integrações e automações com validação progressiva.',
    icon: Code2,
  },
  {
    title: 'Entrega e suporte',
    text: 'Publicamos, validamos responsividade e acompanhamos os próximos ciclos.',
    icon: Rocket,
  },
];

const stackItems = [
  { name: 'React', layer: 'Interfaces', icon: Code2 },
  { name: 'TypeScript', layer: 'Contratos', icon: ShieldCheck },
  { name: 'APIs', layer: 'Integração', icon: Cable },
  { name: 'Python', layer: 'Automação', icon: Bot },
  { name: 'PostgreSQL', layer: 'Dados', icon: Database },
  { name: 'IA', layer: 'Inteligência', icon: BrainCircuit },
  { name: 'Vercel', layer: 'Deploy', icon: Cloud },
  { name: 'GitHub', layer: 'Versionamento', icon: Github },
];

const proofPoints = ['Design premium', 'Arquitetura sob medida', 'Automação inteligente'];

export function MobileHomeExperience() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="mobile-home w-full max-w-full overflow-hidden bg-[#050509] text-frost">
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,#070711_0%,#080812_54%,#050509_100%)] px-4 pb-12 pt-[calc(5.25rem+env(safe-area-inset-top))] min-[390px]:px-5 md:px-8 md:pb-16">
        <div className="mx-auto grid w-full max-w-5xl gap-8">
          <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-violet-300/20 bg-white/[0.045] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-violet-200">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="break-words">Devign Studio / Software house premium</span>
          </div>

          <div className="grid gap-5">
            <h1 className="max-w-4xl text-[clamp(2.35rem,11vw,4.9rem)] font-semibold leading-[0.98] tracking-normal text-frost">
              Infraestrutura digital para marcas que operam em alto nível.
            </h1>
            <p className="max-w-3xl text-[clamp(1rem,3.9vw,1.25rem)] leading-7 text-mist md:leading-8">
              Construímos experiências digitais, automações e sistemas sob medida para empresas que precisam transformar presença, dados e operação em vantagem real.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/orcamento"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-frost px-5 py-3 text-center text-sm font-semibold text-ink transition-colors active:bg-white"
            >
              Iniciar diagnóstico
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              to="/projetos"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-center text-sm font-semibold text-frost transition-colors active:bg-white/[0.08]"
            >
              Explorar cases
            </Link>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:grid-cols-3">
            {proofPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0d0d17] px-3 py-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-signal" />
                <span className="text-sm font-semibold text-mist">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MobileSection eyebrow="O que desenvolvemos" title="Camadas digitais para presença, operação e escala.">
        <div className="grid gap-3 sm:grid-cols-2">
          {mobileServices.map((service) => {
            const Icon = service.icon;

            return (
              <article key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-violet-200">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-tight text-frost">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{service.text}</p>
              </article>
            );
          })}
        </div>
      </MobileSection>

      <MobileSection
        eyebrow="Autoridade e arquitetura"
        title="Design, estratégia e engenharia trabalhando como sistema."
        text="A Devign une posicionamento visual, visão de produto e execução técnica para criar ativos digitais com clareza, performance e sustentação operacional."
        tone="light"
      >
        <div className="grid gap-3 md:grid-cols-3">
          {authorityCards.map((card) => {
            const Icon = card.icon;

            return (
              <article key={card.title} className="rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_14px_34px_rgba(5,5,9,0.07)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-700 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-tight text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a5468]">{card.text}</p>
              </article>
            );
          })}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Processo" title="Um ciclo claro para construir com controle.">
        <div className="grid gap-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-violet-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300">0{index + 1}</span>
                    <h3 className="mt-1 text-lg font-semibold text-frost">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </MobileSection>

      <MobileSection
        eyebrow="Projetos"
        title="Fragmentos de soluções em operação."
        text="Cards simples, legíveis e diretos para apresentar o tipo de produto que a Devign constrói."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="rounded-2xl border border-white/10 bg-[#0c0c15] p-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-violet-300">{project.category}</span>
              <h3 className="mt-3 text-xl font-semibold leading-tight text-frost">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-mist">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Tecnologia" title="Stack definida por função, não por tendência.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stackItems.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <Icon className="h-5 w-5 text-violet-300" />
                <strong className="mt-4 block break-words text-base font-semibold text-frost">{item.name}</strong>
                <span className="mt-1 block text-xs text-muted">{item.layer}</span>
              </article>
            );
          })}
        </div>
      </MobileSection>

      <section className="px-4 pb-14 min-[390px]:px-5 md:px-8 md:pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-violet-300/20 bg-[linear-gradient(135deg,rgba(141,92,255,0.28),rgba(255,255,255,0.06)_48%,rgba(77,212,198,0.12))] p-5 md:p-8">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-100">Orçamento</span>
          <h2 className="mt-4 text-[clamp(1.85rem,7vw,3rem)] font-semibold leading-tight text-frost">
            Comece com contexto, não com uma estimativa rasa.
          </h2>
          <p className="mt-4 text-sm leading-7 text-mist md:text-base">
            A Devign qualifica contexto, prioridade, escopo e investimento antes de sugerir o caminho técnico.
          </p>
          <Link
            to="/orcamento"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-frost px-5 py-3 text-center text-sm font-semibold text-ink transition-colors active:bg-white sm:w-auto"
          >
            Iniciar diagnóstico
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function MobileSection({
  eyebrow,
  title,
  text,
  tone = 'dark',
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: 'dark' | 'light';
  children: ReactNode;
}) {
  const isLight = tone === 'light';

  return (
    <section
      className={
        isLight
          ? 'bg-frost px-4 py-12 text-ink min-[390px]:px-5 md:px-8 md:py-16'
          : 'px-4 py-12 text-frost min-[390px]:px-5 md:px-8 md:py-16'
      }
    >
      <div className="mx-auto grid w-full max-w-5xl gap-7">
        <div>
          <span className={isLight ? 'text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-700' : 'text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300'}>
            {eyebrow}
          </span>
          <h2 className={isLight ? 'mt-3 text-[clamp(1.75rem,7vw,3rem)] font-semibold leading-tight text-ink' : 'mt-3 text-[clamp(1.75rem,7vw,3rem)] font-semibold leading-tight text-frost'}>
            {title}
          </h2>
          {text ? <p className={isLight ? 'mt-4 text-sm leading-7 text-[#5a5468] md:text-base' : 'mt-4 text-sm leading-7 text-mist md:text-base'}>{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
