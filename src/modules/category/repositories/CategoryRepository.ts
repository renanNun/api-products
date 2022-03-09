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
}

export default CategoryRepository;