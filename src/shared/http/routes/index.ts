import { Router } from "express";
import categoriesRouter from "@modules/category/routes/category.router";
import productsRouter from "@modules/product/routes/product.router";
import RedisCache from "@shared/cache/RedisCache";

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);

routes.get('/invalidate-cache', (request, response) => {

    RedisCache.invalidate('categories');
    RedisCache.invalidate('products');

    return response.status(200).json({
        status: "success",
        message: "Cache invalidado com sucesso!"
        });
});

export default routes;