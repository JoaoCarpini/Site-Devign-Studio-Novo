import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrandSymbol } from './BrandSymbol';

const LOADER_MIN_MS = 1400;
const LOADER_STORAGE_KEY = 'devign-loader-seen';

type PremiumLoaderProps = {
  onComplete: () => void;
};

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ['Inicializando ambiente Devign...', 'Preparando experiência premium...'];

  useEffect(() => {
    const started = Date.now();
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 900);

    const completeTimer = window.setTimeout(() => {
      const elapsed = Date.now() - started;
      const remaining = Math.max(0, LOADER_MIN_MS - elapsed);
      window.setTimeout(() => {
        onComplete();
        try {
          sessionStorage.setItem(LOADER_STORAGE_KEY, '1');
        } catch {
          /* ignore */
        }
      }, remaining);
    }, 320);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete, messages.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#040407]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(141,92,255,0.2),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px]" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-violet-400/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-2 rounded-full border border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <BrandSymbol size="lg" glow="medium" animate />
        </motion.div>

        <motion.p
          key={messages[messageIndex]}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/90"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
        >
          {messages[messageIndex]}
        </motion.p>

        <motion.div
          className="mt-6 h-px w-28 overflow-hidden rounded-full bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="block h-full origin-left rounded-full bg-gradient-to-r from-violet-500 via-violet-300 to-signal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function usePremiumLoaderGate() {
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return sessionStorage.getItem(LOADER_STORAGE_KEY) !== '1';
    } catch {
      return true;
    }
  });

  return {
    showLoader,
    completeLoader: () => setShowLoader(false),
  };
}

export function AppLoaderGate({ children }: { children: ReactNode }) {
  const { showLoader, completeLoader } = usePremiumLoaderGate();

  return (
    <>
      <AnimatePresence mode="wait">{showLoader ? <PremiumLoader onComplete={completeLoader} /> : null}</AnimatePresence>
      {children}
    </>
  );
}
