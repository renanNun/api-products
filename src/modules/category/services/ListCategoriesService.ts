import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

export default class ListCategoriesService {
    public async execute(page: number, limit: number): Promise<Category[]>{

        const categoryRepository = getCustomRepository(CategoryRepository);

        let cacheKey = `categories:${page}:${limit}`;

        let categories = await RedisCache.get<Category[]>(cacheKey);

        if(!categories) {
            categories = await categoryRepository.findAll(limit, page);

            await RedisCache.set(cacheKey, categories);
        }

        return categories;

    }
}