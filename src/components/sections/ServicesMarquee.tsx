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
  return (
    <section className="section-band bg-[#07070f]">
      <div className="container-premium">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-lg text-frost">O QUE DESENVOLVEMOS</h2>
          <p className="body-lead mx-auto mt-6 max-w-3xl text-mist">
            Soluções digitais criadas para impulsionar negócios através de tecnologia, automação e inovação.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#080a14]/80 px-3 py-4 shadow-[0_0_80px_rgba(5,5,9,0.18)] sm:px-5 sm:py-6">
          <div className="marquee-wrap relative overflow-hidden">
            <div className="marquee-track">
              <div className="marquee-group flex gap-6 py-2">
                {serviceHighlights.map((item) => (
                  <article
                    key={item.title}
                    className="marquee-item flex-none min-w-[17.5rem] rounded-[1.8rem] border border-violet-400/10 bg-[#0d1020]/80 px-6 py-6 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.04] sm:min-w-[20rem]"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">{item.title}</p>
                    <p className="mt-4 text-sm leading-7 text-mist">{item.description}</p>
                  </article>
                ))}
              </div>
              <div className="marquee-group flex gap-6 py-2" aria-hidden="true">
                {serviceHighlights.map((item) => (
                  <article
                    key={`${item.title}-dup`}
                    className="marquee-item flex-none min-w-[17.5rem] rounded-[1.8rem] border border-violet-400/10 bg-[#0d1020]/80 px-6 py-6 text-left transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.04] sm:min-w-[20rem]"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">{item.title}</p>
                    <p className="mt-4 text-sm leading-7 text-mist">{item.description}</p>
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
