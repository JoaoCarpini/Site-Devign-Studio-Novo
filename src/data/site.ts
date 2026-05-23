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
    kicker: 'Presença digital premium',
    summary:
      'Sites institucionais com arquitetura sólida, performance real e percepção de marca acima da média.',
    hero:
      'Sites premium para empresas que precisam comunicar valor antes mesmo da primeira reunião comercial.',
    strategic:
      'Um site institucional precisa sustentar posicionamento, confiança e conversão. A Devign estrutura cada página como uma experiência comercial: narrativa clara, design refinado, performance técnica e uma jornada que conduz o visitante até o contato.',
    benefits: [
      'Percepção premium para marcas que vendem serviços, produtos ou tecnologia de maior valor.',
      'Arquitetura pensada para SEO, carregamento rápido e leitura objetiva em qualquer tela.',
      'Páginas que equilibram impacto visual, autoridade e chamadas de conversão bem posicionadas.',
      'Base técnica pronta para evoluir com integrações, analytics, CRM e automações.',
    ],
    differentials: [
      'Design sob medida, sem cara de template pronto.',
      'Copy orientada a decisão, com foco em valor e clareza comercial.',
      'Componentização para manutenção simples e evolução futura.',
      'Entrega com refinamento visual, responsividade e validação de experiência.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel', 'Analytics'],
    process: [
      'Diagnóstico de posicionamento e público de maior valor.',
      'Arquitetura das páginas e definição das mensagens principais.',
      'Design visual com direção premium e protótipo navegável.',
      'Desenvolvimento responsivo, otimização e publicação.',
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
    cta: 'Quero um site institucional premium',
  },
  {
    key: 'web-systems',
    path: '/servicos/sistemas-web',
    title: 'Sistemas Web',
    menuTitle: 'Sistemas Web',
    kicker: 'Operação com clareza',
    summary:
      'Sistemas sob medida para centralizar dados, reduzir retrabalho e dar escala para rotinas críticas.',
    hero:
      'Plataformas web desenhadas para operações que precisam de controle, velocidade e confiabilidade.',
    strategic:
      'Sistemas internos mal planejados criam atrito, planilhas paralelas e decisões lentas. A Devign projeta plataformas web com fluxos claros, permissões, dashboards e integrações para transformar processos em operação mensurável.',
    benefits: [
      'Centralização de cadastros, fluxos, aprovações e indicadores.',
      'Interfaces desenhadas para uso recorrente, com menos fricção para o time.',
      'Arquitetura preparada para autenticação, permissões e crescimento modular.',
      'Dados organizados para relatórios, dashboards e decisões executivas.',
    ],
    differentials: [
      'Modelagem de processos antes do código.',
      'UX funcional para times que usam o sistema todos os dias.',
      'Back-end pensado para performance, segurança e manutenção.',
      'Documentação técnica e visão de evolução do produto.',
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
    cta: 'Quero planejar um sistema web',
  },
  {
    key: 'apis',
    path: '/servicos/apis',
    title: 'APIs',
    menuTitle: 'APIs',
    kicker: 'Conectividade confiável',
    summary:
      'APIs robustas para conectar sistemas, expor dados, automatizar fluxos e sustentar produtos digitais.',
    hero:
      'APIs bem desenhadas para empresas que precisam integrar, escalar e operar com previsibilidade.',
    strategic:
      'Uma API não é apenas um ponto de conexão. Ela define como dados circulam, como sistemas conversam e como a operação cresce sem depender de gambiarras. A Devign cria APIs com contratos claros, segurança e documentação útil.',
    benefits: [
      'Conexão entre sistemas internos, plataformas comerciais e produtos digitais.',
      'Padronização de dados para reduzir inconsistências e retrabalho.',
      'Rotas documentadas, versionamento e autenticação adequados ao contexto.',
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
    cta: 'Quero desenvolver uma API',
  },
  {
    key: 'automation',
    path: '/servicos/automacao',
    title: 'Automação',
    menuTitle: 'Automação',
    kicker: 'Menos processo manual',
    summary:
      'Automações para eliminar tarefas repetitivas, conectar fluxos e liberar tempo operacional.',
    hero:
      'Automação para empresas que precisam ganhar tempo, reduzir falhas e operar com mais precisão.',
    strategic:
      'Rotinas manuais consomem margem, criam erros e travam crescimento. A Devign identifica gargalos, desenha fluxos automatizados e conecta ferramentas para que a operação dependa menos de esforço repetitivo.',
    benefits: [
      'Redução de retrabalho em tarefas administrativas, comerciais e operacionais.',
      'Fluxos automáticos entre formulários, planilhas, CRM, sistemas e APIs.',
      'Alertas, relatórios e atualizações sem intervenção manual.',
      'Operação mais previsível, com menos falhas por esquecimento ou duplicidade.',
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
    cta: 'Quero automatizar minha operação',
  },
  {
    key: 'ai',
    path: '/servicos/ia',
    title: 'Soluções com IA',
    menuTitle: 'IA',
    kicker: 'Inteligência aplicada',
    summary:
      'IA aplicada a atendimento, análise, conteúdo, automação e sistemas internos com utilidade real.',
    hero:
      'IA incorporada à operação com foco em produtividade, contexto e controle.',
    strategic:
      'IA só gera valor quando resolve um fluxo específico. A Devign cria camadas inteligentes para atendimento, análise de dados, geração assistida, triagem, sumarização e automações, sempre conectadas ao contexto do negócio.',
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
          'Sim, mas priorizamos assistentes com contexto e utilidade operacional, não apenas respostas genéricas.',
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
    cta: 'Quero aplicar IA no meu negócio',
  },
  {
    key: 'landing-pages',
    path: '/servicos/landing-pages',
    title: 'Landing Pages',
    menuTitle: 'Landing Pages',
    kicker: 'Conversão com percepção',
    summary:
      'Páginas de campanha e captação com narrativa forte, design premium e foco em conversão qualificada.',
    hero:
      'Landing pages para ofertas que precisam parecer valiosas, claras e prontas para vender.',
    strategic:
      'Uma landing page high-ticket não pode ser só bonita. Ela precisa sustentar promessa, prova, objeções, diferenciais e CTA com precisão. A Devign cria páginas de campanha com narrativa, estética e velocidade.',
    benefits: [
      'Comunicação direta para lançamento, tráfego pago, captação ou validação.',
      'Estrutura de copy focada em decisão, objeções e valor percebido.',
      'Design responsivo com impacto visual e leitura rápida.',
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
    cta: 'Quero uma landing page premium',
  },
  {
    key: 'integrations',
    path: '/servicos/integracoes',
    title: 'Integrações',
    menuTitle: 'Integrações',
    kicker: 'Sistemas conversando',
    summary:
      'Integrações entre plataformas, dados e operações para reduzir ilhas de informação.',
    hero:
      'Integrações sob medida para empresas que precisam conectar ferramentas sem perder controle.',
    strategic:
      'Quando cada ferramenta guarda uma parte da operação, decisões ficam lentas e processos duplicam. A Devign conecta sistemas, normaliza dados e cria fluxos confiáveis entre plataformas internas e externas.',
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
    cta: 'Quero conectar meus sistemas',
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
    category: 'Sistema de gestão e produtividade',
    summary:
      'Plataforma para acompanhamento de rotinas, tarefas, prazos e indicadores de produtividade com visão gerencial.',
    context:
      'Times em crescimento precisam organizar entregas, responsáveis, prazos e prioridades com clareza para evitar ruído operacional.',
    problem:
      'As demandas ficavam espalhadas entre conversas, planilhas e ferramentas sem padronização, dificultando cobrança, priorização e leitura de capacidade.',
    solution:
      'Estruturamos um sistema com áreas de trabalho, tarefas, responsáveis, prazos, status, indicadores e arquitetura preparada para automações de follow-up.',
    result:
      'Gestão mais previsível, menos perda de contexto e maior clareza sobre carga, prioridade e andamento das entregas.',
    stack: ['Next.js', 'TypeScript', 'APIs', 'PostgreSQL', 'Vercel', 'GitHub'],
    features: ['Tarefas e prazos', 'Responsáveis', 'Status de entrega', 'Indicadores', 'Automações de follow-up'],
    differentials: ['Visão gerencial por etapa', 'Estrutura escalável por equipe', 'Base preparada para permissões'],
    metrics: [
      { label: 'Gestão', value: 'por status' },
      { label: 'Prioridade', value: 'visível' },
      { label: 'Times', value: 'multiárea' },
    ],
    accent: 'amber',
  },
  {
    slug: 'contract-ai',
    title: 'Contract AI',
    category: 'IA aplicada a contratos',
    summary:
      'Solução com IA para leitura, triagem, sumarização e análise assistida de contratos e documentos empresariais.',
    context:
      'Empresas que lidam com contratos precisam acelerar revisão, identificar riscos, padronizar leitura e reduzir dependência de análise manual repetitiva.',
    problem:
      'Documentos extensos consumiam tempo de análise, dificultavam comparação entre versões e atrasavam decisões jurídicas, comerciais ou administrativas.',
    solution:
      'Criamos uma experiência com upload de documentos, extração de pontos relevantes, resumos estruturados, classificação e preparação para integração com bases internas.',
    result:
      'Análise inicial mais rápida, melhor organização de informações críticas e uma camada inteligente para apoiar decisão sem substituir revisão humana.',
    stack: ['IA', 'Python', 'APIs', 'PostgreSQL', 'React', 'TypeScript'],
    features: ['Upload de documentos', 'Resumo com IA', 'Classificação', 'Extração de cláusulas', 'Histórico de análises'],
    differentials: ['IA com contexto controlado', 'Fluxo de revisão assistida', 'Arquitetura preparada para base documental'],
    metrics: [
      { label: 'Triagem', value: 'assistida' },
      { label: 'Riscos', value: 'destacados' },
      { label: 'Leitura', value: 'acelerada' },
    ],
    accent: 'violet',
  },
];

export const processSteps = [
  {
    title: 'Briefing',
    text: 'Entendemos negócio, objetivos, restrições, público e o impacto esperado antes de sugerir qualquer tela.',
  },
  {
    title: 'Estratégia',
    text: 'Definimos arquitetura, prioridades, narrativa, integrações e critérios de sucesso para o projeto.',
  },
  {
    title: 'Design',
    text: 'Criamos uma experiência visual com hierarquia forte, usabilidade e percepção premium desde o primeiro contato.',
  },
  {
    title: 'Desenvolvimento',
    text: 'Implementamos com componentes reutilizáveis, código limpo, performance e estrutura preparada para evolução.',
  },
  {
    title: 'Entrega',
    text: 'Validamos responsividade, fluxos principais, deploy, ajustes finais e documentação essencial.',
  },
  {
    title: 'Suporte',
    text: 'Acompanhamos a entrada em produção e planejamos melhorias para manter o produto evoluindo com segurança.',
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
  { label: 'Serviços digitais', value: '360°' },
  { label: 'Arquitetura', value: 'sob medida' },
  { label: 'Entrega', value: 'orientada a valor' },
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
