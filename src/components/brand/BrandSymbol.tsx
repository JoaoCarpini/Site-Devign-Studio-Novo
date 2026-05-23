import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { brandAssets } from '../../config/brand';

type BrandSymbolProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  glow?: 'none' | 'soft' | 'medium';
  animate?: boolean;
  label?: string;
};

const sizeMap = {
  xs: 'h-7 w-7',
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
  hero: 'h-full w-full',
};

const glowMap = {
  none: '',
  soft: 'shadow-[0_0_28px_rgba(141,92,255,0.22)]',
  medium: 'shadow-[0_0_42px_rgba(141,92,255,0.32)]',
};

export function BrandSymbol({
  size = 'md',
  className,
  glow = 'soft',
  animate = false,
  label = 'Devign Studio',
}: BrandSymbolProps) {
  const image = (
    <img
      src={brandAssets.symbol}
      alt=""
      aria-hidden={label ? undefined : true}
      className={cn(
        'relative z-10 h-full w-full object-contain mix-blend-screen',
        sizeMap[size],
        className,
      )}
      loading="eager"
      decoding="async"
    />
  );

  if (!animate) {
    return (
      <span
        className={cn('relative inline-grid place-items-center', size !== 'hero' && sizeMap[size], glowMap[glow])}
        aria-label={label}
        role="img"
      >
        {glow !== 'none' ? (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-violet-500/20 blur-xl" aria-hidden />
        ) : null}
        {image}
      </span>
    );
  }

  return (
    <motion.span
      className={cn('relative inline-grid place-items-center', size !== 'hero' && sizeMap[size], glowMap[glow])}
      aria-label={label}
      role="img"
      animate={{ y: [0, -4, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {glow !== 'none' ? (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-violet-400/25 blur-xl"
          aria-hidden
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.92, 1.05, 0.92] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}
      {image}
    </motion.span>
  );
}
