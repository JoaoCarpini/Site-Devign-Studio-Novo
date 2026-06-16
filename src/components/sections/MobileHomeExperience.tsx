import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  CheckCircle2,
  Code2,
  Database,
  Gauge,
  Github,
  LayoutDashboard,
  Layers3,
  PanelsTopLeft,
  Rocket,
  Search,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Landing pages',
    text: 'Paginas diretas para comunicar valor, captar demanda e validar campanhas.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Sistemas web',
    text: 'Interfaces operacionais para equipes, clientes, processos e dados internos.',
    icon: LayoutDashboard,
  },
  {
    title: 'Automacoes',
    text: 'Fluxos que reduzem trabalho manual e tornam a operacao mais previsivel.',
    icon: Workflow,
  },
  {
    title: 'IA aplicada',
    text: 'Assistentes, triagem e leitura de informacoes conectadas ao contexto real.',
    icon: BrainCircuit,
  },
  {
    title: 'APIs',
    text: 'Integracoes e contratos para conectar sistemas, plataformas e rotinas.',
    icon: Cable,
  },
  {
    title: 'Dashboards',
    text: 'Indicadores organizados para leitura rapida e tomada de decisao.',
    icon: Gauge,
  },
];

const pillars = [
  {
    title: 'Clareza comercial',
    text: 'A mensagem, a hierarquia e as chamadas principais aparecem sem disputa visual.',
    icon: Search,
  },
  {
    title: 'Arquitetura controlada',
    text: 'Cada entrega nasce com escopo, prioridades e criterios tecnicos definidos.',
    icon: ShieldCheck,
  },
  {
    title: 'Produto operavel',
    text: 'O foco e criar interfaces que funcionem bem em rotina real, nao apenas em apresentacao.',
    icon: Code2,
  },
];

const process = [
  {
    title: 'Diagnostico',
    text: 'Entendemos contexto, publico, operacao, restricoes e impacto esperado.',
    icon: Search,
  },
  {
    title: 'Direcao',
    text: 'Definimos narrativa, arquitetura, prioridades e caminho de implementacao.',
    icon: Layers3,
  },
  {
    title: 'Construcao',
    text: 'Desenvolvemos telas, dados, integracoes e automacoes com validacao progressiva.',
    icon: Code2,
  },
  {
    title: 'Entrega',
    text: 'Publicamos, revisamos comportamento responsivo e preparamos os proximos ciclos.',
    icon: Rocket,
  },
];

const projects = [
  {
    category: 'Sistema operacional',
    title: 'Painel para operacoes digitais',
    text: 'Fluxos, indicadores e areas de acao organizados para equipes acompanharem rotina e prioridade.',
    tags: ['Dashboard', 'APIs', 'Rotina'],
  },
  {
    category: 'Presenca premium',
    title: 'Site institucional de alto valor',
    text: 'Narrativa, paginas comerciais e base visual para sustentar autoridade antes do primeiro contato.',
    tags: ['Branding', 'Web', 'Conversao'],
  },
  {
    category: 'Automacao aplicada',
    title: 'Fluxo conectado ao atendimento',
    text: 'Triagem, notificacoes e organizacao de dados para reduzir friccao entre canais e operacao.',
    tags: ['Automacao', 'CRM', 'WhatsApp'],
  },
];

const stack = [
  { name: 'React', layer: 'Interfaces', icon: Code2 },
  { name: 'TypeScript', layer: 'Contratos', icon: ShieldCheck },
  { name: 'APIs', layer: 'Integracao', icon: Cable },
  { name: 'Python', layer: 'Automacao', icon: Bot },
  { name: 'PostgreSQL', layer: 'Dados', icon: Database },
  { name: 'IA', layer: 'Inteligencia', icon: BrainCircuit },
  { name: 'Automacao', layer: 'Operacao', icon: Workflow },
  { name: 'GitHub', layer: 'Versionamento', icon: Github },
  { name: 'Vercel', layer: 'Deploy', icon: Rocket },
];

const signals = ['Design premium', 'Software sob medida', 'Automacao inteligente'];

export function MobileHomeExperience() {
  return (
    <main className="mobile-home bg-[#050509] text-frost">
      <section className="mobile-home-hero">
        <div className="mobile-home-inner">
          <span className="mobile-home-eyebrow">Devign Studio / Software house premium</span>
          <h1 className="mobile-home-title">Infraestrutura digital para marcas que operam em alto nivel.</h1>
          <p className="mobile-home-lead">
            Construimos experiencias digitais, automacoes e sistemas sob medida para empresas que precisam transformar presenca, dados e operacao em vantagem real.
          </p>

          <div className="mobile-home-actions">
            <Link to="/orcamento" className="mobile-home-button mobile-home-button-primary">
              Iniciar diagnostico
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link to="/projetos" className="mobile-home-button mobile-home-button-secondary">
              Explorar cases
            </Link>
          </div>

          <div className="mobile-home-signal-grid">
            {signals.map((signal) => (
              <div key={signal} className="mobile-home-signal">
                <span className="mobile-home-dot" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MobileSection eyebrow="O que desenvolvemos" title="Camadas digitais para presenca, operacao e escala.">
        <div className="mobile-home-card-grid">
          {services.map((service) => (
            <MobileCard key={service.title} title={service.title} text={service.text} icon={<service.icon className="h-5 w-5" />} />
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Metodo" title="Design, estrategia e engenharia trabalhando como sistema." light>
        <div className="mobile-home-card-grid mobile-home-card-grid-three">
          {pillars.map((pillar) => (
            <MobileCard key={pillar.title} title={pillar.title} text={pillar.text} icon={<pillar.icon className="h-5 w-5" />} light />
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Processo" title="Um ciclo claro para construir com controle.">
        <div className="mobile-home-list">
          {process.map((step, index) => (
            <article key={step.title} className="mobile-home-row">
              <span className="mobile-home-index">0{index + 1}</span>
              <span className="mobile-home-icon">
                <step.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Projetos" title="Sinais de produtos digitais reais.">
        <div className="mobile-home-card-grid mobile-home-card-grid-three">
          {projects.map((project) => (
            <article key={project.title} className="mobile-home-project">
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div>
                {project.tags.map((tag) => (
                  <strong key={tag}>{tag}</strong>
                ))}
              </div>
            </article>
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow="Tecnologia" title="Stack definida por função, não por tendência." className="mobile-home-tech-section">
        <p className="mobile-home-section-lead">
          React, TypeScript, APIs, Python, PostgreSQL, IA e automação entram quando sustentam performance, integração e evolução.
        </p>
        <div className="mobile-home-tech-grid">
          {stack.map((item, index) => (
            <article key={item.name} className="mobile-home-tech-card">
              <span className="mobile-home-tech-icon">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mobile-home-tech-index">0{index + 1}</span>
              <strong>{item.name}</strong>
              <span>{item.layer}</span>
            </article>
          ))}
        </div>
      </MobileSection>

      <section className="mobile-home-cta">
        <div className="mobile-home-inner">
          <span className="mobile-home-eyebrow">Orcamento</span>
          <h2>Comece com contexto, nao com uma estimativa rasa.</h2>
          <p>A Devign qualifica contexto, prioridade, escopo e investimento antes de sugerir o caminho tecnico.</p>
          <Link to="/orcamento" className="mobile-home-button mobile-home-button-primary">
            Iniciar diagnostico
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
  light = false,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    light ? 'mobile-home-section mobile-home-section-light' : 'mobile-home-section',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      <div className="mobile-home-inner">
        <span className="mobile-home-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function MobileCard({ title, text, icon, light = false }: { title: string; text: string; icon: ReactNode; light?: boolean }) {
  return (
    <article className={light ? 'mobile-home-card mobile-home-card-light' : 'mobile-home-card'}>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
