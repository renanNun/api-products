import AppError from "@errors/AppError";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";
import authConfig from '@config/auth';

interface IRequest {
    email: string;
    password: string;
}

export default class CreateSessionService {

    public async execute({email, password}: IRequest): Promise<{user: User, token: string}> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);
        
        if(!user) {
            throw new AppError("Incorret email combination.", 401);
        }

        const passwordMatched = await usersRepository.validatePassword(email, password);
        
        if(!passwordMatched) {
            throw new AppError("Incorret password combination.", 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        })

        return {
            user,
            token
        }
    }

}