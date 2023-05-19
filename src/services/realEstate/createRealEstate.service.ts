import { Repository } from "typeorm";
import {
  TRealEstateRequest,
  TRealEstateRequestWithoutAddress,
} from "../../interfaces/realEstate.interface";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";

const createRealEstateService = async (
  realEstateData: TRealEstateRequest
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOneBy({
    id: realEstateData.categoryId,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const addressData = realEstateData.address;
  delete realEstateData.address;

  const realEstateWithoutAddress: TRealEstateRequestWithoutAddress =
    realEstateData;

  const newAddress: Address = addressRepository.create({
    ...addressData,
  });
  await addressRepository.save(newAddress);

  const newRealEstate: RealEstate = realEstateRepository.create({
    address: newAddress,
    ...realEstateWithoutAddress,
    category,
  });

  await realEstateRepository.save(newRealEstate);

  return newRealEstate;
};

export default createRealEstateService;
