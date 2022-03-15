import User from "@modules/users/entities/User";
import { define } from "typeorm-seeding";
import { faker as Faker } from '@faker-js/faker';

define(User, (faker: typeof Faker) => {
    const user = new User();

    user.name = faker.name.findName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
})