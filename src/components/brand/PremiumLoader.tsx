import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DevignLogo } from './DevignLogo';
import { useExtremeMobileCompatibility, useIsMobile } from '../../hooks/useMediaQuery';

const LOADER_MIN_MS = 1400;
const LOADER_STORAGE_KEY = 'devign-loader-seen';

type PremiumLoaderProps = {
  onComplete: () => void;
};

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const extremeMobileCompatibility = useExtremeMobileCompatibility();
  const isMobile = useIsMobile();
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

  if (extremeMobileCompatibility) {
    return (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-[#040407]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(141,92,255,0.2),transparent_52%)]" />
        <div className="relative flex flex-col items-center px-6 text-center">
          <div className="relative grid h-24 w-56 place-items-center sm:w-64">
            <DevignLogo to="" variant="footer" className="relative" />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/90">
            {messages[messageIndex]}
          </p>
          <div className="mt-6 h-px w-28 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-gradient-to-r from-violet-500 via-violet-300 to-signal" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#040407]"
      initial={{ opacity: 1 }}
      exit={isMobile ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: isMobile ? 0.24 : 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(141,92,255,0.2),transparent_52%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px] sm:block" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <motion.div
          className="relative grid h-24 w-56 place-items-center sm:w-64"
          initial={isMobile ? { opacity: 0, scale: 0.94 } : { opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
          animate={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: isMobile ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent sm:block"
            animate={isMobile ? undefined : { rotate: 360 }}
            transition={isMobile ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-violet-300/30 to-transparent sm:block"
            animate={isMobile ? undefined : { opacity: [0.45, 0.9, 0.45] }}
            transition={isMobile ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <DevignLogo to="" variant="footer" className="relative" />
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
  const extremeMobileCompatibility = useExtremeMobileCompatibility();

  return (
    <>
      {extremeMobileCompatibility ? (
        showLoader ? <PremiumLoader onComplete={completeLoader} /> : null
      ) : (
        <AnimatePresence mode="wait">{showLoader ? <PremiumLoader onComplete={completeLoader} /> : null}</AnimatePresence>
      )}
      {children}
    </>
  );
}
