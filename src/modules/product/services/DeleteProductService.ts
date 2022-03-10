import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm"
import ProductRepository from "../repositories/ProductRepository"

interface IRequest {
    id: string
}

export default class DeleteProductService {
    public async execute({id}: IRequest): Promise<void> {

        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne({ id: id })

        if (!product) {
            throw new AppError('Product not found')
        }

        await productRepository.remove(product);

    }
}