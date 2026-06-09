import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'light';

type ButtonLinkProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
};

export function buttonStyles(variant: ButtonVariant = 'primary') {
  const base =
    'group relative inline-flex max-w-full min-h-11 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-center text-xs font-semibold leading-snug transition duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-1 focus-visible:ring-offset-ink hover:translate-y-0 active:scale-[0.97] sm:min-h-12 sm:rounded-full sm:px-5 sm:py-3 sm:text-sm sm:hover:-translate-y-0.5 sm:active:scale-[0.98]';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-frost text-ink shadow-[0_12px_50px_rgba(141,92,255,0.18)] hover:bg-white hover:shadow-[0_16px_70px_rgba(141,92,255,0.28)] sm:shadow-[0_18px_70px_rgba(141,92,255,0.22)] sm:hover:shadow-[0_24px_90px_rgba(141,92,255,0.34)]',
    secondary:
      'border border-white/12 bg-white/[0.055] text-frost backdrop-blur-lg hover:border-violet-400/40 hover:bg-white/[0.085] hover:shadow-[0_12px_50px_rgba(141,92,255,0.12)] sm:backdrop-blur-xl sm:hover:border-violet-400/45 sm:hover:bg-white/[0.105] sm:hover:shadow-[0_20px_70px_rgba(141,92,255,0.16)]',
    ghost:
      'text-mist hover:bg-white/[0.05] hover:text-frost hover:shadow-[0_10px_40px_rgba(5,5,9,0.15)] sm:hover:bg-white/[0.07] sm:hover:shadow-[0_16px_50px_rgba(5,5,9,0.2)]',
    light:
      'bg-ink text-frost hover:bg-graphite shadow-[0_12px_40px_rgba(5,5,9,0.2)] hover:shadow-[0_16px_60px_rgba(5,5,9,0.26)] sm:shadow-[0_18px_48px_rgba(5,5,9,0.26)] sm:hover:shadow-[0_24px_70px_rgba(5,5,9,0.32)]',
  };

  return cn(base, variants[variant]);
}

export function ButtonLink({ children, to, href, target, rel, className, variant = 'primary', onClick }: ButtonLinkProps) {
  const classes = cn(buttonStyles(variant), className);

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} to={to ?? '/'} onClick={onClick}>
      {children}
    </Link>
  );
}
