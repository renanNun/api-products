import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSessionService";
import { instanceToInstance } from 'class-transformer';

export default class CreateSessionController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const createSessionService = new CreateSessionService();

        const user = await createSessionService.execute({ email, password });

        return response.status(200).json(instanceToInstance(user));
    }
}