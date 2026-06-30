import { useTranslation } from 'react-i18next';
import {
  projectAccent,
  projectSlugs,
  serviceKeys,
  serviceStack,
  type Project,
  type ProjectSlug,
  type Service,
  type ServiceKey,
} from '../data/site';

export function useServices(): Service[] {
  const { t } = useTranslation('services');
  return serviceKeys.map((key) => {
    const data = t(key, { returnObjects: true }) as Omit<Service, 'key' | 'stack'>;
    return { ...data, key, stack: serviceStack[key] };
  });
}

export function useService(key: ServiceKey): Service {
  const { t } = useTranslation('services');
  const data = t(key, { returnObjects: true }) as Omit<Service, 'key' | 'stack'>;
  return { ...data, key, stack: serviceStack[key] };
}

export function useProjects(): Project[] {
  const { t } = useTranslation('projects');
  return projectSlugs.map((slug) => {
    const data = t(slug, { returnObjects: true }) as Omit<Project, 'slug' | 'accent'>;
    return { ...data, slug, accent: projectAccent[slug] };
  });
}

export function useProject(slug: ProjectSlug): Project {
  const { t } = useTranslation('projects');
  const data = t(slug, { returnObjects: true }) as Omit<Project, 'slug' | 'accent'>;
  return { ...data, slug, accent: projectAccent[slug] };
}

export function useProcessSteps(): Array<{ title: string; text: string }> {
  const { t } = useTranslation('process');
  return t('steps', { returnObjects: true }) as Array<{ title: string; text: string }>;
}

export function useProofPoints(): Array<{ label: string; value: string }> {
  const { t } = useTranslation('home');
  return t('proofPoints', { returnObjects: true }) as Array<{ label: string; value: string }>;
}

export type RouteMap = {
  home: string;
  services: string;
  projects: string;
  process: string;
  about: string;
  budget: string;
};

export function useRoutes(): RouteMap {
  const { t } = useTranslation('common');
  return t('routes', { returnObjects: true }) as RouteMap;
}
