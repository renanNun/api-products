import { define } from "typeorm-seeding";
import { faker as Faker } from '@faker-js/faker';
import Product from "@modules/product/entities/Product";

define(Product, (faker: typeof Faker) => {
    const product = new Product();

    product.name = faker.name.findName();
    product.description = faker.lorem.sentence();
    product.price = faker.random.number({precision: 2});
    product.quantity = faker.random.number();

    return product;
})