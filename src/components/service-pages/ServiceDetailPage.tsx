import { ArrowRight, CheckCircle2, Layers3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../ui/LocaleLink';
import type { Service } from '../../data/site';
import { AuroraBackground } from '../backgrounds/AuroraBackground';
import { Reveal } from '../animations/Reveal';
import { ButtonLink } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { FaqAccordion } from '../sections/FaqAccordion';
import { useRoutes } from '../../hooks/useContent';

export function ServiceDetailPage({ service }: { service: Service }) {
  const { t } = useTranslation('services');
  const routes = useRoutes();

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-28">
          <Reveal className="max-w-4xl">
            <Link to={routes.services} className="eyebrow mb-6">
              {t('detail.backLabel')} / {service.menuTitle}
            </Link>
            <h1 className="heading-xl text-balance">{service.hero}</h1>
            <p className="body-lead mt-7 max-w-3xl">{service.strategic}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={routes.budget}>
                {service.cta}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink to={routes.projects} variant="secondary">
                {t('detail.exploreButton')}
              </ButtonLink>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {service.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <strong className="block text-2xl font-semibold tracking-normal text-frost sm:text-3xl">{metric.value}</strong>
                <span className="mt-1 block text-sm text-muted">{metric.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow={t('detail.value.eyebrow')}
            title={t('detail.value.title')}
            text={t('detail.value.description')}
          />
          <div className="grid gap-3">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 0.05} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-signal" />
                <p className="text-sm leading-7 text-mist">{benefit}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-frost text-ink">
        <div className="container-premium">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <Reveal>
              <span className="inline-flex rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
                {t('detail.direction.badge')}
              </span>
              <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
                {t('detail.direction.title')}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#4a4658]">{t('detail.direction.description')}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.differentials.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]">
                  <Layers3 className="h-5 w-5 text-violet-700" />
                  <p className="mt-4 text-sm font-medium leading-7 text-[#343040]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium">
          <SectionIntro
            eyebrow={t('detail.stack.eyebrow')}
            title={t('detail.stack.title')}
            text={t('detail.stack.description')}
            align="center"
          />
          <Reveal className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {service.stack.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-mist backdrop-blur-xl">
                {item}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-band border-y border-white/10 bg-white/[0.025]">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow={t('detail.process.eyebrow')}
            title={t('detail.process.title')}
            text={t('detail.process.description')}
          />
          <div className="grid gap-3">
            {service.process.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-violet-400/30 bg-violet-500/12 text-sm font-semibold text-violet-400">
                  {index + 1}
                </span>
                <p className="pt-2 text-sm leading-7 text-mist">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionIntro
            eyebrow={t('detail.faq.eyebrow')}
            title={t('detail.faq.title')}
            text={t('detail.faq.description')}
          />
          <Reveal>
            <FaqAccordion items={service.faq} />
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-premium">
          <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.22),rgba(255,255,255,0.06)_42%,rgba(77,212,198,0.1))] p-5 shadow-premium sm:rounded-[2rem] sm:p-12">
            <Reveal className="max-w-3xl">
              <span className="eyebrow mb-5">{t('detail.cta.eyebrow')}</span>
              <h2 className="heading-lg">{t('detail.cta.title')}</h2>
              <p className="body-lead mt-5">{t('detail.cta.description')}</p>
              <ButtonLink to={routes.budget} className="mt-8">
                {t('detail.cta.button')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
