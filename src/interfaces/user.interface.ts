import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaUpdateRequest,
  usersSchemaResponse,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUsersResponse = z.infer<typeof usersSchemaResponse>;
type TUserUpdateRequest = DeepPartial<TUserRequest>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUsersResponse,
  TUserUpdateRequest,
};
