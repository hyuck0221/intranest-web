import { applyLanguage, toggleLanguage } from './common.js';
applyLanguage();
document.querySelector('[data-language-toggle]')?.addEventListener('click', toggleLanguage);
