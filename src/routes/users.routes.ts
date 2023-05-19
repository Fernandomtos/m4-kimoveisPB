import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureEmailExistsMiddlewares from "../middlewares/ensureEmailExists.middlewares";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import {
  userSchemaRequest,
  userSchemaUpdateRequest,
} from "../schemas/user.schema";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureIsOwnerMiddleware from "../middlewares/ensureIsOwner.middlewares";
import ensureIdExistsMiddlewares from "../middlewares/ensureIdExists.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddlewares(userSchemaRequest),
  ensureEmailExistsMiddlewares,
  createUserController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listAllUsersController
);

userRoutes.patch(
  "/:id",
  ensureIdExistsMiddlewares,
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddlewares(userSchemaUpdateRequest),
  ensureIsOwnerMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureIdExistsMiddlewares,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  softDeleteUserController
);

export default userRoutes;
