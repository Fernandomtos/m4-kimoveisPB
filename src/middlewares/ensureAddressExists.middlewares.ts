import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import {
  TAddressRequest,
  TRealEstateRequest,
} from "../interfaces/realEstate.interface";
import AppError from "../error";

const ensureAddressExistsMiddlewares = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Address | void> => {
  const realEstateData: TRealEstateRequest = req.body;

  if (!realEstateData) {
    return next();
  }

  const addressData: TAddressRequest | undefined = realEstateData.address;

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  let numberData: string | null;

  if (addressData?.number) {
    numberData = addressData.number;
  } else {
    return next();
  }

  const findAddress: Address | null = await addressRepository.findOne({
    where: {
      street: addressData!.street,
      number: numberData!,
      city: addressData.city,
      state: addressData.state,
    },
  });

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};

export default ensureAddressExistsMiddlewares;
