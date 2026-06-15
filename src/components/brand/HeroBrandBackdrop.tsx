import { motion } from 'framer-motion';
import { brandAssets } from '../../config/brand';
import { useAndroidCompatibility, useIsMobile } from '../../hooks/useMediaQuery';

export function HeroBrandBackdrop() {
  const isMobile = useIsMobile();
  const androidCompatibility = useAndroidCompatibility();

  if (isMobile) return null;

  if (androidCompatibility) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden android-safe android-no-motion">
        <div className="absolute left-0 right-0 top-[42%] mx-auto h-[min(92vw,56rem)] w-[min(92vw,56rem)]">
          <img
            src={brandAssets.symbol}
            alt=""
            className="h-full w-full object-contain opacity-[0.05] blur-[2px] saturate-[1.1] mix-blend-screen android-safe"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(141,92,255,0.14),transparent_58%)] opacity-60 blur-3xl android-safe" />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[42%] h-[min(92vw,56rem)] w-[min(92vw,56rem)] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={brandAssets.symbol}
          alt=""
          className="h-full w-full object-contain opacity-[0.05] blur-[2px] saturate-[1.1] mix-blend-screen"
          animate={{
            y: [0, -18, 0],
            rotate: [0, 2, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(141,92,255,0.14),transparent_58%)] opacity-60 blur-3xl" />
      </motion.div>
    </div>
  );
}
