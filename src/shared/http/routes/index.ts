import { Router } from "express";
import categoriesRouter from "@modules/category/routes/category.router";

const routes = Router();

routes.use('/categories', categoriesRouter);


export default routes;