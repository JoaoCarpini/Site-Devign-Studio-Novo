import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

const IS_MOBILE = typeof window !== 'undefined'
  ? window.matchMedia('(max-width: 1024px)').matches
  : false;

export default function App() {
  const location = useLocation();
  const androidCompatibility = useAndroidCompatibility();
  const extremeMobileCompatibility = useExtremeMobileCompatibility();
  const isMobileHome = location.pathname === '/' && IS_MOBILE;

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    document.documentElement.dataset.androidCompat = isAndroid ? 'true' : 'false';
  }, [androidCompatibility]);

  return (
    <div className="page-shell">
      <ScrollManager />
      <Header />
      {extremeMobileCompatibility ? (
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/projetos" element={<Projects />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/processo" element={<Process />} />
            <Route path="/orcamento" element={<Budget />} />
            <Route path="/contato" element={<Navigate to="/orcamento" replace />} />
            <Route path="/servicos/desenvolvimento-web" element={<WebDevelopment />} />
            <Route path="/servicos/sistemas-web" element={<WebSystems />} />
            <Route path="/servicos/apis" element={<APIs />} />
            <Route path="/servicos/automacao" element={<Automation />} />
            <Route path="/servicos/ia" element={<AI />} />
            <Route path="/servicos/landing-pages" element={<LandingPages />} />
            <Route path="/servicos/integracoes" element={<Integrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      ) : (
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/processo" element={<Process />} />
              <Route path="/orcamento" element={<Budget />} />
              <Route path="/contato" element={<Navigate to="/orcamento" replace />} />
              <Route path="/servicos/desenvolvimento-web" element={<WebDevelopment />} />
              <Route path="/servicos/sistemas-web" element={<WebSystems />} />
              <Route path="/servicos/apis" element={<APIs />} />
              <Route path="/servicos/automacao" element={<Automation />} />
              <Route path="/servicos/ia" element={<AI />} />
              <Route path="/servicos/landing-pages" element={<LandingPages />} />
              <Route path="/servicos/integracoes" element={<Integrations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      )}
      {isMobileHome ? null : <ContactPresence />}
      <Footer />
    </div>
  );
}
