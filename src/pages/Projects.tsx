import { ArrowRight, BriefcaseBusiness, CheckCircle2, Cpu, FileText, Layers3 } from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { ProjectShowcaseCard } from '../components/cards/ProjectShowcaseCard';
import { Reveal } from '../components/animations/Reveal';
import { DevignLogo } from '../components/brand/DevignLogo';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { projects } from '../data/site';

const portfolioSignals = [
  'Projetos com contexto estratégico e proposta visual clara.',
  'Identidade, software e automação apresentados com coerência.',
  'Stacks e disciplinas exibidas conforme a natureza real de cada projeto.',
  'Cases estruturados com solução, diferenciais e resultado esperado.',
];

export default function Projects() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative grid gap-6 pb-10 pt-4 sm:gap-12 sm:pb-20 sm:pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:pb-28">
          <Reveal>
            <span className="eyebrow mb-5 sm:mb-6">Portfólio</span>
            <h1 className="heading-xl text-balance">Projetos digitais com padrão high-end.</h1>
            <p className="body-lead mt-5 max-w-3xl sm:mt-7">
              Beelivery, Devign Stock, Kronos e Contract AI são apresentados com contexto real: identidade, software, automação, stack, diferenciais e resultado esperado.
            </p>
            <ButtonLink to="/orcamento" className="mt-7 w-full sm:mt-9 sm:w-auto">
              Iniciar projeto semelhante
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>

          {/* Authority card — hidden on mobile to reduce noise, shown from lg */}
          <Reveal delay={0.08} className="hidden rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-5 shadow-premium sm:backdrop-blur-2xl lg:block lg:rounded-[2rem] lg:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-400">Autoridade técnica</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-normal text-frost">Cases com profundidade estratégica.</h2>
              </div>
              <BriefcaseBusiness className="h-10 w-10 text-violet-300" />
            </div>
            <div className="mt-6 grid gap-3">
              {portfolioSignals.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm leading-6 text-mist">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-band pt-0">
        <div className="container-premium">
          <Reveal className="mb-10 sm:mb-14">
            <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(160deg,rgba(141,92,255,0.12),rgba(255,255,255,0.04)_42%,rgba(5,5,9,0.2))] p-4 shadow-premium sm:rounded-[2rem] sm:p-10 sm:backdrop-blur-2xl lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="pointer-events-none absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-violet-500/15 blur-3xl sm:block" />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300 sm:px-4">
                  <FileText className="h-3.5 w-3.5" />
                  Company deck
                </span>
                <h2 className="mt-4 max-w-2xl text-xl font-semibold leading-tight text-frost sm:mt-5 sm:text-4xl">
                  Portfólio institucional com assinatura visual da Devign.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-mist sm:mt-4 sm:text-base sm:leading-8">
                  Apresentações, materiais comerciais e showcases seguem a identidade da marca: premium, tecnológica e preparada para conversas de maior valor.
                </p>
              </div>
              <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-ink/55 p-4 shadow-[0_24px_80px_rgba(5,5,9,0.35)] sm:mt-8 sm:rounded-[1.75rem] sm:p-6 sm:backdrop-blur-xl lg:mt-0 lg:min-w-[15rem]">
                <DevignLogo variant="deck" to="" />
              </div>
            </div>
          </Reveal>

          <SectionIntro
            eyebrow="Cases detalhados"
            title="Cada projeto comunica tecnologia, negócio e execução."
            text="A estrutura de portfólio transmite profundidade técnica, maturidade visual e capacidade de construir software empresarial."
          />

          <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-10">
            {projects.map((project, index) => (
              <ProjectShowcaseCard key={project.slug} project={project} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-24">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.24),rgba(255,255,255,0.06)_44%,rgba(77,212,198,0.1))] p-5 shadow-premium sm:rounded-[2rem] sm:p-12">
            <Layers3 className="absolute bottom-8 right-8 hidden h-24 w-24 text-white/10 lg:block" />
            <Cpu className="absolute right-36 top-10 hidden h-14 w-14 text-white/10 lg:block" />
            <SectionIntro
              eyebrow="Próximo case"
              title="Seu software pode ser o próximo produto com padrão Devign."
              text="Envie um briefing e transforme operação, dados, automações ou IA aplicada em um produto digital com arquitetura séria."
            />
            <ButtonLink to="/orcamento" className="mt-7 w-full sm:mt-8 sm:w-auto">
              Iniciar projeto
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
