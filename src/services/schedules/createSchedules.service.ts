import { Repository } from "typeorm";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TScheduleRequest } from "../../interfaces/schedules.interface";
import AppError from "../../error";

const createSchedulesService = async (
  scheduleData: TScheduleRequest,
  userId: number
): Promise<Schedule> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const user: User | null = await userRepository.findOneBy({ id: userId });

  const findScheduleRealEstate: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where(
      "schedule.realEstate = :realEstateData AND schedule.date = :dateData AND schedule.hour = :hourData",
      {
        realEstateData: scheduleData.realEstateId,
        dateData: scheduleData.date,
        hourData: scheduleData.hour,
      }
    )
    .getOne();

  if (findScheduleRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const findScheduleUser: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where(
      "schedule.user = :userId AND schedule.date = :dateData AND schedule.hour = :hourData",
      {
        userId,
        dateData: scheduleData.date,
        hourData: scheduleData.hour,
      }
    )
    .getOne();

  if (findScheduleUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate,
    user: user!,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};

export default createSchedulesService;
