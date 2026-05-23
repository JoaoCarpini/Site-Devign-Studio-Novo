import { type CSSProperties, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, CheckCircle2, Layers3, Sparkles } from 'lucide-react';
import { HeroBrandBackdrop } from '../brand/HeroBrandBackdrop';
import { AuroraBackground } from '../backgrounds/AuroraBackground';
import { ButtonLink } from '../ui/Button';
import { HeroMockup } from './HeroMockup';

const particles = [
  { left: '9%', top: '26%', delay: 0, size: 3 },
  { left: '18%', top: '72%', delay: 0.8, size: 2 },
  { left: '39%', top: '18%', delay: 1.1, size: 2 },
  { left: '54%', top: '76%', delay: 0.4, size: 3 },
  { left: '72%', top: '17%', delay: 1.6, size: 2 },
  { left: '86%', top: '58%', delay: 0.2, size: 3 },
  { left: '93%', top: '34%', delay: 1.4, size: 2 },
];

const capabilityPills = ['Sistemas web', 'APIs', 'Automações', 'IA aplicada', 'Dashboards'];

const heroMetrics = [
  { value: '360°', label: 'Estratégia, design e engenharia' },
  { value: 'High-ticket', label: 'Presença digital de alto valor' },
  { value: 'Sob medida', label: 'Arquitetura para operação real' },
];

export function CinematicHero() {
  const [spotlight, setSpotlight] = useState({ x: '62%', y: '34%' });

  const style = {
    '--hero-x': spotlight.x,
    '--hero-y': spotlight.y,
  } as CSSProperties;

  return (
    <section
      className="relative isolate min-h-[min(900px,100vh)] overflow-hidden pt-32 sm:pt-36"
      style={style}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: `${event.clientX - rect.left}px`,
          y: `${event.clientY - rect.top}px`,
        });
      }}
    >
      <AuroraBackground />
      <HeroBrandBackdrop />
      <div aria-hidden="true" className="hero-cursor-glow absolute inset-0 z-0" />
      <div aria-hidden="true" className="hero-fine-grid absolute inset-0 z-0" />
      <div aria-hidden="true" className="absolute left-1/2 top-24 z-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-500/18 blur-[120px]" />
      <div aria-hidden="true" className="absolute right-[-12rem] top-36 z-0 h-[28rem] w-[28rem] rounded-full bg-signal/10 blur-[110px]" />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          aria-hidden="true"
          className="absolute z-0 rounded-full bg-violet-300/70 shadow-[0_0_24px_rgba(169,139,255,0.6)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [-5, 7, -5], opacity: [0.24, 0.64, 0.24], scale: [1, 1.22, 1] }}
          transition={{ duration: 7.4, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}

      <div className="container-premium relative z-10 grid gap-14 pb-14 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:pb-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.065] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300 shadow-[0_0_50px_rgba(141,92,255,0.16)] backdrop-blur-2xl"
          >
            <Sparkles className="h-4 w-4" />
            Devign Studio / Software house premium
          </motion.div>

          <motion.h1
            className="max-w-6xl text-balance text-[clamp(3.5rem,7vw,7.7rem)] font-semibold leading-[0.88] tracking-normal text-frost"
            initial={{ opacity: 0, y: 32, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            Tecnologia para operar em escala.
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-9 text-mist sm:text-xl"
            initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            Sistemas, automações, APIs, dashboards e experiências digitais premium para empresas que querem crescer com arquitetura sob medida e percepção de alto valor.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
          >
            <ButtonLink to="/orcamento" className="px-6">
              Solicitar Projeto
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink to="/projetos" variant="secondary" className="px-6">
              Ver Projetos
            </ButtonLink>
            <ButtonLink to="/orcamento" variant="ghost" className="px-4">
              <CalendarDays className="h-4 w-4" />
              Agendar Conversa
            </ButtonLink>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.34 }}
          >
            {capabilityPills.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm font-medium text-mist backdrop-blur-xl">
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 44, filter: 'blur(14px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-violet-500/16 blur-3xl" />
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

      <div className="container-premium relative z-10 pb-16">
        <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
          {heroMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 + index * 0.07 }}
            >
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-signal" />
              <div>
                <strong className="block text-xl font-semibold tracking-normal text-frost">{item.value}</strong>
                <span className="mt-1 block text-sm text-muted">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Layers3 aria-hidden="true" className="absolute bottom-16 left-8 z-0 hidden h-24 w-24 text-white/[0.035] lg:block" />
    </section>
  );
}
