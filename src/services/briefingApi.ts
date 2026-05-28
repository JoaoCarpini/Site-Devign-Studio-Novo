import type {
  BriefingApiErrorResponse,
  BriefingApiResponse,
  BriefingPayload,
  EmailValidationResult,
} from '../types/briefing';
import { buildWhatsAppUrl } from './whatsapp';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

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

const emailValidation: EmailValidationResult = {
  deliverability: 'UNKNOWN',
  qualityScore: 1,
  riskScore: 0,
  checks: {
    format: true,
    mx: true,
    smtp: true,
    disposable: false,
    catchAll: false,
  },
};

function buildMessage(briefing: BriefingPayload) {
  return `Novo briefing recebido

Tipo de projeto:
${briefing.projectType}

Objetivo:
${briefing.objective}

Orçamento:
${briefing.budget}

Prazo:
${briefing.timeline}

Funcionalidades:
${briefing.features.join(', ')}

Integrações:
${briefing.integrations.join(', ')}

Nome:
${briefing.name}

Empresa:
${briefing.company}

Email:
${briefing.email}

Telefone:
${briefing.phone}

Descrição:
${briefing.description}`;
}

function buildFormData(briefing: BriefingPayload, accessKey: string) {
  const formData = new FormData();

  formData.append('access_key', accessKey);
  formData.append('subject', `Novo briefing | ${briefing.projectType} | ${briefing.company}`);
  formData.append('from_name', 'Devign Studio');
  formData.append('name', briefing.name);
  formData.append('email', briefing.email);
  formData.append('phone', briefing.phone);
  formData.append('company', briefing.company);
  formData.append('project_type', briefing.projectType);
  formData.append('objective', briefing.objective);
  formData.append('budget', briefing.budget);
  formData.append('timeline', briefing.timeline);
  formData.append('features', briefing.features.join(', '));
  formData.append('integrations', briefing.integrations.join(', '));
  formData.append('description', briefing.description);
  formData.append('message', buildMessage(briefing));
  formData.append('botcheck', briefing.website || '');

  return formData;
}

export async function submitBriefing(
  briefing: BriefingPayload,
): Promise<BriefingApiResponse> {
  console.log('INICIANDO ENVIO DO BRIEFING VIA WEB3FORMS');

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new BriefingApiError({
      ok: false,
      code: 'WEB3FORMS_SETUP_REQUIRED',
      message:
        'A integração de envio ainda precisa ser configurada. Informe VITE_WEB3FORMS_ACCESS_KEY.',
    });
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: buildFormData(briefing, accessKey),
      signal: controller.signal,
    });

    console.log('STATUS DA RESPOSTA WEB3FORMS:', response.status);

    const data = (await response.json().catch(() => ({
      success: false,
      message:
        'Não foi possível processar a resposta do serviço de envio.',
    }))) as Web3FormsResponse;

    console.log('DADOS RECEBIDOS WEB3FORMS:', data);

    if (!response.ok || !data.success) {
      throw new BriefingApiError({
        ok: false,
        code: 'WEB3FORMS_DELIVERY_FAILED',
        message:
          data.message ||
          'Não foi possível concluir o envio agora. Tente novamente em instantes.',
      });
    }

    console.log('BRIEFING ENVIADO COM SUCESSO VIA WEB3FORMS');

    return {
      ok: true,
      whatsappUrl: buildWhatsAppUrl(briefing),
      emailValidation,
    };
  } catch (error) {
    console.error('ERRO COMPLETO NO SUBMIT WEB3FORMS:', error);

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new BriefingApiError({
        ok: false,
        code: 'REQUEST_TIMEOUT',
        message:
          'O serviço de envio demorou para responder. Tente novamente.',
      });
    }

    if (error instanceof BriefingApiError) {
      throw error;
    }

    throw new BriefingApiError({
      ok: false,
      code: 'NETWORK_ERROR',
      message:
        'Não foi possível conectar ao serviço de envio. Verifique sua conexão.',
    });
  } finally {
    clearTimeout(timeout);

    console.log('FINALIZANDO REQUEST DO BRIEFING');
  }
}
