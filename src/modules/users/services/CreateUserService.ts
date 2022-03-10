import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";
import { hash } from 'bcryptjs';
import RedisCache from "@shared/cache/RedisCache";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {

    public async execute({name, email, password}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const usersAlreadyExists = await usersRepository.findOne({
            where: {
                email: email
            }
        });

        if (usersAlreadyExists) {
            throw new AppError("User already exists.");
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        await RedisCache.invalidatePrefix("users");
        
        return user;

    }

}