import { EntityRepository, Repository } from "typeorm";
import Category from "../entities/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category>{
    public async findByName(name: string): Promise<Category | undefined> {
        const category = await this.findOne({
            where: {
                name: name
            }
        });

        return category;
    }

    public async findAll(page: number = 1, limit: number = 100): Promise<Category[]> {
        const categories = await this.createQueryBuilder().take(limit).skip((page - 1) * limit).getMany();

        return categories;
    }
}

export default CategoryRepository;