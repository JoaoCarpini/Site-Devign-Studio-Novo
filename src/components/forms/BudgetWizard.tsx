import { FormEvent, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
  Loader2,
  LockKeyhole,
  LayoutGrid,
  PanelsTopLeft,
  Palette,
  PlugZap,
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
import { BriefingApiError, submitBriefing } from '../../services/briefingApi';
import { executeRecaptcha } from '../../services/recaptcha';
import { buildWhatsAppUrl, openWhatsApp } from '../../services/whatsapp';
import type { BriefingPayload } from '../../types/briefing';
import { buttonStyles } from '../ui/Button';
import { cn } from '../../utils/cn';

type FormState = Omit<BriefingPayload, 'startedAt'>;
type SubmitPhase = 'idle' | 'validating' | 'sending' | 'whatsapp';

type SelectOption = {
  title: string;
  description: string;
  icon: LucideIcon;
};

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

const steps = [
  { label: 'Projeto', detail: 'Experiência' },
  { label: 'Objetivo', detail: 'Prioridade' },
  { label: 'Orçamento', detail: 'Investimento' },
  { label: 'Prazo', detail: 'Timing' },
  { label: 'Escopo', detail: 'Recursos' },
  { label: 'Integrações', detail: 'Conexões' },
  { label: 'Dados', detail: 'Contato' },
];

const technologyProjectTypes: SelectOption[] = [
  {
    title: 'Website Institucional',
    description: 'Presença digital premium para posicionamento, autoridade e confiança comercial.',
    icon: Globe2,
  },
  {
    title: 'Sistema Web',
    description: 'Aplicação sob medida para operação, gestão, vendas ou atendimento.',
    icon: AppWindow,
  },
  {
    title: 'Dashboard',
    description: 'Painéis executivos para indicadores, dados operacionais e leitura de performance.',
    icon: BarChart3,
  },
  {
    title: 'API',
    description: 'Camada técnica para integrar sistemas, dados, produtos e fluxos internos.',
    icon: Cable,
  },
  {
    title: 'Automação',
    description: 'Processos digitais para reduzir trabalho manual e aumentar consistência.',
    icon: Workflow,
  },
  {
    title: 'IA',
    description: 'Inteligência aplicada a triagem, análise, atendimento ou produtividade.',
    icon: BrainCircuit,
  },
  {
    title: 'Landing Page',
    description: 'Página de conversão com copy, estrutura e visual orientados a resultado.',
    icon: PanelsTopLeft,
  },
];

const designProjectTypes: SelectOption[] = [
  {
    title: 'Identidade Visual Digital',
    description: 'Sistema visual coerente para site, produto e materiais digitais com padrão premium.',
    icon: Palette,
  },
  {
    title: 'Presença Digital Estratégica',
    description: 'Direção de marca, narrativa e experiência para elevar percepção e clareza comercial.',
    icon: Radar,
  },
  {
    title: 'Branding para Empresas',
    description: 'Posicionamento, linguagem visual e consistência para marcas B2B e high-ticket.',
    icon: Building2,
  },
  {
    title: 'Estrutura Visual para Redes Sociais',
    description: 'Templates, hierarquia e direção visual para canais digitais com padrão estratégico.',
    icon: LayoutGrid,
  },
];

const otherProjectType: SelectOption = {
  title: 'Outro',
  description: 'Projeto específico que combina tecnologia, design ou presença digital sob medida.',
  icon: Sparkles,
};

const projectTypeGroups = [
  { eyebrow: 'Tecnologia & produto digital', options: technologyProjectTypes },
  { eyebrow: 'Design & presença estratégica', options: designProjectTypes },
];

const objectives: SelectOption[] = [
  {
    title: 'Captar clientes',
    description: 'Construir uma jornada digital mais clara, confiável e orientada a conversão.',
    icon: Users,
  },
  {
    title: 'Automatizar processos',
    description: 'Eliminar rotinas repetitivas e criar fluxos mais rápidos para a operação.',
    icon: Workflow,
  },
  {
    title: 'Modernizar empresa',
    description: 'Atualizar presença, sistemas ou processos para um padrão mais competitivo.',
    icon: Building2,
  },
  {
    title: 'Melhorar presença digital',
    description: 'Elevar percepção de valor, clareza comercial e experiência da marca.',
    icon: Target,
  },
  {
    title: 'Escalar operação',
    description: 'Preparar tecnologia, dados e integrações para suportar crescimento.',
    icon: TrendingUp,
  },
];

const budgetRanges: SelectOption[] = [
  {
    title: 'R$500 — R$1.500',
    description: 'Ajustes pontuais, páginas simples ou validação inicial de escopo.',
    icon: BadgeCheck,
  },
  {
    title: 'R$1.500 — R$5.000',
    description: 'Landing pages premium, websites objetivos e automações menores.',
    icon: BadgeCheck,
  },
  {
    title: 'R$5.000 — R$15.000',
    description: 'Sistemas, integrações, dashboards e experiências digitais mais completas.',
    icon: BadgeCheck,
  },
  {
    title: 'R$15.000+',
    description: 'Produtos sob medida, arquitetura escalável e projetos de maior impacto.',
    icon: BadgeCheck,
  },
];

const timelineOptions: SelectOption[] = [
  {
    title: 'Até 30 dias',
    description: 'Projeto com prioridade alta, escopo objetivo e tomada de decisão rápida.',
    icon: Clock3,
  },
  {
    title: '1 a 2 meses',
    description: 'Janela ideal para websites premium, landing pages e automações bem definidas.',
    icon: Clock3,
  },
  {
    title: '2 a 4 meses',
    description: 'Ritmo indicado para sistemas, dashboards e integrações com mais profundidade.',
    icon: Clock3,
  },
  {
    title: 'Projeto contínuo',
    description: 'Evolução por ciclos, suporte técnico e melhorias progressivas.',
    icon: Clock3,
  },
];

const featureOptions = [
  'Área administrativa',
  'Painel com indicadores',
  'Área de usuários e acessos',
  'Formulários personalizados',
  'Automações',
  'Inteligência Artificial',
  'Integração com outros sistemas',
  'Relatórios e métricas',
  'Pagamentos online',
  'Notificações automáticas',
  'Upload de arquivos',
  'Área do cliente',
  'Controle financeiro',
  'Gestão de estoque',
  'Dashboard operacional',
  'Multiusuários',
  'Agenda e agendamentos',
  'Assinaturas e planos',
  'Chat interno',
  'Integração com WhatsApp',
];

const integrationOptions = [
  'WhatsApp',
  'CRM',
  'ERP',
  'Pagamentos',
  'Planilhas',
  'Banco de dados',
  'APIs externas',
  'Nenhuma definida',
];

const phaseMessages: Record<SubmitPhase, string> = {
  idle: '',
  validating: 'Validando entrada com segurança...',
  sending: 'Organizando briefing para análise...',
  whatsapp: 'Preparando continuidade no WhatsApp...',
};

function isEmailFormatValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function useMobileMotion() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return isMobile;
}

export function BudgetWizard() {
  const isMobileMotion = useMobileMotion();
  const startedAtRef = useRef(Date.now());
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>('idle');
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState('');

  const progress = ((step + 1) / steps.length) * 100;
  const isSubmitting = submitPhase !== 'idle';

  const briefingPayload = useMemo<BriefingPayload>(
    () => ({
      ...form,
      startedAt: startedAtRef.current,
    }),
    [form],
  );

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
    if (step === 0 && !form.projectType) return 'Selecione o tipo de projeto para continuar.';
    if (step === 1 && !form.objective) return 'Escolha o objetivo principal do projeto.';
    if (step === 2 && !form.budget) return 'Selecione a faixa de orçamento estimada.';
    if (step === 3 && !form.timeline) return 'Selecione o prazo desejado para o projeto.';
    if (step === 4 && !form.features.length) return 'Selecione ao menos uma funcionalidade importante.';
    if (step === 5 && !form.integrations.length) return 'Selecione ao menos uma integração ou marque “Nenhuma definida”.';
    if (step === 6) {
      if (!form.name || !form.company || !form.email || !form.phone || !form.description) {
        return 'Preencha nome, empresa, email, telefone e descrição do projeto.';
      }
      if (!isEmailFormatValid(form.email)) return 'Informe um email válido para seguirmos com segurança.';
      if (form.description.trim().length < 24) return 'Descreva o projeto com um pouco mais de contexto.';
    }

    return '';
  };

  const next = () => {
    const validation = validateStep();
    if (validation) {
      setError(validation);
      return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateStep();
    if (validation) {
      setError(validation);
      return;
    }

    setError('');
    setSubmitPhase('validating');

    try {
      const recaptchaToken = await executeRecaptcha('briefing_submit');
      setSubmitPhase('sending');
      const response = await submitBriefing(briefingPayload, recaptchaToken);
      const whatsappUrl = response.whatsappUrl || buildWhatsAppUrl(briefingPayload);

      setSubmittedWhatsappUrl(whatsappUrl);
      setSubmitPhase('whatsapp');
      setSubmitted(true);
      setTimeout(() => openWhatsApp(whatsappUrl), 900);
    } catch (requestError) {
      const message =
        requestError instanceof BriefingApiError
          ? requestError.message
          : 'Não foi possível concluir o envio agora. Verifique sua conexão e tente novamente.';

      setError(message);
    } finally {
      setSubmitPhase('idle');
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={isMobileMotion ? { opacity: 0, y: 8 } : { opacity: 0, y: 12, filter: 'blur(8px)' }}
        animate={isMobileMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: isMobileMotion ? 0.28 : 0.48, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[1rem] border border-violet-400/[0.24] bg-white/[0.05] p-4 shadow-[0_16px_64px_rgba(5,5,9,0.35)] backdrop-blur-lg sm:rounded-[1.5rem] sm:p-8 sm:shadow-[0_24px_100px_rgba(5,5,9,0.45)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/[0.18] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 left-6 h-48 w-48 rounded-full bg-signal/[0.08] blur-2xl" />

        <div className="relative">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/30 bg-violet-500/[0.12] text-violet-400 shadow-[0_0_56px_rgba(141,92,255,0.22)] sm:h-16 sm:w-16">
            <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-violet-400 sm:mt-6 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
            Onboarding concluído
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-snug text-frost sm:mt-5 sm:text-3xl">
            Briefing recebido com contexto.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-mist sm:mt-4 sm:text-base sm:leading-7">
            A Devign recebeu as informações essenciais do projeto. A conversa agora continua no WhatsApp com mais precisão.
          </p>

          <div className="mt-5 grid gap-2 rounded-[1rem] border border-white/10 bg-ink/45 p-3 sm:mt-7 sm:grid-cols-3 sm:gap-2.5 sm:rounded-[1.25rem] sm:p-4">
            <SummaryItem label="Projeto" value={form.projectType} />
            <SummaryItem label="Objetivo" value={form.objective} />
            <SummaryItem label="Investimento" value={form.budget} />
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
            <a className={buttonStyles('primary')} href={submittedWhatsappUrl || buildWhatsAppUrl(briefingPayload)} target="_blank" rel="noreferrer">
              Continuar no WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <button className={buttonStyles('secondary')} type="button" onClick={() => setSubmitted(false)}>
              Revisar briefing
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative mx-0 w-full min-w-0 max-w-full overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.052] p-3.5 shadow-[0_16px_48px_rgba(5,5,9,0.3)] backdrop-blur-lg sm:rounded-[1.5rem] sm:p-6 sm:shadow-[0_24px_90px_rgba(5,5,9,0.48)] sm:backdrop-blur-xl lg:p-8"
    >
      <div className="pointer-events-none absolute inset-x-8 -top-24 h-44 rounded-full bg-violet-500/[0.12] blur-3xl sm:inset-x-10 sm:-top-28 sm:h-56 sm:bg-violet-500/[0.18]" />
      <div className="pointer-events-none absolute -right-28 bottom-20 hidden h-60 w-60 rounded-full bg-signal/[0.08] blur-3xl sm:block" />

      {isSubmitting ? <LoadingOverlay message={phaseMessages[submitPhase]} /> : null}

      <div className="relative min-w-0">
        <div className="flex min-w-0 flex-col gap-2.5 border-b border-white/10 pb-3.5 sm:gap-4 sm:pb-5">
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-violet-400 sm:text-xs sm:tracking-[0.22em]">
                Diagnóstico estratégico
              </span>
              <h2 className="mt-1.5 max-w-full text-[1.05rem] font-semibold leading-snug text-frost sm:mt-2 sm:text-2xl">
                Organize o contexto do seu projeto.
              </h2>
            </div>
            <span className="w-fit rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[0.65rem] font-semibold text-mist sm:px-3.5 sm:py-1.5 sm:text-xs">
              0{step + 1} / 0{steps.length}
            </span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-400 to-signal shadow-[0_0_24px_rgba(141,92,255,0.4)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: isMobileMotion ? 0.24 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <StepRail
            steps={steps}
            currentStep={step}
            disabled={isSubmitting}
            onStepSelect={setStep}
          />
        </div>

        <div className="min-w-0 py-4 sm:min-h-[30rem] sm:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={isMobileMotion ? { opacity: 0, y: 10 } : { opacity: 0, y: 18, scale: 0.985, filter: 'blur(10px)' }}
              animate={isMobileMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={isMobileMotion ? { opacity: 0, y: -8 } : { opacity: 0, y: -16, scale: 0.985, filter: 'blur(10px)' }}
              transition={{ duration: isMobileMotion ? 0.28 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 ? (
                <WizardStep
                  eyebrow="Etapa 01 · Projeto"
                  title="Que tipo de ativo digital sua empresa precisa construir?"
                  description="Escolha a frente principal para direcionar tecnologia, design e presença estratégica com mais precisão."
                >
                  <div className="mt-5 space-y-5 sm:mt-7 sm:space-y-10">
                    {projectTypeGroups.map((group) => (
                      <div key={group.eyebrow}>
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-violet-400/90 sm:text-xs sm:tracking-[0.2em]">
                          {group.eyebrow}
                        </p>
                        <ProjectOptionGrid className="mt-4">
                          {group.options.map((option) => (
                            <OptionCard
                              key={option.title}
                              option={option}
                              selected={form.projectType === option.title}
                              onClick={() => update('projectType', option.title)}
                            />
                          ))}
                        </ProjectOptionGrid>
                      </div>
                    ))}

                    <div>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.2em]">Outros formatos</p>
                      <ProjectOptionGrid className="mt-4">
                        <OptionCard
                          option={otherProjectType}
                          selected={form.projectType === otherProjectType.title}
                          onClick={() => update('projectType', otherProjectType.title)}
                        />
                      </ProjectOptionGrid>
                    </div>
                  </div>
                </WizardStep>
              ) : null}

              {step === 1 ? (
                <WizardStep
                  eyebrow="Etapa 02"
                  title="Qual prioridade deve orientar a entrega?"
                  description="A prioridade define foco, reduz ruído de escopo e orienta decisões de impacto comercial ou operacional."
                >
                  <OptionGrid>
                    {objectives.map((option) => (
                      <OptionCard
                        key={option.title}
                        option={option}
                        selected={form.objective === option.title}
                        onClick={() => update('objective', option.title)}
                      />
                    ))}
                  </OptionGrid>
                </WizardStep>
              ) : null}

              {step === 2 ? (
                <WizardStep
                  eyebrow="Etapa 03"
                  title="Qual faixa de investimento faz sentido agora?"
                  description="A referência calibra profundidade, ritmo e nível de arquitetura da solução."
                >
                  <OptionGrid>
                    {budgetRanges.map((option) => (
                      <OptionCard
                        key={option.title}
                        option={option}
                        selected={form.budget === option.title}
                        onClick={() => update('budget', option.title)}
                      />
                    ))}
                  </OptionGrid>
                </WizardStep>
              ) : null}

              {step === 3 ? (
                <WizardStep
                  eyebrow="Etapa 04"
                  title="Qual janela de tempo precisa ser considerada?"
                  description="O timing ajuda a calibrar urgência, complexidade e necessidade de fases."
                >
                  <OptionGrid>
                    {timelineOptions.map((option) => (
                      <OptionCard
                        key={option.title}
                        option={option}
                        selected={form.timeline === option.title}
                        onClick={() => update('timeline', option.title)}
                      />
                    ))}
                  </OptionGrid>
                </WizardStep>
              ) : null}

              {step === 4 ? (
                <WizardStep
                  eyebrow="Etapa 05"
                  title="Quais recursos pertencem à primeira versão?"
                  description="Escolha os pontos mais relevantes. A análise pode reorganizar prioridades por fase, complexidade e impacto."
                >
                  <FeatureGrid>
                    {featureOptions.map((feature) => (
                      <FeatureCard
                        key={feature}
                        selected={form.features.includes(feature)}
                        onClick={() => toggleListValue('features', feature)}
                      >
                        {feature}
                      </FeatureCard>
                    ))}
                  </FeatureGrid>
                </WizardStep>
              ) : null}

              {step === 5 ? (
                <WizardStep
                  eyebrow="Etapa 06"
                  title="Quais conexões podem entrar no projeto?"
                  description="Integrações impactam arquitetura, segurança e esforço técnico. Se ainda não souber, marque a opção correspondente."
                >
                  <ChipGrid>
                    {integrationOptions.map((integration) => (
                      <Chip
                        key={integration}
                        selected={form.integrations.includes(integration)}
                        onClick={() => toggleListValue('integrations', integration)}
                      >
                        {integration}
                      </Chip>
                    ))}
                  </ChipGrid>
                </WizardStep>
              ) : null}

              {step === 6 ? (
                <WizardStep
                  eyebrow="Etapa 07"
                  title="Dados para contato e pré-diagnóstico."
                  description="As informações serão validadas com segurança antes do envio. Depois, a conversa segue com o resumo do briefing."
                >
                  <input
                    aria-hidden="true"
                    autoComplete="off"
                    className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
                    name="website"
                    tabIndex={-1}
                    value={form.website}
                    onChange={(event) => update('website', event.target.value)}
                  />

                  <div className="mt-4 grid min-w-0 gap-2.5 sm:mt-5 sm:gap-3 sm:grid-cols-2">
                    <Field label="Nome" value={form.name} onChange={(value) => update('name', value)} required />
                    <Field label="Empresa" value={form.company} onChange={(value) => update('company', value)} required />
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(value) => update('email', value)}
                      required
                    />
                    <Field
                      label="Telefone / WhatsApp"
                      value={form.phone}
                      onChange={(value) => update('phone', value)}
                      required
                    />
                  </div>

                  <label className="mt-4 block text-sm font-semibold text-frost sm:mt-5" htmlFor="description">
                    Descrição do projeto <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    className="mt-2 min-h-28 w-full min-w-0 resize-y rounded-[1rem] border border-white/10 bg-ink/70 px-3.5 py-3 text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-400 focus:bg-ink/85 focus:shadow-[0_0_0_3px_rgba(141,92,255,0.1)] sm:min-h-36 sm:rounded-[1.25rem] sm:px-4"
                    placeholder="Contexto, objetivo, dores atuais, referências e qualquer requisito importante."
                    value={form.description}
                    onChange={(event) => update('description', event.target.value)}
                    required
                  />

                  <div className="mt-4 grid min-w-0 gap-2 rounded-[1rem] border border-white/10 bg-ink/45 p-2.5 sm:mt-5 sm:grid-cols-3 sm:gap-2.5 sm:rounded-[1.25rem] sm:p-3.5">
                    <TrustBadge icon={ShieldCheck} text="Validação segura" />
                    <TrustBadge icon={LockKeyhole} text="Anti-spam ativo" />
                    <TrustBadge icon={DatabaseZap} text="Pronto para CRM/API" />
                  </div>
                </WizardStep>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {error ? (
          <motion.p
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="flex gap-3 rounded-2xl border border-red-400/25 bg-red-500/[0.08] px-4 py-3 text-sm leading-6 text-red-100 shadow-[0_0_50px_rgba(248,113,113,0.08)]"
          >
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
            {error}
          </motion.p>
        ) : null}

        <div className="mt-3.5 flex flex-col-reverse gap-2 border-t border-white/10 pt-3.5 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-5">
          <button
            type="button"
            className={cn(buttonStyles('secondary'), 'w-full sm:w-auto disabled:pointer-events-none disabled:opacity-45')}
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0 || isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className={cn(buttonStyles('primary'), 'w-full sm:w-auto')} onClick={next} disabled={isSubmitting}>
              Continuar diagnóstico
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" className={cn(buttonStyles('primary'), 'w-full sm:w-auto')} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Enviar para análise
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function WizardStep({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 max-w-full">
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-violet-400 sm:text-xs sm:tracking-[0.22em]">{eyebrow}</span>
      <h3 className="mt-2 max-w-full text-[clamp(1.15rem,6.5vw,1.5rem)] font-semibold leading-tight text-frost sm:mt-2.5 sm:max-w-3xl sm:text-3xl sm:leading-snug">{title}</h3>
      <p className="mt-2 max-w-full text-[0.8rem] leading-5 text-mist sm:mt-3 sm:max-w-2xl sm:text-sm sm:leading-7">{description}</p>
      {children}
    </section>
  );
}

function StepRail({
  steps: stepItems,
  currentStep,
  disabled,
  onStepSelect,
}: {
  steps: Array<{ label: string; detail: string }>;
  currentStep: number;
  disabled: boolean;
  onStepSelect: (index: number) => void;
}) {
  const currentItem = stepItems[currentStep];

  return (
    <div className="relative min-w-0 max-w-full px-0 sm:px-3 lg:px-1">
      <div className="min-w-0 sm:hidden">
        <div className="grid grid-cols-7 gap-1.5">
          {stepItems.map((item, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            const canNavigate = index <= currentStep && !disabled;

            return (
              <button
                key={item.label}
                type="button"
                title={`${item.label} - ${item.detail}`}
                onClick={() => canNavigate && onStepSelect(index)}
                disabled={!canNavigate}
                className={cn(
                  'grid min-h-9 place-items-center rounded-xl border text-[0.62rem] font-semibold transition duration-300',
                  'disabled:cursor-not-allowed disabled:opacity-45',
                  isActive
                    ? 'border-violet-300/40 bg-violet-400/[0.14] text-frost shadow-[0_0_22px_rgba(141,92,255,0.18)]'
                    : isComplete
                      ? 'border-signal/22 bg-signal/[0.075] text-signal'
                      : 'border-white/[0.09] bg-white/[0.035] text-muted',
                )}
              >
                {isComplete ? <CheckCircle2 className="h-3.5 w-3.5" /> : `0${index + 1}`}
              </button>
            );
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-2">
          <span className="text-xs font-semibold text-frost">{currentItem.label}</span>
          <span className="text-[0.68rem] font-medium text-muted">{currentItem.detail}</span>
        </div>
      </div>
      {/* Mobile only: scroll hint — translucent, never opaque black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-5 bg-gradient-to-r from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-[1px] sm:block lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-5 bg-gradient-to-l from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-[1px] sm:block lg:hidden"
      />

      <div className="hidden min-w-0 gap-3 overflow-x-auto scroll-px-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex sm:px-1 [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:px-0.5">
        {stepItems.map((item, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          const canNavigate = index <= currentStep && !disabled;

          return (
            <motion.button
              key={item.label}
              type="button"
              title={`${item.label} · ${item.detail}`}
              onClick={() => canNavigate && onStepSelect(index)}
              disabled={!canNavigate}
              initial={false}
              animate={{
                y: isActive ? -1 : 0,
                scale: isActive ? 1 : 1,
              }}
              whileHover={
                canNavigate
                  ? {
                      y: isActive ? -2 : -1,
                      transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                    }
                  : undefined
              }
              whileTap={canNavigate ? { scale: 0.985 } : undefined}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'group relative min-w-[7.5rem] shrink-0 overflow-hidden rounded-2xl border px-4 py-3 text-left backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-w-0 lg:flex-1',
                'disabled:cursor-not-allowed disabled:opacity-45',
                isActive
                  ? 'border-violet-300/35 bg-gradient-to-br from-violet-400/[0.12] via-white/[0.07] to-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_10px_40px_-12px_rgba(141,92,255,0.45)]'
                  : isComplete
                    ? 'border-signal/18 bg-gradient-to-br from-signal/[0.07] via-white/[0.04] to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-signal/28 hover:from-signal/[0.1] hover:via-white/[0.06]'
                    : 'border-white/[0.09] bg-white/[0.035] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-white/[0.16] hover:bg-white/[0.055] hover:shadow-[0_12px_36px_-18px_rgba(141,92,255,0.2)]',
              )}
            >
              {isActive ? (
                <>
                  <motion.span
                    layoutId="step-rail-active-glow"
                    className="pointer-events-none absolute -inset-px rounded-2xl bg-violet-400/[0.14] blur-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-300/[0.08] via-transparent to-transparent" />
                  <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                </>
              ) : null}

              {!isActive && canNavigate ? (
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              ) : null}

              <span className="relative flex items-center gap-2.5">
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-[border-color,background-color,box-shadow,color] duration-500',
                    isActive
                      ? 'border-violet-300/45 bg-gradient-to-br from-violet-400/25 to-white/10 text-frost shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_18px_rgba(169,139,255,0.28)]'
                      : isComplete
                        ? 'border-signal/28 bg-signal/[0.08] text-signal shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                        : 'border-white/10 bg-white/[0.04] text-muted group-hover:border-white/18 group-hover:text-frost/90',
                  )}
                >
                  {isComplete ? <CheckCircle2 className="h-4 w-4" /> : `0${index + 1}`}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block truncate text-sm font-semibold leading-tight transition-colors duration-500',
                      isActive ? 'text-frost' : 'text-frost/88 group-hover:text-frost',
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block truncate text-xs leading-4 transition-colors duration-500',
                      isActive ? 'text-violet-200/75' : 'text-muted group-hover:text-mist',
                    )}
                  >
                    {item.detail}
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function OptionGrid({ children }: { children: ReactNode }) {
  return <div className="mt-4 grid min-w-0 gap-2 sm:mt-5 sm:gap-2.5 md:grid-cols-2">{children}</div>;
}

function ProjectOptionGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-4 grid min-w-0 gap-2 sm:mt-5 sm:gap-2.5 sm:grid-cols-2 xl:grid-cols-3', className)}>{children}</div>
  );
}

function ChipGrid({ children }: { children: ReactNode }) {
  return <div className="mt-4 flex min-w-0 flex-wrap gap-1.5 sm:mt-5 sm:gap-2.5">{children}</div>;
}

function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="mt-4 grid min-w-0 gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-2.5 xl:grid-cols-3">{children}</div>;
}

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: SelectOption;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = option.icon;
  const isMobileMotion = useMobileMotion();

  return (
    <motion.button
      type="button"
      whileHover={isMobileMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={isMobileMotion ? undefined : { scale: 0.985 }}
      onClick={onClick}
      className={cn(
        'group relative flex min-h-20 w-full min-w-0 items-start gap-2.5 overflow-hidden rounded-[0.9rem] border p-2.5 text-left transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:block sm:min-h-[6.5rem] sm:rounded-[1.1rem] sm:p-4',
        selected
          ? 'border-violet-400/60 bg-violet-500/[0.14] shadow-[0_16px_60px_rgba(141,92,255,0.18)]'
          : 'border-white/10 bg-white/[0.045] hover:border-violet-400/30 hover:bg-white/[0.065] hover:shadow-[0_12px_50px_rgba(141,92,255,0.1)]',
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl transition duration-500',
          selected ? 'bg-violet-500/20' : 'bg-violet-500/0 group-hover:bg-violet-500/[0.12]',
        )}
      />
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:opacity-75" />
      <span
        className={cn(
          'grid h-8 w-8 shrink-0 place-items-center rounded-[0.8rem] border transition sm:mb-4 sm:h-9 sm:w-9 sm:rounded-[0.95rem]',
          selected
            ? 'border-violet-400/40 bg-violet-500/[0.16] text-violet-400'
            : 'border-white/10 bg-white/[0.035] text-muted group-hover:text-frost',
        )}
      >
        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block min-w-0 text-[0.9rem] font-semibold leading-snug text-frost sm:text-base">{option.title}</span>
        <span className="mt-0.5 hidden text-[0.75rem] leading-5 text-mist sm:block">{option.description}</span>
      </span>
      {selected ? (
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-violet-300 sm:static sm:mt-4 sm:gap-1.5 sm:text-[0.62rem] sm:tracking-[0.14em] sm:text-violet-400">
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="hidden sm:inline">Selecionado</span>
        </span>
      ) : null}
    </motion.button>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  const isMobileMotion = useMobileMotion();

  return (
    <motion.button
      type="button"
      whileHover={isMobileMotion ? undefined : { y: -1.5 }}
      whileTap={isMobileMotion ? undefined : { scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'min-h-10 max-w-full rounded-full border px-3 py-2 text-[0.8rem] font-semibold leading-tight transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 sm:py-2.5 sm:text-[0.9rem]',
        selected
          ? 'border-violet-400/55 bg-violet-500/[0.14] text-frost shadow-[0_12px_50px_rgba(141,92,255,0.14)]'
          : 'border-white/10 bg-white/[0.045] text-mist hover:border-white/18 hover:bg-white/[0.06]',
      )}
    >
      {children}
    </motion.button>
  );
}

function FeatureCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  const isMobileMotion = useMobileMotion();

  return (
    <motion.button
      type="button"
      whileHover={isMobileMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={isMobileMotion ? undefined : { scale: 0.985 }}
      onClick={onClick}
      className={cn(
        'group relative min-h-[3.2rem] w-full min-w-0 overflow-hidden rounded-[0.95rem] border p-2.5 text-left transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-h-[5.5rem] sm:rounded-[1.15rem] sm:p-4',
        selected
          ? 'border-violet-400/65 bg-[linear-gradient(135deg,rgba(141,92,255,0.2),rgba(255,255,255,0.06)_48%,rgba(77,212,198,0.06))] text-frost shadow-[0_16px_70px_rgba(141,92,255,0.18),inset_0_1px_0_rgba(255,255,255,0.1)]'
          : 'border-white/10 bg-white/[0.035] text-mist shadow-[0_10px_40px_rgba(5,5,9,0.15)] hover:border-violet-400/40 hover:bg-white/[0.055] hover:text-frost hover:shadow-[0_16px_60px_rgba(141,92,255,0.12)]',
      )}
    >
      <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-75" />
      <span
        className={cn(
          'absolute -right-10 -top-10 h-20 w-20 rounded-full blur-2xl transition duration-500',
          selected ? 'bg-violet-400/20' : 'bg-violet-500/0 group-hover:bg-violet-500/[0.14]',
        )}
      />
      <span className="relative flex h-full items-start justify-between gap-3">
        <span className="min-w-0 text-[0.75rem] font-semibold leading-snug sm:text-[0.85rem] sm:leading-5">{children}</span>
        <span
          className={cn(
            'grid h-5 w-5 shrink-0 place-items-center rounded-full border transition duration-300 sm:h-6 sm:w-6',
            selected
              ? 'border-violet-300/65 bg-violet-400/18 text-frost shadow-[0_0_24px_rgba(169,139,255,0.35)]'
              : 'border-white/12 bg-white/[0.04] text-transparent group-hover:border-violet-400/40',
          )}
        >
          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </span>
      </span>
    </motion.button>
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
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+|\/+/g, '-');

  return (
    <div className="min-w-0">
      <label className="text-xs font-semibold text-frost sm:text-sm" htmlFor={id}>
        {label}
        {required ? <span className="text-violet-400"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        className="mt-1.5 min-h-11 w-full min-w-0 rounded-[0.9rem] border border-white/10 bg-ink/70 px-3 py-2.5 text-sm text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-400 focus:bg-ink/85 focus:shadow-[0_0_0_3px_rgba(141,92,255,0.1)] sm:min-h-12 sm:rounded-[1rem] sm:px-3.5 sm:py-3 sm:text-base"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex min-h-10 min-w-0 items-center gap-2 rounded-[0.9rem] border border-white/10 bg-white/[0.035] px-2.5 py-2 text-[0.7rem] font-semibold text-mist sm:gap-2.5 sm:rounded-[1.05rem] sm:px-3.5 sm:py-2.5 sm:text-xs">
      <Icon className="h-3.5 w-3.5 text-violet-400 sm:h-4 sm:w-4" />
      <span className="min-w-0 truncate">{text}</span>
    </div>
  );
}

function LoadingOverlay({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 grid place-items-center bg-ink/60 p-4 backdrop-blur-md"
    >
      <div className="relative overflow-hidden rounded-[1.2rem] border border-violet-400/22 bg-white/[0.06] p-5 text-center shadow-[0_16px_60px_rgba(141,92,255,0.12)] sm:rounded-[1.75rem] sm:p-7 sm:shadow-[0_24px_90px_rgba(141,92,255,0.14)]">
        <div className="absolute inset-x-6 top-0 h-px bg-premium-line" />
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/28 bg-violet-500/[0.12] text-violet-400 sm:h-14 sm:w-14">
          <Loader2 className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-violet-400 sm:mt-5 sm:text-[0.8rem] sm:tracking-[0.18em]">Processando briefing</p>
        <p className="mt-2.5 max-w-sm text-sm leading-6 text-mist sm:mt-3 sm:text-base">{message}</p>
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.035] p-3 sm:rounded-[1.05rem] sm:p-3.5">
      <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs">{label}</span>
      <strong className="mt-1.5 block text-[0.85rem] leading-5 text-frost sm:mt-2 sm:text-sm">{value}</strong>
    </div>
  );
}
