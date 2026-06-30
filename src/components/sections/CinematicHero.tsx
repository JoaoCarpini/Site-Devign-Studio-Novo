import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Layers3, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HeroBrandBackdrop } from '../brand/HeroBrandBackdrop';
import { AuroraBackground } from '../backgrounds/AuroraBackground';
import { ButtonLink } from '../ui/Button';
import { HeroMockup } from './HeroMockup';
import { useAndroidCompatibility, useIsMobile, useReduceMotion } from '../../hooks/useMediaQuery';
import { useRoutes } from '../../hooks/useContent';

const particles = [
  { left: '9%', top: '26%', delay: 0, size: 3 },
  { left: '18%', top: '72%', delay: 0.8, size: 2 },
  { left: '39%', top: '18%', delay: 1.1, size: 2 },
  { left: '54%', top: '76%', delay: 0.4, size: 3 },
  { left: '72%', top: '17%', delay: 1.6, size: 2 },
  { left: '86%', top: '58%', delay: 0.2, size: 3 },
  { left: '93%', top: '34%', delay: 1.4, size: 2 },
];

const ENABLE_HERO_METRICS = true;

export function CinematicHero() {
  const isMobile = useIsMobile();
  const reduceMotion = useReduceMotion();
  const androidCompatibility = useAndroidCompatibility();
  const animatedMetrics = !reduceMotion && !androidCompatibility;
  const { t } = useTranslation('home');
  const routes = useRoutes();

  const capabilityPills = t('hero.pills', { returnObjects: true }) as string[];
  const heroMetrics = t('hero.metrics', { returnObjects: true }) as Array<{ value: string; label: string }>;

  if (isMobile) {
    return <MobileCinematicHero />;
  }

  return (
    <section className="relative isolate overflow-hidden pt-20 sm:min-h-[min(900px,100vh)] sm:pt-32">
      <AuroraBackground />
      <HeroBrandBackdrop />
      <div aria-hidden="true" className="hero-fine-grid absolute inset-0 z-0 opacity-20 sm:opacity-60" />
      <div aria-hidden="true" className="absolute left-1/2 top-24 z-0 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[120px] sm:block" />
      <div aria-hidden="true" className="absolute right-[-12rem] top-32 z-0 hidden h-[26rem] w-[26rem] rounded-full bg-signal/8 blur-[100px] sm:block" />

      {!isMobile && !androidCompatibility &&
        particles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            aria-hidden="true"
            className="absolute z-0 hidden rounded-full bg-violet-300/70 shadow-[0_0_24px_rgba(169,139,255,0.6)] sm:block"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [-5, 7, -5], opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          />
        ))}

      <div className="container-premium relative z-10 grid gap-8 pb-10 pt-5 sm:gap-14 sm:pb-14 sm:pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pb-20">
        <div>
          {androidCompatibility ? (
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300 shadow-[0_0_50px_rgba(141,92,255,0.16)] sm:mb-7 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.24em] sm:backdrop-blur-2xl">
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
            </div>
          ) : (
            <motion.div
              initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: isMobile ? 0.3 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300 shadow-[0_0_50px_rgba(141,92,255,0.16)] sm:mb-7 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.24em] sm:backdrop-blur-2xl"
            >
              <Sparkles className="h-4 w-4" />
              {t('hero.badge')}
            </motion.div>
          )}

          {androidCompatibility ? (
            <h1 className="max-w-6xl text-balance text-[clamp(2.85rem,15vw,4.35rem)] font-semibold leading-[0.92] tracking-normal text-frost sm:text-[clamp(3.5rem,7vw,7.7rem)] sm:leading-[0.88]">
              {t('hero.title')}
            </h1>
          ) : (
            <motion.h1
              className="max-w-6xl text-balance text-[clamp(2.85rem,15vw,4.35rem)] font-semibold leading-[0.92] tracking-normal text-frost sm:text-[clamp(3.5rem,7vw,7.7rem)] sm:leading-[0.88]"
              initial={isMobile ? { opacity: 0, y: 10 } : { opacity: 0, y: 32, filter: 'blur(14px)' }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: isMobile ? 0.34 : 0.9, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0.02 : 0.08 }}
            >
              {t('hero.title')}
            </motion.h1>
          )}

          {androidCompatibility ? (
            <p className="mt-6 max-w-2xl text-base leading-7 text-mist sm:mt-8 sm:text-xl sm:leading-9">
              {t('hero.description')}
            </p>
          ) : (
            <motion.p
              className="mt-6 max-w-2xl text-base leading-7 text-mist sm:mt-8 sm:text-xl sm:leading-9"
              initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: isMobile ? 0.32 : 0.75, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0.04 : 0.18 }}
            >
              {t('hero.description')}
            </motion.p>
          )}

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
          >
            <ButtonLink to={routes.budget} className="w-full px-6 sm:w-auto">
              {t('hero.cta_primary')}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to={routes.projects} variant="secondary" className="w-full px-6 sm:w-auto">
              {t('hero.cta_cases')}
            </ButtonLink>
            <ButtonLink to={routes.budget} variant="ghost" className="hidden px-4 sm:inline-flex">
              <CalendarDays className="h-4 w-4" />
              {t('hero.cta_scope')}
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-2 sm:mt-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.34 }}
          >
            {capabilityPills.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-mist sm:px-4 sm:py-2 sm:text-sm sm:backdrop-blur-xl">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[27rem] sm:max-w-none"
          initial={isMobile ? { opacity: 0, y: 10 } : { opacity: 0, x: 44, filter: 'blur(14px)' }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: isMobile ? 0.34 : 0.95, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0.04 : 0.16 }}
        >
          <div aria-hidden="true" className="absolute -inset-6 hidden rounded-[3rem] bg-violet-500/16 blur-3xl sm:block" />
          <HeroMockup className="relative z-10" />

          <motion.div
            className="absolute -left-3 top-8 z-20 hidden rounded-2xl border border-white/10 bg-ink/78 px-4 py-3 shadow-premium backdrop-blur-2xl sm:block"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">{t('hero.mockup_stack_label')}</span>
            <p className="mt-1 text-sm font-semibold text-frost">{t('hero.mockup_stack')}</p>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-16 z-20 hidden rounded-2xl border border-white/10 bg-ink/78 px-4 py-3 shadow-premium backdrop-blur-2xl sm:block"
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">{t('hero.mockup_delivery_label')}</span>
            <p className="mt-1 text-sm font-semibold text-frost">{t('hero.mockup_delivery')}</p>
          </motion.div>
        </motion.div>
      </div>

      {ENABLE_HERO_METRICS ? (
        <div className="container-premium relative z-10 pb-16 sm:pb-32 lg:pb-36">
          <HeroMetricsGrid metrics={heroMetrics} animated={animatedMetrics} />
        </div>
      ) : null}

      <Layers3 aria-hidden="true" className="absolute bottom-16 left-8 z-0 hidden h-24 w-24 text-white/[0.035] lg:block" />
    </section>
  );
}

function MobileCinematicHero() {
  const { t } = useTranslation('home');
  const routes = useRoutes();

  const capabilityPills = t('hero.pills', { returnObjects: true }) as string[];
  const heroMetrics = t('hero.metrics', { returnObjects: true }) as Array<{ value: string; label: string }>;

  return (
    <section className="relative overflow-clip pt-[calc(5rem+env(safe-area-inset-top))]">
      <AuroraBackground />
      <div aria-hidden="true" className="hero-fine-grid absolute inset-0 z-0 opacity-20" />

      <div className="container-premium relative z-10 grid gap-8 pb-10 pt-5">
        <div>
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-violet-300 shadow-[0_0_50px_rgba(141,92,255,0.16)] min-[390px]:text-[0.68rem] min-[390px]:tracking-[0.16em]">
            <Sparkles className="h-4 w-4" />
            {t('hero.badge')}
          </div>

          <h1 className="max-w-6xl text-balance text-[clamp(2.35rem,12vw,4.35rem)] font-semibold leading-[0.96] tracking-normal text-frost min-[390px]:text-[clamp(2.85rem,15vw,4.35rem)] min-[390px]:leading-[0.92]">
            {t('hero.title')}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-mist">
            {t('hero.description')}
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <ButtonLink to={routes.budget} className="w-full px-6">
              {t('hero.cta_primary')}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to={routes.projects} variant="secondary" className="w-full px-6">
              {t('hero.cta_cases')}
            </ButtonLink>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {capabilityPills.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-mist">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[27rem] min-w-0">
          <StaticHeroMockup />
        </div>
      </div>

      {ENABLE_HERO_METRICS ? (
        <div className="container-premium relative z-10 pb-16">
          <HeroMetricsGrid metrics={heroMetrics} />
        </div>
      ) : null}
    </section>
  );
}

function HeroMetricsGrid({
  metrics,
  animated = false,
}: {
  metrics: Array<{ value: string; label: string }>;
  animated?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2.5 border-t border-white/10 pt-5 md:grid-cols-3 md:gap-3">
      {metrics.map((item, index) => {
        const content = (
          <>
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-signal" />
            <div className="min-w-0">
              <strong className="block break-words text-lg font-semibold tracking-normal text-frost md:text-xl">{item.value}</strong>
              <span className="mt-1 block break-words text-sm leading-6 text-muted md:leading-normal">{item.label}</span>
            </div>
          </>
        );

        const className = 'flex min-w-0 transform-none items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 md:gap-4 md:p-5 md:backdrop-blur-xl';

        if (!animated) {
          return (
            <div key={item.label} className={className}>
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={item.label}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38 + index * 0.07 }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

function StaticHeroMockup() {
  return (
    <div className="mockup-window relative mx-auto w-full max-w-[45rem] rounded-[1.35rem]">
      <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4dd4c6]" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.65rem] text-muted">Command Center</span>
      </div>

      <div className="grid gap-3 p-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <span className="block h-2.5 w-20 rounded-full bg-violet-400/70" />
            <strong className="mt-4 block text-3xl font-semibold tracking-normal text-frost">98</strong>
            <span className="mt-1 block text-[0.68rem] leading-4 text-muted">Precisão técnica</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <div className="space-y-2">
              <span className="block h-2.5 rounded-full bg-white/25" />
              <span className="block h-2.5 w-4/5 rounded-full bg-white/12" />
              <span className="block h-2.5 w-3/5 rounded-full bg-white/12" />
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.18),rgba(255,255,255,0.04))] p-3">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Pipeline</span>
              <span className="text-signal">Live</span>
            </div>
            <div className="mt-4 space-y-2">
              {[76, 58, 84].map((width) => (
                <span key={width} className="block h-2 rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-violet-400/70" style={{ width: `${width}%` }} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.24),rgba(77,212,198,0.08)_45%,rgba(255,255,255,0.04))] p-3">
          <div className="grid h-40 grid-cols-6 items-end gap-1.5">
            {[42, 58, 51, 72, 64, 88].map((height) => (
              <span
                key={height}
                className="rounded-t-xl bg-[linear-gradient(180deg,#f7f5ff,rgba(169,139,255,0.58))]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {['APIs', 'IA', 'Scale'].map((item) => (
              <span key={item} className="rounded-xl border border-white/10 bg-white/[0.08] px-2 py-2.5 text-center text-[0.68rem] font-semibold text-mist">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
