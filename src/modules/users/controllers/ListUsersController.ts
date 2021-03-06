import { Request, Response } from "express";
import ListUsersService from "../services/ListUsersService";

export default class ListUsersController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const { page, limit } = request.query;

        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute(  page ? Number(page) : 1, limit ? Number(limit) : 100);

        return response.status(200).json({
            status: "success",
            data: users
        })

    }
}