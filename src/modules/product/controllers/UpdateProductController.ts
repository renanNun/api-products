import { Request, Response } from "express";
import UpdateProductService from "../services/UpdateProductService";

export default class UpdateProductController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const updateProductService = new UpdateProductService();
        const { id } = request.params;
        const { name, description, image, price, quantity, category_id } = request.body;

        const product = await updateProductService.execute({ id, name, description, image, price, quantity, category_id });

        return response.status(200).json({
            status: 'success',
            data: product
        });
    }
}