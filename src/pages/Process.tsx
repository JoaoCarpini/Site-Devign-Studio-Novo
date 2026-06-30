import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuroraBackground } from '../components/backgrounds/AuroraBackground';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { Reveal } from '../components/animations/Reveal';
import { ButtonLink } from '../components/ui/Button';
import { SectionIntro } from '../components/ui/SectionIntro';
import { useRoutes } from '../hooks/useContent';

export default function Process() {
  const { t } = useTranslation('process');
  const routes = useRoutes();
  const guarantees = t('governance.guarantees', { returnObjects: true }) as string[];

  return (
    <>
      <section className="relative overflow-hidden pt-28 sm:pt-40">
        <AuroraBackground />
        <div className="container-premium relative pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-28">
          <Reveal className="max-w-4xl">
            <span className="eyebrow mb-6">{t('hero.eyebrow')}</span>
            <h1 className="heading-xl text-balance">{t('hero.title')}</h1>
            <p className="body-lead mt-7 max-w-3xl">
              {t('hero.description')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-band pt-0">
        <div className="container-premium">
          <ProcessTimeline />
        </div>
      </section>

      <section className="section-band bg-frost text-ink">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="inline-flex rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700">
              {t('governance.badge')}
            </span>
            <h2 className="mt-5 text-[2rem] font-semibold leading-tight tracking-normal text-ink sm:text-5xl">
              {t('governance.title')}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {guarantees.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-[0_16px_40px_rgba(5,5,9,0.08)]">
                <p className="text-sm font-medium leading-7 text-[#343040]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container-premium rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl sm:rounded-[2rem] sm:p-12">
          <SectionIntro
            eyebrow={t('next.eyebrow')}
            title={t('next.title')}
            text={t('next.description')}
          />
          <ButtonLink to={routes.budget} className="mt-8">
            {t('next.cta')}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
