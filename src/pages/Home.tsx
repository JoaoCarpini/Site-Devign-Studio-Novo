import { ArrowRight, Building2, MoveRight, Network, ServerCog, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../components/ui/LocaleLink';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ArchitectureBlueprint } from '../components/sections/ArchitectureBlueprint';
import { CinematicHero } from '../components/sections/CinematicHero';
import { ServicesMarquee } from '../components/sections/ServicesMarquee';
import { DevelopmentSystem } from '../components/sections/DevelopmentSystem';
import { EngineeringCapabilities } from '../components/sections/EngineeringCapabilities';
import { MobileHomeExperience } from '../components/sections/MobileHomeExperience';
import { ProjectShowcase } from '../components/sections/ProjectShowcase';
import { TechCloud } from '../components/sections/TechCloud';
import { TeamSection } from '../components/sections/TeamSection';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { useServices, useRoutes } from '../hooks/useContent';
import type { RouteKey } from '../i18n';

const companySignalIcons = [ShieldCheck, ServerCog, Network];
const institutionalRouteKeys: RouteKey[] = ['services', 'projects', 'process', 'about'];

const ENABLE_CINEMATIC_HERO = true;
const ENABLE_SERVICES_MARQUEE = true;
const ENABLE_INSTITUTIONAL_ROUTES = true;
const ENABLE_ARCHITECTURE_BLUEPRINT = true;
const ENABLE_ENGINEERING_CAPABILITIES = true;
const ENABLE_SERVICE_CARDS = true;
const ENABLE_DEVELOPMENT_SYSTEM = true;
const ENABLE_PROJECT_SHOWCASE = true;
const ENABLE_TECH_CLOUD = true;
const ENABLE_TEAM_SECTION = true;
const ENABLE_COMPANY_SIGNALS = true;
const ENABLE_BUDGET_CTA = true;
const MOBILE_HOME_QUERY = '(max-width: 1024px)';

// Leitura síncrona fora do componente — roda uma vez antes de qualquer render
// Evita o flash de layout no Android onde useEffect chega tarde demais
const IS_MOBILE_HOME = typeof window !== 'undefined'
  ? window.matchMedia(MOBILE_HOME_QUERY).matches
  : false;

export default function Home() {
  const [isMobileHome, setIsMobileHome] = useState(IS_MOBILE_HOME);
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const services = useServices();
  const routes = useRoutes();

  const institutionalRoutes = (t('institutional.routes', { returnObjects: true }) as Array<{ label: string; text: string }>).map(
    (item, index) => ({ ...item, to: routes[institutionalRouteKeys[index]] }),
  );
  const companySignals = (t('signals', { returnObjects: true }) as Array<{ title: string; text: string }>).map((item, index) => ({
    ...item,
    icon: companySignalIcons[index],
  }));

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_HOME_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsMobileHome(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isMobileHome) {
    return <MobileHomeExperience />;
  }

  return (
    <>
      {ENABLE_CINEMATIC_HERO ? <CinematicHero /> : null}
      {ENABLE_SERVICES_MARQUEE ? <ServicesMarquee /> : null}

      {ENABLE_INSTITUTIONAL_ROUTES ? (
        <section className="section-band light-section">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <SectionIntro
              eyebrow={t('institutional.eyebrow')}
              title={t('institutional.title')}
              text={t('institutional.description')}
              tone="light"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {institutionalRoutes.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.05}>
                  <Link
                    to={item.to}
                    className="light-card group block h-full p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="break-words text-sm font-semibold uppercase tracking-[0.16em] text-violet-700 sm:tracking-[0.22em]">{item.label}</span>
                      <MoveRight className="h-4 w-4 text-[#7a728b] transition duration-500 group-hover:translate-x-1 group-hover:text-violet-700" />
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[#5a5468]">{item.text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        </section>
      ) : null}

      {ENABLE_ARCHITECTURE_BLUEPRINT ? <ArchitectureBlueprint /> : null}
      {ENABLE_ENGINEERING_CAPABILITIES ? <EngineeringCapabilities /> : null}

      {ENABLE_SERVICE_CARDS ? (
        <section className="section-band">
        <div className="container-premium">
          <SectionIntro
            eyebrow={t('serviceCards.eyebrow')}
            title={t('serviceCards.title')}
            text={t('serviceCards.description')}
          />
          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 4).map((service, index) => (
              <Reveal key={service.key} delay={index * 0.04} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to={routes.services} variant="secondary" className="w-full sm:w-fit">
              {tCommon('buttons.exploreServices')}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
        </section>
      ) : null}

      {ENABLE_DEVELOPMENT_SYSTEM ? <DevelopmentSystem /> : null}

      {ENABLE_PROJECT_SHOWCASE ? <ProjectShowcase compact /> : null}

      {ENABLE_TECH_CLOUD ? (
        <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro
              eyebrow={t('tech.eyebrow')}
              title={t('tech.title')}
              text={t('tech.description')}
            />
            <TechCloud />
          </div>
        </div>
        </section>
      ) : null}

      {ENABLE_TEAM_SECTION ? <TeamSection compact /> : null}

      {ENABLE_COMPANY_SIGNALS ? (
        <section className="section-band">
        <div className="container-premium">
          <div className="grid gap-4 lg:grid-cols-3">
            {companySignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.05} className="premium-card">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/12 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-normal text-frost">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
        </section>
      ) : null}

      {ENABLE_BUDGET_CTA ? (
        <section className="pb-16 sm:pb-24">
        <div className="container-premium">
          <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.26),rgba(255,255,255,0.06)_42%,rgba(77,212,198,0.1))] p-5 shadow-premium sm:rounded-[2rem] sm:p-12 lg:p-14">
            <div className="absolute inset-x-8 top-0 h-px bg-premium-line" />
            <Reveal className="max-w-4xl">
              <span className="eyebrow mb-5">{t('budgetCta.eyebrow')}</span>
              <h2 className="heading-lg text-balance">{t('budgetCta.title')}</h2>
              <p className="body-lead mt-5 max-w-3xl">{t('budgetCta.description')}</p>
              <ButtonLink to={routes.budget} className="mt-8 w-full sm:w-fit">
                {t('budgetCta.cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
            <Building2 className="absolute bottom-8 right-8 hidden h-24 w-24 text-white/10 lg:block" />
          </div>
        </div>
        </section>
      ) : null}
    </>
  );
}
