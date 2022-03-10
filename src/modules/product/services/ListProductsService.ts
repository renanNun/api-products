import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

export default class ListProductsService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);

        let products = await RedisCache.get<Product[]>("products");

        if(!products) {
            
            products = await productRepository.find({
                relations: ["category"]
            });

            RedisCache.set("products", products);
        }

        return products;
    }
}