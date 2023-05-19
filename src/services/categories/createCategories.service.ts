import { Repository } from "typeorm";
import {
  TCategoryRequest,
  TCategoryResponse,
} from "../../interfaces/category.interface";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { categorySchemaResponse } from "../../schemas/category.schema";
import AppError from "../../error";

const createCategoriesService = async (
  categoryData: TCategoryRequest
): Promise<TCategoryResponse> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  const newCategory: TCategoryResponse = categorySchemaResponse.parse(category);

  return newCategory;
};

export default createCategoriesService;
