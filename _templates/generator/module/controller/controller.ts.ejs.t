---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/controller/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.controller.ts
---
import { Request, Response, NextFunction } from "express";
import * as <%= h.inflection.transform(name, ['pascalCase']) %>Service from "@/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/service/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.service";
import { sendSuccess } from "@/utils";
import { HTTP_STATUS } from "@/constants";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await <%= h.inflection.transform(name, ['pascalCase']) %>Service.getAll();
    sendSuccess(res, "Items fetched", { items }, HTTP_STATUS.OK, "fetched");
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await <%= h.inflection.transform(name, ['pascalCase']) %>Service.getById(req.params.id);
    sendSuccess(res, "Item fetched", { item }, HTTP_STATUS.OK, "fetched");
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await <%= h.inflection.transform(name, ['pascalCase']) %>Service.create(req.body);
    sendSuccess(res, "Item created", newItem, HTTP_STATUS.CREATED, "created");
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedItem = await <%= h.inflection.transform(name, ['pascalCase']) %>Service.update(req.params.id, req.body);
    sendSuccess(res, "Item updated", updatedItem, HTTP_STATUS.OK, "updated");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await <%= h.inflection.transform(name, ['pascalCase']) %>Service.remove(req.params.id);
    sendSuccess(res, "Item deleted", {}, HTTP_STATUS.OK, "deleted");
  } catch (err) {
    next(err);
  }
};