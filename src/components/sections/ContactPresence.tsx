import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import { cn } from '../../utils/cn';

const contactItems = [
  {
    label: 'Email',
    value: 'contato.devignstudio@outlook.com',
    href: 'mailto:contato.devignstudio@outlook.com',
    icon: Mail,
  },
  {
    label: 'Telefone',
    value: '+55 (19) 99226-6955',
    href: 'https://wa.me/5519992266955',
    icon: Phone,
  },
  {
    label: 'Localização',
    value: 'Porto Ferreira, SP - Brasil',
    icon: MapPin,
  },
];

export function ContactPresence() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#06060b] py-14 sm:py-24">
      <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-premium-line opacity-70" />
      <div aria-hidden="true" className="absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-[100px] sm:h-72 sm:w-72 sm:bg-violet-500/[0.09]" />
      <div aria-hidden="true" className="absolute -right-28 bottom-0 hidden h-72 w-72 rounded-full bg-signal/[0.045] blur-[120px] sm:block" />

      <div className="container-premium relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-5">Contato institucional</span>
          <h2 className="heading-md text-balance">Presença real para conversas com contexto.</h2>
          <p className="body-lead mx-auto mt-4 max-w-2xl">
            Canais diretos para iniciar uma conversa estratégica com a Devign Studio.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/0 blur-3xl transition duration-700 group-hover:bg-violet-500/[0.16]" />
                <div className="relative flex items-start justify-between gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-violet-400/25 bg-violet-500/[0.12] text-violet-300 shadow-[0_0_52px_rgba(141,92,255,0.13)] transition duration-500 group-hover:border-violet-300/40 group-hover:bg-violet-500/[0.16] group-hover:text-frost">
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.href ? <ArrowUpRight className="h-4 w-4 text-white/25 transition duration-500 group-hover:text-violet-200" /> : null}
                </div>
                <div className="relative mt-8">
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-muted">{item.label}</span>
                  <strong className="mt-3 block text-lg font-semibold leading-snug tracking-normal text-frost sm:text-xl">
                    {item.value}
                  </strong>
                </div>
              </>
            );

            const className = cn(
              'group relative block h-full overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/[0.052] p-5 text-left shadow-[0_20px_70px_rgba(5,5,9,0.28)] backdrop-blur-2xl transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/[0.075] hover:shadow-[0_30px_100px_rgba(141,92,255,0.16)] sm:rounded-[1.55rem] sm:p-6',
              !item.href && 'cursor-default',
            );

            return (
              <Reveal key={item.label} delay={index * 0.05}>
                {item.href ? (
                  <a className={className} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                    {content}
                  </a>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
