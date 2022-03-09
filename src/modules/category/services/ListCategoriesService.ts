import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

export default class ListCategoriesService {
    public async execute(): Promise<Category[]>{

        const categoryRepository = getCustomRepository(CategoryRepository);

        let categories = await RedisCache.get<Category[]>('categories');

        if(!categories) {
            categories = await categoryRepository.find();

            await RedisCache.set('categories', categories);
        }

        return categories;

    }
}