import AppError from '@errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../entities/Product'
import ProductRepository from '../repositories/ProductRepository'

interface IRequest {
    id: string
}

export default class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const product = await productRepository.findOne({ id: id })

        if (!product) {
            throw new AppError('Product not found')
        }

        return product;
    }
}
