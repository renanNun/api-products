import AppError from "@errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import UsersRepository from "../repositories/UsersRepository";
import UserTokensRepository from "../repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const userTokenRepository = getCustomRepository(UserTokensRepository);
        const userRepository = getCustomRepository(UsersRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }
        const user = await userRepository.findOne(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8);
        
        await userRepository.save(user);
        await userTokenRepository.delete(userToken);
    }
}