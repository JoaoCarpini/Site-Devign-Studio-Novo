import { Database, GitBranch, KeyRound, Layers3, Network, ServerCog, ShieldCheck, Workflow } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { SectionIntro } from '../ui/SectionIntro';

const architectureLayers = [
  {
    title: 'Interface de Produto',
    text: 'Aplicações web, portais, dashboards e áreas administrativas com UX objetiva para uso recorrente.',
    icon: Layers3,
    items: ['React', 'TypeScript', 'Design System'],
  },
  {
    title: 'Camada de APIs',
    text: 'Contratos, autenticação, validação, versionamento e rotas preparadas para integração e escala.',
    icon: ServerCog,
    items: ['REST', 'Webhooks', 'Documentação'],
  },
  {
    title: 'Dados e Operação',
    text: 'Modelagem relacional, trilhas de auditoria, relatórios e bases prontas para análise executiva.',
    icon: Database,
    items: ['PostgreSQL', 'Logs', 'Dashboards'],
  },
  {
    title: 'Automação e IA',
    text: 'Fluxos automáticos, classificação, assistentes internos e inteligência aplicada a rotinas reais.',
    icon: Workflow,
    items: ['Python', 'IA', 'Orquestração'],
  },
];

const infrastructureSignals = [
  { label: 'Auth', icon: KeyRound },
  { label: 'Security', icon: ShieldCheck },
  { label: 'Git Flow', icon: GitBranch },
  { label: 'Integrations', icon: Network },
];

export function ArchitectureBlueprint() {
  return (
    <section className="section-band border-y border-white/10 bg-white/[0.025]">
      <div className="container-premium">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionIntro
            eyebrow="Arquitetura moderna"
            title="Software pensado como infraestrutura de crescimento, não como peça isolada."
            text="A Devign organiza produto, back-end, dados, integrações, automações e IA em uma arquitetura coesa, com decisões técnicas explícitas e preparada para evolução."
          />

          <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b12]/88 p-4 shadow-premium backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(141,92,255,0.12),transparent_42%,rgba(77,212,198,0.08))]" />
            <div className="relative grid gap-4">
              {architectureLayers.map((layer, index) => {
                const Icon = layer.icon;

                return (
                  <div key={layer.title} className="group grid gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-5 transition duration-300 hover:border-violet-400/35 hover:bg-white/[0.075] md:grid-cols-[auto_1fr_auto] md:items-center">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Layer 0{index + 1}</span>
                        <h3 className="text-xl font-semibold tracking-normal text-frost">{layer.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-muted">{layer.text}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:max-w-[13rem] md:justify-end">
                      {layer.items.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-mist">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-5 grid gap-3 sm:grid-cols-4">
              {infrastructureSignals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-center">
                    <Icon className="mx-auto h-5 w-5 text-signal" />
                    <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{signal.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
