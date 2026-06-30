import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cable,
  Code2,
  Database,
  Gauge,
  Github,
  LayoutDashboard,
  Layers3,
  LucideIcon,
  PanelsTopLeft,
  Rocket,
  Search,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../ui/LocaleLink';
import { useRoutes } from '../../hooks/useContent';

const serviceIcons: LucideIcon[] = [PanelsTopLeft, LayoutDashboard, Workflow, BrainCircuit, Cable, Gauge];
const pillarIcons: LucideIcon[] = [Search, ShieldCheck, Code2];
const processIcons: LucideIcon[] = [Search, Layers3, Code2, Rocket];
const stackIcons: LucideIcon[] = [Code2, ShieldCheck, Cable, Bot, Database, BrainCircuit, Workflow, Github, Rocket];

export function MobileHomeExperience() {
  const { t } = useTranslation('home');
  const routes = useRoutes();

  const signals = t('mobile.signals', { returnObjects: true }) as string[];
  const services = (t('mobile.services', { returnObjects: true }) as Array<{ title: string; text: string }>).map(
    (item, index) => ({ ...item, icon: serviceIcons[index] }),
  );
  const pillars = (t('mobile.pillars', { returnObjects: true }) as Array<{ title: string; text: string }>).map(
    (item, index) => ({ ...item, icon: pillarIcons[index] }),
  );
  const process = (t('mobile.process', { returnObjects: true }) as Array<{ title: string; text: string }>).map(
    (item, index) => ({ ...item, icon: processIcons[index] }),
  );
  const projects = t('mobile.projects', { returnObjects: true }) as Array<{
    category: string;
    title: string;
    text: string;
    tags: string[];
  }>;
  const stack = (t('mobile.stack', { returnObjects: true }) as Array<{ name: string; layer: string }>).map(
    (item, index) => ({ ...item, icon: stackIcons[index] }),
  );

  return (
    <main className="mobile-home bg-[#050509] text-frost">
      <section className="mobile-home-hero">
        <div className="mobile-home-inner">
          <span className="mobile-home-eyebrow">{t('mobile.eyebrow')}</span>
          <h1 className="mobile-home-title">{t('mobile.title')}</h1>
          <p className="mobile-home-lead">{t('mobile.description')}</p>

          <div className="mobile-home-actions">
            <Link to={routes.budget} className="mobile-home-button mobile-home-button-primary">
              {t('mobile.cta_primary')}
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link to={routes.projects} className="mobile-home-button mobile-home-button-secondary">
              {t('mobile.cta_cases')}
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

      <MobileSection eyebrow={t('mobile.sections.services_eyebrow')} title={t('mobile.sections.services_title')}>
        <div className="mobile-home-card-grid">
          {services.map((service) => (
            <MobileCard key={service.title} title={service.title} text={service.text} icon={<service.icon className="h-5 w-5" />} />
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow={t('mobile.sections.method_eyebrow')} title={t('mobile.sections.method_title')} light>
        <div className="mobile-home-card-grid mobile-home-card-grid-three">
          {pillars.map((pillar) => (
            <MobileCard key={pillar.title} title={pillar.title} text={pillar.text} icon={<pillar.icon className="h-5 w-5" />} light />
          ))}
        </div>
      </MobileSection>

      <MobileSection eyebrow={t('mobile.sections.process_eyebrow')} title={t('mobile.sections.process_title')}>
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

      <MobileSection eyebrow={t('mobile.sections.projects_eyebrow')} title={t('mobile.sections.projects_title')}>
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

      <MobileSection
        eyebrow={t('mobile.sections.tech_eyebrow')}
        title={t('mobile.sections.tech_title')}
        className="mobile-home-tech-section"
      >
        <p className="mobile-home-section-lead">{t('mobile.sections.tech_description')}</p>
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
          <span className="mobile-home-eyebrow">{t('mobile.sections.budget_eyebrow')}</span>
          <h2>{t('mobile.sections.budget_title')}</h2>
          <p>{t('mobile.sections.budget_description')}</p>
          <Link to={routes.budget} className="mobile-home-button mobile-home-button-primary">
            {t('mobile.sections.budget_cta')}
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
