import { Database, GitBranch, KeyRound, Layers3, Network, ServerCog, ShieldCheck, Workflow } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { SectionIntro } from '../ui/SectionIntro';

const architectureLayers = [
  {
    title: 'Interface de Produto',
    text: 'Aplicações, portais e dashboards com hierarquia clara para uso recorrente.',
    icon: Layers3,
    items: ['React', 'TypeScript', 'Design System'],
  },
  {
    title: 'Camada de APIs',
    text: 'Contratos, autenticação e rotas preparadas para integração, segurança e escala.',
    icon: ServerCog,
    items: ['REST', 'Webhooks', 'Documentação'],
  },
  {
    title: 'Dados e Operação',
    text: 'Modelagem, auditoria e relatórios prontos para leitura executiva.',
    icon: Database,
    items: ['PostgreSQL', 'Logs', 'Dashboards'],
  },
  {
    title: 'Automação e IA',
    text: 'Fluxos automáticos, classificação e inteligência aplicada a rotinas reais.',
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
            eyebrow="Arquitetura"
            title="Software como infraestrutura de crescimento."
            text="Produto, back-end, dados, integrações, automações e IA organizados em uma base coesa, explícita e preparada para evoluir."
          />

          <Reveal className="architecture-blueprint-panel relative isolate overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0b12]/88 p-3 shadow-premium sm:rounded-[2rem] sm:p-6 lg:backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(141,92,255,0.12),transparent_42%,rgba(77,212,198,0.08))]" />
            <div className="relative grid gap-4">
              {architectureLayers.map((layer, index) => {
                const Icon = layer.icon;

                return (
                  <div key={layer.title} className="group grid gap-3 rounded-[1.05rem] border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:border-violet-400/35 hover:bg-white/[0.075] sm:gap-4 sm:rounded-[1.35rem] sm:p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/25 bg-violet-500/12 text-violet-300 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.22em]">Layer 0{index + 1}</span>
                        <h3 className="text-lg font-semibold tracking-normal text-frost sm:text-xl">{layer.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted sm:leading-7">{layer.text}</p>
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

            <div className="relative mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4">
              {infrastructureSignals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <div key={signal.label} className="min-h-24 rounded-xl border border-white/10 bg-white/[0.045] p-3 text-center sm:rounded-2xl sm:p-4">
                    <Icon className="mx-auto h-5 w-5 text-signal" />
                    <span className="mt-3 block break-words text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.18em]">{signal.label}</span>
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
