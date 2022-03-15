import { define } from "typeorm-seeding";
import { faker as Faker } from '@faker-js/faker';
import Category from "@modules/category/entities/Category";

define(Category, (faker: typeof Faker) => {
    const category = new Category()

    category.name = faker.name.findName()

    return category;
})