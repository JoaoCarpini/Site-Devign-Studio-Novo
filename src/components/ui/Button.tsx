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
    'group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink hover:-translate-y-0.5 active:scale-[0.98]';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-frost text-ink shadow-[0_18px_70px_rgba(141,92,255,0.22)] hover:bg-white hover:shadow-[0_24px_90px_rgba(141,92,255,0.34)]',
    secondary:
      'border border-white/12 bg-white/[0.065] text-frost backdrop-blur-xl hover:border-violet-400/45 hover:bg-white/[0.105] hover:shadow-[0_20px_70px_rgba(141,92,255,0.16)]',
    ghost:
      'text-mist hover:bg-white/[0.07] hover:text-frost hover:shadow-[0_16px_50px_rgba(5,5,9,0.2)]',
    light:
      'bg-ink text-frost hover:bg-graphite shadow-[0_18px_48px_rgba(5,5,9,0.26)] hover:shadow-[0_24px_70px_rgba(5,5,9,0.32)]',
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
