import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  // Start as null — unknown until mounted on client
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // Not yet mounted: render children visible immediately — no animation risk
  if (isMobile === null) {
    return <div className={className}>{children}</div>;
  }

  // Mobile: simple fade-in without whileInView + once — avoids the hydration trap
  if (isMobile) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.32,
          ease: [0.16, 1, 0.3, 1],
          delay: Math.min(delay * 0.5, 0.04),
        }}
      >
        {children}
      </motion.div>
    );
  }

  // Desktop: original whileInView behaviour
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
