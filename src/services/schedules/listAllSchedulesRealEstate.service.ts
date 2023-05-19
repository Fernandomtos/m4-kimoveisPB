import { Repository } from "typeorm";
import { RealEstate, Schedule } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";

const listAllSchedulesRealEstateService = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: RealEstate | null =
    await realEstateRepository.findOneBy({
      id: realEstateId,
    });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realEstate")
    .innerJoinAndSelect("realEstate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .innerJoinAndSelect("realEstate.address", "address")
    .innerJoinAndSelect("realEstate.category", "category")
    .where("realEstate.id = :realEstateId", { realEstateId })
    .getOne();

  return realEstate!;
};

export default listAllSchedulesRealEstateService;
