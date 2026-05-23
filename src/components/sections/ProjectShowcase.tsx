import { ArrowRight } from 'lucide-react';
import { projects } from '../../data/site';
import { ButtonLink } from '../ui/Button';
import { SectionIntro } from '../ui/SectionIntro';
import { ProjectShowcaseCard } from '../cards/ProjectShowcaseCard';

export function ProjectShowcase({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section-band">
      <div className="container-premium">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Showcase"
            title="Cases que parecem produto porque foram pensados como produto."
            text="Projetos com contexto de negócio, arquitetura técnica, stack moderna, funcionalidades reais e visual de software premium."
          />
          <ButtonLink to="/projetos" className="w-fit shadow-glow">
            Ver Portfólio Completo
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-8">
          {(compact ? projects.slice(0, 4) : projects).map((project, index) => (
            <ProjectShowcaseCard key={project.slug} project={project} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
