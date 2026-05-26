import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { DevignLogo } from '../brand/DevignLogo';
import { cn } from '../../utils/cn';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Processo', to: '/processo' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Orçamento', to: '/orcamento' },
];

function isActive(current: string, target: string) {
  return target === '/' ? current === '/' : current.startsWith(target);
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-2.5">
      <nav
        className={cn(
          'mx-auto flex h-11 max-w-7xl items-center justify-between rounded-[16px] border px-2 transition duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-14 sm:rounded-[20px] sm:px-3.5',
          isScrolled
            ? 'border-white/10 bg-[#08080f]/[0.78] shadow-[0_12px_50px_rgba(0,0,0,0.25)] backdrop-blur-lg'
            : 'border-white/[0.08] bg-[#090911]/[0.54] shadow-[0_10px_45px_rgba(0,0,0,0.14)] backdrop-blur-md',
        )}
      >
        <DevignLogo variant="navbar" className="rounded-xl px-0.5 py-0.5 transition duration-300 hover:bg-white/[0.03] sm:rounded-2xl sm:px-1 sm:py-1" />

        <div className="hidden items-center gap-0.5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'relative rounded-lg px-3 py-1.5 text-xs font-medium text-mist transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.04] hover:text-frost',
                  active && 'text-frost',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 rounded-lg border border-white/[0.08] bg-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/orcamento"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-frost px-3.5 text-xs font-semibold text-ink shadow-[0_10px_36px_rgba(0,0,0,0.18)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_48px_rgba(141,92,255,0.14)] active:scale-[0.98]"
          >
            Iniciar projeto
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-[1rem] border border-white/10 bg-white/[0.05] text-frost transition duration-300 hover:bg-white/[0.08] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      <div
        className={cn(
          'mx-auto mt-2 max-w-7xl overflow-hidden rounded-[18px] border border-white/10 bg-[#08080f]/[0.91] shadow-[0_16px_64px_rgba(0,0,0,0.28)] backdrop-blur-lg transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
          isOpen ? 'max-h-[30rem] opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="grid gap-1 p-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex min-h-10 items-center justify-between rounded-lg px-3.5 py-2.5 text-[0.85rem] font-medium text-mist transition duration-300 hover:bg-white/[0.05] hover:text-frost',
                  active && 'bg-white/[0.07] text-frost',
                )}
              >
                {item.label}
                {active ? <span className="h-1 w-1 rounded-full bg-violet-300" /> : null}
              </Link>
            );
          })}
          <Link
            to="/orcamento"
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-frost px-4 text-xs font-semibold text-ink transition duration-300 hover:bg-white active:scale-[0.99] sm:text-sm"
          >
            Iniciar projeto
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
