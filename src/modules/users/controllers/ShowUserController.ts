import { Request, Response } from "express";
import ShowUserService from "../services/ShowUserService";

export default class ShowUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;

        const showUserService = new ShowUserService();

        const user = await showUserService.execute({id});

        return response.status(200).json({
            status: 'success',
            data: user
        });
    }
}