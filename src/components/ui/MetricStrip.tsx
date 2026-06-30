import { useProofPoints } from '../../hooks/useContent';
import { Reveal } from '../animations/Reveal';

export function MetricStrip() {
  const proofPoints = useProofPoints();

  return (
    <Reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {proofPoints.map((item) => (
        <div key={item.label} className="glass-panel rounded-2xl px-5 py-5">
          <strong className="block text-2xl font-semibold tracking-normal text-frost">{item.value}</strong>
          <span className="mt-1 block text-sm text-muted">{item.label}</span>
        </div>
      ))}
    </Reveal>
  );
}
