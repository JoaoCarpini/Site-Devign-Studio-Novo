import { useEffect, useState } from 'react';

// Layout: apenas largura de tela — determina se o layout deve ser mobile
export const MOBILE_LAYOUT_QUERY = '(max-width: 768px)';

// Performance: touch OU tela pequena — determina se animações pesadas devem ser reduzidas
export const REDUCE_MOTION_QUERY = '(max-width: 768px), (pointer: coarse)';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
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

// Usado para decisões de PERFORMANCE (blur em animações, whileHover, whileTap, efeitos GPU)
// Ativa em telas pequenas OU qualquer dispositivo touch (pointer: coarse)
export function useReduceMotion() {
  return useMediaQuery(REDUCE_MOTION_QUERY);
}
