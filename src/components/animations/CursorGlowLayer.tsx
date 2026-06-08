import { useEffect, useRef } from 'react';
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

const DISABLED_SELECTOR = '.light-section, .light-card, .bg-frost, .text-ink, [data-cursor-glow="off"]';
const GLOW_MAX_OPACITY = 0.72;

function supportsCursorGlow(isMobile: boolean) {
  return (
    !isMobile &&
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(min-width: 768px)').matches
  );
}

export function CursorGlowLayer() {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0, opacity: 0 });
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });

  useEffect(() => {
    if (!supportsCursorGlow(isMobile) || reduceMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const handleCursorMove = (event: PointerEvent | MouseEvent) => {
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const shouldHide = Boolean(element?.closest(DISABLED_SELECTOR));

      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
        opacity: shouldHide ? 0 : 1,
      };

      if (shouldHide) targetRef.current.opacity = 0;
    };

    const handleCursorLeave = () => {
      targetRef.current.opacity = 0;
    };

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * 0.13;
      current.y += (target.y - current.y) * 0.13;
      current.opacity += (target.opacity - current.opacity) * 0.12;

      root.style.setProperty('--cursor-glow-x', `${current.x}px`);
      root.style.setProperty('--cursor-glow-y', `${current.y}px`);
      root.style.setProperty('--cursor-glow-opacity', `${current.opacity * GLOW_MAX_OPACITY}`);

      frameRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handleCursorMove, { passive: true });
    window.addEventListener('mousemove', handleCursorMove, { passive: true });
    window.addEventListener('pointerleave', handleCursorLeave);
    window.addEventListener('mouseleave', handleCursorLeave);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleCursorMove);
      window.removeEventListener('mousemove', handleCursorMove);
      window.removeEventListener('pointerleave', handleCursorLeave);
      window.removeEventListener('mouseleave', handleCursorLeave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [isMobile, reduceMotion]);

  return (
    <div ref={rootRef} aria-hidden="true" className="cursor-glow-root" />
  );
}
