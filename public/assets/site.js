import { applyLanguage, toggleLanguage, t } from './common.js';
applyLanguage();
document.querySelector('[data-language-toggle]')?.addEventListener('click', toggleLanguage);

const copyButton = document.querySelector('#copy-install');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#install-command').textContent.trim());
    const status = document.querySelector('#copy-status');
    status.dataset.i18n = 'guide.copied';
    status.textContent = t('guide.copied');
  } catch {
    const status = document.querySelector('#copy-status');
    status.dataset.i18n = 'guide.copyFailed';
    status.textContent = t('guide.copyFailed');
  }
});
