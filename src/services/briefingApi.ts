import type { BriefingApiErrorResponse, BriefingApiResponse, BriefingPayload } from '../types/briefing';

export class BriefingApiError extends Error {
  code: string;
  details?: unknown;

  constructor(response: BriefingApiErrorResponse) {
    super(response.message);
    this.name = 'BriefingApiError';
    this.code = response.code;
    this.details = response.details;
  }
}

export async function submitBriefing(briefing: BriefingPayload, recaptchaToken?: string) {
  const response = await fetch('/api/briefing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      briefing,
      recaptchaToken,
    }),
  });

  const data = (await response.json().catch(() => ({
    ok: false,
    code: 'INVALID_RESPONSE',
    message: 'Não foi possível processar a resposta do servidor.',
  }))) as BriefingApiResponse | BriefingApiErrorResponse;

  if (!response.ok || !data.ok) {
    throw new BriefingApiError(data as BriefingApiErrorResponse);
  }

  return data;
}
