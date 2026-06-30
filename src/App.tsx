import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import i18n from './i18n';
import { getLangFromPath, getLangPrefix, getRoutePath, getServicePath, LANG_STORAGE_KEY, type Lang } from './i18n';
import { ScrollManager } from './components/animations/ScrollManager';
import { PageTransition } from './components/animations/PageTransition';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { ContactPresence } from './components/sections/ContactPresence';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import About from './pages/About';
import Process from './pages/Process';
import Budget from './pages/Budget';
import NotFound from './pages/NotFound';
import WebDevelopment from './pages/services/WebDevelopment';
import WebSystems from './pages/services/WebSystems';
import APIs from './pages/services/APIs';
import Automation from './pages/services/Automation';
import AI from './pages/services/AI';
import LandingPages from './pages/services/LandingPages';
import Integrations from './pages/services/Integrations';
import { useAndroidCompatibility, useExtremeMobileCompatibility } from './hooks/useMediaQuery';
import { HreflangTags } from './components/seo/HreflangTags';

const IS_MOBILE = typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 1024px)').matches
  : false;

const HOME_PATHS = ['/', '/en', '/es'];

function buildRoutes(lang: Lang) {
  const prefix = getLangPrefix(lang);
  const r = (key: Parameters<typeof getRoutePath>[1]) => {
    const path = getRoutePath(lang, key);
    return prefix + (path === '/' && prefix ? '' : path);
  };
  const s = (key: Parameters<typeof getServicePath>[1]) => prefix + getServicePath(lang, key);

  return (
    <>
      <Route path={r('home')} element={<Home />} />
      <Route path={r('services')} element={<Services />} />
      <Route path={r('projects')} element={<Projects />} />
      <Route path={r('process')} element={<Process />} />
      <Route path={r('about')} element={<About />} />
      <Route path={r('budget')} element={<Budget />} />
      <Route path={s('web-development')} element={<WebDevelopment />} />
      <Route path={s('web-systems')} element={<WebSystems />} />
      <Route path={s('apis')} element={<APIs />} />
      <Route path={s('automation')} element={<Automation />} />
      <Route path={s('ai')} element={<AI />} />
      <Route path={s('landing-pages')} element={<LandingPages />} />
      <Route path={s('integrations')} element={<Integrations />} />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const androidCompatibility = useAndroidCompatibility();
  const extremeMobileCompatibility = useExtremeMobileCompatibility();
  const isMobileHome = HOME_PATHS.includes(location.pathname) && IS_MOBILE;

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    document.documentElement.dataset.androidCompat = isAndroid ? 'true' : 'false';
  }, [androidCompatibility]);

  useEffect(() => {
    const lang = getLangFromPath(location.pathname);
    document.documentElement.lang = lang;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
  }, [location.pathname]);

  const routes = (
    <Routes location={location}>
      {buildRoutes('pt')}
      {buildRoutes('en')}
      {buildRoutes('es')}
      <Route path="/contato" element={<Navigate to="/orcamento" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return (
    <div className="page-shell">
      <HreflangTags />
      <ScrollManager />
      <Header />
      {extremeMobileCompatibility ? (
        <PageTransition key={location.pathname}>
          {routes}
        </PageTransition>
      ) : (
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            {routes}
          </PageTransition>
        </AnimatePresence>
      )}
      {isMobileHome ? null : <ContactPresence />}
      <Footer />
    </div>
  );
}
