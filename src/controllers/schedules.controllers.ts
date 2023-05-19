import { Request, Response } from "express";
import { TScheduleRequest } from "../interfaces/schedules.interface";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listAllSchedulesRealEstateService from "../services/schedules/listAllSchedulesRealEstate.service";

const createSchedulesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleData: TScheduleRequest = req.body;
  const userId: number = parseInt(res.locals.userId);

  const newSchedule = await createSchedulesService(scheduleData, userId);

  return res.status(201).json({ message: "Schedule created" });
};

const listAllSchedulesRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);

  const readSchedule = await listAllSchedulesRealEstateService(realEstateId);

  return res.status(200).json(readSchedule);
};

export { createSchedulesControllers, listAllSchedulesRealEstateControllers };
