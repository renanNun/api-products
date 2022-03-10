import RedisCache from "@shared/cache/RedisCache";
import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";

export default class CreateProductController {
    public async handle(request: Request, response: Response): Promise<Response> {

        const { name, description, image, price, quantity, category_id } = request.body;

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            description,
            image,
            price,
            quantity,
            category_id
        });

        await RedisCache.invalidate('categories');

        return response.status(201).json({
            status: "success",
            data: product
        });


    }
}