import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  readRealEstatebyCategoryController,
} from "../controllers/categories.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import { categorySchemaRequest } from "../schemas/category.schema";

const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureDataIsValidMiddlewares(categorySchemaRequest),
  createCategoryController
);

categoryRoutes.get("", listAllCategoriesController);

categoryRoutes.get("/:id/realEstate", readRealEstatebyCategoryController);

export default categoryRoutes;
