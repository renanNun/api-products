import { Request, Response } from "express"
import ListProductsService from "../services/ListProductsService";

export default class ListProductsController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const listProductsService = new ListProductsService();

        const products = await listProductsService.execute(  page ? Number(page) : 1, limit ? Number(limit) : 100);

        return response.status(200).json({
            status: "success",
            data: products
        });
    }
}