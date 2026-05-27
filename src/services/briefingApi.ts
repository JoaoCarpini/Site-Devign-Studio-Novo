import type {
  BriefingApiErrorResponse,
  BriefingApiResponse,
  BriefingPayload,
} from '../types/briefing';

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

export async function submitBriefing(
  briefing: BriefingPayload,
  recaptchaToken?: string,
) {
  console.log('INICIANDO ENVIO DO BRIEFING');

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch('/api/briefing', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        briefing,
        recaptchaToken,
      }),

      signal: controller.signal,
    });

    console.log('STATUS DA RESPOSTA:', response.status);

    const data = (await response.json().catch(() => ({
      ok: false,
      code: 'INVALID_RESPONSE',
      message:
        'Não foi possível processar a resposta do servidor.',
    }))) as BriefingApiResponse | BriefingApiErrorResponse;

    console.log('DADOS RECEBIDOS:', data);

    if (!response.ok || !data.ok) {
      console.error('ERRO DA API:', data);

      throw new BriefingApiError(
        data as BriefingApiErrorResponse,
      );
    }

    console.log('BRIEFING ENVIADO COM SUCESSO');

    return data;
  } catch (error) {
    console.error('ERRO COMPLETO NO SUBMIT:', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new BriefingApiError({
        ok: false,
        code: 'REQUEST_TIMEOUT',
        message:
          'O servidor demorou para responder. Tente novamente.',
      });
    }

    if (error instanceof BriefingApiError) {
      throw error;
    }

    throw new BriefingApiError({
      ok: false,
      code: 'NETWORK_ERROR',
      message:
        'Não foi possível conectar ao servidor. Verifique sua conexão.',
    });
  } finally {
    clearTimeout(timeout);

    console.log('FINALIZANDO REQUEST DO BRIEFING');
  }
}