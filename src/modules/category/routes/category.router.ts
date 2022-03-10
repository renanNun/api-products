import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import CreateCategoryController from "../controllers/CreateCategoryController";
import DeleteCategoryController from "../controllers/DeleteCategoryController";
import ListCategoriesController from "../controllers/ListCategoriesController";
import ShowCategoryController from "../controllers/ShowCategoryController";
import UpdateCategoryController from "../controllers/UpdateCategoryController";

const categoriesRouter = Router();

categoriesRouter.use(isAuthenticated);

categoriesRouter.get('', new ListCategoriesController().handle);

categoriesRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(3).required(),
        },
    }),
    new CreateCategoryController().handle
);

categoriesRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    new ShowCategoryController().handle
);

categoriesRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().min(3).required(),
        },
    }),
    new UpdateCategoryController().handle
);

categoriesRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    new DeleteCategoryController().handle
);

export default categoriesRouter;
