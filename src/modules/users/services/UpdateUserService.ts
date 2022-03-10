import AppError from "@errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import userRoles from "../enums/user.roles";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
    id: string;
    name?: string;
}

export default class UpdateUserService {

    public async execute({ id, name}: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({
            where: {
                id: id,
                active: true
            }
        });

        if(!user) {
            throw new AppError('User not found');
        }

        if(name) {
            user.name = name;
        }

        await userRepository.save(user);

        await RedisCache.invalidatePrefix("users");

        return user;
    }

}