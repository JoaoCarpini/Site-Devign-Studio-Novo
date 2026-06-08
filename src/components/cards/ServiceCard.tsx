import { ArrowUpRight, Bot, BrainCircuit, Cable, Globe2, LayoutDashboard, PanelsTopLeft, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service, ServiceKey } from '../../data/site';

const icons: Record<ServiceKey, typeof Globe2> = {
  'web-development': Globe2,
  'web-systems': LayoutDashboard,
  apis: Cable,
  automation: Workflow,
  ai: BrainCircuit,
  'landing-pages': PanelsTopLeft,
  integrations: Bot,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.key];

  return (
    <Link to={service.path} className="premium-card group flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-400">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-frost" />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mt-5 min-h-[2.5rem] text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-violet-400 sm:mt-6 sm:text-sm sm:tracking-[0.22em]">
          {service.kicker}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-normal text-frost sm:text-2xl">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:leading-7">{service.summary}</p>
      </div>
    </Link>
  );
}
