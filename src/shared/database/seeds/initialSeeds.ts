import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '@modules/users/entities/User';
import Category from '@modules/category/entities/Category';
import Product from '@modules/product/entities/Product';

export default class InitialDatabaseSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)().createMany(25);

        const categories = await factory(Category)().createMany(10);

        await factory(Product)().map(async (product) => {
            product.category = categories[Math.floor(Math.random() * categories.length)];
            return product;
        }).createMany(100);
    }
}