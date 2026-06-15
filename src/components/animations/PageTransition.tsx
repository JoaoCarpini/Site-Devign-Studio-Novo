import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useExtremeMobileCompatibility, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

export function PageTransition({ children }: { children: ReactNode }) {
  const extremeMobileCompatibility = useExtremeMobileCompatibility();
  const reduceMotion = usePrefersReducedMotion();

  if (extremeMobileCompatibility || reduceMotion) {
    return <main>{children}</main>;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
