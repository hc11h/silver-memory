import { format, differenceInDays, addDays, subDays, parseISO } from 'date-fns';

export const formatDate = (date: Date | string, pattern = 'yyyy-MM-dd'): string => {
  return format(typeof date === 'string' ? parseISO(date) : date, pattern);
};

export const daysBetween = (start: Date | string, end: Date | string): number => {
  return differenceInDays(new Date(end), new Date(start));
};

export const addDaysToDate = (date: Date | string, days: number): Date => {
  return addDays(new Date(date), days);
};

export const subtractDaysFromDate = (date: Date | string, days: number): Date => {
  return subDays(new Date(date), days);
};
