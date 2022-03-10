import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
    public async findAll(page: number = 1, limit: number = 100): Promise<Product[]> {
        const products = await this.createQueryBuilder().take(limit).skip((page - 1) * limit).getMany();

        return products;
    }
}