import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

interface IRequest {
    id: string;
}

export default class ShowCategoryService {
    public async execute({id}: IRequest): Promise<Category> {

        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOne({id: id});

        if(!category) {
            throw new AppError("Category not found");
        }

        return category;

    }
}