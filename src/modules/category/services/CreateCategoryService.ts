import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

interface IRequest {
    name: string;
}

export default class CreateCategoryService {
    public async execute({name}: IRequest): Promise<Category> {

        const categoryRepository = getCustomRepository(CategoryRepository);

        const category = categoryRepository.create({
            name
        });

        await RedisCache.invalidate('categories');

        await categoryRepository.save(category);

        return category;
    }
}