import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

export default class ListProductsService {
    public async execute(page: number = 1, limit: number = 100): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);

        let cacheKey = `products:${page}:${limit}`

        let products = await RedisCache.get<Product[]>(cacheKey);

        if(!products) {
            
            products = await productRepository.findAll(limit, page);

            RedisCache.set(cacheKey, products);
        }

        return products;
    }
}