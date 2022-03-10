import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CreateUserController from "../controllers/CreateUsersController";
import DeleteUserController from "../controllers/DeleteUserController";
import ListUsersController from "../controllers/ListUsersController";
import ShowUserController from "../controllers/ShowUserController";
import UpdateUserController from "../controllers/UpdateUserController";

const usersRouter = Router();

usersRouter.get(
    "/",
    isAuthenticated,
    new ListUsersController().handle
);

usersRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }
    }),
    new CreateUserController().handle
);

usersRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {    
            id: Joi.string().uuid().required()
        }
    }),
    isAuthenticated,
    new ShowUserController().handle
);

usersRouter.put(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
        [Segments.BODY]: {
            name: Joi.string().min(3).required(),
        },
    }),
    isAuthenticated,
    new UpdateUserController().handle
);

usersRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        },
    }),
    isAuthenticated,
    new DeleteUserController().handle
);

export default usersRouter;