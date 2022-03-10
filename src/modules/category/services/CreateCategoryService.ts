import AppError from "@errors/AppError";
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

        const categoryExists = await categoryRepository.findByName(name);

        if (categoryExists) {
            throw new AppError("Category already exists");
        }

        const category = categoryRepository.create({
            name
        });

        await RedisCache.invalidatePrefix("categories");

        await categoryRepository.save(category);

        return category;
    }
}