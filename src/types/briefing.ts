export type BriefingPayload = {
  projectType: string;
  objective: string;
  budget: string;
  timeline: string;
  features: string[];
  integrations: string[];
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
  startedAt: number;
  website?: string;
};

export type EmailValidationResult = {
  deliverability: string;
  qualityScore: number;
  riskScore: number;
  checks: {
    format: boolean;
    mx: boolean;
    smtp: boolean;
    disposable: boolean;
    catchAll: boolean;
  };
};

export type BriefingApiResponse = {
  ok: true;
  whatsappUrl: string;
  emailValidation: EmailValidationResult;
};

export type BriefingApiErrorResponse = {
  ok: false;
  code: string;
  message: string;
  details?: unknown;
};
