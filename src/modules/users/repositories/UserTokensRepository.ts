import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export default class UserTokensRepository extends Repository<UserToken> {

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.findOne({
            where: {
                token,
            },
        });
    }

    public async findByUserId(userId: string): Promise<UserToken[]> {
        return this.find({
            where: {
                userId,
            },
        });
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }

}