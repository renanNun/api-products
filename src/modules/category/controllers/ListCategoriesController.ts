import { Request, Response } from "express";
import ListCategoriesService from "../services/ListCategoriesService";

export default class ListCategoriesController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const listCategoriesService = new ListCategoriesService();

        const categories = await listCategoriesService.execute(  page ? Number(page) : 1, limit ? Number(limit) : 100);

        return response.status(200).json({
            success: true,
            data: categories,
        })
    }
}