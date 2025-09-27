import { configure } from 'i18n';
import path from 'path';
import env from './env';

const i18nConfig = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '../locales'),
  objectNotation: true,
  updateFiles: false, // Don't update files in production
  api: {
    __: 'translate',
    __n: 'translateN',
  },
  register: global,
  fallbacks: {
    es: 'en',
  },
  retryInDefaultLocale: true,
  syncFiles: env.env !== 'production',
  autoReload: env.env === 'development',
  extension: '.json',
};

configure(i18nConfig);

export default i18nConfig;
