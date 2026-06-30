import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '../ui/LocaleLink';
import { DevignLogo } from '../brand/DevignLogo';
import { useServices, useRoutes } from '../../hooks/useContent';

export function Footer() {
  const { t } = useTranslation('common');
  const services = useServices();
  const routes = useRoutes();

  const quickLinks = [
    { label: t('footer.quickLinks.projects'), to: routes.projects },
    { label: t('footer.quickLinks.process'), to: routes.process },
    { label: t('footer.quickLinks.about'), to: routes.about },
    { label: t('footer.quickLinks.budget'), to: routes.budget },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#06060b]">
      <div className="container-premium py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <DevignLogo variant="footer" />
            <p className="mt-1 text-sm text-muted">{t('footer.tagline')}</p>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted">{t('footer.description')}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-frost">{t('footer.services')}</h3>
            <div className="mt-5 grid gap-3">
              {services.slice(0, 5).map((service) => (
                <Link key={service.key} to={service.path} className="text-sm text-muted transition hover:text-frost">
                  {service.menuTitle}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-frost">{t('footer.navigation')}</h3>
            <div className="mt-5 grid gap-3">
              {quickLinks.map((item) => (
                <Link key={item.label} to={item.to} className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-frost">
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} Devign Studio. {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/devignstudio2026/" target="_blank" rel="noopener noreferrer" className="transition hover:text-frost">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
