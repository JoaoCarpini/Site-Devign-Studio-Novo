import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLangPrefix, type Lang } from '../../i18n';

export function localizePath(path: string, lang: Lang): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }

  const prefix = getLangPrefix(lang);
  if (!prefix) return path;
  if (path === '/') return prefix;
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;

  return `${prefix}${path}`;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...props }, ref) {
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const target = typeof to === 'string' ? localizePath(to, lang) : to;

  return <RouterLink ref={ref} to={target} {...props} />;
});
