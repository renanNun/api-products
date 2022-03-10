import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

export default class ListUsersService {
    public async execute(page: number = 1, limit: number = 100): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        let cacheKey = `users:${page}:${limit}`;

        let users = await RedisCache.get<User[]>(cacheKey);
        
        if(!users) {
            users = await usersRepository.findAll(limit, page);
            
            await RedisCache.set(cacheKey, users);
        }

        return users;
    }
}