import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getLangFromPath,
  getLangPrefix,
  getRoutePath,
  getServicePath,
  LANG_STORAGE_KEY,
  SERVICE_KEYS,
  SUPPORTED_LANGS,
  type Lang,
  type RouteKey,
} from '../../i18n';
import { cn } from '../../utils/cn';

const ROUTE_KEYS: RouteKey[] = ['home', 'services', 'projects', 'process', 'about', 'budget'];

function getEquivalentPath(pathname: string, targetLang: Lang): string {
  const currentLang = getLangFromPath(pathname);
  const currentPrefix = getLangPrefix(currentLang);
  const strippedPath = (currentPrefix ? pathname.slice(currentPrefix.length) : pathname) || '/';
  const targetPrefix = getLangPrefix(targetLang);

  for (const key of ROUTE_KEYS) {
    const currentPath = getRoutePath(currentLang, key);
    if (strippedPath === currentPath) {
      const targetPath = getRoutePath(targetLang, key);
      return targetPrefix + (targetPath === '/' && targetPrefix ? '' : targetPath);
    }
  }

  for (const key of SERVICE_KEYS) {
    const currentServicePath = getServicePath(currentLang, key);
    if (strippedPath === currentServicePath) {
      const targetServicePath = getServicePath(targetLang, key);
      return targetPrefix + targetServicePath;
    }
  }

  return targetPrefix || '/';
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('common');
  const currentLang = getLangFromPath(location.pathname) as Lang;

  const switchLang = (targetLang: Lang) => {
    if (targetLang === currentLang) return;
    const targetPath = getEquivalentPath(location.pathname, targetLang);
    localStorage.setItem(LANG_STORAGE_KEY, targetLang);
    navigate(targetPath);
  };

  return (
    <div className={cn('flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.03] p-0.5', className)}>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => switchLang(lang)}
          aria-label={t(`lang.${lang}`)}
          className={cn(
            'rounded-lg px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition duration-300',
            lang === currentLang
              ? 'bg-white/[0.09] text-frost shadow-[0_4px_12px_rgba(0,0,0,0.12)]'
              : 'text-muted hover:text-mist',
          )}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
