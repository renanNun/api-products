import AppError from "@errors/AppError";
import CategoryRepository from "@modules/category/repositories/CategoryRepository";
import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import ProductRepository from "../repositories/ProductRepository";

interface IRequest {
    id: string,
    name?: string,
    description?: string,
    image?: string,
    price?: number,
    quantity?: number,
    category_id?: string
}

export default class UpdateProductService {

    public async execute({ id, name, description, image, price, quantity, category_id }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne({ id: id })

        if (!product) {
            throw new AppError('Product not found')
        }

        if (name) {
            product.name = name;
        }

        if (description) {
            product.description = description;
        }

        if (image) {
            product.image = image;
        }

        if (price) {
            product.price = price;
        }

        if (quantity) {
            product.quantity = quantity;
        }

        if (category_id) {
            const categoryRepository = getCustomRepository(CategoryRepository);

            const category = await categoryRepository.findOne({ id: category_id })

            if (!category) {
                throw new AppError('Category not found')
            }

            product.category = category;
        }

        await productRepository.save(product);

        await RedisCache.invalidatePrefix("products");

        return product;
    }
}
