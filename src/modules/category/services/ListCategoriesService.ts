import { getCustomRepository } from "typeorm";
import Category from "../entities/Category";
import CategoryRepository from "../repositories/CategoryRepository";

export default class ListCategoriesService {
    public async execute(): Promise<Category[]>{

        const categoryRepository = getCustomRepository(CategoryRepository);

        const categories = await categoryRepository.find();

        return categories;

    }
}