import { compare } from "bcryptjs";
import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
                active: true
            },
        });

        return user;
    }

    public async validatePassword(email: string, password: string): Promise<boolean> {
        const user = await this.findOne({
            where: {
                email,
                active: true
            },
            select: ["id", "name", "email", "password", "avatar", "active", "role"],
        });

        if (!user) {
            return false;
        }

        const result = await compare(password, user.password);

        return result;
    }

    public async findAll(limit: number = 100, page: number = 1): Promise<User[]> {
        const users = await this.createQueryBuilder().where({
            active: true
        }).take(limit).skip((page - 1) * limit).getMany();

        return users;
    }

}