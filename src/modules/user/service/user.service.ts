import { User } from '../model/user.model';
import * as db from '@/utils/dbUtils';

export const getUserById = (id: string) => {
  return db.findById(User, id, '-password', { lean: true });
};

export const getAllUsers = () => {
  return db.findAll(User, {}, '-password');
};

export const createUser = (data: any) => {
  return db.createOne(User, data);
};

export const updateUser = (id: string, data: any) => {
  return db.updateOne(User, id, data);
};

export const deleteUser = (id: string) => {
  return db.deleteOne(User, id);
};
