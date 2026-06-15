import { useEffect, useState } from 'react';

// Layout: apenas largura de tela — determina se o layout deve ser mobile
export const MOBILE_LAYOUT_QUERY = '(max-width: 1023px), (pointer: coarse)';

// Performance: touch OU tela pequena — determina se animações pesadas devem ser reduzidas
export const REDUCE_MOTION_QUERY = '(max-width: 1023px), (pointer: coarse)';

export const EXTREME_MOBILE_COMPAT_QUERY = '(max-width: 1023px)';

// Preferência do usuário para reduzir movimento
export const PREFERS_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    // Só registra o listener, não chama update() de novo
    // (o estado inicial já foi setado corretamente no useState)
    const update = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [query]);

  return matches;
}

// Usado para decisões de LAYOUT (grids, colunas, ordem de elementos, visibilidade)
// Só ativa em telas <= 768px — não ativa em notebooks touchscreen ou iPads grandes
export function useIsMobile() {
  return useMediaQuery(MOBILE_LAYOUT_QUERY);
}

export function useExtremeMobileCompatibility() {
  return useMediaQuery(EXTREME_MOBILE_COMPAT_QUERY);
}

// Usado para decisões de PERFORMANCE (blur em animações, whileHover, whileTap, efeitos GPU)
// Ativa em telas pequenas OU qualquer dispositivo touch (pointer: coarse)
export function useReduceMotion() {
  return useMediaQuery(REDUCE_MOTION_QUERY);
}

// Usa a preferência do usuário para reduzir movimento, independente do dispositivo
export function usePrefersReducedMotion() {
  return useMediaQuery(PREFERS_REDUCED_MOTION_QUERY);
}

export function useAndroidCompatibility() {
  const [isAndroid, setIsAndroid] = useState(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent);
  });

  useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent));
  }, []);

  return isAndroid;
}
