import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
    id: string;
}

export default class ShowUserService {
    public async execute({id}: IRequest): Promise<User> {
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

        return user;
    }
}