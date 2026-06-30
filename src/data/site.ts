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

export type ProjectAccent = 'violet' | 'signal' | 'amber';

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
  accent: ProjectAccent;
};

export const serviceKeys: ServiceKey[] = [
  'web-development',
  'web-systems',
  'apis',
  'automation',
  'ai',
  'landing-pages',
  'integrations',
];

export const serviceStack: Record<ServiceKey, string[]> = {
  'web-development': ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel', 'Analytics'],
  'web-systems': ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'APIs'],
  apis: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'REST', 'Webhooks'],
  automation: ['Python', 'Node.js', 'Webhooks', 'APIs', 'PostgreSQL', 'Cron Jobs'],
  ai: ['OpenAI', 'Python', 'Node.js', 'Vector Search', 'APIs', 'Dashboards'],
  'landing-pages': ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vercel', 'CRM'],
  integrations: ['REST', 'Webhooks', 'Python', 'Node.js', 'PostgreSQL', 'GitHub'],
};

export type ProjectSlug = 'beelivery' | 'devign-stock' | 'kronos' | 'contract-ai';

export const projectSlugs: ProjectSlug[] = ['beelivery', 'devign-stock', 'kronos', 'contract-ai'];

export const projectAccent: Record<ProjectSlug, ProjectAccent> = {
  beelivery: 'signal',
  'devign-stock': 'violet',
  kronos: 'amber',
  'contract-ai': 'violet',
};
