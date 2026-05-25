import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { brandAssets } from '../../config/brand';

type DevignLogoProps = {
  variant?: 'navbar' | 'footer' | 'deck';
  to?: string;
  className?: string;
};

export function DevignLogo({
  variant = 'navbar',
  to = '/',
  className,
}: DevignLogoProps) {
  const content =
    variant === 'deck' ? (
      <img
        src={brandAssets.verticalDeck}
        alt="Devign Studio"
        className="mx-auto h-auto w-full max-w-[13.5rem] object-contain sm:max-w-[15rem]"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <span
        className={cn(
          'inline-flex items-center',
          variant === 'navbar' ? 'gap-2.5 sm:gap-3' : 'gap-3',
        )}
      >
        <img
          src={brandAssets.horizontalLockup}
          alt=""
          aria-hidden="true"
          className={cn(
            'shrink-0 object-contain transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-95',
            variant === 'navbar' ? 'h-[2.125rem] w-[2.125rem]' : 'h-10 w-10',
          )}
          loading="eager"
          decoding="async"
        />
        <span className="flex flex-col justify-center leading-none">
          <span
            className={cn(
              'font-bold text-frost transition-colors duration-300',
              variant === 'navbar'
                ? 'text-[1.12rem] tracking-[0.015em] sm:text-[1.2rem]'
                : 'text-lg tracking-[0.015em]',
            )}
            style={{
              fontFamily:
                '"Space Grotesk", "Inter Tight", "Segoe UI Variable Display", Inter, system-ui, sans-serif',
            }}
          >
            Devign
          </span>
          <span
            className={cn(
              'mt-0.5 font-normal text-white/60 transition-colors duration-300 group-hover:text-white/72',
              variant === 'navbar'
                ? 'text-[0.72rem] tracking-[0.035em] sm:text-[0.76rem]'
                : 'text-sm tracking-[0.035em]',
            )}
            style={{
              fontFamily:
                '"Inter Tight", "Space Grotesk", "Segoe UI Variable Display", Inter, system-ui, sans-serif',
            }}
          >
            Studio
          </span>
        </span>
      </span>
    );

  const classes = cn(
    'group inline-flex items-center transition-all duration-300 hover:opacity-100',
    variant === 'deck' && 'justify-center',
    className,
  );

  if (!to) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link
      to={to}
      className={classes}
      aria-label="Devign Studio - início"
    >
      {content}
    </Link>
  );
}
