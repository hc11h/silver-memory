// import { LocalizedRequest } from '@/types/i18n.types';
// import { Response, NextFunction } from 'express';
// import { init } from 'i18n';

// export const i18nMiddleware = (req: LocalizedRequest, res: Response, next: NextFunction): void => {
//   // Initialize i18n for this request
//   init(req, res);

//   // Detect language from multiple sources (priority order)
//   const acceptLanguage = req.get('Accept-Language');
//   const queryLang = req.query.lang as string;
//   const headerLang = req.get('X-Language') as string;

//   let detectedLocale = 'en'; // default

//   // Priority: query param > custom header > accept-language header
//   if (queryLang && ['en', 'es'].includes(queryLang)) {
//     detectedLocale = queryLang;
//   } else if (headerLang && ['en', 'es'].includes(headerLang)) {
//     detectedLocale = headerLang;
//   } else if (acceptLanguage) {
//     // Parse Accept-Language header
//     const preferredLang = acceptLanguage.split(',')[0].split(';')[0].split('-')[0].toLowerCase();

//     if (['en', 'es'].includes(preferredLang)) {
//       detectedLocale = preferredLang;
//     }
//   }

//   // Set locale for this request
//   req.setLocale(detectedLocale);
//   req.locale = detectedLocale;

//   // Add convenience methods
//   req.translate = (phrase: string, ...args: any[]) => req.__(phrase, ...args);
//   req.translateN = (singular: string, plural: string, count: number, ...args: any[]) =>
//     req.__n(singular, plural, count, ...args);

//   // Set response header
//   res.set('Content-Language', detectedLocale);

//   next();
// };
