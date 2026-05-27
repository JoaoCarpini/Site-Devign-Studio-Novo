import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';

export function PageTransition({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <motion.main
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: isMobile ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
