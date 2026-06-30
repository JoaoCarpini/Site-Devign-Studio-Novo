import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getLangFromPath,
  getLangPrefix,
  getRoutePath,
  getServicePath,
  SERVICE_KEYS,
  SUPPORTED_LANGS,
  type Lang,
  type RouteKey,
} from '../../i18n';

const SITE_URL = 'https://devignstudio.com';
const ROUTE_KEYS: RouteKey[] = ['home', 'services', 'projects', 'process', 'about', 'budget'];
const LANG_TO_HREFLANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

function getEquivalentUrls(pathname: string): Partial<Record<Lang, string>> {
  const currentLang = getLangFromPath(pathname);
  const currentPrefix = getLangPrefix(currentLang);
  const strippedPath = (currentPrefix ? pathname.slice(currentPrefix.length) : pathname) || '/';
  const result: Partial<Record<Lang, string>> = {};

  for (const lang of SUPPORTED_LANGS) {
    const targetPrefix = getLangPrefix(lang);

    for (const key of ROUTE_KEYS) {
      const currentPath = getRoutePath(currentLang, key);
      if (strippedPath === currentPath) {
        const targetPath = getRoutePath(lang, key);
        result[lang] = SITE_URL + targetPrefix + (targetPath === '/' && targetPrefix ? '' : targetPath);
        break;
      }
    }

    if (result[lang]) continue;

    for (const key of SERVICE_KEYS) {
      const currentServicePath = getServicePath(currentLang, key);
      if (strippedPath === currentServicePath) {
        result[lang] = SITE_URL + targetPrefix + getServicePath(lang, key);
        break;
      }
    }

    if (!result[lang]) {
      result[lang] = SITE_URL + (targetPrefix || '/');
    }
  }

  return result;
}

export function HreflangTags() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    const urls = getEquivalentUrls(pathname);

    for (const lang of SUPPORTED_LANGS) {
      const href = urls[lang];
      if (!href) continue;
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', LANG_TO_HREFLANG[lang]);
      link.href = href;
      document.head.appendChild(link);
    }

    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.href = urls.pt ?? SITE_URL + '/';
    document.head.appendChild(xDefault);

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [pathname]);

  return null;
}
