import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
} from "../interfaces/user.interface";
import listAllUsersService from "../services/users/listAllUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import softDeleteUsersService from "../services/users/softDeleteUsers.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listAllUsersService();

  return res.status(200).json(users);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserUpdateRequest = req.body;
  const userId: number = parseInt(req.params.id);

  const newUser: TUserResponse = await updateUsersService(userData, userId);

  return res.status(200).json(newUser);
};

const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await softDeleteUsersService(userId);

  return res.status(204).send();
};

export {
  createUserController,
  listAllUsersController,
  updateUserController,
  softDeleteUserController,
};
