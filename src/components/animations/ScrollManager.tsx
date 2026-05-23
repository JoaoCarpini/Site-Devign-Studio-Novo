import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = window.decodeURIComponent(hash.replace('#', ''));
      const target = document.getElementById(id);
      window.setTimeout(() => target?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
