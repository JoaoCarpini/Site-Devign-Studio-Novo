import { cn } from '../../utils/cn';
import { useAndroidCompatibility, useIsMobile } from '../../hooks/useMediaQuery';

const serviceHighlights = [
  {
    title: 'LANDING PAGES',
    description: 'Páginas rápidas, modernas e focadas em conversão.',
  },
  {
    title: 'AUTOMAÇÕES',
    description: 'Elimine tarefas repetitivas e aumente a produtividade.',
  },
  {
    title: 'SISTEMAS WEB',
    description: 'Soluções personalizadas para empresas e operações.',
  },
  {
    title: 'INTELIGÊNCIA ARTIFICIAL',
    description: 'Automação inteligente, análise e atendimento com IA.',
  },
  {
    title: 'INTEGRAÇÕES',
    description: 'Conecte sistemas, APIs e plataformas.',
  },
  {
    title: 'APIs',
    description: 'Desenvolvimento e integração de APIs modernas.',
  },
  {
    title: 'DASHBOARDS',
    description: 'Visualização de dados e indicadores estratégicos.',
  },
  {
    title: 'BRANDING DIGITAL',
    description: 'Fortaleça sua presença digital e identidade visual.',
  },
  {
    title: 'PORTAIS CORPORATIVOS',
    description: 'Plataformas internas e externas para empresas.',
  },
  {
    title: 'APLICAÇÕES PERSONALIZADAS',
    description: 'Soluções desenvolvidas sob medida.',
  },
];

export function ServicesMarquee() {
  const isMobile = useIsMobile();
  const androidCompatibility = useAndroidCompatibility();
  const visibleHighlights = isMobile ? serviceHighlights : [...serviceHighlights, ...serviceHighlights];

  return (
    <section className="section-band bg-[#07070f]">
      <div className="container-premium">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-lg text-frost">O QUE DESENVOLVEMOS</h2>
          <p className="body-lead mx-auto mt-6 max-w-3xl text-mist">
            Soluções digitais criadas para impulsionar negócios através de tecnologia, automação e inovação.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#080a14]/80 px-3 py-4 shadow-[0_0_44px_rgba(5,5,9,0.18)] sm:mt-12 sm:rounded-[2rem] sm:px-5 sm:py-6 sm:shadow-[0_0_80px_rgba(5,5,9,0.18)]">
          <div className="marquee-wrap relative overflow-hidden">
            <div className={isMobile ? 'flex max-w-full snap-x gap-3 overflow-x-auto py-1' : cn('marquee-track', androidCompatibility && 'android-static')}>
              <div className={isMobile ? 'contents' : 'marquee-group flex gap-6 py-2'}>
                {visibleHighlights.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className="marquee-item min-w-[min(15.5rem,calc(100vw-4.5rem))] snap-start rounded-[1.15rem] border border-violet-400/10 bg-[#0d1020]/80 px-4 py-5 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.04] sm:min-w-[20rem] sm:rounded-[1.8rem] sm:px-6 sm:py-6"
                  >
                    <p className="break-words text-xs font-semibold uppercase tracking-[0.14em] text-violet-300 sm:text-sm sm:tracking-[0.28em]">{item.title}</p>
                    <p className="mt-3 text-sm leading-6 text-mist sm:mt-4 sm:leading-7">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
