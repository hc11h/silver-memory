import { IUser, User } from '../model/user.model';
import * as db from '@/utils/dbUtils';

export const getUserById = (id: string) => {
  return db.findById<IUser>(User, id, '-password');
};

export const getAllUsers = () => {
  return db.findAll<IUser>(User, {}, '-password');
};

export const createUser = (data: any) => {
  return db.createOne<IUser>(User, data);
};

export const updateUser = (id: string, data: any) => {
  return db.updateOne<IUser>(User, id, data);
};

export const deleteUser = (id: string) => {
  return db.deleteOne<IUser>(User, id);
};
