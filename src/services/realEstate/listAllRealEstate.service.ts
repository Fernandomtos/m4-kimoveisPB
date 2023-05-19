import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";

const listAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate[] | null = await realEstateRepository
    .createQueryBuilder("real_estate")
    .innerJoinAndSelect("real_estate.address", "address")
    .getMany();

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};

export default listAllRealEstateService;
