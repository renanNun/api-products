import { Request, Response } from "express";
import UpdateUserService from "../services/UpdateUserService";

export default class UpdateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
            id,
            name
        });

        return response.status(200).json({ 
            status: 'success',
            data: user
         });
    }
}