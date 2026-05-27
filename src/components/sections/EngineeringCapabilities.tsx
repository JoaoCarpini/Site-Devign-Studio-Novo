import { Bot, BrainCircuit, Cable, Gauge, GitPullRequestArrow, LockKeyhole, Network, Workflow } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { SectionIntro } from '../ui/SectionIntro';

const capabilities = [
  {
    title: 'Escalabilidade',
    text: 'Arquitetura modular, responsabilidades claras e base pronta para novos módulos e integrações.',
    icon: Gauge,
    specs: ['modularidade', 'performance', 'evolução'],
  },
  {
    title: 'Integrações',
    text: 'APIs, webhooks e sincronização entre CRM, ERPs, dashboards e sistemas internos.',
    icon: Cable,
    specs: ['REST', 'webhooks', 'dados'],
  },
  {
    title: 'Automação',
    text: 'Fluxos para reduzir trabalho manual, padronizar tarefas e criar pontos de controle.',
    icon: Workflow,
    specs: ['jobs', 'alertas', 'orquestração'],
  },
  {
    title: 'IA aplicada',
    text: 'Assistentes, triagem, classificação e análise conectadas ao contexto operacional.',
    icon: BrainCircuit,
    specs: ['contexto', 'modelos', 'governança'],
  },
  {
    title: 'Segurança',
    text: 'Autenticação, permissões e validação alinhadas ao nível de risco do projeto.',
    icon: LockKeyhole,
    specs: ['auth', 'perfis', 'validação'],
  },
  {
    title: 'Entrega técnica',
    text: 'Versionamento, revisão, deploy e documentação para manter a base legível.',
    icon: GitPullRequestArrow,
    specs: ['GitHub', 'deploy', 'docs'],
  },
];

export function EngineeringCapabilities() {
  return (
    <section className="section-band">
      <div className="container-premium">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Engenharia"
            title="Capacidades técnicas para produtos e operações exigentes."
            text="Arquitetura, dados, integração, automação e IA combinados para criar sistemas úteis dentro da operação."
          />
          <Reveal className="hidden rounded-2xl border border-white/10 bg-white/[0.055] px-5 py-4 backdrop-blur-xl lg:block">
            <div className="flex items-center gap-3 text-sm font-semibold text-frost">
              <Network className="h-4 w-4 text-violet-400" />
              Plataforma conectada
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <Reveal key={capability.title} delay={index * 0.04}>
                <article className="group h-full rounded-[1.5rem] border border-white/10 bg-white/[0.052] p-6 shadow-premium sm:backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:bg-white/[0.075]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Bot className="h-5 w-5 text-white/20 transition group-hover:text-violet-300" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-normal text-frost">{capability.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{capability.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {capability.specs.map((spec) => (
                      <span key={spec} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-mist">
                        {spec}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
