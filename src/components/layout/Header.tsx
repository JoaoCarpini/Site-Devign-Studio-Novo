import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { DevignLogo } from '../brand/DevignLogo';
import { ButtonLink } from '../ui/Button';
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-3 transition duration-300 sm:px-4',
          isScrolled
            ? 'border-white/12 bg-ink/78 shadow-[0_18px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl'
            : 'border-white/8 bg-white/[0.045] backdrop-blur-xl',
        )}
      >
        <DevignLogo variant="navbar" className="pl-0.5" />

        <div className="hidden items-center rounded-full border border-white/8 bg-white/[0.035] p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium text-mist transition duration-300 hover:text-frost',
                  active && 'text-frost',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.09] shadow-[0_0_30px_rgba(141,92,255,0.16)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink to="/orcamento" className="min-h-11 px-4 py-2">
            Solicitar Projeto
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-frost transition hover:bg-white/[0.1] lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          'mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink/94 shadow-premium backdrop-blur-2xl transition-all duration-300 lg:hidden',
          isOpen ? 'max-h-[34rem] opacity-100' : 'max-h-0 border-transparent opacity-0',
        )}
      >
        <div className="grid gap-1 p-3">
          {navItems.map((item) => {
            const active = isActive(pathname, item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-mist transition hover:bg-white/[0.07] hover:text-frost',
                  active && 'bg-white/[0.08] text-frost',
                )}
              >
                {item.label}
                {active ? <span className="h-2 w-2 rounded-full bg-violet-400 shadow-glow" /> : null}
              </Link>
            );
          })}
          <ButtonLink to="/orcamento" className="mt-2 w-full">
            Solicitar Projeto
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
