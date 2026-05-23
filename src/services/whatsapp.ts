import type { BriefingPayload } from '../types/briefing';

export const DEVIGN_WHATSAPP_NUMBER = '5519992266955';

export function buildBriefingWhatsAppMessage(briefing: BriefingPayload) {
  return `Olá, vim pelo site da Devign Studio.

Resumo do briefing:

Tipo de projeto:
${briefing.projectType}

Objetivo:
${briefing.objective}

Faixa de orçamento:
${briefing.budget}

Prazo:
${briefing.timeline}

Funcionalidades:
${briefing.features.join(', ')}

Integrações:
${briefing.integrations.join(', ')}

Dados do cliente:

Nome:
${briefing.name}

Empresa:
${briefing.company}

Email:
${briefing.email}

WhatsApp:
${briefing.phone}

Descrição:
${briefing.description}`;
}

export function buildWhatsAppUrl(briefing: BriefingPayload) {
  return `https://wa.me/${DEVIGN_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBriefingWhatsAppMessage(briefing))}`;
}

export function openWhatsApp(url: string) {
  const popup = window.open(url, '_blank', 'noopener,noreferrer');

  if (!popup) {
    window.location.assign(url);
  }
}
