import connectionOptions from "@config/typeormTestConfig";
import AppError from "@errors/AppError";
import { Connection, createConnection, getConnection, getConnectionManager } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";
import CreateUserService from "./CreateUserService";

describe('CreateUser', () => {

    let createUserService: CreateUserService;

    beforeAll(async () => {
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create(connectionOptions);

        await connection.connect();

        createUserService = new CreateUserService();
    });
    
    it('Create User', async () => {
            
        const user = await createUserService.execute({
            name: "John Doe",
            email: "johndoe@johndoe.com",
            password: "123456"
        });

        expect(user).toHaveProperty('id');
    })

    it('It should not be possible to create a user with the same email', async () => {

        expect(await createUserService.execute({
            name: "John Doe",
            email: "johndoe@johndoe.com",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError);

    });

    it('User has encrypted password', async () => {
        const user = await createUserService.execute({
            name: "John Doe",
            email: "johndone@johndoe.com",
            password: "123456"
        });

        expect(user.password).not.toBe("123456");
    });

    it('User role is common', async () => {
        const user = await createUserService.execute({
            name: "John Doe",
            email: "johncommon@common.com",
            password: "123456"
        });

        expect(user.role).toBe("USER");
    });

    afterAll(async () => {
        await getConnection().close();
    });

});