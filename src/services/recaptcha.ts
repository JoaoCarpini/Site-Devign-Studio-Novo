let recaptchaScriptPromise: Promise<void> | null = null;

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) return Promise.resolve();
  if (recaptchaScriptPromise) return recaptchaScriptPromise;

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Não foi possível carregar a verificação anti-spam.'));
    document.head.appendChild(script);
  });

  return recaptchaScriptPromise;
}

export async function executeRecaptcha(action: string) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (!siteKey) return undefined;

  await loadRecaptcha(siteKey);

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(siteKey, { action })
        .then(resolve)
        .catch(() => reject(new Error('A verificação anti-spam falhou. Tente novamente.')));
    });
  });
}
