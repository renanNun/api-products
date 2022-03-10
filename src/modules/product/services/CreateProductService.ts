import AppError from "@errors/AppError";
import CategoryRepository from "@modules/category/repositories/CategoryRepository";
import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

interface IRequest {
    name: string;
    description?: string;
    image?: string;
    price: number;
    quantity: number;
    category_id: string;
}

export default class CreateProductService {
    public async execute({name, description, image, price, quantity, category_id}: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const categoryRepository = getCustomRepository(CategoryRepository);

        const categoryExists = await categoryRepository.findOne({id: category_id});

        if(!categoryExists) {
            throw new AppError('Category does not exists');
        }

        const product = productRepository.create();

        product.name = name;
        product.description = description ? description : '';
        product.image = image ? image : '';
        product.price = price;
        product.quantity = quantity;
        product.category = categoryExists;

        await productRepository.save(product);

        await RedisCache.invalidatePrefix("products");

        return product;
    }
}