import { FormEvent, useMemo, useRef, useState, type ReactNode } from 'react';
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
import { DevignLogo } from '../brand/DevignLogo';

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
  validating: 'Validando email e proteção anti-spam...',
  sending: 'Enviando briefing estruturado para a Devign...',
  whatsapp: 'Preparando atendimento via WhatsApp...',
};

function isEmailFormatValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function BudgetWizard() {
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
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-violet-400/[0.28] bg-white/[0.06] p-7 shadow-[0_34px_120px_rgba(5,5,9,0.55)] backdrop-blur-2xl sm:p-10"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/[0.22] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-10 h-56 w-56 rounded-full bg-signal/[0.1] blur-3xl" />

        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-violet-400/30 bg-violet-500/[0.14] text-violet-400 shadow-[0_0_70px_rgba(141,92,255,0.28)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Onboarding concluído
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-frost sm:text-4xl">
            Briefing enviado com sucesso.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-mist">
            Nossa equipe recebeu as informações do seu projeto. Agora você será direcionado para continuar o atendimento via WhatsApp.
          </p>

          <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-ink/45 p-4 sm:grid-cols-3">
            <SummaryItem label="Projeto" value={form.projectType} />
            <SummaryItem label="Objetivo" value={form.objective} />
            <SummaryItem label="Investimento" value={form.budget} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.052] p-5 shadow-[0_34px_120px_rgba(5,5,9,0.58)] backdrop-blur-2xl sm:p-7 lg:p-8"
    >
      <div className="pointer-events-none absolute inset-x-10 -top-28 h-56 rounded-full bg-violet-500/[0.18] blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-20 h-60 w-60 rounded-full bg-signal/[0.08] blur-3xl" />

      {isSubmitting ? <LoadingOverlay message={phaseMessages[submitPhase]} /> : null}

      <div className="relative">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 inline-flex"
              >
                <DevignLogo to="" variant="navbar" />
              </motion.div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
                Onboarding estratégico
              </span>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-frost sm:text-3xl">
                Qualifique seu projeto com segurança real.
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-mist">
              0{step + 1} / 0{steps.length}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-400 to-signal shadow-[0_0_32px_rgba(141,92,255,0.5)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <StepRail
            steps={steps}
            currentStep={step}
            disabled={isSubmitting}
            onStepSelect={setStep}
          />
        </div>

        <div className="min-h-[34rem] py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18, scale: 0.985, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, scale: 0.985, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 0 ? (
                <WizardStep
                  eyebrow="Etapa 01 · Projeto"
                  title="Qual experiência digital sua empresa precisa construir?"
                  description="Estamos entendendo qual experiência digital sua empresa precisa construir — tecnologia, design e presença estratégica em um único fluxo de discovery."
                >
                  <div className="mt-7 space-y-10">
                    {projectTypeGroups.map((group) => (
                      <div key={group.eyebrow}>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">
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
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Outros formatos</p>
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
                  title="Qual objetivo de negócio deve orientar a entrega?"
                  description="A prioridade evita escopo solto e ajuda a desenhar tecnologia com impacto comercial ou operacional claro."
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
                  title="Qual faixa de orçamento faz sentido para este momento?"
                  description="A referência de investimento calibra escopo, senioridade técnica, ritmo e profundidade da solução."
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
                  title="Qual prazo esperado para iniciar ou entregar?"
                  description="O timing ajuda a entender urgência, complexidade e necessidade de dividir a entrega em fases."
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
                  title="Selecione os recursos desejados para a primeira versão."
                  description="Escolha os recursos mais importantes para visualizar melhor o projeto. A proposta pode reorganizar prioridades por fase, complexidade e impacto."
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
                  title="Quais integrações podem fazer parte do projeto?"
                  description="Integrações impactam arquitetura, segurança, automação e esforço técnico. Se ainda não souber, marque a opção correspondente."
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
                  title="Dados para validação, contato e pré-diagnóstico."
                  description="Seu email será validado via API server-side antes do envio. Se aprovado, o briefing vai para a Devign e o WhatsApp abre automaticamente."
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

                  <div className="mt-7 grid gap-5 md:grid-cols-2">
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

                  <label className="mt-5 block text-sm font-semibold text-frost" htmlFor="description">
                    Descrição do projeto <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    className="mt-2 min-h-40 w-full resize-y rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-400 focus:bg-ink/85 focus:shadow-[0_0_0_4px_rgba(141,92,255,0.12)]"
                    placeholder="Contexto, objetivo, dores atuais, referências e qualquer requisito importante."
                    value={form.description}
                    onChange={(event) => update('description', event.target.value)}
                    required
                  />

                  <div className="mt-5 grid gap-3 rounded-[1.4rem] border border-white/10 bg-ink/45 p-4 sm:grid-cols-3">
                    <TrustBadge icon={ShieldCheck} text="Validação server-side" />
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

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className={cn(buttonStyles('secondary'), 'disabled:pointer-events-none disabled:opacity-45')}
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0 || isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          {step < steps.length - 1 ? (
            <button type="button" className={buttonStyles('primary')} onClick={next} disabled={isSubmitting}>
              Continuar onboarding
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" className={buttonStyles('primary')} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Enviar briefing
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
    <section>
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">{eyebrow}</span>
      <h3 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-frost sm:text-4xl">{title}</h3>
      <p className="mt-4 max-w-2xl text-base leading-8 text-mist">{description}</p>
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
  return (
    <div className="relative px-2 sm:px-3 lg:px-1">
      {/* Mobile only: scroll hint — translucent, never opaque black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-[1px] lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-[1px] lg:hidden"
      />

      <div className="flex gap-2.5 overflow-x-auto scroll-px-3 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3 sm:scroll-px-4 sm:px-1 [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:px-0.5">
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
                'group relative min-w-[6.85rem] shrink-0 overflow-hidden rounded-2xl border px-3.5 py-2.5 text-left backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-w-[7.5rem] sm:px-4 sm:py-3 lg:min-w-0 lg:flex-1',
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
                    'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[0.65rem] font-semibold transition-[border-color,background-color,box-shadow,color] duration-500 sm:h-8 sm:w-8 sm:text-xs',
                    isActive
                      ? 'border-violet-300/45 bg-gradient-to-br from-violet-400/25 to-white/10 text-frost shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_18px_rgba(169,139,255,0.28)]'
                      : isComplete
                        ? 'border-signal/28 bg-signal/[0.08] text-signal shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                        : 'border-white/10 bg-white/[0.04] text-muted group-hover:border-white/18 group-hover:text-frost/90',
                  )}
                >
                  {isComplete ? <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : `0${index + 1}`}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block truncate text-[0.8125rem] font-semibold leading-tight transition-colors duration-500 sm:text-sm',
                      isActive ? 'text-frost' : 'text-frost/88 group-hover:text-frost',
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'mt-0.5 block truncate text-[0.6875rem] leading-4 transition-colors duration-500 sm:text-xs',
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
  return <div className="mt-7 grid gap-3 md:grid-cols-2">{children}</div>;
}

function ProjectOptionGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 xl:grid-cols-3', className)}>{children}</div>
  );
}

function ChipGrid({ children }: { children: ReactNode }) {
  return <div className="mt-7 flex flex-wrap gap-3">{children}</div>;
}

function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;
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

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        selected
          ? 'border-violet-400/65 bg-violet-500/[0.16] shadow-[0_24px_90px_rgba(141,92,255,0.22)]'
          : 'border-white/10 bg-white/[0.045] hover:border-violet-400/30 hover:bg-white/[0.075] hover:shadow-[0_20px_70px_rgba(141,92,255,0.12)]',
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition duration-700',
          selected ? 'bg-violet-500/25' : 'bg-violet-500/0 group-hover:bg-violet-500/[0.14]',
        )}
      />
      <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      <span
        className={cn(
          'mb-5 grid h-11 w-11 place-items-center rounded-2xl border transition',
          selected
            ? 'border-violet-400/45 bg-violet-500/[0.18] text-violet-400'
            : 'border-white/10 bg-white/[0.045] text-muted group-hover:text-frost',
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="relative block text-base font-semibold leading-snug text-frost sm:text-lg">{option.title}</span>
      <span className="relative mt-2 block text-sm leading-6 text-mist">{option.description}</span>
      {selected ? (
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
          <CheckCircle2 className="h-4 w-4" />
          Selecionado
        </span>
      ) : null}
    </motion.button>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'rounded-full border px-5 py-3 text-sm font-semibold transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        selected
          ? 'border-violet-400/60 bg-violet-500/[0.16] text-frost shadow-[0_18px_60px_rgba(141,92,255,0.16)]'
          : 'border-white/10 bg-white/[0.045] text-mist hover:border-white/20 hover:bg-white/[0.075]',
      )}
    >
      {children}
    </motion.button>
  );
}

function FeatureCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={cn(
        'group relative min-h-24 overflow-hidden rounded-[1.25rem] border p-4 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        selected
          ? 'border-violet-400/70 bg-[linear-gradient(135deg,rgba(141,92,255,0.24),rgba(255,255,255,0.075)_48%,rgba(77,212,198,0.08))] text-frost shadow-[0_24px_90px_rgba(141,92,255,0.24),inset_0_1px_0_rgba(255,255,255,0.14)]'
          : 'border-white/10 bg-white/[0.045] text-mist shadow-[0_14px_50px_rgba(5,5,9,0.2)] hover:border-violet-400/45 hover:bg-white/[0.08] hover:text-frost hover:shadow-[0_24px_80px_rgba(141,92,255,0.16)]',
      )}
    >
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <span
        className={cn(
          'absolute -right-12 -top-12 h-28 w-28 rounded-full blur-3xl transition duration-700',
          selected ? 'bg-violet-400/25' : 'bg-violet-500/0 group-hover:bg-violet-500/[0.16]',
        )}
      />
      <span className="relative flex h-full items-start justify-between gap-4">
        <span className="text-sm font-semibold leading-6">{children}</span>
        <span
          className={cn(
            'grid h-6 w-6 shrink-0 place-items-center rounded-full border transition duration-500',
            selected
              ? 'border-violet-300/70 bg-violet-400/20 text-frost shadow-[0_0_34px_rgba(169,139,255,0.45)]'
              : 'border-white/12 bg-white/[0.04] text-transparent group-hover:border-violet-400/45',
          )}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
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
    <div>
      <label className="text-sm font-semibold text-frost" htmlFor={id}>
        {label}
        {required ? <span className="text-violet-400"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-mist outline-none transition duration-300 placeholder:text-muted/70 focus:border-violet-400 focus:bg-ink/85 focus:shadow-[0_0_0_4px_rgba(141,92,255,0.12)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-mist">
      <Icon className="h-4 w-4 text-violet-400" />
      {text}
    </div>
  );
}

function LoadingOverlay({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 grid place-items-center bg-ink/72 p-6 backdrop-blur-xl"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-white/[0.07] p-8 text-center shadow-[0_34px_120px_rgba(141,92,255,0.18)]">
        <div className="absolute inset-x-8 top-0 h-px bg-premium-line" />
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-violet-400/30 bg-violet-500/[0.14] text-violet-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-violet-400">Processando briefing</p>
        <p className="mt-3 max-w-sm text-base leading-7 text-mist">{message}</p>
      </div>
    </motion.div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.045] p-4">
      <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
      <strong className="mt-2 block text-sm leading-6 text-frost">{value}</strong>
    </div>
  );
}
