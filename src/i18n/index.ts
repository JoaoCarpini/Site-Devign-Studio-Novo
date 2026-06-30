import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptCommon from './locales/pt/common.json';
import ptHome from './locales/pt/home.json';
import ptServices from './locales/pt/services.json';
import ptProjects from './locales/pt/projects.json';
import ptAbout from './locales/pt/about.json';
import ptProcess from './locales/pt/process.json';
import ptBudget from './locales/pt/budget.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enServices from './locales/en/services.json';
import enProjects from './locales/en/projects.json';
import enAbout from './locales/en/about.json';
import enProcess from './locales/en/process.json';
import enBudget from './locales/en/budget.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esServices from './locales/es/services.json';
import esProjects from './locales/es/projects.json';
import esAbout from './locales/es/about.json';
import esProcess from './locales/es/process.json';
import esBudget from './locales/es/budget.json';

export const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const LANG_STORAGE_KEY = 'devign-lang';

export const SERVICE_KEYS = [
  'web-development',
  'web-systems',
  'apis',
  'automation',
  'ai',
  'landing-pages',
  'integrations',
] as const;

const commonByLang = { pt: ptCommon, en: enCommon, es: esCommon };
const servicesByLang = { pt: ptServices, en: enServices, es: esServices };

export type RouteKey = 'home' | 'services' | 'projects' | 'process' | 'about' | 'budget';

export function getLangPrefix(lang: Lang): string {
  return lang === 'pt' ? '' : `/${lang}`;
}

export function getLangFromPath(pathname: string): Lang {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'pt';
}

export function getRoutePath(lang: Lang, key: RouteKey): string {
  return commonByLang[lang].routes[key];
}

export function getServicePath(lang: Lang, key: (typeof SERVICE_KEYS)[number]): string {
  return servicesByLang[lang][key].path;
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'pt';

  const pathname = window.location.pathname;

  // Non-root paths: always use the URL's lang prefix
  if (pathname !== '/') return getLangFromPath(pathname);

  // Root path: check localStorage first (returning users)
  const saved = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) return saved;

  // First visit: detect from browser language
  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('es')) {
    localStorage.setItem(LANG_STORAGE_KEY, 'es');
    return 'es';
  }
  if (browserLang.startsWith('en')) {
    localStorage.setItem(LANG_STORAGE_KEY, 'en');
    return 'en';
  }
  return 'pt';
}

i18n.use(initReactI18next).init({
  resources: {
    pt: { common: ptCommon, home: ptHome, services: ptServices, projects: ptProjects, about: ptAbout, process: ptProcess, budget: ptBudget },
    en: { common: enCommon, home: enHome, services: enServices, projects: enProjects, about: enAbout, process: enProcess, budget: enBudget },
    es: { common: esCommon, home: esHome, services: esServices, projects: esProjects, about: esAbout, process: esProcess, budget: esBudget },
  },
  lng: getInitialLang(),
  defaultNS: 'common',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

export default i18n;
