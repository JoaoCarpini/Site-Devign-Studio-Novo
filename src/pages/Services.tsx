import {
  ArrowRight,
  CheckCircle2,
  Database,
  GitBranch,
  Network,
  Palette,
  PenTool,
  ServerCog,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { ServiceCard } from '../components/cards/ServiceCard';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { services } from '../data/site';

const pillars = [
  'Identidade visual e tecnologia trabalhando como um único sistema.',
  'Branding, interface e engenharia conectados para elevar percepção de valor.',
  'Sistemas, APIs e automações com direção visual premium.',
  'Presença digital criada para parecer forte, funcionar bem e escalar com clareza.',
];

const designServices = [
  {
    title: 'Identidade Visual',
    text: 'Construção de sistemas visuais para marcas que precisam transmitir autoridade, sofisticação e consistência.',
    icon: Palette,
  },
  {
    title: 'Branding Estratégico',
    text: 'Direção de marca, linguagem visual e posicionamento para criar presença digital mais forte e memorável.',
    icon: Sparkles,
  },
  {
    title: 'UI/UX Premium',
    text: 'Interfaces com estética refinada, hierarquia clara e experiência pensada para percepção, uso e conversão.',
    icon: PenTool,
  },
  {
    title: 'Presença Digital',
    text: 'Sites, páginas e experiências digitais que unem design, narrativa e tecnologia para sustentar valor.',
    icon: Network,
  },
];

const deliveryStandards = [
  {
    title: 'Direção visual',
    text: 'Antes da interface, definimos percepção: estilo, hierarquia, tom visual e presença da marca.',
    icon: Palette,
  },
  {
    title: 'Arquitetura digital',
    text: 'Dados, páginas, módulos e integrações organizados para funcionar com clareza.',
    icon: Database,
  },
  {
    title: 'Fluxos automatizados',
    text: 'Jobs, webhooks e gatilhos para padronizar execução sem ruído operacional.',
    icon: Workflow,
  },
  {
    title: 'Base evolutiva',
    text: 'Deploy, documentação e estrutura preparada para manutenção e crescimento.',
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

            <h1 className="heading-xl text-balance">
              Design estratégico e tecnologia trabalhando como um único sistema.
            </h1>

            <p className="body-lead mt-7 max-w-3xl">
              A Devign une identidade visual, experiência digital, sistemas, automações e IA para construir marcas mais fortes, operações mais inteligentes e presença digital premium.
            </p>

            <ButtonLink to="/orcamento" className="mt-9">
              Mapear escopo
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-band pt-6 sm:pt-16">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Design & presença"
            title="Antes do código, existe percepção."
            text="Identidade visual, branding e experiência definem como uma empresa é percebida antes mesmo da primeira conversa. Esse é o ponto onde design e tecnologia se encontram."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {designServices.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <article className="h-full rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-6 shadow-premium backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:bg-white/[0.075]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Sparkles className="h-5 w-5 text-white/20" />
                    </div>

                    <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      0{index + 1}
                    </span>

                    <h3 className="mt-2 text-xl font-semibold tracking-normal text-frost">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Tecnologia & produto"
            title="Código com direção visual. Design com execução real."
            text="A Devign não separa estética de funcionamento. Cada entrega combina interface, branding, arquitetura, automação e engenharia para criar ativos digitais completos."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.key} delay={index * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium">
          <SectionIntro
            eyebrow="Padrão Devign"
            title="O diferencial está na união entre marca, experiência e engenharia."
            text="Uma solução digital forte não nasce só do código. Ela precisa parecer premium, comunicar valor, funcionar bem e sustentar crescimento."
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

                    <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      0{index + 1}
                    </span>

                    <h3 className="mt-2 text-xl font-semibold tracking-normal text-frost">
                      {standard.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted">
                      {standard.text}
                    </p>
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
              Tecnologia sem direção visual vira ferramenta. Design sem execução vira conceito.
            </h2>

            <p className="mt-5 text-base leading-8 text-[#4a4658]">
              A Devign conecta os dois lados: cria presença visual forte e entrega a estrutura técnica necessária para que essa presença funcione de verdade.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar}
                className="flex gap-4 rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-violet-700" />
                <p className="text-sm font-medium leading-7 text-[#343040]">
                  {pillar}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}