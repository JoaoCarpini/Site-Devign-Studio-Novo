import { Link } from '../ui/LocaleLink';
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
          variant === 'navbar' ? 'gap-1.5 sm:gap-2.5' : 'gap-3',
        )}
      >
        <img
          src={brandAssets.horizontalLockup}
          alt=""
          aria-hidden="true"
          className={cn(
            'shrink-0 object-contain transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-95',
            variant === 'navbar' ? 'h-[1.85rem] w-[1.85rem] sm:h-8 sm:w-8' : 'h-10 w-10',
          )}
          loading="eager"
          decoding="async"
        />
        <span className="flex flex-col justify-center leading-[1.15]">
          <span
            className={cn(
              'font-bold text-frost transition-colors duration-300',
              variant === 'navbar'
                ? 'text-[0.98rem] tracking-[0.01em] sm:text-[1.125rem]'
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
              'font-normal text-white/60 transition-colors duration-300 group-hover:text-white/72',
              variant === 'navbar'
                ? 'text-[0.66rem] tracking-[0.03em] sm:text-[0.75rem] sm:tracking-[0.034em]'
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
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
