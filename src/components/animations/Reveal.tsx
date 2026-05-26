import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 8 } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: isMobile ? '0px 0px -6% 0px' : '0px 0px -12% 0px' }}
      transition={{
        duration: isMobile ? 0.36 : 0.82,
        ease: [0.16, 1, 0.3, 1],
        delay: isMobile ? Math.min(delay, 0.04) : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
