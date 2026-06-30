import { Fragment, FormEvent, useMemo, useRef, useState, type ElementType, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  Building2,
  Cable,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  Globe2,
  LayoutGrid,
  Loader2,
  LockKeyhole,
  PanelsTopLeft,
  Palette,
  Radar,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BriefingApiError, submitBriefing } from '../../services/briefingApi';
import { buildWhatsAppUrl, openWhatsApp } from '../../services/whatsapp';
import type { BriefingPayload } from '../../types/briefing';
import { cn } from '../../utils/cn';
import { buttonStyles } from '../ui/Button';
import { useReduceMotion } from '../../hooks/useMediaQuery';

type FormState = Omit<BriefingPayload, 'startedAt'>;
type SubmitPhase = 'idle' | 'validating' | 'sending' | 'whatsapp';

type SelectOption = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StepInfo = { label: string; eyebrow: string; title: string; description: string };

const initialState: FormState = {
  projectType: '',
  objective: '',
  budget: '',
  timeline: '',
  features: [],
  integrations: [],
  name: '',
  company: '',
  email: '',
  phone: '',
  description: '',
  website: '',
};

const technologyIcons = [Globe2, AppWindow, BarChart3, Cable, Workflow, BrainCircuit, PanelsTopLeft];
const designIcons = [Palette, Radar, Building2, LayoutGrid];
const objectiveIcons = [Users, Workflow, Building2, Target, TrendingUp];

function isEmailFormatValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function BudgetWizard() {
  const { t } = useTranslation('budget');
  const startedAtRef = useRef(Date.now());
  const reduceMotion = useReduceMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>('idle');
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState('');

  const steps = t('wizard.steps', { returnObjects: true }) as StepInfo[];

  const technologyProjectTypes: SelectOption[] = (
    t('wizard.technologyProjectTypes', { returnObjects: true }) as Array<{ title: string; description: string }>
  ).map((item, index) => ({ ...item, icon: technologyIcons[index] }));

  const designProjectTypes: SelectOption[] = (
    t('wizard.designProjectTypes', { returnObjects: true }) as Array<{ title: string; description: string }>
  ).map((item, index) => ({ ...item, icon: designIcons[index] }));

  const projectTypeGroups = [
    { eyebrow: t('wizard.technologyGroupLabel'), options: technologyProjectTypes },
    { eyebrow: t('wizard.designGroupLabel'), options: designProjectTypes },
  ];

  const otherProjectType: SelectOption = {
    ...(t('wizard.otherProjectType', { returnObjects: true }) as { title: string; description: string }),
    icon: Sparkles,
  };

  const objectives: SelectOption[] = (
    t('wizard.objectives', { returnObjects: true }) as Array<{ title: string; description: string }>
  ).map((item, index) => ({ ...item, icon: objectiveIcons[index] }));

  const budgetRanges: SelectOption[] = (
    t('wizard.budgetRanges', { returnObjects: true }) as Array<{ title: string; description: string }>
  ).map((item) => ({ ...item, icon: BadgeCheck }));

  const timelineOptions: SelectOption[] = (
    t('wizard.timelineOptions', { returnObjects: true }) as Array<{ title: string; description: string }>
  ).map((item) => ({ ...item, icon: Clock3 }));

  const featureOptions = t('wizard.featureOptions', { returnObjects: true }) as string[];
  const integrationOptions = t('wizard.integrationOptions', { returnObjects: true }) as string[];
  const phaseMessages = t('wizard.phaseMessages', { returnObjects: true }) as Record<SubmitPhase, string>;

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isSubmitting = submitPhase !== 'idle';

  const briefingPayload = useMemo<BriefingPayload>(
    () => ({
      ...form,
      startedAt: startedAtRef.current,
    }),
    [form],
  );
  const SubmittedContainer: ElementType = reduceMotion ? 'section' : motion.section;
  const StepPresence: ElementType = reduceMotion ? Fragment : AnimatePresence;
  const StepContainer: ElementType = reduceMotion ? 'div' : motion.div;

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  };

  const toggleListValue = (field: 'features' | 'integrations', value: string) => {
    setForm((current) => {
      const exists = current[field].includes(value);
      const nextValues = exists ? current[field].filter((item) => item !== value) : [...current[field], value];

      return { ...current, [field]: nextValues };
    });
    setError('');
  };

  const validateStep = () => {
    if (step === 0 && !form.projectType) return t('wizard.validation.projectType');
    if (step === 1 && !form.objective) return t('wizard.validation.objective');
    if (step === 2 && !form.budget) return t('wizard.validation.budget');
    if (step === 3 && !form.timeline) return t('wizard.validation.timeline');
    if (step === 4 && !form.features.length) return t('wizard.validation.features');
    if (step === 5 && !form.integrations.length) return t('wizard.validation.integrations');
    if (step === 6) {
      if (!form.name || !form.company || !form.email || !form.phone || !form.description) {
        return t('wizard.validation.contactRequired');
      }
      if (!isEmailFormatValid(form.email)) return t('wizard.validation.emailInvalid');
      if (form.description.trim().length < 24) return t('wizard.validation.descriptionShort');
    }

    return '';
  };

  const goNext = () => {
    const validation = validateStep();

    if (validation) {
      setError(validation);
      return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validation = validateStep();

    if (validation) {
      setError(validation);
      return;
    }

    setError('');
    setSubmitPhase('validating');

    try {
      setSubmitPhase('sending');

      const response = await submitBriefing(
        briefingPayload,
      );

      const whatsappUrl =
        response.whatsappUrl ||
        buildWhatsAppUrl(briefingPayload);

      setSubmittedWhatsappUrl(whatsappUrl);

      setSubmitPhase('whatsapp');

      setSubmitted(true);

      setTimeout(() => {
        try {
          openWhatsApp(whatsappUrl);
        } catch (error) {
          console.error('WHATSAPP ERROR:', error);
        }
      }, 900);
    } catch (requestError) {
      console.error('SUBMIT ERROR:', requestError);

      const message =
        requestError instanceof BriefingApiError
          ? requestError.message
          : t('wizard.validation.submitFailed');

      setError(message);
    } finally {
      setSubmitPhase('idle');
    }
  };

  if (submitted) {
    return (
      <SubmittedContainer
        {...(!reduceMotion
          ? {
              initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
              animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
              transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] },
            }
          : {})}
        className="relative overflow-hidden rounded-[1.6rem] border border-violet-300/25 bg-[#0b0b13]/88 p-6 shadow-[0_18px_60px_rgba(5,5,9,0.32)] sm:rounded-[2rem] sm:p-8 sm:shadow-[0_22px_80px_rgba(5,5,9,0.42)] sm:backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 hidden h-48 w-48 rounded-full bg-violet-500/[0.16] blur-3xl sm:block" />
        <div className="relative">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/30 bg-violet-500/[0.12] text-violet-300">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300">
            {t('wizard.submitted.badge')}
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-frost sm:text-3xl">{t('wizard.submitted.title')}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:text-base sm:leading-7">
            {t('wizard.submitted.description')}
          </p>

          <div className="mt-5 grid gap-2 rounded-2xl border border-white/10 bg-ink/50 p-3 sm:grid-cols-3">
            <SummaryItem label={t('wizard.submitted.summary.project')} value={form.projectType} />
            <SummaryItem label={t('wizard.submitted.summary.objective')} value={form.objective} />
            <SummaryItem label={t('wizard.submitted.summary.investment')} value={form.budget} />
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a className={cn(buttonStyles('primary'), 'w-full sm:w-auto')} href={submittedWhatsappUrl || buildWhatsAppUrl(briefingPayload)} target="_blank" rel="noreferrer">
              {t('wizard.submitted.continueWhatsapp')}
              <ArrowRight className="h-4 w-4" />
            </a>
            <button className={cn(buttonStyles('secondary'), 'w-full sm:w-auto')} type="button" onClick={() => setSubmitted(false)}>
              {t('wizard.submitted.reviewBriefing')}
            </button>
          </div>
        </div>
      </SubmittedContainer>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative w-full min-w-0 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#090911]/90 p-4 shadow-[0_18px_58px_rgba(0,0,0,0.3)] sm:rounded-[2rem] sm:p-6 sm:shadow-[0_24px_90px_rgba(0,0,0,0.36)] sm:backdrop-blur-xl lg:p-8"
    >
      <div className="pointer-events-none absolute inset-x-10 -top-28 hidden h-48 rounded-full bg-violet-500/[0.14] blur-3xl sm:block" />

      {isSubmitting ? <LoadingOverlay message={phaseMessages[submitPhase]} label={t('wizard.loadingOverlay')} /> : null}

      <div className="relative min-w-0">
        <header className="rounded-[1.3rem] border border-white/10 bg-white/[0.045] p-4 sm:rounded-[1.55rem] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-violet-300">{currentStep.eyebrow}</p>
              <p className="mt-1 text-sm font-semibold text-frost">{t('wizard.headerLabel')}</p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs font-semibold text-mist">
              {step + 1}/{steps.length}
            </span>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            {reduceMotion ? (
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-300 to-signal" style={{ width: `${progress}%` }} />
            ) : (
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-300 to-signal"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </div>

          <StepDots steps={steps} currentStep={step} setStep={setStep} disabled={isSubmitting} />
        </header>

        <main className="min-w-0 py-5 sm:py-7">
          <StepPresence {...(!reduceMotion ? { mode: 'wait' } : {})}>
            <StepContainer
              key={step}
              {...(!reduceMotion
                ? {
                    initial: { opacity: 0, y: 14, filter: 'blur(8px)' },
                    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                    exit: { opacity: 0, y: -12, filter: 'blur(8px)' },
                    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
                  }
                : {})}
            >
              <StepIntro title={currentStep.title} description={currentStep.description} />
              {step === 0 ? (
                <div className="mt-5 space-y-5">
                  {projectTypeGroups.map((group) => (
                    <div key={group.eyebrow}>
                      <GroupLabel>{group.eyebrow}</GroupLabel>
                      <OptionGrid>
                        {group.options.map((option) => (
                          <OptionCard
                            key={option.title}
                            option={option}
                            selected={form.projectType === option.title}
                            reduceMotion={reduceMotion}
                            onClick={() => update('projectType', option.title)}
                          />
                        ))}
                      </OptionGrid>
                    </div>
                  ))}
                  <div>
                    <GroupLabel muted>{t('wizard.otherGroupLabel')}</GroupLabel>
                    <OptionGrid compact>
                      <OptionCard
                        option={otherProjectType}
                        selected={form.projectType === otherProjectType.title}
                        reduceMotion={reduceMotion}
                        onClick={() => update('projectType', otherProjectType.title)}
                      />
                    </OptionGrid>
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <OptionGrid>
                  {objectives.map((option) => (
                    <OptionCard
                      key={option.title}
                      option={option}
                      selected={form.objective === option.title}
                      reduceMotion={reduceMotion}
                      onClick={() => update('objective', option.title)}
                    />
                  ))}
                </OptionGrid>
              ) : null}

              {step === 2 ? (
                <OptionGrid cols2OnMobile>
                  {budgetRanges.map((option) => (
                    <OptionCard
                      key={option.title}
                      option={option}
                      selected={form.budget === option.title}
                      reduceMotion={reduceMotion}
                      onClick={() => update('budget', option.title)}
                    />
                  ))}
                </OptionGrid>
              ) : null}

              {step === 3 ? (
                <OptionGrid cols2OnMobile>
                  {timelineOptions.map((option) => (
                    <OptionCard
                      key={option.title}
                      option={option}
                      selected={form.timeline === option.title}
                      reduceMotion={reduceMotion}
                      onClick={() => update('timeline', option.title)}
                    />
                  ))}
                </OptionGrid>
              ) : null}

              {step === 4 ? (
                <FeatureGrid>
                  {featureOptions.map((feature) => (
                    <SelectChip
                      key={feature}
                      selected={form.features.includes(feature)}
                      reduceMotion={reduceMotion}
                      onClick={() => toggleListValue('features', feature)}
                    >
                      {feature}
                    </SelectChip>
                  ))}
                </FeatureGrid>
              ) : null}

              {step === 5 ? (
                <FeatureGrid compact>
                  {integrationOptions.map((integration) => (
                    <SelectChip
                      key={integration}
                      selected={form.integrations.includes(integration)}
                      reduceMotion={reduceMotion}
                      onClick={() => toggleListValue('integrations', integration)}
                    >
                      {integration}
                    </SelectChip>
                  ))}
                </FeatureGrid>
              ) : null}

              {step === 6 ? (
                <ContactFields form={form} update={update} />
              ) : null}
            </StepContainer>
          </StepPresence>
        </main>

        {error ? (
          <p
            className="mb-3 flex gap-2 rounded-2xl border border-red-400/25 bg-red-500/[0.08] px-3 py-2.5 text-sm leading-5 text-red-100"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
            {error}
          </p>
        ) : null}

        <footer className="grid grid-cols-[0.46fr_1fr] gap-2 border-t border-white/10 pt-3 sm:flex sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
          <button
            type="button"
            className={cn(buttonStyles('secondary'), 'min-h-12 w-full rounded-2xl px-3 disabled:pointer-events-none disabled:opacity-45 sm:w-auto')}
            onClick={goBack}
            disabled={step === 0 || isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">{t('wizard.footer.back')}</span>
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              className={cn(buttonStyles('primary'), 'min-h-12 w-full rounded-2xl px-4 sm:w-auto')}
              onClick={goNext}
              disabled={isSubmitting}
            >
              {t('wizard.footer.next')}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className={cn(buttonStyles('primary'), 'min-h-12 w-full rounded-2xl px-4 sm:w-auto')}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {t('wizard.footer.send')}
            </button>
          )}
        </footer>
      </div>
    </form>
  );
}

function StepDots({
  steps,
  currentStep,
  disabled,
  setStep,
}: {
  steps: StepInfo[];
  currentStep: number;
  disabled: boolean;
  setStep: (step: number) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-1.5">
      {steps.map((item, index) => {
        const isActive = currentStep === index;
        const isComplete = index < currentStep;
        const canNavigate = index <= currentStep && !disabled;

        return (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            disabled={!canNavigate}
            onClick={() => canNavigate && setStep(index)}
            className={cn(
              'h-7 rounded-xl border text-[0.56rem] font-semibold transition duration-300 disabled:opacity-45 sm:h-8 sm:text-[0.62rem]',
              isActive
                ? 'border-violet-300/40 bg-violet-400/[0.16] text-frost'
                : isComplete
                  ? 'border-signal/25 bg-signal/[0.08] text-signal'
                  : 'border-white/[0.08] bg-white/[0.035] text-muted',
            )}
          >
            {isComplete ? <CheckCircle2 className="mx-auto h-3 w-3 sm:h-3.5 sm:w-3.5" /> : index + 1}
          </button>
        );
      })}
    </div>
  );
}

function StepIntro({ title, description }: { title: string; description: string }) {
  return (
    <section className="min-w-0">
      <h2 className="text-balance text-[clamp(1.15rem,5vw,1.45rem)] font-semibold leading-[1.08] text-frost sm:text-4xl sm:leading-[1.05]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-mist sm:text-base sm:leading-7">{description}</p>
    </section>
  );
}

function GroupLabel({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <p className={cn('mb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]', muted ? 'text-muted' : 'text-violet-300')}>
      {children}
    </p>
  );
}

function OptionGrid({ children, compact = false, cols2OnMobile = false }: { children: ReactNode; compact?: boolean; cols2OnMobile?: boolean }) {
  return (
    <div className={cn('grid min-w-0 gap-2.5 sm:grid-cols-2', cols2OnMobile && 'grid-cols-2', compact ? 'lg:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3')}>
      {children}
    </div>
  );
}

function FeatureGrid({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <div className={cn('mt-5 grid min-w-0 gap-2', compact ? 'grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3')}>{children}</div>;
}

function OptionCard({
  option,
  selected,
  reduceMotion,
  onClick,
}: {
  option: SelectOption;
  selected: boolean;
  reduceMotion: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;
  const ButtonElement: ElementType = reduceMotion ? 'button' : motion.button;

  return (
    <ButtonElement
      type="button"
      {...(!reduceMotion ? { whileHover: { y: -2 }, whileTap: { scale: 0.985 } } : {})}
      onClick={onClick}
      className={cn(
        'group relative flex min-h-[6.25rem] w-full min-w-0 items-start gap-3.5 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 sm:min-h-[8.5rem] sm:block sm:p-4',
        selected
          ? 'border-violet-300/55 bg-violet-500/[0.14] shadow-[0_18px_60px_rgba(141,92,255,0.16)]'
          : 'border-white/10 bg-white/[0.045] hover:border-violet-300/25 hover:bg-white/[0.065]',
      )}
    >
      <span className={cn('pointer-events-none absolute -right-12 -top-12 hidden h-28 w-28 rounded-full blur-3xl transition sm:block', selected ? 'bg-violet-500/18' : 'bg-transparent')} />
      <span
        className={cn(
          'grid h-10 w-10 shrink-0 place-items-center rounded-2xl border transition sm:mb-4',
          selected
            ? 'border-violet-300/35 bg-violet-500/[0.16] text-violet-300'
            : 'border-white/10 bg-white/[0.04] text-muted group-hover:text-frost',
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block text-base font-semibold leading-snug text-frost">{option.title}</span>
        <span className="mt-1 block text-[0.8rem] leading-5 text-mist sm:text-sm sm:leading-6">{option.description}</span>
      </span>
      {selected ? <CheckCircle2 className="absolute bottom-3 right-3 h-4 w-4 text-violet-300" /> : null}
    </ButtonElement>
  );
}

function SelectChip({
  selected,
  reduceMotion,
  onClick,
  children,
}: {
  selected: boolean;
  reduceMotion: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const ButtonElement: ElementType = reduceMotion ? 'button' : motion.button;

  return (
    <ButtonElement
      type="button"
      {...(!reduceMotion ? { whileHover: { y: -1 }, whileTap: { scale: 0.98 } } : {})}
      onClick={onClick}
      className={cn(
        'flex min-h-12 min-w-0 items-center justify-between gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm font-semibold leading-snug transition duration-300',
        selected
          ? 'border-violet-300/50 bg-violet-500/[0.14] text-frost shadow-[0_14px_50px_rgba(141,92,255,0.12)]'
          : 'border-white/10 bg-white/[0.04] text-mist hover:border-white/18 hover:bg-white/[0.06]',
      )}
    >
      <span className="min-w-0">{children}</span>
      <span
        className={cn(
          'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition',
          selected ? 'border-violet-300/60 bg-violet-300/15 text-frost' : 'border-white/12 text-transparent',
        )}
      >
        <CheckCircle2 className="h-3 w-3" />
      </span>
    </ButtonElement>
  );
}

function ContactFields({
  form,
  update,
}: {
  form: FormState;
  update: (field: keyof FormState, value: string) => void;
}) {
  const { t } = useTranslation('budget');

  return (
    <div className="mt-5 min-w-0">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
        name="website"
        tabIndex={-1}
        value={form.website}
        onChange={(event) => update('website', event.target.value)}
      />

      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <Field label={t('wizard.contactFields.name')} value={form.name} onChange={(value) => update('name', value)} required />
        <Field label={t('wizard.contactFields.company')} value={form.company} onChange={(value) => update('company', value)} required />
        <Field label={t('wizard.contactFields.email')} type="email" value={form.email} onChange={(value) => update('email', value)} required />
        <Field label={t('wizard.contactFields.phone')} value={form.phone} onChange={(value) => update('phone', value)} required />
      </div>

      <label className="mt-4 block text-sm font-semibold text-frost" htmlFor="description">
        {t('wizard.contactFields.descriptionLabel')} <span className="text-violet-300">*</span>
      </label>
      <textarea
        id="description"
        className="mt-2 min-h-32 w-full min-w-0 resize-y rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm leading-6 text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-300 focus:bg-ink/85 focus:shadow-[0_0_0_3px_rgba(141,92,255,0.12)] sm:min-h-40 sm:text-base"
        placeholder={t('wizard.contactFields.descriptionPlaceholder')}
        value={form.description}
        onChange={(event) => update('description', event.target.value)}
        required
      />

      <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-ink/45 p-2.5 sm:grid-cols-3">
        <TrustBadge icon={ShieldCheck} text={t('wizard.contactFields.trust.validation')} />
        <TrustBadge icon={LockKeyhole} text={t('wizard.contactFields.trust.antiSpam')} />
        <TrustBadge icon={DatabaseZap} text={t('wizard.contactFields.trust.crm')} />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+|\/+/g, '-');

  return (
    <div className="min-w-0">
      <label className="text-sm font-semibold text-frost" htmlFor={id}>
        {label}
        {required ? <span className="text-violet-300"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        className="mt-2 min-h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-300 focus:bg-ink/85 focus:shadow-[0_0_0_3px_rgba(141,92,255,0.12)] sm:text-base"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-mist">
      <Icon className="h-4 w-4 shrink-0 text-violet-300" />
      <span className="min-w-0 truncate">{text}</span>
    </div>
  );
}

function LoadingOverlay({ message, label }: { message: string; label: string }) {
  return (
    <div className="absolute inset-0 z-20 grid place-items-center bg-ink/82 p-4 sm:bg-ink/72 sm:backdrop-blur-md">
      <div className="relative overflow-hidden rounded-2xl border border-violet-300/20 bg-white/[0.07] p-5 text-center shadow-[0_20px_70px_rgba(141,92,255,0.14)]">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-violet-300/25 bg-violet-500/[0.12] text-violet-300">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">{label}</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-mist">{message}</p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <strong className="mt-1.5 block text-sm leading-5 text-frost">{value}</strong>
    </div>
  );
}
