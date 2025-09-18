---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/index.ts
---
export * from "./model/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model";