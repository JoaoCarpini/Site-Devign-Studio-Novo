import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Layers3, Sparkles } from 'lucide-react';
import { HeroBrandBackdrop } from '../brand/HeroBrandBackdrop';
import { AuroraBackground } from '../backgrounds/AuroraBackground';
import { ButtonLink } from '../ui/Button';
import { HeroMockup } from './HeroMockup';
import { useIsMobile, useReduceMotion } from '../../hooks/useMediaQuery';

const particles = [
  { left: '9%', top: '26%', delay: 0, size: 3 },
  { left: '18%', top: '72%', delay: 0.8, size: 2 },
  { left: '39%', top: '18%', delay: 1.1, size: 2 },
  { left: '54%', top: '76%', delay: 0.4, size: 3 },
  { left: '72%', top: '17%', delay: 1.6, size: 2 },
  { left: '86%', top: '58%', delay: 0.2, size: 3 },
  { left: '93%', top: '34%', delay: 1.4, size: 2 },
];

const capabilityPills = ['Software sob medida', 'APIs estratégicas', 'Automações', 'IA aplicada', 'Presença premium'];

const heroMetrics = [
  { value: '360°', label: 'Estratégia, design e engenharia' },
  { value: 'Premium', label: 'Presença digital de alto valor' },
  { value: 'Escala', label: 'Arquitetura para operações reais' },
];

export function CinematicHero() {
  const isMobile = useIsMobile();
  const reduceMotion = useReduceMotion();
  const renderStaticMetrics = isMobile || reduceMotion;

  return (
    <section
      className="relative isolate overflow-hidden pt-20 sm:min-h-[min(900px,100vh)] sm:pt-32"
    >
      <AuroraBackground />
      <HeroBrandBackdrop />
      <div aria-hidden="true" className="hero-fine-grid absolute inset-0 z-0 opacity-20 sm:opacity-60" />
      <div aria-hidden="true" className="absolute left-1/2 top-24 z-0 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/16 blur-[120px] sm:block" />
      <div aria-hidden="true" className="absolute right-[-12rem] top-32 z-0 hidden h-[26rem] w-[26rem] rounded-full bg-signal/8 blur-[100px] sm:block" />

      {!isMobile && particles.map((particle) => (
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
          <motion.div
            initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 0.3 : 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-violet-300 shadow-[0_0_50px_rgba(141,92,255,0.16)] sm:mb-7 sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.24em] sm:backdrop-blur-2xl"
          >
            <Sparkles className="h-4 w-4" />
            Devign Studio / Software house premium
          </motion.div>

          <motion.h1
            className="max-w-6xl text-balance text-[clamp(2.85rem,15vw,4.35rem)] font-semibold leading-[0.92] tracking-normal text-frost sm:text-[clamp(3.5rem,7vw,7.7rem)] sm:leading-[0.88]"
            initial={isMobile ? { opacity: 0, y: 10 } : { opacity: 0, y: 32, filter: 'blur(14px)' }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 0.34 : 0.9, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0.02 : 0.08 }}
          >
            Infraestrutura digital para marcas que operam em alto nível.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-7 text-mist sm:mt-8 sm:text-xl sm:leading-9"
            initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: isMobile ? 0.32 : 0.75, ease: [0.22, 1, 0.36, 1], delay: isMobile ? 0.04 : 0.18 }}
          >
            Construímos experiências digitais, automações e sistemas sob medida para empresas que precisam transformar presença, dados e operação em vantagem real.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
          >
            <ButtonLink to="/orcamento" className="w-full px-6 sm:w-auto">
              Iniciar projeto
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to="/projetos" variant="secondary" className="w-full px-6 sm:w-auto">
              Explorar cases
            </ButtonLink>
            <ButtonLink to="/orcamento" variant="ghost" className="hidden px-4 sm:inline-flex">
              <CalendarDays className="h-4 w-4" />
              Mapear escopo
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
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Stack</span>
            <p className="mt-1 text-sm font-semibold text-frost">React · Python · APIs</p>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-16 z-20 hidden rounded-2xl border border-white/10 bg-frost px-4 py-3 text-ink shadow-[0_24px_70px_rgba(5,5,9,0.32)] sm:block"
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">Entrega</span>
            <p className="mt-1 text-sm font-semibold">Arquitetura sob medida</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="container-premium relative z-10 pb-16 sm:pb-32 lg:pb-36">
        <div className="grid gap-2.5 border-t border-white/10 pt-5 sm:gap-3 sm:grid-cols-3">
          {heroMetrics.map((item, index) => {
            const content = (
              <>
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-signal" />
                <div className="min-w-0">
                  <strong className="block break-words text-lg font-semibold tracking-normal text-frost sm:text-xl">{item.value}</strong>
                  <span className="mt-1 block break-words text-sm leading-6 text-muted sm:leading-normal">{item.label}</span>
                </div>
              </>
            );

            const className = 'flex min-w-0 items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:gap-4 sm:p-5 sm:backdrop-blur-xl';

            if (renderStaticMetrics) {
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 + index * 0.07 }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>

      <Layers3 aria-hidden="true" className="absolute bottom-16 left-8 z-0 hidden h-24 w-24 text-white/[0.035] lg:block" />
    </section>
  );
}
