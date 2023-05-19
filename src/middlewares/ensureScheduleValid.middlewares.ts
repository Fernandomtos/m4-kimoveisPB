import { NextFunction, Request, Response } from "express";
import { TScheduleRequest } from "../interfaces/schedules.interface";
import AppError from "../error";

const ensureScheduleValidMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const scheduleData: TScheduleRequest = req.body;

  const hour: string = scheduleData.hour;

  if (!(hour >= "08:00" && hour <= "18:00")) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const dateSchedule = new Date(scheduleData.date);

  const diaDaSemana = dateSchedule.getUTCDay();

  if (!(diaDaSemana >= 1 && diaDaSemana <= 5)) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};

export default ensureScheduleValidMiddlewares;
