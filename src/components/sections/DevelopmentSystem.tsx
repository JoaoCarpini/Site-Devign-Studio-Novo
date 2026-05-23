import { CheckCircle2, Code2, Database, FileCode2, Rocket, ServerCog } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { SectionIntro } from '../ui/SectionIntro';

const deliverySteps = [
  {
    title: 'Arquitetura',
    text: 'Definição de módulos, entidades, integrações, permissões e fluxos críticos antes da execução visual.',
    icon: FileCode2,
  },
  {
    title: 'Back-end e dados',
    text: 'APIs, validações, persistência, regras de negócio e estrutura para auditoria e relatórios.',
    icon: Database,
  },
  {
    title: 'Interface operacional',
    text: 'Telas com hierarquia clara, estados de sistema, feedback visual e uso consistente em desktop e mobile.',
    icon: Code2,
  },
  {
    title: 'Deploy e evolução',
    text: 'Publicação, monitoramento inicial, documentação e roadmap técnico para próximas versões.',
    icon: Rocket,
  },
];

export function DevelopmentSystem() {
  return (
    <section className="section-band bg-frost text-ink">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
            <span className="inline-flex rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
              Processo de desenvolvimento
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
              Um ciclo técnico para construir software com previsibilidade.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4a4658]">
              Cada etapa reduz ambiguidade: primeiro entendemos regras e arquitetura, depois construímos interfaces, integrações e automações com validação progressiva.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]">
              {['Escopo técnico documentado', 'Critérios de aceite por módulo', 'Base preparada para manutenção'].map((item) => (
                <div key={item} className="flex gap-3 py-2 text-sm font-medium text-[#343040]">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-violet-700" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.title} delay={index * 0.05}>
                  <article className="h-full rounded-[1.35rem] border border-ink/10 bg-white p-6 shadow-[0_18px_48px_rgba(5,5,9,0.08)]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-700 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ServerCog className="h-5 w-5 text-ink/20" />
                    </div>
                    <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">0{index + 1}</span>
                    <h3 className="mt-2 text-xl font-semibold tracking-normal text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#5a5468]">{step.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
