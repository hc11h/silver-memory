---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/utils/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.util.ts
---
export const format<%= h.inflection.transform(name, ['properCase']) %> = (val: string) => {
  return val.trim().toUpperCase();
};