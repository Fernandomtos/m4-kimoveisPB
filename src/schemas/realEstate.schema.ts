import { optional, z } from "zod";

const realEstateSchema = z.object({
  id: z.number(),
  value: z.number().or(z.string()),
  size: z.number().positive().int(),
  categoryId: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateSchemaResponse = z.array(realEstateSchema);

const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressSchemaRequest = addressSchema.omit({ id: true });

const realEstateSchemaRequestWithoutAddress = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

const realEstateSchemaRequest = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: optional(addressSchemaRequest),
  });

const realEstateSchemaValidBody = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: addressSchemaRequest,
  });

export {
  realEstateSchema,
  realEstateSchemaRequest,
  realEstateSchemaRequestWithoutAddress,
  addressSchema,
  addressSchemaRequest,
  realEstateSchemaValidBody,
  realEstateSchemaResponse,
};
