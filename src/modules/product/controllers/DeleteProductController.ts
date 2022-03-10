import RedisCache from "@shared/cache/RedisCache";
import { Request, Response } from "express";
import DeleteProductService from "../services/DeleteProductService";

export default class DeleteProductController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const deleteProductService = new DeleteProductService();

        await deleteProductService.execute({ id: request.params.id });

        await RedisCache.invalidate('categories');

        return response.status(204).json({
            status: 'success',
            message: 'Product deleted'
        })

    }
}