import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { brandAssets } from '../../config/brand';
import { BrandSymbol } from './BrandSymbol';

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
          variant === 'navbar' ? 'gap-4' : 'gap-3.5',
        )}
      >
        {/* Símbolo */}
        <div
          className={cn(
            'relative transition duration-500 group-hover:scale-[1.03]',
            variant === 'navbar'
              ? 'drop-shadow-[0_0_14px_rgba(139,92,246,0.18)]'
              : 'drop-shadow-[0_0_10px_rgba(139,92,246,0.12)]',
          )}
        >
          <BrandSymbol
            size={variant === 'navbar' ? 'md' : 'sm'}
            glow="none"
          />
        </div>

        {/* Texto */}
        <span className="leading-none">
          <span
            className={cn(
              'block font-semibold uppercase text-frost transition-colors duration-300',
              variant === 'navbar'
                ? 'text-[1.08rem] tracking-[0.045em]'
                : 'text-sm tracking-[0.08em]',
            )}
            style={{
              fontFamily:
                '"Space Grotesk", "Inter Tight", Inter, sans-serif',
            }}
          >
            DEVIGN
          </span>

          {variant !== 'navbar' && (
            <span
              className="mt-1 block text-xs italic tracking-[0.06em] text-muted/80"
              style={{
                fontFamily:
                  '"Cormorant Garamond", Georgia, serif',
              }}
            >
              Studio
            </span>
          )}
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
      aria-label="Devign Studio — início"
    >
      {content}
    </Link>
  );
}