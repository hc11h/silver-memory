import { Request, Response, NextFunction } from 'express';
import * as customerService from '@/modules/customer/service/customer.service';
import { sendSuccess } from '@/utils';
import { HTTP_STATUS } from '@/constants';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await customerService.getAll();
    sendSuccess(res, 'Items fetched', { items }, HTTP_STATUS.OK, 'fetched');
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await customerService.getById(req.params.id);
    sendSuccess(res, 'Item fetched', { item }, HTTP_STATUS.OK, 'fetched');
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newItem = await customerService.create(req.body);
    sendSuccess(res, 'Item created', newItem, HTTP_STATUS.CREATED, 'created');
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedItem = await customerService.update(req.params.id, req.body);
    sendSuccess(res, 'Item updated', updatedItem, HTTP_STATUS.OK, 'updated');
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await customerService.remove(req.params.id);
    sendSuccess(res, 'Item deleted', {}, HTTP_STATUS.OK, 'deleted');
  } catch (err) {
    next(err);
  }
};
