import { customer } from '../model/customer.model';
import * as db from '@/utils/dbUtils';

export const getById = (id: string) => {
  return db.findById(customer, id, '-password', { lean: true });
};

export const getAll = () => {
  return db.findAll(customer, {}, '-password');
};

export const create = (data: any) => {
  return db.createOne(customer, data);
};

export const update = (id: string, data: any) => {
  return db.updateOne(customer, id, data);
};

export const remove = (id: string) => {
  return db.deleteOne(customer, id);
};
