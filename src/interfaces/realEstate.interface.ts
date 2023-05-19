import { z } from "zod";
import {
  addressSchemaRequest,
  realEstateSchema,
  realEstateSchemaRequest,
  realEstateSchemaRequestWithoutAddress,
  realEstateSchemaResponse,
} from "../schemas/realEstate.schema";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;
type TRealEstateRequestWithoutAddress = z.infer<
  typeof realEstateSchemaRequestWithoutAddress
>;
type TAddressRequest = z.infer<typeof addressSchemaRequest>;

type TRealEstateResponse = z.infer<typeof realEstateSchemaResponse>;

export {
  TRealEstate,
  TRealEstateRequest,
  TRealEstateRequestWithoutAddress,
  TAddressRequest,
  TRealEstateResponse,
};
