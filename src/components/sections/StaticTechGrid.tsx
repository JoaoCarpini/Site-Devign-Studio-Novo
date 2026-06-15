const technologies = [
  { name: 'React', layer: 'Interfaces' },
  { name: 'TypeScript', layer: 'Contratos' },
  { name: 'APIs', layer: 'Integracao' },
  { name: 'Python', layer: 'Automacao' },
  { name: 'PostgreSQL', layer: 'Dados' },
  { name: 'IA', layer: 'Inteligencia' },
  { name: 'GitHub', layer: 'Versionamento' },
  { name: 'Vercel', layer: 'Deploy' },
];

export function StaticTechGrid() {
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
