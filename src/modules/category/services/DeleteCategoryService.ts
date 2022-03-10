import AppError from "@errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import CategoryRepository from "../repositories/CategoryRepository";

interface IRequest {
    id: string;
}

export default class DeleteCategoryService {

    public async execute({id}: IRequest): Promise<void> {	
        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOne(id);

        if (!category) {
            throw new AppError('Category not found');
        }

        await RedisCache.invalidatePrefix("categories");
        
        await categoryRepository.remove(category);
    }

}