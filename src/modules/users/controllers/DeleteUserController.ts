import { Request, Response } from "express";
import DeleteUserService from "../services/DeleteUserService";

export default class DeleteUserController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUserService = new DeleteUserService();

        await deleteUserService.execute({ id });

        return response.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    }

}