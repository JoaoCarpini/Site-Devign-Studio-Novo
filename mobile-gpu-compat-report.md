# Relatorio temporario: compatibilidade GPU mobile

Escopo do teste: telas abaixo de `1024px`.

## Modo extremo aplicado

- `MOBILE_LAYOUT_QUERY` e `REDUCE_MOTION_QUERY` agora entram em `(max-width: 1023px), (pointer: coarse)`.
- `EXTREME_MOBILE_COMPAT_QUERY` foi adicionado para desligar wrappers globais em `(max-width: 1023px)`.
- `App` nao monta `AnimatePresence` abaixo de `1024px`.
- `PageTransition` e `Reveal` retornam HTML estatico abaixo de `1024px`.
- `PremiumLoader`, `Header`, `FaqAccordion`, `HeroMockup`, `TeamSection` e `BudgetWizard` usam HTML estatico no caminho mobile/reduce.
- `TechCloud` continua substituido por `StaticTechGrid` no mobile da pagina Sobre.
- `index.css` zera abaixo de `1024px`: `animation`, `transform`, `translate`, `rotate`, `scale`, `perspective`, `filter`, `backdrop-filter`, `mix-blend-mode`, `will-change`, `mask` e `-webkit-mask`.

## Componentes/arquivos que ainda contem termos GPU/Motion no codigo

Estes itens ainda aparecem no codigo-fonte. Em varios casos eles estao apenas no caminho desktop ou sao neutralizados pelo CSS mobile extremo.

| Arquivo | Termos encontrados |
| --- | --- |
| src/App.tsx | Framer Motion |
| src/components/animations/PageTransition.tsx | Framer Motion |
| src/components/animations/Reveal.tsx | Framer Motion |
| src/components/backgrounds/AuroraBackground.tsx | transform, blur |
| src/components/brand/HeroBrandBackdrop.tsx | Framer Motion, transform, blur |
| src/components/brand/PremiumLoader.tsx | Framer Motion, transform, blur |
| src/components/cards/ProjectCard.tsx | transform, blur, backdrop-filter |
| src/components/cards/ProjectShowcaseCard.tsx | blur |
| src/components/cards/ServiceCard.tsx | transform |
| src/components/forms/BudgetWizard.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/layout/Header.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/sections/CinematicHero.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/sections/ContactPresence.tsx | transform, blur, backdrop-filter |
| src/components/sections/EngineeringCapabilities.tsx | transform, blur, backdrop-filter |
| src/components/sections/FaqAccordion.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/sections/HeroMockup.tsx | Framer Motion, transform |
| src/components/sections/MobileHomeExperience.tsx | transform |
| src/components/sections/ProcessTimeline.tsx | blur, backdrop-filter |
| src/components/sections/ProjectShowcase.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/sections/ServicesMarquee.tsx | transform |
| src/components/sections/TeamSection.tsx | Framer Motion, transform, blur, backdrop-filter |
| src/components/sections/TechCloud.tsx | transform, blur, backdrop-filter |
| src/components/service-pages/ServiceDetailPage.tsx | transform, blur, backdrop-filter |
| src/components/ui/Button.tsx | transform, blur, backdrop-filter |
| src/index.css | transform, translate3d, perspective, blur, backdrop-filter |
| src/pages/About.tsx | transform, blur, backdrop-filter |
| src/pages/Budget.tsx | transform, blur, backdrop-filter |
| src/pages/Contact.tsx | blur, backdrop-filter |
| src/pages/Home.tsx | transform |
| src/pages/Process.tsx | transform, blur, backdrop-filter |
| src/pages/Projects.tsx | transform, blur, backdrop-filter |
| src/pages/Services.tsx | transform, blur, backdrop-filter |

## Verificacao

`npm.cmd run build` passou.
