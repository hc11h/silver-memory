import { Request, Response, NextFunction } from 'express';
import * as UserService from '@/modules/user/service/user.service';
import { sendSuccess } from '@/utils';
import { HTTP_STATUS } from '@/constants';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserService.getAllUsers();
    sendSuccess(res, 'Users fetched', { users }, HTTP_STATUS.OK, 'fetched');
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    sendSuccess(res, 'User fetched', { user }, HTTP_STATUS.OK, 'fetched');
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.createUser(req.body);
    sendSuccess(res, 'User created', newUser, HTTP_STATUS.CREATED, 'created');
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await UserService.updateUser(req.params.id, req.body);
    sendSuccess(res, 'User updated', updatedUser, HTTP_STATUS.OK, 'updated');
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.deleteUser(req.params.id);
    sendSuccess(res, 'User deleted', {}, HTTP_STATUS.OK, 'deleted');
  } catch (err) {
    next(err);
  }
};
