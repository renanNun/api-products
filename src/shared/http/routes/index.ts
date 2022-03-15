import { Router } from "express";
import categoriesRouter from "@modules/category/routes/category.router";
import productsRouter from "@modules/product/routes/product.router";
import RedisCache from "@shared/cache/RedisCache";
import usersRouter from "@modules/users/routes/users.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import passwordRouter from "@modules/users/routes/password.routes";

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionRouter);
routes.use('/password', passwordRouter);

routes.get('/invalidate-cache', (request, response) => {

    RedisCache.invalidateAll();

    return response.status(200).json({
        status: "success",
        message: "Cache invalidated"
        });
});

routes.get('/', (request, response) => {
    return response.status(200).json({
        status: "success",
        message: "Hello World"
    });
});

export default routes;