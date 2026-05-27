import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 6 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: isMobile ? '0px 0px -4% 0px' : '0px 0px -10% 0px' }}
      transition={{
        duration: isMobile ? 0.32 : 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: isMobile ? Math.min(delay * 0.5, 0.02) : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
