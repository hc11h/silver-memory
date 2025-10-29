---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/service/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.service.ts

---
import { <%= h.inflection.transform(name, ['pascalCase']) %> } from "../model/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model";
import * as db from "@/utils/dbUtils";

export const getById = (id: string) => {
  return db.findById(<%= h.inflection.transform(name, ['pascalCase']) %>, id, "-password", { lean: true });
};

export const getAll = () => {
  return db.findAll(<%= h.inflection.transform(name, ['pascalCase']) %>, {}, "-password");
};

export const create = (data: any) => {
  return db.createOne(<%= h.inflection.transform(name, ['pascalCase']) %>, data);
};

export const update = (id: string, data: any) => {
  return db.updateOne(<%= h.inflection.transform(name, ['pascalCase']) %>, id, data);
};

export const remove = (id: string) => {
  return db.deleteOne(<%= h.inflection.transform(name, ['pascalCase']) %>, id);
};