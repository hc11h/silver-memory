---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/interface/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.types.ts
---

export interface I<%= h.inflection.transform(name, ['properCase']) %> {
  id: string;
  name: string;
}