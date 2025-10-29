export const logger = {
  info: (msg: string) => console.log(`ℹ️  [INFO]: ${msg}`),
  error: (msg: string) => console.error(`❌ [ERROR]: ${msg}`),
  warn: (msg: string) => console.warn(`⚠️  [WARN]: ${msg}`),
};
