export type ServiceKey =
  | 'web-development'
  | 'web-systems'
  | 'apis'
  | 'automation'
  | 'ai'
  | 'landing-pages'
  | 'integrations';

export type Service = {
  key: ServiceKey;
  path: string;
  title: string;
  menuTitle: string;
  kicker: string;
  summary: string;
  hero: string;
  strategic: string;
  benefits: string[];
  differentials: string[];
  stack: string[];
  process: string[];
  faq: Array<{ question: string; answer: string }>;
  metrics: Array<{ label: string; value: string }>;
  cta: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  problem: string;
  solution: string;
  result: string;
  stack: string[];
  features: string[];
  differentials: string[];
  metrics: Array<{ label: string; value: string }>;
  accent: 'violet' | 'signal' | 'amber';
};

export const services: Service[] = [
  {
    key: 'web-development',
    path: '/servicos/desenvolvimento-web',
    title: 'Desenvolvimento Web',
    menuTitle: 'Desenvolvimento Web',
    kicker: 'Presença de alto valor',
    summary:
      'Experiências digitais construídas para posicionamento premium, clareza comercial e autoridade.',
    hero:
      'Experiências digitais para marcas que precisam parecer tão fortes quanto a solução que entregam.',
    strategic:
      'Presença digital não é vitrine. É infraestrutura de percepção. A Devign desenha interfaces com narrativa, performance e direção visual para sustentar conversas comerciais de maior valor.',
    benefits: [
      'Percepção premium desde o primeiro contato.',
      'Arquitetura de conteúdo clara, rápida e orientada a decisão.',
      'Interfaces que combinam autoridade, estética e conversão qualificada.',
      'Base pronta para analytics, CRM, automações e evolução.',
    ],
    differentials: [
      'Direção visual proprietária, sem estética de template.',
      'Copy de posicionamento, não texto decorativo.',
      'Componentes preparados para manutenção e expansão.',
      'Refinamento visual validado em cada breakpoint.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel', 'Analytics'],
    process: [
      'Diagnóstico de posicionamento e público de maior valor.',
      'Arquitetura das páginas e definição das mensagens principais.',
      'Design visual com direção premium e protótipo navegável.',
      'Implementação, otimização e publicação com precisão.',
    ],
    faq: [
      {
        question: 'O site pode ser integrado a CRM ou WhatsApp?',
        answer:
          'Sim. A estrutura pode receber formulários, pixels, analytics, CRM, automações e links com mensagens pré-formatadas.',
      },
      {
        question: 'Vocês trabalham com conteúdo e copy?',
        answer:
          'Sim. A entrega inclui organização estratégica da mensagem para que o site venda autoridade, não apenas liste serviços.',
      },
      {
        question: 'O site fica preparado para SEO?',
        answer:
          'A base técnica, hierarquia de conteúdo, performance e metadados são planejados para uma presença orgânica consistente.',
      },
    ],
    metrics: [
      { label: 'Entrega guiada', value: '4-8 sem.' },
      { label: 'Performance alvo', value: '90+' },
      { label: 'Páginas-chave', value: '5-12' },
    ],
    cta: 'Construir presença premium',
  },
  {
    key: 'web-systems',
    path: '/servicos/sistemas-web',
    title: 'Sistemas Web',
    menuTitle: 'Sistemas Web',
    kicker: 'Operação escalável',
    summary:
      'Infraestruturas digitais para organizar dados, fluxos e decisões críticas.',
    hero:
      'Sistemas web para operações que exigem controle, precisão e escala.',
    strategic:
      'Sistemas internos devem reduzir ruído, não criar mais uma camada de complexidade. A Devign projeta plataformas com fluxos claros, permissões, dados confiáveis e visão executiva.',
    benefits: [
      'Cadastros, fluxos e indicadores em uma base coerente.',
      'Interfaces de uso recorrente, desenhadas para reduzir fricção.',
      'Permissões, autenticação e módulos preparados desde o início.',
      'Dados estruturados para relatórios, dashboards e decisão.',
    ],
    differentials: [
      'Processo modelado antes da interface.',
      'UX operacional para uso diário.',
      'Back-end com performance, segurança e manutenção em vista.',
      'Documentação e visão de evolução do produto.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'APIs'],
    process: [
      'Mapeamento das rotinas e regras críticas.',
      'Protótipo de fluxos, papéis e telas principais.',
      'Desenvolvimento por módulos com validações frequentes.',
      'Entrega assistida, ajustes finos e plano de suporte.',
    ],
    faq: [
      {
        question: 'Vocês desenvolvem sistemas para uso interno?',
        answer:
          'Sim. Criamos sistemas administrativos, painéis operacionais, portais e ferramentas para equipes.',
      },
      {
        question: 'É possível começar com um MVP?',
        answer:
          'Sim. Priorizamos o núcleo de maior impacto e evoluímos por módulos para reduzir risco e acelerar validação.',
      },
      {
        question: 'O sistema pode ter níveis de acesso?',
        answer:
          'Sim. A arquitetura pode incluir autenticação, permissões por perfil, trilhas de auditoria e áreas restritas.',
      },
    ],
    metrics: [
      { label: 'Módulos iniciais', value: '3-6' },
      { label: 'Fluxos mapeados', value: '100%' },
      { label: 'Evolução', value: 'modular' },
    ],
    cta: 'Planejar um sistema sob medida',
  },
  {
    key: 'apis',
    path: '/servicos/apis',
    title: 'APIs',
    menuTitle: 'APIs',
    kicker: 'Conectividade estratégica',
    summary:
      'Contratos digitais para conectar dados, produtos e operações com previsibilidade.',
    hero:
      'APIs desenhadas para empresas que precisam integrar, escalar e manter controle.',
    strategic:
      'Uma API define como a operação circula. A Devign cria contratos claros, seguros e documentados para que sistemas conversem sem improviso.',
    benefits: [
      'Conexão entre sistemas internos, plataformas e produtos digitais.',
      'Dados padronizados para reduzir inconsistência.',
      'Rotas versionadas, autenticadas e documentadas.',
      'Base preparada para dashboards, automações e integrações futuras.',
    ],
    differentials: [
      'Contratos bem definidos antes da implementação.',
      'Arquitetura com foco em segurança, logs e observabilidade.',
      'Documentação prática para equipes técnicas e parceiros.',
      'Testes de rotas críticas e tratamento de erros previsível.',
    ],
    stack: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'REST', 'Webhooks'],
    process: [
      'Levantamento de fontes, consumidores e regras de acesso.',
      'Definição de contratos, autenticação e modelo de dados.',
      'Implementação das rotas, validações e documentação.',
      'Testes, deploy e monitoramento inicial.',
    ],
    faq: [
      {
        question: 'Vocês integram APIs de terceiros?',
        answer:
          'Sim. Trabalhamos com integrações de pagamentos, CRM, ERPs, automação, IA e plataformas sob demanda.',
      },
      {
        question: 'A API pode ser documentada?',
        answer:
          'Sim. Entregamos documentação objetiva para uso interno, parceiros ou times técnicos.',
      },
      {
        question: 'É possível criar webhooks?',
        answer:
          'Sim. Webhooks são úteis para eventos, notificações, integrações assíncronas e automações.',
      },
    ],
    metrics: [
      { label: 'Contratos', value: 'claros' },
      { label: 'Autenticação', value: 'segura' },
      { label: 'Integrações', value: 'sob medida' },
    ],
    cta: 'Desenhar uma API estratégica',
  },
  {
    key: 'automation',
    path: '/servicos/automacao',
    title: 'Automação',
    menuTitle: 'Automação',
    kicker: 'Fluxos sem fricção',
    summary:
      'Fluxos inteligentes para reduzir ruído operacional e trabalho repetitivo.',
    hero:
      'Automações para operações que precisam de velocidade, controle e consistência.',
    strategic:
      'Rotinas manuais consomem margem e atenção. A Devign transforma gargalos em fluxos automatizados, conectando ferramentas sem perder rastreabilidade.',
    benefits: [
      'Menos retrabalho em rotinas administrativas, comerciais e operacionais.',
      'Fluxos entre formulários, planilhas, CRM, sistemas e APIs.',
      'Alertas, relatórios e atualizações sem intervenção manual.',
      'Operação mais previsível, com menos falhas de execução.',
    ],
    differentials: [
      'Mapeamento antes de automatizar para evitar complexidade desnecessária.',
      'Integrações com ferramentas que a empresa já utiliza.',
      'Logs e pontos de controle para acompanhar execuções.',
      'Documentação do fluxo para manutenção e evolução.',
    ],
    stack: ['Python', 'Node.js', 'Webhooks', 'APIs', 'PostgreSQL', 'Cron Jobs'],
    process: [
      'Identificação de gargalos e atividades repetitivas.',
      'Desenho do fluxo com gatilhos, regras e exceções.',
      'Implementação, testes controlados e ajustes.',
      'Monitoramento inicial e transferência operacional.',
    ],
    faq: [
      {
        question: 'A automação pode usar sistemas que já existem?',
        answer:
          'Sim. O objetivo é conectar ferramentas atuais sempre que isso for mais inteligente que substituir tudo.',
      },
      {
        question: 'Vocês automatizam WhatsApp, planilhas ou CRM?',
        answer:
          'Sim, desde que a integração seja viável e respeite as políticas das plataformas envolvidas.',
      },
      {
        question: 'Como evitar falhas em automações?',
        answer:
          'Criamos validações, logs, alertas e tratamentos para cenários previsíveis de erro.',
      },
    ],
    metrics: [
      { label: 'Tempo recuperado', value: 'semanal' },
      { label: 'Erros manuais', value: 'menor' },
      { label: 'Fluxos', value: 'auditáveis' },
    ],
    cta: 'Projetar automações inteligentes',
  },
  {
    key: 'ai',
    path: '/servicos/ia',
    title: 'IA Aplicada',
    menuTitle: 'IA',
    kicker: 'Inteligência aplicada',
    summary:
      'Inteligência aplicada onde performance, contexto e decisão realmente importam.',
    hero:
      'IA incorporada à operação com contexto, controle e utilidade mensurável.',
    strategic:
      'IA só importa quando melhora um fluxo real. A Devign cria camadas inteligentes para triagem, análise, atendimento e automação com contexto de negócio.',
    benefits: [
      'Assistentes internos para acelerar pesquisa, triagem, atendimento e análise.',
      'Automação de leitura, classificação e geração de respostas com contexto.',
      'Integração com bases, sistemas e APIs da operação.',
      'Experiências com limites, revisão e controle para uso profissional.',
    ],
    differentials: [
      'IA aplicada a casos de uso mensuráveis, não apenas demonstrações.',
      'Fluxos com contexto, memória controlada e trilhas de validação.',
      'Integração com ferramentas existentes e fontes de dados.',
      'Foco em segurança, utilidade e governança básica.',
    ],
    stack: ['OpenAI', 'Python', 'Node.js', 'Vector Search', 'APIs', 'Dashboards'],
    process: [
      'Escolha do caso de uso e métricas de valor.',
      'Mapeamento de dados, fontes e limites de resposta.',
      'Protótipo funcional com testes reais.',
      'Integração ao fluxo, ajustes e plano de evolução.',
    ],
    faq: [
      {
        question: 'A IA pode acessar dados da empresa?',
        answer:
          'Sim, quando isso faz sentido técnico e jurídico. O acesso é modelado com cuidado, limites e rastreabilidade.',
      },
      {
        question: 'Vocês criam chatbots?',
        answer:
          'Sim, mas priorizamos assistentes com contexto, governança e utilidade operacional.',
      },
      {
        question: 'Dá para começar pequeno?',
        answer:
          'Sim. Um piloto bem escolhido costuma ser a melhor forma de validar valor antes de escalar.',
      },
    ],
    metrics: [
      { label: 'Piloto', value: 'rápido' },
      { label: 'Contexto', value: 'controlado' },
      { label: 'Valor', value: 'medido' },
    ],
    cta: 'Aplicar IA com estratégia',
  },
  {
    key: 'landing-pages',
    path: '/servicos/landing-pages',
    title: 'Landing Pages',
    menuTitle: 'Landing Pages',
    kicker: 'Conversão refinada',
    summary:
      'Páginas de campanha com narrativa precisa, estética premium e conversão qualificada.',
    hero:
      'Landing pages para ofertas que precisam comunicar valor com precisão.',
    strategic:
      'Uma oferta premium precisa de foco. A Devign estrutura páginas com promessa clara, prova, hierarquia visual e CTA sem excesso.',
    benefits: [
      'Comunicação direta para lançamento, tráfego pago, captação ou validação.',
      'Estrutura de copy focada em decisão, objeções e valor percebido.',
      'Direção visual com impacto e leitura precisa em qualquer tela.',
      'Integrações com WhatsApp, formulários, CRM, pixels e analytics.',
    ],
    differentials: [
      'Seções pensadas para conduzir atenção, não apenas preencher espaço.',
      'Hierarquia visual clara para mobile e desktop.',
      'CTAs e formulários posicionados com intenção.',
      'Performance adequada para campanhas pagas.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel', 'CRM'],
    process: [
      'Entendimento da oferta, público e mecanismo de conversão.',
      'Wireframe com narrativa e blocos de prova.',
      'Design, desenvolvimento e integrações.',
      'Publicação, testes e ajustes de conversão.',
    ],
    faq: [
      {
        question: 'Vocês fazem páginas para tráfego pago?',
        answer:
          'Sim. Estruturamos páginas com velocidade, tracking e clareza para campanhas.',
      },
      {
        question: 'A landing page pode ter formulário e WhatsApp?',
        answer:
          'Sim. Podemos combinar formulário, WhatsApp, CRM, pixels e eventos de conversão.',
      },
      {
        question: 'A página pode ser lançada rápido?',
        answer:
          'Sim, dependendo do escopo. Landing pages objetivas podem ter ciclos mais curtos que sites institucionais completos.',
      },
    ],
    metrics: [
      { label: 'Foco', value: 'conversão' },
      { label: 'Campanhas', value: 'ready' },
      { label: 'Integrações', value: 'CRM' },
    ],
    cta: 'Criar uma página de conversão premium',
  },
  {
    key: 'integrations',
    path: '/servicos/integracoes',
    title: 'Integrações',
    menuTitle: 'Integrações',
    kicker: 'Ecossistema conectado',
    summary:
      'Integrações entre plataformas, dados e operações para eliminar ilhas de informação.',
    hero:
      'Integrações sob medida para conectar ferramentas sem perder controle operacional.',
    strategic:
      'Quando dados vivem separados, a operação perde precisão. A Devign conecta sistemas, normaliza informações e cria fluxos confiáveis entre plataformas.',
    benefits: [
      'Conexão entre CRM, ERP, pagamentos, formulários, dashboards e sistemas internos.',
      'Dados mais consistentes para acompanhamento comercial e operacional.',
      'Redução de digitação manual e duplicidade entre ferramentas.',
      'Fluxos com logs, alertas e tratamento de exceções.',
    ],
    differentials: [
      'Escolha cuidadosa entre API, webhook, banco, automação ou middleware.',
      'Modelo de dados claro para evitar inconsistência entre plataformas.',
      'Documentação do fluxo e pontos de monitoramento.',
      'Entrega pensada para manutenção, não apenas funcionamento inicial.',
    ],
    stack: ['REST', 'Webhooks', 'Python', 'Node.js', 'PostgreSQL', 'GitHub'],
    process: [
      'Inventário de ferramentas, dados e eventos.',
      'Definição do fluxo ideal e regras de sincronização.',
      'Implementação das integrações e tratamento de falhas.',
      'Validação com dados reais e acompanhamento inicial.',
    ],
    faq: [
      {
        question: 'Vocês integram ferramentas sem API oficial?',
        answer:
          'Avaliamos caso a caso. Quando não existe API, pode haver alternativas, mas sempre com atenção a estabilidade e políticas da plataforma.',
      },
      {
        question: 'É possível integrar com dashboard?',
        answer:
          'Sim. Integrações podem alimentar dashboards executivos e relatórios operacionais.',
      },
      {
        question: 'Como saber se uma integração é viável?',
        answer:
          'Analisamos documentação, permissões, volume de dados, frequência e regras de negócio antes de propor o desenho final.',
      },
    ],
    metrics: [
      { label: 'Dados', value: 'unificados' },
      { label: 'Falhas', value: 'tratadas' },
      { label: 'Operação', value: 'conectada' },
    ],
    cta: 'Conectar meu ecossistema digital',
  },
];

export const serviceMap = services.reduce(
  (acc, service) => ({ ...acc, [service.key]: service }),
  {} as Record<ServiceKey, Service>,
);

export const projects: Project[] = [
  {
    slug: 'beelivery',
    title: 'Beelivery',
    category: 'Plataforma logística e delivery',
    summary:
      'Sistema para operação de entregas com painel de pedidos, status em tempo real, rotas e acompanhamento operacional.',
    context:
      'Uma operação de delivery precisa coordenar pedidos, disponibilidade, entregadores, prazos e comunicação sem depender de planilhas ou mensagens soltas.',
    problem:
      'Pedidos chegavam por canais diferentes, o acompanhamento era manual e a gestão não tinha uma visão consolidada dos gargalos de entrega.',
    solution:
      'Criamos uma plataforma com painel operacional, fluxo de status, base de clientes, leitura de performance e arquitetura preparada para integrações com pagamento, WhatsApp e APIs externas.',
    result:
      'Operação mais previsível, atendimento mais rápido e base pronta para escalar pedidos sem aumentar proporcionalmente o trabalho manual.',
    stack: ['React', 'TypeScript', 'APIs', 'PostgreSQL', 'Vercel', 'GitHub'],
    features: ['Gestão de pedidos', 'Status em tempo real', 'Painel operacional', 'Base de clientes', 'Integrações futuras'],
    differentials: ['Fluxo operacional claro', 'Dashboard para tomada de decisão', 'Arquitetura pronta para módulos logísticos'],
    metrics: [
      { label: 'Visão operacional', value: 'tempo real' },
      { label: 'Canais', value: 'unificados' },
      { label: 'Escala', value: 'modular' },
    ],
    accent: 'signal',
  },
  {
    slug: 'devign-stock',
    title: 'Devign Stock',
    category: 'Sistema de estoque e dashboard',
    summary:
      'Software de controle de estoque com movimentações, indicadores, gestão de produtos e leitura executiva da operação.',
    context:
      'Empresas com estoque ativo precisam rastrear entrada, saída, disponibilidade, produtos críticos e histórico sem depender de controles paralelos.',
    problem:
      'A operação dependia de registros manuais e não tinha leitura rápida de disponibilidade, ruptura, giro e itens que exigiam ação imediata.',
    solution:
      'Desenvolvemos uma aplicação com cadastro de produtos, movimentações, indicadores, filtros e interface objetiva para uso diário por equipes operacionais.',
    result:
      'Processo mais rastreável, menor retrabalho e leitura imediata dos pontos críticos do estoque.',
    stack: ['Python', 'PostgreSQL', 'Dashboard', 'Automação', 'GitHub'],
    features: ['Cadastro de produtos', 'Movimentações', 'Indicadores', 'Filtros operacionais', 'Histórico'],
    differentials: ['Interface de uso recorrente', 'Dados centralizados', 'Base pronta para relatórios avançados'],
    metrics: [
      { label: 'Controle', value: 'centralizado' },
      { label: 'Rastreio', value: 'histórico' },
      { label: 'Operação', value: 'menos manual' },
    ],
    accent: 'violet',
  },
  {
    slug: 'kronos',
    title: 'Kronos',
    category: 'Identidade visual premium',
    summary:
      'Projeto de identidade visual com direção criativa, posicionamento premium e linguagem refinada para uma marca de alta percepção.',
    context:
      'A marca precisava transmitir sofisticação, força visual e clareza de posicionamento sem cair em uma estética genérica ou excessivamente decorativa.',
    problem:
      'A percepção visual ainda não sustentava o nível de autoridade desejado. Faltavam consistência, hierarquia, assinatura gráfica e uma direção premium reconhecível.',
    solution:
      'Construímos uma identidade visual com sistema de marca, paleta, tipografia, composições, aplicações digitais e direção criativa para reforçar presença e valor percebido.',
    result:
      'Uma marca mais sofisticada, consistente e preparada para se apresentar com autoridade em canais digitais, materiais institucionais e experiências comerciais.',
    stack: ['Branding', 'Identidade Visual', 'Design Estratégico', 'Direção Criativa', 'Figma', 'Adobe Illustrator'],
    features: ['Sistema visual', 'Paleta e tipografia', 'Aplicações digitais', 'UI Concepts', 'Motion Identity'],
    differentials: ['Direção premium', 'Consistência de marca', 'Posicionamento visual refinado'],
    metrics: [
      { label: 'Marca', value: 'premium' },
      { label: 'Direção', value: 'criativa' },
      { label: 'Presença', value: 'refinada' },
    ],
    accent: 'amber',
  },
  {
    slug: 'contract-ai',
    title: 'Contract AI',
    category: 'Automação documental com IA',
    summary:
      'Plataforma inteligente para geração automatizada de contratos, preenchimento dinâmico e automação do fluxo documental.',
    context:
      'Empresas que criam contratos com frequência precisam padronizar cláusulas, reduzir preenchimento manual e acelerar a produção documental com mais controle.',
    problem:
      'A criação de contratos dependia de modelos soltos, edição manual e conferência repetitiva, aumentando retrabalho, inconsistência e risco operacional.',
    solution:
      'Desenvolvemos um fluxo para selecionar modelos, preencher dados essenciais, gerar contratos automaticamente e preparar a automação para integrações internas.',
    result:
      'Contratos gerados com mais velocidade, menos trabalho manual e maior consistência entre dados, modelos e fluxo operacional.',
    stack: ['Node.js', 'Express', 'PostgreSQL', 'APIs', 'Automação', 'Railway'],
    features: ['Geração de contratos', 'Modelos dinâmicos', 'Preenchimento inteligente', 'Fluxo documental', 'Deploy contínuo'],
    differentials: ['Automação contratual', 'Experiência SaaS', 'Base preparada para integrações'],
    metrics: [
      { label: 'Contratos', value: 'gerados' },
      { label: 'Fluxo', value: 'automatizado' },
      { label: 'Operação', value: 'menos manual' },
    ],
    accent: 'violet',
  },
];

export const processSteps = [
  {
    title: 'Briefing',
    text: 'Mapeamos negócio, restrições e impacto esperado antes de propor qualquer tela.',
  },
  {
    title: 'Estratégia',
    text: 'Definimos arquitetura, prioridades, narrativa e critérios de sucesso.',
  },
  {
    title: 'Design',
    text: 'Desenhamos hierarquia, interação e percepção premium com precisão.',
  },
  {
    title: 'Desenvolvimento',
    text: 'Construímos com componentes, performance e base preparada para evoluir.',
  },
  {
    title: 'Entrega',
    text: 'Validamos fluxos, responsividade, deploy e documentação essencial.',
  },
  {
    title: 'Suporte',
    text: 'Acompanhamos a entrada em produção e planejamos ciclos de evolução.',
  },
];

export const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'APIs',
  'PostgreSQL',
  'IA',
  'Automação',
  'Vercel',
  'GitHub',
];

export const proofPoints = [
  { label: 'Camadas digitais', value: '360°' },
  { label: 'Arquitetura', value: 'sob medida' },
  { label: 'Entrega', value: 'estratégica' },
  { label: 'Foco', value: 'B2B e high-ticket' },
];

export const testimonials = [
  {
    quote:
      'A Devign traduziu uma operação complexa em uma experiência clara. O resultado parece produto de empresa grande.',
    name: 'Marina Costa',
    role: 'Diretora Comercial',
  },
  {
    quote:
      'O processo foi organizado do briefing ao deploy. Saímos com um sistema mais rápido, bonito e fácil de defender internamente.',
    name: 'Rafael Mendes',
    role: 'Operações',
  },
  {
    quote:
      'A percepção da marca mudou. O site passou confiança antes mesmo do primeiro contato comercial.',
    name: 'Bianca Torres',
    role: 'Fundadora',
  },
];

export const budgetRanges = [
  'R$ 3 mil a R$ 8 mil',
  'R$ 8 mil a R$ 15 mil',
  'R$ 15 mil a R$ 30 mil',
  'Acima de R$ 30 mil',
  'Ainda preciso definir',
];
