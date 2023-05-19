import { Repository } from "typeorm";
import { Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../error";

const readRealEstatebyCategoryService = async (
  categoryId: number
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const category: Category | null = await categoryRepository
    .createQueryBuilder("category")
    .innerJoinAndSelect("category.realEstate", "real_estate")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  return category!;
};

export default readRealEstatebyCategoryService;
