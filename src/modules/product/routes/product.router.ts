import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import CreateProductController from "../controllers/CreateProductController";
import DeleteProductController from "../controllers/DeleteProductController";
import ListProductsController from "../controllers/ListProductsController";
import UpdateProductController from "../controllers/UpdateProductController";

const productsRouter = Router();

productsRouter.get('', new ListProductsController().handle);

productsRouter.post(
    '',
    celebrate({
        body: {
            name: Joi.string().required(),
            description: Joi.string(),
            image: Joi.any(),
            price: Joi.number().min(0).precision(2).required(),
            quantity: Joi.number().min(0).required(),
            category_id: Joi.string().uuid().required(),
        }
    }),
    new CreateProductController().handle
)

productsRouter.get(
    '/:id',
    celebrate({
        params: {
            id: Joi.string().uuid().required()
        }
    }), 
    new ListProductsController().handle
);

productsRouter.put(
    '/:id',
    celebrate({
        params: {
            id: Joi.string().uuid().required()
        },
        body: {
            name: Joi.string(),
            description: Joi.string(),
            image: Joi.any(),
            price: Joi.number().min(0).precision(2),
            quantity: Joi.number().min(0),
            category_id: Joi.string().uuid(),
        }
    }),
    new UpdateProductController().handle
)

productsRouter.delete(
    '/:id',
    celebrate({
        params: {
            id: Joi.string().uuid().required()
        }
    }),
    new DeleteProductController().handle
)

export default productsRouter;