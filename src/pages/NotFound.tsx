import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ui/Button';
import { useRoutes } from '../hooks/useContent';

export default function NotFound() {
  const { t } = useTranslation('common');
  const routes = useRoutes();

  return (
    <section className="container-premium flex min-h-[72vh] items-center pt-32">
      <div className="max-w-2xl">
        <span className="eyebrow mb-6">{t('notFound.eyebrow')}</span>
        <h1 className="heading-xl">{t('notFound.title')}</h1>
        <p className="body-lead mt-6">{t('notFound.description')}</p>
        <ButtonLink to={routes.home} className="mt-8">
          <ArrowLeft className="h-4 w-4" />
          {t('notFound.backHome')}
        </ButtonLink>
      </div>
    </section>
  );
}
