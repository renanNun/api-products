import { Request, Response } from "express";
import ShowCategoryService from "../services/ShowCategoryService";

export default class ShowCategoryController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const showCategoryService = new ShowCategoryService();

        const category = await showCategoryService.execute({ id });

        return response.status(200).json({
            status: "success",
            data: category
        });
    }
}