const DEVIGN_WHATSAPP_NUMBER = '5519992266955';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_TIME = 2500;
const MAX_DESCRIPTION_LENGTH = 4000;

const rateLimitStore = new Map();

const allowedProjectTypes = new Set([
  'Website Institucional',
  'Sistema Web',
  'Dashboard',
  'API',
  'Automação',
  'IA',
  'Landing Page',
  'Identidade Visual Digital',
  'Presença Digital Estratégica',
  'Branding para Empresas',
  'Estrutura Visual para Redes Sociais',
  'Outro',
]);

const allowedObjectives = new Set([
  'Captar clientes',
  'Automatizar processos',
  'Modernizar empresa',
  'Melhorar presença digital',
  'Escalar operação',
]);

const allowedBudgets = new Set([
  'R$500 — R$1.500',
  'R$1.500 — R$5.000',
  'R$5.000 — R$15.000',
  'R$15.000+',
]);

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      code: 'METHOD_NOT_ALLOWED',
      message: 'Método não permitido.',
    });
  }

  try {
    console.log('BRIEFING POST RECEBIDO');

    const body = parseBody(req.body);
    const briefing = normalizeBriefing(body.briefing || body);
    const ip = getClientIp(req);

    const spamResult = validateAntiSpam(briefing, body, ip);

    if (!spamResult.ok) {
      return res.status(spamResult.status).json({
        ok: false,
        code: spamResult.code,
        message: spamResult.message,
      });
    }

    const payloadValidation = validateBriefingPayload(briefing);

    if (!payloadValidation.ok) {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_BRIEFING',
        message: payloadValidation.message,
        details: payloadValidation.details,
      });
    }

    // VALIDACAO DE EMAIL SIMPLIFICADA
    const emailDecision = {
      accepted: true,
      publicResult: {
        deliverability: 'UNKNOWN',
        qualityScore: 1,
        riskScore: 0,
        checks: {},
      },
    };

    const emailResult = await sendBriefingEmail(
      briefing,
      emailDecision.publicResult,
    );

    console.log('BRIEFING EMAIL ENVIADO:', emailResult.id);

    const whatsappUrl = buildWhatsAppUrl(briefing);

    console.log('BRIEFING RESPONSE 200');

    return res.status(200).json({
      ok: true,
      whatsappUrl,
      emailId: emailResult.id,
      emailValidation: emailDecision.publicResult,
    });
  } catch (error) {
    console.error('BRIEFING ERROR:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Erro desconhecido.';

    const isSetupError =
      message.includes('WEB3FORMS');

    return res.status(isSetupError ? 500 : 502).json({
      ok: false,
      code: isSetupError
        ? 'SERVER_SETUP_REQUIRED'
        : 'BRIEFING_DELIVERY_FAILED',

      message: isSetupError
        ? 'A integração de envio ainda precisa ser configurada no servidor.'
        : 'Não foi possível concluir o envio agora. Tente novamente em instantes.',
    });
  }
}

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Referrer-Policy',
    'strict-origin-when-cross-origin',
  );
}

function parseBody(body) {
  if (!body) return {};

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

function normalizeBriefing(raw) {
  return {
    projectType: clean(raw.projectType, 80),
    objective: clean(raw.objective, 80),
    budget: clean(raw.budget, 40),
    timeline: clean(raw.timeline, 80),

    features: normalizeList(raw.features, 14, 80),

    integrations: normalizeList(
      raw.integrations,
      14,
      80,
    ),

    name: clean(raw.name, 120),
    company: clean(raw.company, 140),

    email: clean(raw.email, 180).toLowerCase(),

    phone: clean(raw.phone, 40),

    description: clean(
      raw.description,
      MAX_DESCRIPTION_LENGTH,
    ),

    startedAt: Number(raw.startedAt || 0),

    website: clean(raw.website, 160),
  };
}

function clean(value, maxLength) {
  return String(value || '')
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, maxLength);
}

function normalizeList(value, maxItems, maxLength) {
  if (Array.isArray(value)) {
    return value
      .map((item) => clean(item, maxLength))
      .filter(Boolean)
      .slice(0, maxItems);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => clean(item, maxLength))
      .filter(Boolean)
      .slice(0, maxItems);
  }

  return [];
}

function validateBriefingPayload(briefing) {
  const missing = [];

  const requiredFields = [
    'projectType',
    'objective',
    'budget',
    'timeline',
    'name',
    'company',
    'email',
    'phone',
    'description',
  ];

  requiredFields.forEach((field) => {
    if (!briefing[field]) missing.push(field);
  });

  if (missing.length) {
    return {
      ok: false,
      message: 'Preencha todos os campos obrigatórios.',
      details: { missing },
    };
  }

  if (!allowedProjectTypes.has(briefing.projectType)) {
    return {
      ok: false,
      message: 'Tipo de projeto inválido.',
      details: { field: 'projectType' },
    };
  }

  if (!allowedObjectives.has(briefing.objective)) {
    return {
      ok: false,
      message: 'Objetivo inválido.',
      details: { field: 'objective' },
    };
  }

  const budget = briefing.budget.toLowerCase().replace(/[^\d]/g, '');

  const validBudget =
    budget.includes('500') ||
    budget.includes('1500') ||
    budget.includes('5000') ||
    budget.includes('15000');

  if (!validBudget) {
    return {
      ok: false,
      message: 'Faixa de orçamento inválida.',
      details: { field: 'budget' },
    };
  }

  if (!briefing.features.length) {
    return {
      ok: false,
      message:
        'Selecione ao menos uma funcionalidade.',
      details: { field: 'features' },
    };
  }

  if (!briefing.integrations.length) {
    return {
      ok: false,
      message:
        'Selecione ao menos uma integração.',
      details: { field: 'integrations' },
    };
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      briefing.email,
    )
  ) {
    return {
      ok: false,
      message: 'Informe um email válido.',
      details: { field: 'email' },
    };
  }

  if (briefing.description.length < 24) {
    return {
      ok: false,
      message:
        'Descreva o projeto com um pouco mais de contexto.',
      details: { field: 'description' },
    };
  }

  return { ok: true };
}

function validateAntiSpam(briefing, body, ip) {
  if (briefing.website || body.website) {
    return {
      ok: false,
      status: 400,
      code: 'SPAM_DETECTED',
      message:
        'Não foi possível processar este envio.',
    };
  }

  if (
    !Number.isFinite(briefing.startedAt) ||
    briefing.startedAt <= 0 ||
    Date.now() - briefing.startedAt <
      MIN_SUBMIT_TIME
  ) {
    return {
      ok: false,
      status: 429,
      code: 'SPAM_TIMING',
      message:
        'Aguarde alguns segundos antes de enviar o briefing.',
    };
  }

  const key = ip || 'unknown';

  const now = Date.now();

  const record = rateLimitStore.get(key) || {
    count: 0,
    resetAt: now + RATE_LIMIT_WINDOW,
  };

  if (record.resetAt < now) {
    record.count = 0;
    record.resetAt = now + RATE_LIMIT_WINDOW;
  }

  record.count += 1;

  rateLimitStore.set(key, record);

  if (record.count > RATE_LIMIT_MAX) {
    return {
      ok: false,
      status: 429,
      code: 'RATE_LIMITED',
      message:
        'Muitas tentativas em sequência. Tente novamente mais tarde.',
    };
  }

  return { ok: true };
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim();
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0];
  }

  return req.socket?.remoteAddress || 'unknown';
}

async function sendBriefingEmail(
  briefing,
  emailValidation,
) {
  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('WEB3FORMS_ACCESS_KEY is required.');
  }

  const subject = `Novo briefing | ${briefing.projectType} | ${briefing.company}`;
  const body = new URLSearchParams({
    access_key: accessKey,
    subject,
    from_name: 'Devign Studio',
    name: briefing.name,
    email: briefing.email,
    phone: briefing.phone,
    company: briefing.company,
    project_type: briefing.projectType,
    objective: briefing.objective,
    budget: briefing.budget,
    timeline: briefing.timeline,
    features: briefing.features.join(', '),
    integrations: briefing.integrations.join(', '),
    description: briefing.description,
    message: buildEmailText(
      briefing,
      emailValidation,
    ),
    botcheck: briefing.website || '',
  });

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },

    body,
  });

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `Web3Forms API error: ${response.status}`,
    );
  }

  return data;
}

function buildEmailHtml(
  briefing,
  emailValidation,
) {
  return `
    <h1>Novo briefing recebido</h1>

    <p><strong>Projeto:</strong> ${briefing.projectType}</p>
    <p><strong>Empresa:</strong> ${briefing.company}</p>
    <p><strong>Nome:</strong> ${briefing.name}</p>
    <p><strong>Email:</strong> ${briefing.email}</p>
    <p><strong>Telefone:</strong> ${briefing.phone}</p>

    <p><strong>Descrição:</strong></p>

    <p>${briefing.description}</p>
  `;
}

function buildEmailText(
  briefing,
  emailValidation,
) {
  return `
Novo briefing recebido

Projeto:
${briefing.projectType}

Empresa:
${briefing.company}

Nome:
${briefing.name}

Email:
${briefing.email}

Telefone:
${briefing.phone}

Descrição:
${briefing.description}
  `;
}

function buildWhatsAppUrl(briefing) {
  return `https://wa.me/${DEVIGN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(briefing),
  )}`;
}

function buildWhatsAppMessage(briefing) {
  return `Olá Devign Studio.

Acabei de enviar um briefing pelo site.

Nome:
${briefing.name}

Empresa:
${briefing.company}

Projeto:
${briefing.projectType}

Objetivo:
${briefing.objective}

Orçamento:
${briefing.budget}

Descrição:
${briefing.description}`;
}
