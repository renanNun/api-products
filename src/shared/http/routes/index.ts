import { Router } from "express";
import categoriesRouter from "@modules/category/routes/category.router";
import productsRouter from "@modules/product/routes/product.router";
import RedisCache from "@shared/cache/RedisCache";
import usersRouter from "@modules/users/routes/users.routes";
import sessionRouter from "@modules/users/routes/session.routes";

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionRouter);

routes.get('/invalidate-cache', (request, response) => {

    RedisCache.invalidate('categories');
    RedisCache.invalidate('products');
    RedisCache.invalidate('users');

    return response.status(200).json({
        status: "success",
        message: "Cache invalidated"
        });
});

export default routes;