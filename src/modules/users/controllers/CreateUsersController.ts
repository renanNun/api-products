import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const createUserService = new CreateUserService();

        const { name, email, password } = request.body;

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return response.status(201).json({
            status: "success",
            data: user
        })
    }

}