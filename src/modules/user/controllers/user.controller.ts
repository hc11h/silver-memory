import { Request, Response } from 'express';
import * as UserService from '@/modules/user/service/user.service';
import { sendSuccess, catchAsync } from '@/utils';
import { HTTP_STATUS } from '@/constants';

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendSuccess(res, 'Users fetched', { users }, HTTP_STATUS.OK, 'fetched');
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getUserById(req.params.id);
  sendSuccess(res, 'User fetched', { user }, HTTP_STATUS.OK, 'fetched');
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserService.createUser(req.body);
  sendSuccess(res, 'User created', newUser, HTTP_STATUS.CREATED, 'created');
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await UserService.updateUser(req.params.id, req.body);
  sendSuccess(res, 'User updated', updatedUser, HTTP_STATUS.OK, 'updated');
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id);
  sendSuccess(res, 'User deleted', {}, HTTP_STATUS.OK, 'deleted');
});
