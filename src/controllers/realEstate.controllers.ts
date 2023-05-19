import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import { TRealEstateRequest } from "../interfaces/realEstate.interface";
import listAllRealEstateService from "../services/realEstate/listAllRealEstate.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstateRequest = req.body;

  const newRealEstate = await createRealEstateService(realEstateData);
  return res.status(201).json(newRealEstate);
};

const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await listAllRealEstateService();
  return res.status(200).json(realEstate);
};

export { createRealEstateController, listAllRealEstateController };
