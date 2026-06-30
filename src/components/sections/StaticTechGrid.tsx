import { useTranslation } from 'react-i18next';

const SKIP_INDEX = 6;

export function StaticTechGrid() {
  const { t } = useTranslation('home');
  const stack = t('mobile.stack', { returnObjects: true }) as Array<{ name: string; layer: string }>;
  const technologies = stack.filter((_, index) => index !== SKIP_INDEX);

  return (
    <div className="grid grid-cols-2 gap-3">
      {technologies.map((technology) => (
        <div
          key={technology.name}
          className="min-w-0 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3"
        >
          <strong className="block break-words text-sm font-semibold tracking-normal text-frost">
            {technology.name}
          </strong>
          <span className="mt-1 block text-xs text-muted">{technology.layer}</span>
        </div>
      ))}
    </div>
  );
}
