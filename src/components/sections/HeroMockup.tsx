import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export function HeroMockup({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('mockup-window relative mx-auto max-w-[45rem]', className)}
      initial={{ opacity: 0, y: 40, rotateX: 7 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
          <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
          <span className="h-3 w-3 rounded-full bg-[#4dd4c6]" />
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-muted">Devign Command Center</span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[0.72fr_1.28fr] sm:p-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
            <span className="block h-2.5 w-20 rounded-full bg-violet-400/70" />
            <strong className="mt-5 block text-4xl font-semibold tracking-normal text-frost">98</strong>
            <span className="mt-1 block text-xs text-muted">Índice de precisão técnica</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
            <div className="space-y-2">
              <span className="block h-2.5 rounded-full bg-white/25" />
              <span className="block h-2.5 w-4/5 rounded-full bg-white/12" />
              <span className="block h-2.5 w-3/5 rounded-full bg-white/12" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.18),rgba(255,255,255,0.04))] p-4">
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

        <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(141,92,255,0.24),rgba(77,212,198,0.08)_45%,rgba(255,255,255,0.04))] p-4">
          <div className="grid h-64 grid-cols-6 items-end gap-2">
            {[42, 58, 51, 72, 64, 88].map((height, index) => (
              <motion.span
                key={height}
                className="rounded-t-xl bg-[linear-gradient(180deg,#f7f5ff,rgba(169,139,255,0.58))]"
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0.3, opacity: 0.4 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['APIs', 'IA', 'Scale'].map((item) => (
              <span key={item} className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-3 text-center text-xs font-semibold text-mist">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
