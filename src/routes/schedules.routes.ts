import { Router } from "express";
import {
  createSchedulesControllers,
  listAllSchedulesRealEstateControllers,
} from "../controllers/schedules.controllers";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureDataIsValidMiddlewares from "../middlewares/ensureDataIsValid.middlewares";
import { scheduleSchemaRequest } from "../schemas/schedule.schema";
import ensureScheduleValidMiddlewares from "../middlewares/ensureScheduleValid.middlewares";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middlewares";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddlewares(scheduleSchemaRequest),
  ensureScheduleValidMiddlewares,
  createSchedulesControllers
);

scheduleRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  listAllSchedulesRealEstateControllers
);

export default scheduleRoutes;
