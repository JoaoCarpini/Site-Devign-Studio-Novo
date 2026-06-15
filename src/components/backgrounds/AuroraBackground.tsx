import { useIsMobile } from '../../hooks/useMediaQuery';

export function AuroraBackground() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(141,92,255,0.055),transparent_28rem)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
      <div className="soft-grid absolute inset-0 opacity-50" />
      <div className="absolute left-1/2 top-0 h-px w-[72rem] -translate-x-1/2 bg-premium-line" />
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[linear-gradient(115deg,rgba(141,92,255,0.2),transparent_34%,rgba(77,212,198,0.06)_68%,transparent)] opacity-50 blur-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
