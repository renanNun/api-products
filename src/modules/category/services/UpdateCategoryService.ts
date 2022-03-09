import AppError from "src/shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

interface IRequest {
    id: string;
    name: string;
}

export default class UpdateCategoryService {
    public async execute({ id, name }: IRequest): Promise<Category> {
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOne(id);
        
        if (!category) {
            throw new AppError('Category not found');
        }

        const categoryWithSameName = await categoryRepository.findByName(name);

        if (categoryWithSameName && categoryWithSameName.id !== id) {
            throw new AppError('Category already exists');
        }

        category.name = name;

        await categoryRepository.save(category);
        
        return category;
    }
}