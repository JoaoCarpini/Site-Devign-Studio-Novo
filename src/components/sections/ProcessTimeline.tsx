import { processSteps } from '../../data/site';
import { Reveal } from '../animations/Reveal';

export function ProcessTimeline() {
  return (
    <div className="grid gap-4 lg:grid-cols-6">
      {processSteps.map((step, index) => (
        <Reveal key={step.title} delay={index * 0.05} className="relative">
          <div className="h-full rounded-[1.4rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-300 hover:border-violet-400/40 hover:bg-white/[0.08]">
            <span className="text-sm font-semibold text-violet-400">0{index + 1}</span>
            <h3 className="mt-4 text-xl font-semibold tracking-normal text-frost">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
