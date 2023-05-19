import { z } from "zod";
import {
  categoriesSchemaResponse,
  categorySchema,
  categorySchemaRequest,
  categorySchemaResponse,
} from "../schemas/category.schema";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryRequest = z.infer<typeof categorySchemaRequest>;
type TCategoryResponse = z.infer<typeof categorySchemaResponse>;
type TCategoriesResponse = z.infer<typeof categoriesSchemaResponse>;

export { TCategory, TCategoryRequest, TCategoryResponse, TCategoriesResponse };
