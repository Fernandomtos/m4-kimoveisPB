import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.date().nullish(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userSchemaResponse = userSchema.omit({ password: true });

const usersSchemaResponse = z.array(userSchemaResponse);

const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
  admin: true,
});

const userSchemaUpdateRequest = userSchemaRequest
  .partial()
  .omit({ admin: true });

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userLoginSchema,
  usersSchemaResponse,
  userSchemaUpdateRequest,
};
