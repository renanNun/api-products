import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../entities/User";
import userRoles from "../enums/user.roles";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: userRoles;
}

export default class CreateUserService {

    public async execute({name, email}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const usersAlreadyExists = await usersRepository.findOne({
            where: {
                email: email
            }
        });

        if (usersAlreadyExists) {
            throw new AppError("User already exists.");
        }

        const user = usersRepository.create({
            name,
            email,
            password: "123456"});

    }

}