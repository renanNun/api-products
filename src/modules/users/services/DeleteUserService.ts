import AppError from "@errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
    id: string;
}

export default class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            where: {
                id,
                active: true
            }
        });

        if(!user) {
            throw new AppError('User not found');
        }

        user.active = false;

        await usersRepository.remove(user);

        await RedisCache.invalidatePrefix("users");
    }
}