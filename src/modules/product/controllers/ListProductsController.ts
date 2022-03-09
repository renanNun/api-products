import { Request, Response } from "express"
import ListProductsService from "../services/ListProductsService";

export default class ListProductsController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const listProductsService = new ListProductsService();

        const products = await listProductsService.execute();

        return response.status(200).json({
            status: "success",
            data: products
        });
    }
}