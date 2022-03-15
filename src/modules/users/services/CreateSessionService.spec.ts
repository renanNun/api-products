import connectionOptions from "@config/typeormTestConfig";
import { getConnection, getConnectionManager, getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";

describe('CreateSession', () => {

    let createSessionService: CreateSessionService;
    let createUserService: CreateUserService;


    beforeAll(async () => {
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create(connectionOptions);

        await connection.connect();

        createUserService = new CreateUserService();
        
        await createUserService.execute({
            name: "John Doe",
            email: "johndee@example.com",
            password: "123456"
        });


        createSessionService = new CreateSessionService();
    });

    it('Create Session', async () => {
        
        const session = await createSessionService.execute({
            email: "johndee@example.com",
            password: "123456"
        });

        expect(session).toHaveProperty('token');
    });

    afterAll(async () => {
        await getCustomRepository(UsersRepository).delete({
            email: "johndee@example.com"
        });

        await getConnection().close();
    });
});