const DEVIGN_CONTACT_EMAIL = process.env.DEVIGN_CONTACT_EMAIL || 'contato.devignstudio@outlook.com';
const DEVIGN_WHATSAPP_NUMBER = '5519992266955';
const ABSTRACT_ENDPOINT = 'https://emailvalidation.abstractapi.com/v1/';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
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

const allowedBudgets = new Set(['R$500 — R$1.500', 'R$1.500 — R$5.000', 'R$5.000 — R$15.000', 'R$15.000+']);

const suspiciousLocalParts = new Set(['test', 'teste', 'fake', 'spam', 'asdf', 'qwerty', 'email', 'mail', 'noemail', 'none']);

export default async function handler(req, res) {
  setSecurityHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED', message: 'Método não permitido.' });
  }

  try {
    const body = parseBody(req.body);
    const briefing = normalizeBriefing(body.briefing || body);
    const ip = getClientIp(req);

    const spamResult = validateAntiSpam(briefing, body, ip);
    if (!spamResult.ok) {
      return res.status(spamResult.status).json({ ok: false, code: spamResult.code, message: spamResult.message });
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

    const recaptchaValidation = await verifyRecaptcha(body.recaptchaToken, ip);
    if (!recaptchaValidation.ok) {
      return res.status(403).json({
        ok: false,
        code: 'RECAPTCHA_REJECTED',
        message: 'A verificação anti-spam não foi concluída. Tente novamente.',
      });
    }

    const abstractResult = await validateEmailWithAbstract(briefing.email);
    const emailDecision = decideEmailQuality(briefing.email, abstractResult);

    if (!emailDecision.accepted) {
      return res.status(422).json({
        ok: false,
        code: 'EMAIL_REJECTED',
        message: 'Não conseguimos validar este email. Verifique as informações e tente novamente.',
        details: emailDecision.publicResult,
      });
    }

    const emailResult = await sendBriefingEmail(briefing, emailDecision.publicResult);
    const whatsappUrl = buildWhatsAppUrl(briefing);

    return res.status(200).json({
      ok: true,
      whatsappUrl,
      emailId: emailResult.id,
      emailValidation: emailDecision.publicResult,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';
    const isSetupError = message.includes('API key') || message.includes('RESEND') || message.includes('ABSTRACT');

    return res.status(isSetupError ? 500 : 502).json({
      ok: false,
      code: isSetupError ? 'SERVER_SETUP_REQUIRED' : 'BRIEFING_DELIVERY_FAILED',
      message: isSetupError
        ? 'A integração de envio ainda precisa ser configurada no servidor.'
        : 'Não foi possível concluir o envio agora. Tente novamente em instantes.',
    });
  }
}

function setSecurityHeaders(res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
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
    integrations: normalizeList(raw.integrations, 14, 80),
    name: clean(raw.name, 120),
    company: clean(raw.company, 140),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 40),
    description: clean(raw.description, MAX_DESCRIPTION_LENGTH),
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
    return value.map((item) => clean(item, maxLength)).filter(Boolean).slice(0, maxItems);
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
  const requiredFields = ['projectType', 'objective', 'budget', 'timeline', 'name', 'company', 'email', 'phone', 'description'];

  requiredFields.forEach((field) => {
    if (!briefing[field]) missing.push(field);
  });

  if (missing.length) {
    return { ok: false, message: 'Preencha todos os campos obrigatórios.', details: { missing } };
  }

  if (!allowedProjectTypes.has(briefing.projectType)) {
    return { ok: false, message: 'Tipo de projeto inválido.', details: { field: 'projectType' } };
  }

  if (!allowedObjectives.has(briefing.objective)) {
    return { ok: false, message: 'Objetivo inválido.', details: { field: 'objective' } };
  }

  if (!allowedBudgets.has(briefing.budget)) {
    return { ok: false, message: 'Faixa de orçamento inválida.', details: { field: 'budget' } };
  }

  if (!briefing.features.length) {
    return { ok: false, message: 'Selecione ao menos uma funcionalidade.', details: { field: 'features' } };
  }

  if (!briefing.integrations.length) {
    return { ok: false, message: 'Selecione ao menos uma integração.', details: { field: 'integrations' } };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(briefing.email)) {
    return { ok: false, message: 'Informe um email válido.', details: { field: 'email' } };
  }

  if (briefing.description.length < 24) {
    return { ok: false, message: 'Descreva o projeto com um pouco mais de contexto.', details: { field: 'description' } };
  }

  return { ok: true };
}

function validateAntiSpam(briefing, body, ip) {
  if (briefing.website || body.website) {
    return { ok: false, status: 400, code: 'SPAM_DETECTED', message: 'Não foi possível processar este envio.' };
  }

  if (!Number.isFinite(briefing.startedAt) || briefing.startedAt <= 0 || Date.now() - briefing.startedAt < MIN_SUBMIT_TIME) {
    return { ok: false, status: 429, code: 'SPAM_TIMING', message: 'Aguarde alguns segundos antes de enviar o briefing.' };
  }

  const key = ip || 'unknown';
  const now = Date.now();
  const record = rateLimitStore.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };

  if (record.resetAt < now) {
    record.count = 0;
    record.resetAt = now + RATE_LIMIT_WINDOW;
  }

  record.count += 1;
  rateLimitStore.set(key, record);

  if (record.count > RATE_LIMIT_MAX) {
    return { ok: false, status: 429, code: 'RATE_LIMITED', message: 'Muitas tentativas em sequência. Tente novamente mais tarde.' };
  }

  return { ok: true };
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') return forwardedFor.split(',')[0]?.trim();
  if (Array.isArray(forwardedFor)) return forwardedFor[0];
  return req.socket?.remoteAddress || 'unknown';
}

async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) return { ok: true, skipped: true };

  if (!token) return { ok: false };

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip && ip !== 'unknown') params.set('remoteip', ip);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!response.ok) return { ok: false };

  const data = await response.json();
  const score = Number(data.score ?? 1);
  const actionMatches = !data.action || data.action === 'briefing_submit';

  return { ok: Boolean(data.success && actionMatches && score >= 0.5), score };
}

async function validateEmailWithAbstract(email) {
  const apiKey = process.env.ABSTRACT_API_KEY;

  if (!apiKey) {
    throw new Error('ABSTRACT_API_KEY is required.');
  }

  const params = new URLSearchParams({
    api_key: apiKey,
    email,
    auto_correct: 'false',
  });

  const response = await fetch(`${ABSTRACT_ENDPOINT}?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Abstract API error: ${response.status}`);
  }

  return response.json();
}

function decideEmailQuality(email, abstractResult) {
  const qualityScore = Number(abstractResult.quality_score || 0);
  const riskScore = Math.max(0, Math.min(100, Math.round((1 - qualityScore) * 100)));
  const checks = {
    format: toBoolean(abstractResult.is_valid_format),
    mx: toBoolean(abstractResult.is_mx_found),
    smtp: toBoolean(abstractResult.is_smtp_valid),
    disposable: toBoolean(abstractResult.is_disposable_email),
    catchAll: toBoolean(abstractResult.is_catchall_email),
  };

  const localPart = email.split('@')[0] || '';
  const reasons = [];

  if (!checks.format) reasons.push('invalid_format');
  if (!checks.mx) reasons.push('missing_mx');
  if (!checks.smtp) reasons.push('smtp_invalid');
  if (abstractResult.deliverability !== 'DELIVERABLE') reasons.push('not_deliverable');
  if (checks.disposable) reasons.push('disposable_email');
  if (qualityScore < 0.72) reasons.push('high_risk_score');
  if (checks.catchAll && qualityScore < 0.86) reasons.push('risky_catch_all_domain');
  if (suspiciousLocalParts.has(localPart) && qualityScore < 0.9) reasons.push('suspicious_email_pattern');

  const publicResult = {
    deliverability: abstractResult.deliverability || 'UNKNOWN',
    qualityScore,
    riskScore,
    checks,
  };

  return {
    accepted: reasons.length === 0,
    reasons,
    publicResult,
  };
}

function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (value && typeof value.value === 'boolean') return value.value;
  if (value && typeof value.text === 'string') return value.text.toUpperCase() === 'TRUE';
  return false;
}

async function sendBriefingEmail(briefing, emailValidation) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is required.');
  }

  const from = process.env.RESEND_FROM_EMAIL || 'Devign Studio <onboarding@resend.dev>';
  const subject = `Novo briefing qualificado | ${briefing.projectType} | ${briefing.company}`;

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [DEVIGN_CONTACT_EMAIL],
      reply_to: briefing.email,
      subject,
      html: buildEmailHtml(briefing, emailValidation),
      text: buildEmailText(briefing, emailValidation),
      tags: [
        { name: 'source', value: 'devign_site' },
        { name: 'type', value: 'briefing' },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.status} ${JSON.stringify(data)}`);
  }

  return data;
}

function buildEmailHtml(briefing, emailValidation) {
  const rows = [
    ['Tipo de projeto', briefing.projectType],
    ['Objetivo', briefing.objective],
    ['Faixa de orçamento', briefing.budget],
    ['Prazo', briefing.timeline],
    ['Funcionalidades', briefing.features.join(', ')],
    ['Integrações', briefing.integrations.join(', ')],
    ['Nome', briefing.name],
    ['Empresa', briefing.company],
    ['Email', briefing.email],
    ['Telefone / WhatsApp', briefing.phone],
  ];

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#050509;color:#f7f5ff;font-family:Inter,Arial,sans-serif;">
    <div style="padding:32px;background:radial-gradient(circle at 16% 8%,rgba(141,92,255,.22),transparent 360px),#050509;">
      <div style="max-width:760px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:28px;overflow:hidden;background:rgba(255,255,255,.055);box-shadow:0 32px 110px rgba(5,5,9,.48);">
        <div style="padding:30px 34px;border-bottom:1px solid rgba(255,255,255,.1);">
          <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#a98bff;font-weight:700;">Devign Studio</div>
          <h1 style="margin:14px 0 0;font-size:30px;line-height:1.1;color:#f7f5ff;">Novo briefing qualificado recebido</h1>
          <p style="margin:14px 0 0;color:#d8d3ea;line-height:1.7;">Lead validado via API, pronto para análise estratégica e retorno comercial.</p>
        </div>

        <div style="padding:28px 34px;">
          <div style="display:inline-block;padding:10px 14px;border:1px solid rgba(169,139,255,.32);border-radius:999px;background:rgba(141,92,255,.12);color:#f7f5ff;font-size:13px;font-weight:700;">
            Deliverability: ${escapeHtml(emailValidation.deliverability)} · Risk score: ${emailValidation.riskScore}
          </div>

          <div style="margin-top:24px;border:1px solid rgba(255,255,255,.1);border-radius:22px;overflow:hidden;">
            ${rows
              .map(
                ([label, value]) => `
                  <div style="display:grid;grid-template-columns:190px 1fr;border-bottom:1px solid rgba(255,255,255,.08);">
                    <div style="padding:15px 18px;color:#9b94b7;font-size:12px;letter-spacing:.14em;text-transform:uppercase;background:rgba(5,5,9,.38);">${escapeHtml(label)}</div>
                    <div style="padding:15px 18px;color:#f7f5ff;font-size:14px;line-height:1.6;">${escapeHtml(value)}</div>
                  </div>`,
              )
              .join('')}
          </div>

          <div style="margin-top:24px;padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:rgba(5,5,9,.42);">
            <div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#a98bff;font-weight:700;">Descrição do projeto</div>
            <p style="margin:12px 0 0;color:#d8d3ea;line-height:1.75;">${escapeHtml(briefing.description)}</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function buildEmailText(briefing, emailValidation) {
  return `Devign Studio - Novo briefing qualificado

Tipo de projeto: ${briefing.projectType}
Objetivo: ${briefing.objective}
Faixa de orçamento: ${briefing.budget}
Prazo: ${briefing.timeline}
Funcionalidades: ${briefing.features.join(', ')}
Integrações: ${briefing.integrations.join(', ')}

Nome: ${briefing.name}
Empresa: ${briefing.company}
Email: ${briefing.email}
Telefone / WhatsApp: ${briefing.phone}

Descrição:
${briefing.description}

Validação de email:
Deliverability: ${emailValidation.deliverability}
Quality score: ${emailValidation.qualityScore}
Risk score: ${emailValidation.riskScore}`;
}

function buildWhatsAppUrl(briefing) {
  return `https://wa.me/${DEVIGN_WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(briefing))}`;
}

function buildWhatsAppMessage(briefing) {
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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
