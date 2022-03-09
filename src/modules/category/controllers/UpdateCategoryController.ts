import { Request, Response } from "express";
import UpdateCategoryService from "../services/UpdateCategoryService";

export default class UpdateCategoryController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const { name } = request.body;

        const updateCategoryService = new UpdateCategoryService();

        const category = await updateCategoryService.execute({ id, name });

        return response.status(200).json({
            status: "success",
            data: category
        });
    }
}