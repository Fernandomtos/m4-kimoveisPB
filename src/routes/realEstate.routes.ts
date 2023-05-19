import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureAddressExistsMiddlewares from "../middlewares/ensureAddressExists.middlewares";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import { realEstateSchemaValidBody } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureDataIsValidMiddlewares(realEstateSchemaValidBody),
  ensureAddressExistsMiddlewares,
  createRealEstateController
);

realEstateRoutes.get("", listAllRealEstateController);

export default realEstateRoutes;
