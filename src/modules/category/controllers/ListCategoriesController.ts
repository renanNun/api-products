import { Request, Response } from "express";
import ListCategoriesService from "../services/ListCategoriesService";

export default class ListCategoriesController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesService = new ListCategoriesService();

        const categories = await listCategoriesService.execute();

        return response.status(200).json({
            success: true,
            data: categories,
        })
    }
}