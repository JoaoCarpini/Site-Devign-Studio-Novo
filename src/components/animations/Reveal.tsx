import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useAndroidCompatibility, useExtremeMobileCompatibility, useReduceMotion } from '../../hooks/useMediaQuery';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const extremeMobileCompatibility = useExtremeMobileCompatibility();
  const reduceMotion = useReduceMotion();
  const androidCompatibility = useAndroidCompatibility();

  if (extremeMobileCompatibility || reduceMotion || androidCompatibility) {
    return (
      <div className={cn(className, androidCompatibility && 'android-safe android-no-motion')}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
