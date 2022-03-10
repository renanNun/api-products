import { Request, Response } from "express";
import ShowProductService from "../services/ShowProductService";

export default class ShowProductController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProductService = new ShowProductService();

        const product = await showProductService.execute({ id });

        return response.status(200).json({
            status: 'success',
            data: product
        })

    }

}