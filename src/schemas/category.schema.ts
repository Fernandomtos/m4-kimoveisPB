import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categorySchemaRequest = categorySchema.omit({ id: true });

const categorySchemaResponse = categorySchema.extend({});

const categoriesSchemaResponse = z.array(categorySchemaResponse);

export {
  categorySchema,
  categorySchemaRequest,
  categorySchemaResponse,
  categoriesSchemaResponse,
};
