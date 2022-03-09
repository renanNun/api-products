import { Request, Response } from "express";
import CreateCategoryService from "../services/CreateCategoryService";

export default class CreateCategoryController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const { name } = request.body;

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({ name });

        return response.status(201).json({
            status: "success",
            data: category
        })
    }
}