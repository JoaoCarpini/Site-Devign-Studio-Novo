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
    <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-5 sm:pt-3">
      <nav
        className={cn(
          'mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between rounded-[20px] border px-2.5 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-[4.5rem] sm:rounded-[24px] sm:px-4',
          isScrolled
            ? 'border-white/10 bg-[#08080f]/[0.82] shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl'
            : 'border-white/[0.08] bg-[#090911]/[0.58] shadow-[0_14px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl',
        )}
      >
        <DevignLogo variant="navbar" className="rounded-2xl px-1 py-1 transition duration-300 hover:bg-white/[0.035] sm:px-1.5" />

        <div className="hidden items-center gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.028] p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'relative rounded-xl px-3.5 py-2 text-sm font-medium text-mist transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.045] hover:text-frost',
                  active && 'text-frost',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.075] shadow-[0_10px_34px_rgba(0,0,0,0.18)]"
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
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-frost px-4 text-sm font-semibold text-ink shadow-[0_14px_42px_rgba(0,0,0,0.22)] transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_52px_rgba(141,92,255,0.16)] active:scale-[0.98]"
          >
            Iniciar projeto
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[1.1rem] border border-white/10 bg-white/[0.055] text-frost transition duration-300 hover:bg-white/[0.09] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          'mx-auto mt-2.5 max-w-7xl overflow-hidden rounded-[22px] border border-white/10 bg-[#08080f]/[0.94] shadow-[0_22px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
          isOpen ? 'max-h-[34rem] opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="grid gap-1 p-2.5">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-[0.95rem] font-medium text-mist transition duration-300 hover:bg-white/[0.055] hover:text-frost',
                  active && 'bg-white/[0.075] text-frost',
                )}
              >
                {item.label}
                {active ? <span className="h-1.5 w-1.5 rounded-[3px] bg-violet-300" /> : null}
              </Link>
            );
          })}
          <Link
            to="/orcamento"
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-frost px-5 text-sm font-semibold text-ink transition duration-300 hover:bg-white active:scale-[0.99]"
          >
            Iniciar projeto
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
