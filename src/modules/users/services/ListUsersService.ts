import RedisCache from "@shared/cache/RedisCache";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

export default class ListUsersService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        let users = await RedisCache.get<User[]>("users");
        
        if(!users) {
            users = await usersRepository.find({
                where: {
                    active: true
                }
            });
            
            await RedisCache.set("users", users);
        }

        return users;
    }
}