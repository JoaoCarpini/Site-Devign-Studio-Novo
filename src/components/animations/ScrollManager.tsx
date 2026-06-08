import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReduceMotion } from '../../hooks/useMediaQuery';

export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    if (hash) {
      const id = window.decodeURIComponent(hash.replace('#', ''));
      const target = document.getElementById(id);
      window.setTimeout(() => target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 60);
      return;
    }

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [pathname, hash, reduceMotion]);

  return null;
}
