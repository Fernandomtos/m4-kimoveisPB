import { Repository } from "typeorm";
import { TCategoriesResponse } from "../../interfaces/category.interface";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import AppError from "../../error";

const listAllCategoriesService = async (): Promise<TCategoriesResponse> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] | null = await categoryRepository.find();

  if (!categories) {
    throw new AppError("Categories not found", 404);
  }

  return categories;
};

export default listAllCategoriesService;
