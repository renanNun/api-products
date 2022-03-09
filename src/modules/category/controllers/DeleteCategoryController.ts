import { Request, Response } from "express";
import DeleteCategoryService from "../services/DeleteCategoryService";

export default class DeleteCategoryController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const deleteCategoryService = new DeleteCategoryService();

        const category = await deleteCategoryService.execute({ id });
        
        return response.status(200).json({
            status: "success",
            data: category
        });
    }
}