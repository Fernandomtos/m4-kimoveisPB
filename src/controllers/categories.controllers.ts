import { Request, Response } from "express";
import createCategoriesService from "../services/categories/createCategories.service";
import { TCategoryRequest } from "../interfaces/category.interface";
import listAllCategoriesService from "../services/categories/listAllCategories.service";
import readRealEstatebyCategoryService from "../services/categories/readRealEstatebyCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;

  const newCategory = await createCategoriesService(categoryData);

  return res.status(201).json(newCategory);
};

const listAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listAllCategoriesService();
  return res.status(200).json(categories);
};

const readRealEstatebyCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const realEstatebyCategory = await readRealEstatebyCategoryService(
    categoryId
  );

  return res.status(200).json(realEstatebyCategory);
};

export {
  createCategoryController,
  listAllCategoriesController,
  readRealEstatebyCategoryController,
};
