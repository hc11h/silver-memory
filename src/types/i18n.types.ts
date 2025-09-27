export interface LocalizedRequest extends Request {
  locale: string;
  translate: (phrase: string, ...args: any[]) => string;
  translateN: (singular: string, plural: string, count: number, ...args: any[]) => string;
}
