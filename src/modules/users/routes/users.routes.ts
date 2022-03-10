import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import CreateUserController from "../controllers/CreateUsersController";
import ListUsersController from "../controllers/ListUsersController";

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
)

export default usersRouter;